import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../Api/userAuthApi';
import { toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return; // Stop if validation fails
    }

    try {
      const res = await login(formData);
      toast.success("Login successful");

      localStorage.setItem("userId", res.data.user._id);
      localStorage.setItem("userRole", res.data.user.role);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate('/');
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      toast.error("Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-[95%] max-w-[1400px] h-[80vh] border-2 border-gray-300 rounded-lg p-8 bg-white shadow-lg flex">

        {/* Left Content */}
        <div className="flex-1 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-amber-950">ToyCycle</h1>
        </div>

        {/* Vertical line */}
        <div className="w-[1px] h-full bg-gray-300 mx-6"></div>

        {/* Right Content */}
        <div className="flex-1 px-8 py-4">
          <div className='h-[65vh] rounded-lg'>
            <h1 className="text-3xl font-bold text-amber-950 text-center mt-5">Login Here</h1>

            <form className="mt-10 space-y-6 px-25 flex flex-col items-center" onSubmit={handleSubmit}>
              {/* Email */}
              <div className="flex flex-col justify-center">
                <label htmlFor="email" className="text-left mb-1 text-amber-950 font-semibold">Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-[500px] rounded-xl px-4 py-2"
                />
                {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
              </div>

              {/* Password */}
              <div className="flex flex-col justify-center">
                <label htmlFor="password" className="text-left mb-1 text-amber-950 font-semibold">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="border border-gray-400 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-[500px]"
                />
                {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}
              </div>

              <div className="flex justify-center w-full">
                <button
                  type='submit'
                  className='bg-yellow-400 text-amber-950 font-bold px-4 py-2 rounded-lg w-40 text-center hover:bg-yellow-500'>
                  LOGIN
                </button>
              </div>

              <p className="text-center text-gray-700 mt-2">
                Don't have an account? <a href="/signup" className="text-amber-950 underline font-semibold">Register here</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
