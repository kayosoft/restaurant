"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const userId = localStorage.getItem("userId");

  const [myRestaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      await fetch("http://localhost:5000/api/restaurant/my-restaurants", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
          },
          body:JSON.stringify({
              userId:localStorage.getItem('userId')
          })
      }).then(async (res) => {
          let response = await res.json()
          await setRestaurants(response)
      })
};

    if (userId) fetchRestaurants();
  }, [userId]);

  const handleEdit = (restaurant) => {
    
  };

  const handleDelete = async (restaurant) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        //Method here
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name='My'
      desc='Welcome to your personalized profile page. Share your restaurant'
      data={myRestaurants}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
