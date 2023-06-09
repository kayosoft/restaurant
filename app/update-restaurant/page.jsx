"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdateRestaurant = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const restaurantId = searchParams.get("id");

  const [restaurant, setRestaurant] = useState({
    name: "",
    location: "",
    contact: "",
    description: "",
  });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getRestaurantDetails = async () => {
      const response = await fetch(`/api/restaurant/${restaurantId}`);
      const data = await response.json();

      setRestaurant({
        name: data.name,
        location: data.location,
        contact: data.contact,
        description: data.description,
      });
    };

    if (restaurantId) getRestaurantDetails();
  }, [restaurantId]);

  const updateRestaurant = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!restaurantId) return alert("Missing restaurantId!");

    try {
      const response = await fetch(`/api/prompt/${restaurantId}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: restaurant.name,
          contact: restaurant.contact,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      restaurant={restaurant}
      setRestaurant={setRestaurant}
      submitting={submitting}
      handleSubmit={updateRestaurant}
    />
  );
};

export default UpdateRestaurant;
