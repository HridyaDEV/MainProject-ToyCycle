import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaChild, FaEdit, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../Api/userApi";
import { getMyToys } from "../Api/toyApi";
import CartBtn from "../components/CartBtn";
import { MdOutlineLogout } from "react-icons/md";
import { GrChat } from "react-icons/gr";
import { HiOutlinePlusSm } from "react-icons/hi";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [myToys, setMyToys] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            if (!token) return navigate("/login");

            try {
                const userData = await getUserProfile(token);
                setUser(userData);
                const toysData = await getMyToys(token);
                setMyToys(toysData);
            } catch (error) {
                console.error("Error fetching user/toys:", error);
                localStorage.clear();
                navigate("/login");
            }
        };

        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    if (!user) {
        return (
            <div className="text-center mt-20 text-amber-800 font-semibold text-xl">
                Loading profile...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 text-gray-800 font-sans">
            {/* Header */}
            <header className="flex justify-between items-center bg-white shadow-lg px-6 py-3 sticky top-0 z-10">
                <h1 className="text-amber-950 font-bold text-3xl">ToyCycle</h1>
                <div className="flex items-center gap-3 text-xl">
                    <button
                        onClick={() => navigate("/chat")}
                        className="text-white bg-amber-950 hover:bg-amber-900 p-2 rounded-lg text-lg"
                    >
                        <GrChat />
                    </button>
                    <button
                        onClick={() => navigate("/favs")}
                        className="text-white bg-amber-950 hover:bg-amber-900 p-2 rounded-lg"
                    >
                        <FaHeart />
                    </button>
                    <CartBtn />
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 shadow-md text-amber-950 hover:bg-red-300 hover:text-red-600 px-4 py-1.5 rounded transition text-xl"
                    >
                        <MdOutlineLogout />
                    </button>
                </div>
            </header>

            {/* Back Button */}
            <div className="mt-6 px-6">
                <button
                    onClick={() => navigate(-1)}
                    className="text-amber-800 hover:text-amber-600 text-sm flex items-center"
                >
                    <FaArrowLeft className="mr-2" /> Go Back
                </button>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto mt-10 px-4">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left Side - Profile + Children */}
                    <div className="md:w-1/2 flex flex-col space-y-8">
                        {/* Profile Card */}
                        <section className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-6 flex flex-col items-center">
                            <img
                                src="https://www.w3schools.com/howto/img_avatar2.png"
                                alt="Profile"
                                className="w-28 h-28 rounded-full border-2 border-amber-400 shadow-md object-cover"
                            />
                            <div className="text-center mt-4">
                                <h2 className="text-xl font-bold text-amber-900">{user.userName}</h2>
                                <p className="text-gray-600">{user.email}</p>
                                <p className="text-sm text-gray-500 mt-1">
                                    Joined: {new Date(user.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="flex gap-3 mt-5">
                                <button
                                    onClick={() => alert("Edit profile clicked")}
                                    className="bg-amber-100 hover:bg-amber-200 text-grey px-3 py-1.5 rounded-lg text-sm flex items-center"
                                >
                                    <FaEdit className="mr-2" /> Edit
                                </button>

                            </div>
                        </section>

                        {/* Children Card */}
                        {user.children?.length > 0 && (
                            <section className="bg-white border border-amber-200 rounded-2xl shadow-md p-5">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-amber-800 "> Your Children</h3>
                                    <button
                                        onClick={() => navigate("/addchild")}
                                        className="bg-amber-100 hover:bg-amber-200 text-grey px-3 py-1.5 rounded-lg text-sm flex items-center"
                                    >
                                        <HiOutlinePlusSm className="mr-2" /> Add Child
                                    </button>
                                </div>

                                <div className="space-y-4 mt-4 ">
                                    {user.children.map((child, i) => (
                                        <div
                                            key={i}
                                            className="p-3 rounded-lg shadow-sm bg-gray-100 flex justify-baseline items-center gap-5"
                                        >
                                            <div className=" text-2xl text-pink-400">
                                                <FaChild />
                                            </div>
                                            <div>
                                                <p className="text-base font-semibold text-gray-800"> {child.name}</p>
                                                <p className="text-sm text-gray-600">Age: {child.age}</p>
                                                <p className="text-sm text-gray-600">Gender: {child.gender}</p>
                                                {child.dob && (
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        DOB: {new Date(child.dob).toLocaleDateString()}
                                                    </p>
                                                )}
                                            </div>



                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Side - Toy Listings */}
                    <div className="md:w-2/3">
                        <section className="bg-white border border-orange-200 rounded-2xl shadow-md p-6">
                            <div className="flex justify-between items-center">
                            <h3 className="text-xl font-semibold text-amber-800 mb-4">My Listed Items</h3>
                             <button
                                        onClick={() => navigate("/sell")}
                                        className="bg-amber-100 hover:bg-amber-200 text-grey px-3 py-1.5 rounded-lg text-sm flex items-center"
                                    >
                                        <HiOutlinePlusSm className="mr-2" /> Add New Item
                                    </button>

                            </div>
                            {myToys.length === 0 ? (
                                <p className="text-gray-500 italic">You haven't uploaded any toys yet.</p>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                                    {myToys.map((toy) => (
                                        <div
                                            key={toy._id}
                                            className="bg-white rounded-xl shadow hover:shadow-md border border-orange-200"
                                        >
                                            <img
                                                src={`http://localhost:5115${toy.imageUrl}`}
                                                alt={toy.title}
                                                className="w-full h-44 object-cover rounded-t-xl"
                                            />
                                            <div className="p-4">
                                                <h4 className="text-lg font-semibold text-amber-900">{toy.title}</h4>
                                                <p className="text-sm text-gray-600">{toy.toyCategory}</p>
                                                <p className="text-sm font-medium text-gray-800 mt-1">₹{toy.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profile;
