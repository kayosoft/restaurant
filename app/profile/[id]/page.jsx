"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userRestaurants, setUserRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await fetch("http://localhost:5000/api/restaurant/my-restaurants");
      const data = await response.json();

      setUserRestaurants(data);
    };

    if (params?.id) fetchRestaurants();
  }, [params.id]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s restaurants`}
      data={userRestaurants}
    />
  );
};

export default UserProfile;
