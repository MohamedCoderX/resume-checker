import { MdOutlineFileUpload } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScoreDashboard from "./ScoreDashboard";
import axios from "axios";
import { toast } from "react-toastify";
import ResumeSkeletonLoader from "../common/ResumeSkeletonLoader";


const UploadForm = () => {
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
const [Analysis, setAnalysis] = useState(null);
const[userName,setUserName]=useState("");
  const [fileName, setFileName] = useState("");
  const token = sessionStorage.getItem("token") || localStorage.getItem("token");
  const handleUpload = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const userName = form.get("name");
    const userEmail = form.get("email");
    const phoneNumber = form.get("phone");
    const jobDescription = form.get("jobDescription");
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
    if(!token){
      toast.warning("Please Login To Check ATS Score");
      return;
    }
  
    if (!file) {
      alert("Please upload a resume file before proceeding.");
      return;
    }
  
    setLoading(true);
    
  
    try {
      // Convert file to Base64
      const base64Data = await toBase64(file);
  
      // Build JSON payload
      const payload = {
        userName,
        userEmail,
        phoneNumber,
        jobDescription,
        fileName: file.name,
        fileData: base64Data.split(",")[1],
      };
  
      // 🟩 Upload resume
      const res = await axios.post(
        "https://u5zb74wmma.execute-api.us-east-1.amazonaws.com/v1/upload",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const resumeId = res.data.resumeId;
      console.log("✅ Upload successful. Resume ID:", resumeId);
  
      // 🔁 Polling logic: keep checking result until "COMPLETED"
      let resultData = null;
      for (let i = 0; i < 8; i++) { // tries up to 8 times (every 3 sec = 24s max)
        console.log(`⏳ Checking status (attempt ${i + 1})...`);
        const result = await axios.get(
          `https://u5zb74wmma.execute-api.us-east-1.amazonaws.com/v1/result/${resumeId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (result.data.status === "COMPLETED") {
          console.log("🎉 Analysis complete:", result.data);
          resultData = result.data;
          break;
        }
  
        // Wait 3 seconds before checking again
        await new Promise((r) => setTimeout(r, 3000));
      }
  
      if (!resultData) {
        alert("Analysis still in progress. Please try again later.");
        return;
      }
  
      // ✅ Now you can set this data to state and show ScoreDashboard
      setUploaded(true);
      setAnalysis(resultData.analysis); 
    
    } catch (error) {
      console.error("❌ Upload failed:", error.response?.data || error.message);
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  
  
  // helper: file → base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!uploaded ? (
          <motion.div
            key="upload-form"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6 }}
            className="mt-2 mx-auto max-w-6xl px-2 md:px-4 lg:px-8"
          >
            {/* ===== Heading ===== */}
            <div className="py-1.5 sm:py-2.5 lg:py-3 flex flex-col justify-center items-center">
              <h1 className="font-[Outfit] font-medium lg:text-[40px] sm:text-2xl text-center text-xl">
                Upload Your Resume
              </h1>
              <p className="pt-3 text-[#777777] font-normal font-[Outfit] text-center
                lg:text-[20px] text-[14px] sm:text-lg
                lg:w-[600px] sm:w-[450px] w-60 h-auto
                lg:leading-8 sm:leading-7">
                Upload your resume to get an instant ATS compatibility score and
                detailed feedback
              </p>
            </div>

            {/* ===== Form ===== */}
            <div className="lg:px-12 md:px-9 xl:px-3 max-w-[1200px] mx-auto w-full">
              <form
                onSubmit={handleUpload}
                className="flex flex-col rounded-lg border border-gray-200 justify-start items-start px-2.5 pt-3 sm:px-5 lg:px-5 lg:py-6 sm:py-5 py-3 font-[Outfit] space-y-3 sm:space-y-4 lg:space-y-5"
              >
                {/* Name */}
                <div className="w-full flex flex-col space-y-2.5">
                  <label htmlFor="name" className="font-normal text-sm sm:text-base lg:text-lg">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="bg-[#f3f3f5] border border-gray-300 text-sm sm:text-base lg:text-lg rounded-lg block w-full p-2.5"
                    placeholder="Enter Your Full Name"
                    required
                    onChange={(e)=>setUserName(e.target.value)}
                  />
                </div>

                {/* Email */}
                <div className="w-full flex flex-col space-y-2.5">
                  <label htmlFor="email" className="font-normal text-sm sm:text-base lg:text-lg">
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="bg-[#f3f3f5] border border-gray-300 text-sm sm:text-base lg:text-lg rounded-lg block w-full p-2.5"
                    placeholder="Enter Your Email"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="w-full flex flex-col space-y-2.5">
                  <label htmlFor="phone" className="font-normal text-sm sm:text-base lg:text-lg">
                    Phone Number*
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="bg-[#f3f3f5] border border-gray-300 text-sm sm:text-base lg:text-lg rounded-lg block w-full p-2.5"
                    placeholder="Enter Your Phone Number"
                    required
                  />
                </div>

                {/* Job Description */}
                <div className="w-full flex flex-col space-y-2.5">
                  <label htmlFor="jobDescription" className="font-normal text-sm sm:text-base lg:text-lg">
                    Job Description
                  </label>
                  <textarea
                    id="jobDescription"
                    name="jobDescription"
                    placeholder="Add your job description"
                    className="bg-[#f3f3f5] border border-gray-300 text-sm sm:text-base lg:text-lg rounded-lg block w-full h-[120px] p-2.5 resize-none"
                  ></textarea>
                </div>

                {/* File Upload */}
                <div className="w-full flex flex-col justify-center items-center space-y-2.5">
                  <div className="bg-[#f3f3f5] flex justify-center items-center rounded-lg border border-dashed border-blue-400 px-4 py-4 sm:px-6 sm:py-5 lg:py-8 w-full">
                    <div className="flex flex-col justify-center items-center text-center">
                      <div className="flex justify-center items-center border border-blue-300 text-blue-400 w-[45px] h-[45px] lg:w-[50px] lg:h-[50px] rounded-lg bg-[#FDCFFA]">
                        <MdOutlineFileUpload className="text-2xl lg:text-3xl" />
                      </div>
                      <div className="flex flex-col space-y-1 pt-2">
                        <p className="text-sm sm:text-base lg:text-lg ">
                          Drag & drop your resume here
                        </p>
                        <p className="text-gray-400 text-[12px] sm:text-sm lg:text-sm ">
                          or
                        </p>
                      </div>

                      <div className="mt-4 flex flex-col justify-center items-center text-sm text-gray-400">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-[#4E56C0] font-semibold text-white p-3 font-[Outfit]"
                        >
                          <p className="flex gap-1.5 lg:text-base items-center">
                            <IoDocumentTextOutline />
                            Browse Files
                          </p>
                          <input
                            id="file-upload"
                            type="file"
                            name="resume"
                            accept=".pdf,.doc,.docx"
                            className="sr-only"
                            onChange={(e) => {
                              setFile(e.target.files[0]);
                              setFileName(e.target.files[0]?.name || "");
                            }}
                            required
                          />
                        </label>
                        {fileName && (
                          <p className="pt-2 text-gray-700 text-sm font-medium">
                            Uploaded: <span className="text-[#4E56C0]">{fileName}</span>
                          </p>
                        )}
                        <p className="pt-2 text-[13px] sm:text-sm text-gray-500">
                          Supported: PDF, DOC, DOCX (Max 10MB)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-[#4E56C0] p-2 rounded-lg text-white text-sm sm:text-base transition ${
                    loading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#3f47a5]"
                  }`}
                >
                  {loading ? "Analyzing Resume..." : "Check ATS Score"}
                </button>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="score-dashboard"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <ScoreDashboard analysis={Analysis} name={userName}/>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loader Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute top-0 left-0 w-full h-full bg-white/90 flex flex-col justify-center items-center z-50 backdrop-blur-sm"
        >
          <ResumeSkeletonLoader />
        </motion.div>
        
        )}
      </AnimatePresence>
    </div>
  );
};

export default UploadForm;
