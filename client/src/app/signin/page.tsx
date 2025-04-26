"use client";

import React from "react";
import Image from "next/image";

const SignIn = () => {
  return (
    <div className="min-h-screen bg-[linear-gradient(360deg,#163359,#6F87A6,#163359)] flex flex-col justify-center items-center px-4 py-8">
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
        {/* Email Input */}
        <input
          type="email"
          placeholder="email@email.com"
          className="w-full text-center bg-[linear-gradient(90deg,#D9B23D,#D9BE6C,#D9B23D)] outline-none text-black placeholder-black font-semibold py-3 px-4 rounded-lg mb-4"
        />

        {/* password Input */}
        <input
          type="password"
          placeholder="password"
          className="w-full text-center bg-[linear-gradient(90deg,#D9B23D,#D9BE6C,#D9B23D)] outline-none text-black placeholder-black font-semibold py-3 px-4 rounded-lg mb-4"
        />
        <div className="flex justify-end items-center">
          <button className="text-black font-semibold text-base cursor-pointer hover:underline">
            Forgot Password...
          </button>
        </div>

        {/* Sign In Button */}
        <div className="flex justify-center items-center">
          <button className="w-[30%] cursor-pointer bg-[linear-gradient(180deg,#D9B23D,#D9BE6C,#D9B23D)] border-2 border-amber-50 text-black font-bold text-2xl py-3 rounded-xl shadow-gold">
            Sign In
          </button>
        </div>

        <div className="flex justify-center items-center mt-4 mb-6">
          <span className="text-black text-sm font-semibold">
            Securely access your account
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-400 my-6" />

        {/* Sign Up Title */}
        <h2 className="text-black text-2xl font-semibold text-center mb-4">
          Sign Up
        </h2>
        <div className="mt-4 flex flex-col gap-3 px-12">
          {/* Email Input */}
          <input
            type="email"
            placeholder="email@email.com"
            className="w-full text-center bg-[linear-gradient(90deg,#D9B23D,#D9BE6C,#D9B23D)] outline-none text-black placeholder-black font-semibold py-3 px-4 rounded-lg mb-4"
          />

          {/* password Input */}
          <input
            type="password"
            placeholder="password"
            className="w-full text-center bg-[linear-gradient(90deg,#D9B23D,#D9BE6C,#D9B23D)] outline-none text-black placeholder-black font-semibold py-3 px-4 rounded-lg mb-4"
          />

          {/* Apple/Google Buttons */}
          <button className="w-full cursor-pointer flex gap-10 justify-start items-center bg-[linear-gradient(90deg,#D9B23D,#D9BE6C,#D9B23D)] text-black p-2 rounded-lg font-semibold shadow">
            <Image
              src="/Apple-logo.png"
              alt="Google Logo"
              width={50}
              height={50}
            />
            <span className="text-center ml-10"> Apple</span>
          </button>
          <button className="w-full cursor-pointer flex gap-10 justify-start items-center bg-[linear-gradient(90deg,#D9B23D,#D9BE6C,#D9B23D)] text-black p-2 rounded-lg font-semibold shadow">
            <Image
              src="/Google-logo.webp"
              alt="Google Logo"
              width={30}
              height={30}
              className="rounded-full bg-auto"
            />
            <span className="text-center ml-10"> Google</span>
          </button>
        </div>

        {/* Access Code Section */}
        <div className="flex items-center gap-2 mt-8 w-[80%] mx-auto">
          {/* Text label */}
          <span className="text-white text-sm sm:text-base whitespace-wra w-fullp">
            Exclusive Access Code
          </span>

          {/* Input field with blur effect */}
          <div className="relative flex-1 min-w-[120px]">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl" />
            <input
              type="text"
              placeholder="XXX-XXX"
              className="relative z-10 w-full text-center bg-transparent outline-none text-white placeholder-white/70 font-semibold py-3 px-4"
            />
          </div>

          {/* Button with working gradient text */}
          <button className="group relative w-full cursor-pointer bg-black px-4 py-3 rounded-lg font-semibold text-sm  whitespace-wrap border hover:border-transparent border-[#D9B23D] transition-all duration-300">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D9B23D] via-[#D9BE6C] to-[#D9B23D]">
              Request Invite Code
            </span>
          </button>
        </div>

        {/* Access Button */}
        <div className="flex justify-end items-center py-4">
          <button className="text-white cursor-pointer py-1 px-1 bg-[linear-gradient(180deg,#D9B23D,#D9BE6C,#D9B23D)] border-2 border-amber-50  font-bold text-xl rounded-xl shadow-gold">
            Access Accepted
          </button>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
