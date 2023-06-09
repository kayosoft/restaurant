"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import SignupForm from "@components/SignupForm";

const Signup = () => {
  const router = useRouter();

  const [submitting, setIsSubmitting] = useState(false);
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
  const signUpUser = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();
      console.log(json);
      if (json.success) {
        router.push("/signin");
      } else {
        alert("Failed to Sign up");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SignupForm
      type='Load'
      credentials={credentials}
      setCredentials={setCredentials}
      submitting={submitting}
      handleSubmit={signUpUser}
    />
  );
};

export default Signup;
