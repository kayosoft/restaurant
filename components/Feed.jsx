"use client";

import { useState, useEffect } from "react";

import RestaurantCard from "./RestaurantCard";

const RestaurantCardList = ({ restaurants, handleTagClick }) => {
  let rest = restaurants.restaurants;
  return (
    <div className='mt-16 prompt_layout'>
      {rest?(rest.map((restaurant) => (
        <RestaurantCard
          key={restaurant._id}
          restaurant={restaurant}
          handleTagClick={handleTagClick}
        />
      ))):(
        "No restaurants found."
      )}
    </div>
  );
};

const Feed = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchRestaurants = async () => {
        await fetch("http://localhost:5000/api/restaurant/get-open", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // body:JSON.stringify({
            //     email:localStorage.getItem('userEmail')
            // })
        }).then(async (res) => {
            let response = await res.json()
            await setAllRestaurants(response)
        })
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const filterRestaurants = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    let rest = allRestaurants.restaurants;
    return rest.filter(
      (item) =>
        regex.test(item.userId) ||
        regex.test(item.location) ||
        regex.test(item.name)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterRestaurants(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (name) => {
    setSearchText(name);

    const searchResult = filterRestaurants(name);
    setSearchedResults(searchResult);
  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a restaurant by name'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <RestaurantCardList
        restaurants={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <RestaurantCardList restaurants={allRestaurants} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
