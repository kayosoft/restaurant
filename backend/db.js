const mongoose = require('mongoose')
const mongoURI = 'mongodb+srv://kalumbajalaludin:5drLFEPuJhPU2rQe@cluster0.duo3s63.mongodb.net/?retryWrites=true&w=majority' // Change url to your db you created in atlas
module.exports = function (callback) {
    mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err) console.log("---" + err)
        else {
            // var database =
            console.log("connected to mongo")
            const foodCollection = await mongoose.connection.db.collection("food_items");
            foodCollection.find({}).toArray(async function (err, data) {
                const categoryCollection = await mongoose.connection.db.collection("Categories");
                categoryCollection.find({}).toArray(async function (err, Catdata) {
                    callback(err, data, Catdata);

                })
            });
            
        }
    })
};
