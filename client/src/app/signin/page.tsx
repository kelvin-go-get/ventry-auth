"use client";

import React, { useState } from "react";
import Image from "next/image";
import { login, register } from "@/app/service/authService";
import toast, { Toaster } from "react-hot-toast";

const SignIn = () => {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);

  const handleLogin = async () => {
    try {
      const data = await login(signInEmail, signInPassword);
      sessionStorage.setItem("authToken", data.token);
      sessionStorage.setItem("userData", JSON.stringify(data.user));
      console.log("Login Success:", data);
      toast.success(`Welcome, ${data.user.email}! Redirecting...`, {
        duration: 3000,
      });
    } catch (error: unknown) {
      console.error("Login Failed:", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      toast.error(errorMessage);
    }
  };
  const handleRegister = async () => {
    try {
      const data = await register(signUpEmail, signUpPassword, accessCode);
      toast.success("Registration successful! You can now login.");
      console.log("Register Success:", data);
      setTimeout(() => {
        setShowSignUp(false);
      }, 2000);
    } catch (error: unknown) {
      console.error("Register Failed:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Registration failed! Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(360deg,#163359,#6F87A6,#163359)] flex flex-col justify-center items-center px-4 py-8">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#163359",
            color: "#fff",
            border: "1px solid #D9B23D",
          },
          duration: 4000,
        }}
      />

      {/* Logo */}
      <div className="text-center">
        <Image
          src="/logo.jpg"
          alt="Ventry Logo"
          width={80}
          height={80}
          className="mx-auto"
        />
        <h1 className="text-6xl text-black font-bold mt-4">Ventry</h1>
        <p className="text-2xl text-black mt-1">Because Access Is Everything</p>
      </div>

      {/* Sign In Card */}
      <div className="mt-10 w-full max-w-md bg-opacity-10 p-6 rounded-2xl shadow-lg backdrop-blur-md">
        {/* Sign In or Sign Up content */}
        {showSignUp ? (
          <>
            {/* Sign Up Title */}
            <h2 className="text-black text-2xl font-semibold text-center mb-4">
              Sign Up
            </h2>
            <div className="mt-4 flex flex-col gap-3 px-12">
              {/* Email and Password Inputs for Sign Up */}
              <input
                type="email"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                placeholder="email@email.com"
                className="w-full text-center bg-[linear-gradient(90deg,#D9B23D,#D9BE6C,#D9B23D)] outline-none text-black placeholder-black font-semibold py-3 px-4 rounded-lg mb-4"
              />
              <input
                type="password"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                placeholder="password"
                className="w-full text-center bg-[linear-gradient(90deg,#D9B23D,#D9BE6C,#D9B23D)] outline-none text-black placeholder-black font-semibold py-3 px-4 rounded-lg mb-4"
              />

              {/* Social login buttons */}
              <button className="w-full flex items-center gap-10 bg-[linear-gradient(90deg,#D9B23D,#D9BE6C,#D9B23D)] text-black p-2 rounded-lg font-semibold shadow">
                <Image
                  src="/Apple-logo.png"
                  alt="Apple Logo"
                  width={50}
                  height={50}
                />
                <span className="ml-10">Apple</span>
              </button>
              <button className="w-full flex items-center gap-10 bg-[linear-gradient(90deg,#D9B23D,#D9BE6C,#D9B23D)] text-black p-2 rounded-lg font-semibold shadow">
                <Image
                  src="/Google-logo.webp"
                  alt="Google Logo"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <span className="ml-10">Google</span>
              </button>
            </div>

            {/* Access Code Section */}
            <div className="flex items-center gap-2 mt-8 w-[80%] mx-auto">
              <span className="text-white text-sm sm:text-base">
                Exclusive Access Code
              </span>
              <div className="relative flex-1 min-w-[120px]">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl" />
                <input
                  type="text"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="XXX-XXX"
                  className="relative z-10 w-full text-center bg-transparent outline-none text-white placeholder-white/70 font-semibold py-3 px-4"
                />
              </div>
              <button
                onClick={handleRegister}
                className="group relative w-full cursor-pointer bg-black px-4 py-3 rounded-lg font-semibold text-sm border hover:border-transparent border-[#D9B23D] transition-all duration-300"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D9B23D] via-[#D9BE6C] to-[#D9B23D]">
                  Request Invite Code
                </span>
              </button>
            </div>

            {/* Access Accepted button */}
            <div className="flex justify-end items-center py-4">
              <button className="text-white cursor-pointer py-1 px-1 bg-[linear-gradient(180deg,#D9B23D,#D9BE6C,#D9B23D)] border-2 border-amber-50 font-bold text-xl rounded-xl shadow-gold">
                Access Accepted
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Sign In form */}
            <input
              type="email"
              value={signInEmail}
              onChange={(e) => setSignInEmail(e.target.value)}
              placeholder="email@email.com"
              className="w-full text-center bg-[linear-gradient(90deg,#D9B23D,#D9BE6C,#D9B23D)] outline-none text-black placeholder-black font-semibold py-3 px-4 rounded-lg mb-4"
            />
            <input
              type="password"
              value={signInPassword}
              onChange={(e) => setSignInPassword(e.target.value)}
              placeholder="password"
              className="w-full text-center bg-[linear-gradient(90deg,#D9B23D,#D9BE6C,#D9B23D)] outline-none text-black placeholder-black font-semibold py-3 px-4 rounded-lg mb-4"
            />
            <div className="flex justify-end">
              <button className="text-black font-semibold text-base hover:underline">
                Forgot Password...
              </button>
            </div>
            <div className="flex justify-center mt-6">
              <button
                onClick={handleLogin}
                className="w-[30%] cursor-pointer bg-[linear-gradient(180deg,#D9B23D,#D9BE6C,#D9B23D)] border-2 border-amber-50 text-black font-bold text-2xl py-3 rounded-xl shadow-gold"
              >
                Sign In
              </button>
            </div>
            <div className="flex justify-center items-center mt-4 mb-6">
              <span className="text-black text-sm font-semibold">
                Securely access your account
              </span>
            </div>
          </>
        )}

        {/* Divider always at the bottom */}
        <div className="border-t border-gray-400 my-6" />

        {/* Toggle buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => setShowSignUp(false)}
            className={`text-black text-2xl font-semibold ${
              showSignUp ? "underline" : "hidden"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setShowSignUp(true)}
            className={`text-black text-2xl font-semibold ${
              !showSignUp ? "underline" : "hidden"
            }`}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
