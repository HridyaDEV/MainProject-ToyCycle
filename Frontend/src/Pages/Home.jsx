import React from "react";
import {  BsFillCartFill } from "react-icons/bs";
import {  useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate()
  return (
    <>
      {/* Navigation Bar */}
      <div className="bg-white flex justify-between items-center px-15 py-3 shadow-md">
        <h1 className="text-amber-950 font-bold text-3xl">ToyCycle</h1>

        <ul className="flex gap-6 text-amber-950 font-semibold">
          <li>Home</li>
          <li>Features</li>
          <li>Categories</li>
          <li>New Arrivals</li>
        </ul>

        <div className="flex gap-3">
          <button className="bg-amber-950 text-white px-4 py-2 rounded font-semibold " onClick={ () =>navigate("/SignUp")}> Log In</button>
          <button className="bg-amber-950 text-white px-4 py-2 rounded text-2xl ">
            
            {/* <BsCart /> */}
            <BsFillCartFill />
            </button>
        </div>
      </div>

     
      <div className="w-full h-[580px] relative">
      
        <img
          src="/background.jpg"
          alt="background"
          className="w-full h-full object-cover"
        />
         <div className="absolute inset-0 flex justify-between text-yellow-500 text-7xl  font-bold bg-black/40 px-15 py-25">
         FIND JOY IN <br />EVERY TOY
        </div>
        <div className="absolute inset-0 text-white px-15 py-65">
          <h2>High-quality, pre-owned toys made for <br /> 
          new memories and endless smiles.</h2>
        </div>
      
        
      
        
      
      </div>
    </>
  );
}

export default Home;
