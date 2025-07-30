import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../Api/userAuthApi';
import { toast } from 'react-toastify';

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: ''
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const validate = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.userName.trim()) {
      errors.userName = "Full name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return; 
    }

    try {
      const res = await register(formData);
      toast.success("Registration successful");
      navigate('/');
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error("Registration Failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-[95%] max-w-[1400px] h-[80vh] border-2 border-gray-300 rounded-lg p-8 bg-white shadow-lg flex">

        {/* Left Content */}
        <div className="flex-1 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-amber-950">ToyCyle</h1>
        </div>

        {/* Vertical line */}
        <div className="w-[1px] h-full bg-gray-300 mx-6"></div>

        {/* Right Content */}
        <div className="flex-1 px-8 py-4">
          <div className='h-[65vh] rounded-lg'>
            <h1 className="text-3xl font-bold text-amber-950 text-center mt-5">Register Here</h1>

            <form className="mt-10 space-y-6 flex flex-col items-center" onSubmit={handleSubmit}>
              {/* Full Name Field */}
              <div className="flex flex-col justify-center">
                <label htmlFor="userName" className="text-left mb-1 font-semibold text-amber-950">Full Name</label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="border border-gray-400 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-[500px]"
                />
                {formErrors.userName && <p className="text-red-500 text-sm">{formErrors.userName}</p>}
              </div>

              {/* Email Field */}
              <div className="flex flex-col justify-center">
                <label htmlFor="email" className="text-left mb-1 font-semibold text-amber-950">Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="border border-gray-400 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-[500px]"
                />
                {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
              </div>

              {/* Password Field */}
              <div className="flex flex-col justify-center">
                <label htmlFor="password" className="text-left mb-1 font-semibold text-amber-950">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="border border-gray-400 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-[500px]"
                />
                {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}
              </div>

              <div className="flex justify-center w-full">
                <button
                  type="submit"
                  className="bg-yellow-400 text-amber-950 font-bold px-4 py-2 rounded-lg text-center"
                >
                  REGISTER
                </button>
              </div>

              <p className="text-center text-gray-700 mt-2">
                Already have an account?{" "}
                <a href="/login" className="text-amber-950 underline font-semibold">
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
