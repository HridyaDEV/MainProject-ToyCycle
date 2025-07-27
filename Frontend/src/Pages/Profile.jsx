import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaEdit, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getUserProfile, updateUserProfile } from "../Api/userApi";
import { getMyToys } from "../Api/toyApi";
import CartBtn from "../components/CartBtn";
import { MdOutlineLogout } from "react-icons/md";
import { GrChat } from "react-icons/gr";
import { HiOutlinePlusSm } from "react-icons/hi";
import { toast } from "react-toastify";
import { updateChildById } from "../Api/childApi";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [editedUser, setEditedUser] = useState(null);
    const [editUserMode, setEditUserMode] = useState(false);
    const [editChildIndex, setEditChildIndex] = useState(null);
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

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    const handleSaveChanges = async () => {
        try {
            const token = localStorage.getItem("token");

            if (editUserMode) {
                await updateUserProfile(token, {
                    userName: editedUser.userName,
                    email: editedUser.email,
                });
            }

            if (editChildIndex !== null) {
                const child = editedUser.children[editChildIndex];
                await updateChildById(token, child._id, {
                    name: child.name,
                    dateOfBirth: child.dateOfBirth,
                    gender: child.gender,
                });
            }

            setUser(editedUser);
            setEditUserMode(false);
            setEditChildIndex(null);
            toast.success("Profile updated successfully.");
        } catch (error) {
            console.error("Failed to update:", error.message);
            toast.error(error.message || "Update failed.");
        }
    };

    if (!user) {
        return <div className="text-center mt-20 text-amber-800 font-semibold text-xl">Loading profile...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 text-gray-800 font-sans">
            <header className="flex justify-between items-center bg-white shadow-lg px-6 py-3 sticky top-0 z-10">
                <h1 className="text-amber-950 font-bold text-3xl">ToyCycle</h1>
                <div className="flex items-center gap-3 text-xl">
                    <button onClick={() => navigate("/messages")} className="text-white bg-amber-950 hover:bg-amber-900 p-2 rounded-lg text-lg">
                        <GrChat />
                    </button>
                    <button onClick={() => navigate("/favs")} className="text-white bg-amber-950 hover:bg-amber-900 p-2 rounded-lg">
                        <FaHeart />
                    </button>
                    <CartBtn />
                    <button onClick={handleLogout} className="flex items-center gap-2 shadow-md text-amber-950 hover:bg-red-300 hover:text-red-600 px-4 py-1.5 rounded transition text-xl">
                        <MdOutlineLogout />
                    </button>
                </div>
            </header>

            <div className="mt-6 px-6">
                <button onClick={() => navigate(-1)} className="text-amber-800 hover:text-amber-600 text-sm flex items-center">
                    <FaArrowLeft className="mr-2" /> Go Back
                </button>
            </div>

            <main className="max-w-7xl mx-auto mt-10 px-4">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2 flex flex-col space-y-8">
                        <section className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-6 flex flex-col items-center">
                            <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="Profile" className="w-28 h-28 rounded-full border-2 border-amber-400 shadow-md object-cover" />
                            <div className="text-center mt-4 w-full">
                                {editUserMode ? (
                                    <>
                                        <input type="text" value={editedUser.userName} onChange={(e) => setEditedUser({ ...editedUser, userName: e.target.value })} className="w-full border px-3 py-2 rounded mb-2" />
                                        <input type="email" value={editedUser.email} onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })} className="w-full border px-3 py-2 rounded" />
                                    </>
                                ) : (
                                    <>
                                        <h2 className="text-xl font-bold text-amber-900">{user.userName}</h2>
                                        <p className="text-gray-600">{user.email}</p>
                                        <p className="text-sm text-gray-500 mt-1">Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
                                    </>
                                )}
                            </div>
                            <div className="flex gap-3 mt-5">
                                {editUserMode ? (
                                    <>
                                        <button onClick={handleSaveChanges} className="bg-green-600 text-white px-4 py-1.5 rounded">Save</button>
                                        <button onClick={() => setEditUserMode(false)} className="bg-gray-300 px-4 py-1.5 rounded">Cancel</button>
                                    </>
                                ) : (
                                    <button onClick={() => { setEditUserMode(true); setEditedUser({ ...user }); }} className="bg-amber-100 hover:bg-amber-200 text-grey px-3 py-1.5 rounded-lg text-sm flex items-center">
                                        <FaEdit className="mr-2" /> Edit Profile
                                    </button>
                                )}
                            </div>
                        </section>

                        <section className="bg-white border border-amber-200 rounded-2xl shadow-md p-5">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-amber-800">Your Children</h3>
                                <button onClick={() => navigate("/addchild")} className="bg-amber-100 hover:bg-amber-200 text-grey px-3 py-1.5 rounded-lg text-sm flex items-center">
                                    <HiOutlinePlusSm className="mr-2" /> Add Child
                                </button>
                            </div>

                            {user.children?.length > 0 ? (
                                <div className="space-y-4 mt-4">
                                    {user.children.map((child, i) => (
                                        <div key={i} className="p-3 rounded-lg shadow-sm bg-gray-100">
                                            {editChildIndex === i ? (
                                                <>
                                                    <input type="text" value={editedUser.children[i].name} onChange={(e) => {
                                                        const updated = [...editedUser.children];
                                                        updated[i].name = e.target.value;
                                                        setEditedUser({ ...editedUser, children: updated });
                                                    }} className="w-full mb-2 px-2 py-1 border rounded" />
                                                    <input type="date" value={editedUser.children[i].dateOfBirth?.slice(0, 10)} onChange={(e) => {
                                                        const updated = [...editedUser.children];
                                                        updated[i].dateOfBirth = e.target.value;
                                                        setEditedUser({ ...editedUser, children: updated });
                                                    }} className="w-full mb-2 px-2 py-1 border rounded" />
                                                    <select value={editedUser.children[i].gender} onChange={(e) => {
                                                        const updated = [...editedUser.children];
                                                        updated[i].gender = e.target.value;
                                                        setEditedUser({ ...editedUser, children: updated });
                                                    }} className="w-full px-2 py-1 border rounded mb-2">
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                    </select>
                                                    <div className="flex gap-2">
                                                        <button onClick={handleSaveChanges} className="bg-green-600 text-white px-3 py-1 rounded">Save</button>
                                                        <button onClick={() => setEditChildIndex(null)} className="bg-gray-300 px-3 py-1 rounded">Cancel</button>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="flex justify-between">
                                                    <div>
                                                        <p className="text-base font-semibold text-gray-800">{child.name}</p>
                                                        <p className="text-sm text-gray-600">Age: {calculateAge(child.dateOfBirth)} years</p>
                                                        <p className="text-sm text-gray-600">Gender: {child.gender}</p>
                                                    </div>
                                                    <button onClick={() => { setEditChildIndex(i); setEditedUser({ ...user }); }} className="mt-2 text-sm bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-lg flex items-center">
                                                        <FaEdit className="mr-1" /> Edit Child
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500 italic mt-4">You haven't added any children yet.</p>
                            )}
                        </section>
                    </div>

                    <div className="md:w-2/3">
                        <section className="bg-white border border-orange-200 rounded-2xl shadow-md p-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-semibold text-amber-800 mb-4">My Listed Items</h3>
                                <button onClick={() => navigate("/sell")} className="bg-amber-100 hover:bg-amber-200 text-grey px-3 py-1.5 rounded-lg text-sm flex items-center">
                                    <HiOutlinePlusSm className="mr-2" /> Add New Item
                                </button>
                            </div>
                            {myToys.length === 0 ? (
                                <p className="text-gray-500 italic">You haven't uploaded any toys yet.</p>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                                    {myToys.map((toy) => (
                                        <div key={toy._id} className="bg-white rounded-xl shadow hover:shadow-md border border-orange-200">
                                            <img src={`http://localhost:5115${toy.imageUrl}`} alt={toy.title} className="w-full h-44 object-cover rounded-t-xl" />
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
