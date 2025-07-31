import React, { useEffect, useState } from "react";
import { AiOutlineSafety } from "react-icons/ai";
import { GrChat } from "react-icons/gr";
import { MdOutlineToys } from "react-icons/md";
import { PiSyringeBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import NewArrivals from "../components/NewArrivals";
import CartBtn from "../components/CartBtn";
import ProfileBtn from "../components/ProfileBtn";
import CategoryCardList from "../components/CategoryCardList";
import Testimonials from "../components/Testimonials";
import { TiSocialFacebook } from "react-icons/ti";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { LuFacebook } from "react-icons/lu";


function Home() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);

    if (role === "admin") {
      navigate("/admin");
    }
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <div className="bg-white shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
          <h1 className="text-amber-950 font-bold text-3xl">ToyCycle</h1>
          <ul className="flex gap-6 text-amber-950  text-base font-semibold">
            <li><a href="#top" className="hover:text-yellow-600">Home</a></li>
            <li><a href="#features" className="hover:text-yellow-600">Features</a></li>
            <li><a href="#categories" className="hover:text-yellow-600">Categories</a></li>
            <li><a href="#new" className="hover:text-yellow-600">New Arrivals</a></li>
             <li><a href="#about" className="hover:text-amber-950">About</a></li>
              <li><a href="#test" className="hover:text-amber-950">Testimonials</a></li>
               <li><a href="#contact" className="hover:text-amber-950">Contact </a></li>
          </ul>
          <div className="flex gap-3">
            {userRole === "user" && <ProfileBtn />}
            {!userRole && (
              <button
                className="bg-amber-950 hover:bg-amber-900 text-white px-4 py-2 rounded font-semibold"
                onClick={() => navigate("/SignUp")}
              >
                Log In
              </button>
            )}
            <CartBtn />
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <div id="top" className="w-full h-[580px] relative">
        <img src="/background.jpg" alt="background" className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-black/40">
          <div className="max-w-7xl mx-auto h-full flex flex-col justify-center px-6">
            <h1 className="text-yellow-500 text-6xl md:text-7xl font-bold mb-4">
              FIND JOY IN <br />EVERY TOY
            </h1>
            <h2 className="text-white text-xl">
              High-quality, pre-owned toys made for <br />
              new memories and endless smiles.
            </h2>
            <div className="flex gap-5 mt-10">
              <button
                className="w-24 border-2 border-yellow-600 px-2 py-2 text-yellow-600 hover:bg-amber-950 hover:text-yellow-600 rounded-lg font-semibold"
                onClick={() => navigate("/shop")}
              >
                SHOP
              </button>
              <button
                className="bg-yellow-600 w-24 px-2 py-2 font-semibold text-amber-950 rounded-lg hover:bg-amber-950 hover:text-yellow-600"
                onClick={() => navigate("/sell")}
              >
                SELL
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div id="features" className="mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-semibold text-amber-950 text-center mb-10">Our Features</h1>
          <div className="flex flex-col md:flex-row justify-between divide-y md:divide-y-0 md:divide-x-2 divide-dashed divide-gray-400">
            {[
              {
                icon: <MdOutlineToys className="text-4xl text-yellow-600" />,
                title: "Buy & Sell Toys",
                text: "Pre-loved toys, new happy homes",
              },
              {
                icon: <GrChat className="text-3xl text-yellow-600" />,
                title: "Chat Support",
                text: "Talk directly with buyers or sellers",
              },
              {
                icon: <PiSyringeBold className="text-3xl text-yellow-600" />,
                title: "Vaccination Tracker",
                text: "Never miss a shot - track your child's vaccines",
              },
              {
                icon: <AiOutlineSafety className="text-4xl text-yellow-600" />,
                title: "Safe & Sustainable",
                text: "Reduce waste and promote conscious parenting",
              },
            ].map((feature, index) => (
              <div key={index} className="flex-1 px-4 py-6 text-center">
                <div className="flex justify-center mb-2">{feature.icon}</div>
                <h2 className="font-bold text-lg mt-3">{feature.title}</h2>
                <p className="text-sm text-gray-600 mt-2">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CATEGORIES */}
      <div id="categories" className="mt-16">
        <div className="max-w-7xl mx-auto ">
          <h2 className="text-3xl font-semibold text-center text-amber-950 mb-8">
            Categories
          </h2>
          <CategoryCardList showAll={false} />
        </div>
      </div>

      {/* NEW ARRIVALS */}
      <div id="new" className="mt-16">
        <div className="max-w-7xl mx-auto ">
          <NewArrivals />
        </div>
      </div>

      {/* ABOUT US */}
      <div id="about" className="mt-16 w-full">
        <h2 className="text-center text-3xl font-semibold text-amber-950 mb-8">About Us</h2>
        <div className="w-full bg-yellow-500 py-5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-24 px-6 py-5">
            <div className="w-full md:w-1/4 h-[260px]">
              <img
                src="/Aboutus.jpg"
                alt="background"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="w-full md:w-3/4 ">
              <p className="text-base text-gray-800 text-center md:text-left leading-relaxed">
                ToyCycle isn't just a resale marketplace — it's your trusted parenting companion.
                We provide carefully curated, high-quality second-hand toys that spark joy, support child development,
                and come at a fraction of the cost of new. By choosing pre-loved toys,
                you're not only saving money but also making an eco-conscious choice that contributes to a more sustainable future.

                But we go beyond play. Our platform features a built-in vaccination tracker that helps you stay on top of your child's essential health milestones, ensuring timely reminders and peace of mind.

                At ToyCycle, we believe that raising happy, healthy children should be simpler, smarter, and more affordable — and we're here to help make that journey a little easier, every step of the way.
              </p>

            </div>
          </div>
        </div>
      </div>
      {/* Testimonials */}
      <div id="test" className="max-w-7xl mx-auto" >
        <Testimonials />
      </div>
      {/* Contact US */}

      <div id="contact" className="  bg-yellow-500 w-full ">
        <div className="flex justify-around py-8  ">
          <div>
            <h2 className="text-2xl text-amber-950 font-semibold py-3">Office</h2>
            <p className="text-gray-800">ABC Street, New Town <br />
              Calicut , Kerala <br />
              678900
            </p>
          </div>
          <div className="">
            <h2 className="text-2xl text-amber-950  font-semibold py-3">Links</h2>
            <ul className="  text-gray-800 gap-1 ">
              <li><a href="#top" className="hover:text-amber-950">Home</a></li>
              <li><a href="#features" className="hover:text-amber-950">Features</a></li>
              <li><a href="#categories" className="hover:text-amber-950">Categories</a></li>
              <li><a href="#new" className="hover:text-amber-950">New Arrivals</a></li>
              <li><a href="#about" className="hover:text-amber-950">About Us</a></li>
              <li><a href="#test" className="hover:text-amber-950">Testimonials</a></li>
               <li><a href="#contact" className="hover:text-amber-950">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl text-amber-950  font-semibold py-3">Get In Touch</h2>
            <div className="flex justify-center text-xl text-gray-800 gap-2">
              <FaInstagram />
              <LuFacebook />
              <FaXTwitter />
              <FaWhatsapp />
            </div>
          </div>
        </div>
      </div>

{/* footer */}
      <div className="bg-gray-300 flex justify-between px-30 py-3 ">
        <h1>@ Copyrights @ToyCycle</h1>
        <h1>Terms & Conditions</h1>
      </div>
    </>
  );
}

export default Home;
