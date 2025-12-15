import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import resumeImg from "../../assets/resume.png";
import Loader from "./Loader";
import { useNavigate } from "react-router";


const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [token, setToken] = useState("");
  const [isLoading,setIsLoading]=useState(false);
 const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://jtl26xqlvg.execute-api.us-east-1.amazonaws.com/v1/login",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    
      const jwtToken = res.data.token;
      setToken(jwtToken);
      localStorage.setItem("token", jwtToken);
      setIsLoading(false);
     

      navigate("/");
window.location.reload();


    } catch (error) {
      toast.warning("Login failed. Please check your credentials.");
    }
  };

  if(isLoading){
    return(
      <Loader/>
    )
  }
  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="bg-white shadow-xl rounded-xl flex w-full max-w-4xl overflow-hidden">

        {/* LEFT SIDE - LOGIN FORM */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 w-full 
                         focus:ring-2 focus:ring-blue-400 outline-none"
            />

            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 w-full 
                         focus:ring-2 focus:ring-blue-400 outline-none"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white py-3 rounded-lg w-full font-semibold
                         hover:bg-blue-700 transition"
            >
              Login
            </button>

            <div className="text-center">
              <a href="/sign" className="text-blue-600 hover:underline">
                Don't have an account? Sign Up
              </a>
            </div>
          </form>
        </div>

        {/* RIGHT SIDE - IMAGE */}
        <div className="w-1/2 bg-gray-50 flex items-center justify-center p-6">
          <img
            src={resumeImg}
            alt="Resume Checker"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </div>
  );
};

export default Login;
