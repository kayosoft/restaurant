const express = require('express')
const Restaurant = require('../models/Restaurant')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const axios = require('axios')
const fetch = require('../middleware/fetchdetails');

router.post('/add', [

    body('name').isLength({ min: 3 }),
    body('location', "Location cannot be blank").exists(),
    body('contact').isLength({ min: 10, max:10 }),
    body('description', "Description cannot be blank").exists(),
    body('userId', "userId cannot be blank").exists(),
],fetch, async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }
    
    try {
        await Restaurant.create({
            userId: req.body.userId,
            name: req.body.name,
            location: req.body.location,
            contact: req.body.contact,
            description: req.body.description,
        }).then(restaurant => {
            const data = {
                restaurant: {
                    id: restaurant.id
                }
            }
            
            success = true
            res.json({ success, data })
        })
            .catch(err => {
                console.log(err);
                res.json({ error: "Please enter a unique value." })
            })
    } catch (error) {
        console.error(error.message)
    }
})

// Get logged in User details, Login Required.
router.post('/getlocation', async (req, res) => {
    try {
        let lat = req.body.latlong.lat
        let long = req.body.latlong.long
        console.log(lat, long)
        let location = await axios
            .get("https://api.opencagedata.com/geocode/v1/json?q=" + lat + "+" + long + "&key=74c89b3be64946ac96d777d08b878d43")
            .then(async res => {
                // console.log(`statusCode: ${res.status}`)
                console.log(res.data.results)
                // let response = stringify(res)
                // response = await JSON.parse(response)
                let response = res.data.results[0].components;
                console.log(response)
                let { village, county, state_district, state, postcode } = response
                return String(village + "," + county + "," + state_district + "," + state + "\n" + postcode)
            })
            .catch(error => {
                console.error(error)
            })
        res.send({ location })

    } catch (error) {
        console.error(error.message)
        res.send("Server Error")

    }
})

router.post('/get-open', async (req, res) => {
    try {
        let restaurants = await Restaurant.find({})
        res.json({ restaurants })

    } catch (error) {
        console.error(error.message)
        res.send("Server Error")
    }
})

router.post('/my-restaurants', fetch, async (req, res) => {
    try {
    let rest = await Restaurant.find({ 'userId': req.body.userId })
    if (rest) {
        res.json({ success: true, rest })
    }else {
        res.json({ success: false, msg: 'No Restaurants yet' })
    
    }
} catch (error) {
    console.log(error.message)
    res.send("Server Error", error.message)
}
})



module.exports = router