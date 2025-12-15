import React, { useState } from "react";
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader"
import signupImg from "../../assets/signup1.png";
import { toast } from "react-toastify";

const Signup = () => {
  const[isLoading,setIsLoading]=useState(false);

  const [detail, setDetail] = useState({
    email: "",
    password: "",
  });
const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetail((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 

    try {
      const res = await axios.post(
        "https://jtl26xqlvg.execute-api.us-east-1.amazonaws.com/v1/register",
        JSON.stringify(detail),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      
    } catch (error) {
      if (error.response) {
        console.error("API Error:", error.response.data);
        alert("Signup failed: " + JSON.stringify(error.response.data));
      } else if (error.request) {
        console.error("Network Error:", error.request);
        alert("Network error. Check your connection or API URL.");
      } else {
        console.error("Error:", error.message);
        alert("Error: " + error.message);
      }
      
    }
    finally {
    toast.success("signup completed login ",{position:"top-right",autoClose:3000});
    setIsLoading(false); 
    navigate("/login");
  }
  };

  if(isLoading){
    return(
      <Loader/>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl flex w-full max-w-4xl overflow-hidden">

        {/* LEFT SIDE */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* EMAIL */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Email
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3">
                <FaEnvelope className="text-gray-400 mr-2" />
                <input
                  type="email"
                  name="email"
                  value={detail.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full p-2 outline-none"
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Password
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3">
                <FaLock className="text-gray-400 mr-2" />
                <input
                  type="password"
                  name="password"
                  value={detail.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full p-2 outline-none"
                  required
                />
              </div>
            </div>

            {/* SIGNUP BUTTON */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all"
            >
              Sign Up
            </button>

            {/* LOGIN LINK */}
            <Link
              to="/login"
              className="w-full block mt-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 rounded-lg text-center transition-all"
            >
              Already have an account?
            </Link>

            {/* DIVIDER */}
            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="px-3 text-gray-500">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* GOOGLE BUTTON */}
            {/* <button
              type="button"
              className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition-all"
            >
              <FaGoogle className="text-red-500 mr-3" />
              Sign up with Google
            </button> */}
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2 bg-gray-50 flex items-center justify-center p-6">
          <img
            src={signupImg}
            alt="Signup Illustration"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </div>
  );
};

export default Signup;
