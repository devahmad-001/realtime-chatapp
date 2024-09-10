"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Auth } from "@/firebase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
function Login() {
  const [err, seterr] = useState<boolean>(false);
  let { register, handleSubmit } = useForm();
  const Nevigate = useRouter();

  const SignIN = async (data: any) => {
    try {
      signInWithEmailAndPassword(Auth, data.email, data.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          if (user) {
            Nevigate.push("/");
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterr(true);
        });
    } catch (error) {
      console.log(error, " ____Login.tsx");
      seterr(true);
    }
  };
  return (
    <div className="formcontainer">
      <div className="forwrapper">
        <span className="logo">Logo</span>
        <span className="tite">Sign In</span>
        <form action="" onSubmit={handleSubmit(SignIN)}>
          <input
            {...register("email")}
            type="email"
            title="email"
            placeholder="email"
          />
          <input
            {...register("password")}
            type="password"
            title="password"
            placeholder="password"
          />
          <button>Sign in </button>
        </form>
        {err && <span>Something went wrong</span>}
        <p>
          You Dont have an account?<Link href={"/register"}> Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
