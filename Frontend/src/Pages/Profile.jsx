import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaChild, FaEdit, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../Api/userApi";
import { getMyToys } from "../Api/toyApi";
import { BsFillCartFill } from "react-icons/bs";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [myToys, setMyToys] = useState([]);
    const navigate = useNavigate();


    const fetchUserProfile = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const data = await getUserProfile(token);
            setUser(data);

            const toys = await getMyToys(token); //Fetch toys
            setMyToys(toys);

        } catch (error) {
            console.error("Error fetching profile or toys:", error);
            localStorage.clear();
            navigate("/login");
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const handleEdit = () => {
        alert("Edit profile clicked");
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    if (!user) {
        return (
            <div className="text-center mt-20 text-amber-900 font-semibold text-xl">
                Loading Profile...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 font-sans">
            {/* Header */}
            <header className="bg-white shadow-md px-10 py-4 flex justify-between items-center sticky top-0 z-10">
                <h1 className="text-3xl font-extrabold text-amber-900 tracking-wide">
                    ToyCycle
                </h1>
                <div className="flex justify-center items-center gap-10">
                {/* <h1 className=" text-amber-950 font-semibold">Your Favourites</h1> */}
                <h1
      onClick={() => navigate("/favs")}
  className="text-amber-950 font-semibold cursor-pointer hover:underline"
>
  Your Favourites
</h1>

                  <button className="bg-amber-950 hover:bg-amber-900 text-white px-4 py-2 rounded text-2xl ">
                
               {/* <BsCart /> */}
                 <BsFillCartFill />
                </button>
                <button
                    onClick={handleLogout}
                    className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                </button>
                </div>
            </header>

            {/* Back Button */}
            <div className="px-10 py-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-amber-950 hover:text-amber-700 transition duration-200 text-lg"
                >
                    <FaArrowLeft className="mr-2" /> Go Back
                </button>
            </div>

            {/* Profile Card */}
            <main className="flex justify-center items-center p-5">
                <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-3xl border border-amber-200">
                    <div className="flex flex-col items-center gap-4">
                        <img
                         src="https://www.w3schools.com/howto/img_avatar2.png"
                         alt="Profile"
                         className="w-32 h-32 rounded-full border-4 border-amber-500 shadow-md object-cover"
                        />
                        <h2 className="text-2xl font-bold text-amber-900">{user.userName}</h2>
                        <p className="text-gray-600">{user.email}</p>
                        <p className="text-sm text-gray-500">
                            Joined on {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                        <div className="flex justify-center items-center gap-5">

                      
                        <button
                            onClick={handleEdit}
                            className="mt-4 bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg transition duration-300 flex items-center"
                        >
                            <FaEdit className="mr-2" />
                            Edit Profile
                        </button>
                        <button className="mt-4 bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg transition duration-300 flex items-center"
                        >
                            <FaChild className="mr-2" />
                            Add Child</button>
                          </div>

                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-300 my-8"></div>

                    {/* Placeholder for uploaded toys */}
                    <div>
                        <h3 className="text-xl font-semibold text-amber-900 mb-4">Your Listings</h3>
                        {myToys.length === 0 ? (
                            <p className="text-gray-500 italic">No toys listed yet.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {myToys.map((toy) => (
                                    <div key={toy._id} className="border rounded-lg p-4 shadow-sm bg-orange-50">
                                        <img 
                                        // src={toy.imageUrl}
                                            src={`http://localhost:5115${toy.imageUrl}`}
                                         alt={toy.title} className="w-full h-48 object-cover rounded-md mb-2" />
                                        <h4 className="text-lg font-bold text-amber-900">{toy.title}</h4>
                                        <p className="text-sm text-gray-600">{toy.toyCategory}</p>
                                        <p className="text-sm text-gray-500">₹{toy.price}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profile;
