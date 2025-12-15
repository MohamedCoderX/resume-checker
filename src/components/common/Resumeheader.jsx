import { ChartLine, Sparkles, Upload } from "lucide-react";
import { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import bgImage from "../../assets/home-bg.jpg";

export default function ResumeHeader() {
  
  const controls = useAnimation();

  useEffect(() => {

      controls.start("visible");
   
    
  }, [controls]);


  return (
    <div className="w-full relative overflow-hidden">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={controls}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        transition={{ duration: 1.5 }}
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #6366f1 100%)",
        }}
      />

   
      {/* Main Content */}
      <section className="relative py-40 w-full flex flex-col justify-center items-center text-center  z-10">
        {/* Top Button */}
        <motion.button
          className="relative flex items-center gap-3 px-8 py-3 rounded-full border border-[#4344c9] text-black font-semibold bg-white"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { y: -40, opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="absolute left-0 flex items-center justify-center bg-[#4344c9] h-12 w-18 rounded-full">
            <ChartLine className="text-pink-200 h-6 w-6" />
          </span>
          <span className="ml-15">Upload. Improve. Place</span>
        </motion.button>

        {/* Heading */}
        <motion.h1
          className="text-4xl md:text-7xl font-semibold  mt-6 text-black z-10"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Improve Your <br /> Resume in Seconds
        </motion.h1>

        {/* Paragraph */}
        <motion.p
          className="mt-4 max-w-2xl text-[17px] text-[#e3126b]"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Designed by hiring managers, our AI instantly scores your resume and gives you
          actionable feedback — so you can fix it before the recruiter sees it.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex gap-5 mt-8"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          {/* <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 15px rgba(236,72,153,0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-pink-200 text-[#5a2f83] rounded-full font-medium shadow-md z-10"
          >
            <Sparkles className="h-5 w-5" />
            Get Pro Plan
          </motion.button> */}

        

          {/* <motion.button
            
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 15px rgba(99,102,241,0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-[#4646c7] text-pink-200 rounded-full font-medium shadow-xl z-10"
          >
            <Upload className="h-5 w-5 text-pink-200" />
            Upload Resume
          </motion.button> */}
        </motion.div>
      </section>
    </div>
  );
}
