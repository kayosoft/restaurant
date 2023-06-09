"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const AddRestaurant = () => {
  const router = useRouter();

  const [submitting, setIsSubmitting] = useState(false);
  const [restaurant, setRestaurant] = useState({
    name: "",
    location: "",
    contact: "",
    description: "",
  });
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const addRestaurant = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/restaurant/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({
          name: restaurant.name,
          userId: userId,
          location: restaurant.location,
          contact: restaurant.contact,
          description: restaurant.description,
        }),
      });

      const json = await response.json();
      console.log(json);
      if (json.success) {
        router.push("/");
      } else {
        alert("Failed to Add restaurant");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Add"
      restaurant={restaurant}
      setRestaurant={setRestaurant}
      submitting={submitting}
      handleSubmit={addRestaurant}
    />
  );
};

export default AddRestaurant;
