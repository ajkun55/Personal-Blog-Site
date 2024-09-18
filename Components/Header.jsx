"use client";
import { assets } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

function Header() {
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!email) return;
    const formData = new FormData();
    formData.append("email", email);
    const response = await axios.post("/api/email", formData);
    if (response.data.success) {
      toast.success(response.data.msg);
      setEmail("");
    } else {
      toast.error(response.data.msg);
    }
  };

  return (
    <div className="p-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center">
        <Image
          src={assets.logo}
          width={180}
          alt=""
          className="w-[130px] sm:w-auto"
        />

        <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0_#000000]">
          Get started <Image src={assets.arrow} alt="" />{" "}
        </button>
      </div>
      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-medium">Latest Blogs</h1>
        <p className="mt-10 max-w-[760px] m-auto text-xs sm:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur,
          tenetur aliquam? Animi aliquam cupiditate quia nihil ipsa earum totam
          quis doloremque iste. Ut nulla in sapiente cumque consequatur aliquid
          quasi?
        </p>
        <form
          onSubmit={onSubmitHandler}
          action=""
          className="flex justify-between max-w-[500px] mx-auto scale-75 sm:scale-100 mt-10 border border-black shadow-[-7px_7px_0_#000000]"
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            name="email"
            id="email"
            placeholder="Enter your Email"
            className="pl-4 outline-none"
          />
          <button
            type="submit"
            className="border border-black p-4 sm:px-8 active:bg-gray-600 active:text-white hover:font-semibold"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}

export default Header;
