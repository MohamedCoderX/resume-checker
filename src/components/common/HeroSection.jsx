import { BookOpenIcon, RocketLaunchIcon } from "@heroicons/react/24/solid";
import { BsGraphUpArrow } from "react-icons/bs";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router";

export default function HeroSection() {
  const controls = useAnimation();

  // Wait 5 seconds, then trigger all animations
  useEffect(() => {
    const timer = setTimeout(() => {
      controls.start("visible");
    }, 1000);
    return () => clearTimeout(timer);
  }, [controls]);

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Animated Background */}
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

      {/* Main Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-24 sm:py-28 md:py-32 lg:py-40 z-10">
        {/* Label Animation */}
        <motion.div
          className="mb-6 w-fit mx-auto"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { y: -30, opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="flex items-center gap-2 border border-indigo-800 rounded-full px-4 sm:px-5 py-2 sm:py-2 text-sm sm:text-lg font-medium bg-transparent shadow-sm relative overflow-hidden">
            <motion.span
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { scale: 0, rotate: 180 },
                visible: { scale: 1, rotate: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-[40px] rounded-full bg-indigo-600 absolute -left-0 top-1/2 -translate-y-1/2"
            >
              <BsGraphUpArrow className="text-pink-200 w-4 h-4 sm:w-4 sm:h-6" />
            </motion.span>
            <span className="pl-12 sm:pl-10 pr-2 sm:pr-4 font-light text-black text-sm">
              Learn. Grow. Evolve.
            </span>
          </span>
        </motion.div>

        {/* Heading with staggered word animation */}
        <motion.h1
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 leading-tight max-w-4xl"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <AnimatedWord text="Ace Your Tech Interviews" />
          <AnimatedWord text="With Real Skills – Not Just Theory" />
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-pink-500 mt-6 max-w-2xl font-light"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Practice real-world queries, optimize your resume for ATS, and test your
          communication & aptitude — all in one place. Free to start.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.9, delay: 1.3 }}
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 15px rgba(99,102,241,0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 text-gray-700 font-medium flex items-center justify-center gap-2"
          >
            <BookOpenIcon className="w-5 h-5 text-gray-600" />
            <Link to="/courses"><span>Explore Courses</span></Link>
          </motion.button>

          {/* <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 15px rgba(236,72,153,0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 font-medium flex items-center justify-center gap-2"
          >
            <RocketLaunchIcon className="w-5 h-5 text-white" />
            <span>Start Learning Now</span>
          </motion.button> */}
        </motion.div>
      </section>
    </div>
  );
}

/* Animate each phrase smoothly */
const AnimatedWord = ({ text }) => {
  const words = text.split(" ");
  return (
    <span className="block">
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-2 text-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};
