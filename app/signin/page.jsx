"use client";

import { useState, useContext, createContext } from "react";
import { useRouter } from "next/navigation";
import AppProvider from "@components/AppProvider";

import SigninForm from "@components/SigninForm";

const Signin = () => {
  const router = useRouter();
  const authContext = useContext(AppProvider);
  const [submitting, setIsSubmitting] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const signInUser = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();
      if (json.success) {
        //save the auth toke to local storage and redirect
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("token", json.authToken);
        localStorage.setItem("name", json.data.name);
        localStorage.setItem("userId", json.data.id);
        authContext.setAppContext(json.authToken)
        router.push("/");
      } else {
        alert("Enter Valid Credentials");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SigninForm
      type="Load"
      credentials={credentials}
      setCredentials={setCredentials}
      submitting={submitting}
      handleSubmit={signInUser}
    />
  );
};

export default Signin;
