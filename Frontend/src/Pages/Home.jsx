import React, { useEffect, useState } from "react";
import { AiOutlineSafety } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { GrChat } from "react-icons/gr";
import { MdOutlineToys } from "react-icons/md";
import { PiSyringeBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import NewArrivals from "../components/NewArrivals";
import CartBtn from "../components/CartBtn";
import ProfileBtn from "../components/ProfileBtn";
import CategoryCard from "../components/CategoryCardList";
import CategoryCardList from "../components/CategoryCardList";

function Home() {
  const navigate = useNavigate()
  const [userRole, setUserRole] = useState(null)

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    setUserRole(role)
  }, [])
  return (
    <>
      {/* Navigation Bar */}
      <div className="bg-white shadow-lg flex justify-between items-center px-15 py-3  sticky top-0 z-10">
        <h1 className="text-amber-950 font-bold text-3xl">ToyCycle</h1>

        <ul className="flex gap-6 text-amber-950 font-semibold " >
          <li>
            <a href="#top" className="text-amber-950 hover:text-yellow-600">Home</a>
          </li>
          <li>
            <a href="#features" className="text-amber-950 hover:text-yellow-600">Features</a>
          </li>
          <li>
            <a href="#categories" className="text-amber-950 hover:text-yellow-600">Categories</a>
          </li>
          <li>
            <a href="#new" className="text-amber-950 hover:text-yellow-600">New Arrivals</a>
          </li>
        </ul>
        <div className="flex gap-3">
          {userRole === "user" && (
            <ProfileBtn />
          )}
          {!userRole && (
            <button className="bg-amber-950 hover:bg-amber-900 text-white px-4 py-2 rounded font-semibold "
              onClick={() => navigate("/SignUp")}>
              Log In
            </button>
          )}
          <CartBtn />
        </div>
      </div>


      <div id="top" className="w-full h-[580px] relative">

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
          <div className="flex  gap-5 mt-10">
            <button className=" w-24 border-2 border-yellow-600 px-2 py-2 text-yellow-600 hover:bg-amber-950 hover:text-yellow-600 hover:border-2 hover:border-amber-950 rounded-lg font-semibold"
              onClick={() => navigate("/shop")}
            >SHOP</button>
            <button className="bg-yellow-600 w-24 px-2 py-2 font-semibold text-amber-950 rounded-lg hover:bg-amber-950 hover:text-yellow-600"
              onClick={() => navigate("/sell")}
            >SELL</button>
          </div>
        </div>
      </div>
      {/* Features section */}
      <div id="features" className="text-3xl font-semibold text-amber-950 flex justify-center mt-15">
        <h1>Our Features</h1>
      </div>

      <div className="flex justify-between mt-15 divide-x-2 divide-dashed divide-gray-400">
        <div className="flex-1 px-4 text-center">
          <div className="flex justify-center text-4xl text-yellow-600 mb-2">
            <MdOutlineToys />
          </div>
          <h2 className="font-bold text-lg mt-3">Buy & Sell Toys</h2>
          <p className="text-sm text-gray-600 mt-2">Pre-loved toys, new happy <br /> homes</p>
        </div>

        <div className="flex-1 px-4 text-center">
          <div className="flex justify-center text-3xl text-yellow-600 mb-2">
            <GrChat />
          </div>
          <h2 className="font-bold text-lg mt-4">Chat Support</h2>
          <p className="text-sm text-gray-600 mt-2">Talk directly with buyers or <br /> sellers</p>
        </div>

        <div className="flex-1 px-4 text-center">
          <div className="flex justify-center text-3xl text-yellow-600 mb-2">
            <PiSyringeBold />
          </div>
          <h2 className="font-bold text-lg mt-4">Vaccination Tracker</h2>
          <p className="text-sm text-gray-600 mt-2">Never miss a shot- track your <br />child's vaccines</p>
        </div>

        <div className="flex-1 px-4 text-center">
          <div className="flex justify-center text-4xl text-yellow-600 mb-2">
            <AiOutlineSafety />
          </div>
          <h2 className="font-bold text-lg mt-4">Safe & Sustainable</h2>
          <p className="text-sm text-gray-600 mt-2">Reduc waste and promote <br />conscious parenting.</p>
        </div>
      </div>

      {/* categories */}
      <div id="categories" className="mt-15">
         <h2 className="text-3xl font-semibold text-center text-amber-950 mb-8">
        Categories
      </h2>
        <CategoryCardList showAll={false} />

      </div>

      <div id="new">
       
        <NewArrivals />
      </div>
      {/* Show More Button */}
      <div className="flex justify-end px-4 md:px-16 mt-6">
        <button className="bg-yellow-500 hover:bg-yellow-600 text-amber-950 font-semibold px-5 py-2 rounded-md flex items-center gap-2"
        onClick={()=>navigate("/shop")}
        >
          SHOW MORE →
        </button>
      </div>

<button className="bg-yellow-500 hover:bg-yellow-600 text-amber-950 font-semibold px-5 py-2 rounded-md flex items-center gap-2"
onClick={()=>navigate("/admin")}
>
          Admin →
        </button>
    </>
  );
}

export default Home;
