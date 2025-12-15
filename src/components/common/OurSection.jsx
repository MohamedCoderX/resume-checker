import React, { useEffect, useRef, useState } from "react";
import { Send, Mic, User, Wand2, ArrowRight } from "lucide-react";
import { RiSpeakFill } from "react-icons/ri";
import { IoPersonSharp } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import SQL from "../../assets/SQL.png";
import Resume from "../../assets/resume.png";
import Overlay from "../../assets/Overlay.png";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

/* 1️⃣ ATS Resume Preview */
const ResumePreview = () => {
    const resumeRef = useRef(null);
    const overlayRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 }); // loop forever

        // Step 1: Start with overlay visible
        tl.set(overlayRef.current, { opacity: 1 });
        tl.set(resumeRef.current, { opacity: 0, y: 60 });

        // Step 2: Fade overlay out (reveals resume area)
        tl.to(overlayRef.current, {
            opacity: 0,
            duration: 1.2,
            ease: "power2.out",
            delay: 1,
        });

        // Step 3: Bring resume in from below
        tl.to(
            resumeRef.current,
            {
                y: 0,
                opacity: 1,
                duration: 1.4,
                ease: "power3.out",
            },
            "-=0.5" // start a bit before overlay finishes fading out
        );

        // Step 4: Fade resume out WHILE overlay fades back in — synced
        tl.to(resumeRef.current, {
            opacity: 0,
            duration: 1.2,
            ease: "power2.inOut",
            delay: 2,
        });

        tl.to(
            overlayRef.current,
            {
                opacity: 1,
                duration: 1.2,
                ease: "power2.inOut",
            },
            "-=1.0" // starts exactly when resume begins fading out
        );
    }, []);

    return (
        <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
            {/* Overlay image */}
            <img
                ref={overlayRef}
                src={Overlay}
                alt="Overlay"
                className="absolute top-0 left-0 w-full h-full object-cover z-10 rounded-md"
            />

            {/* Resume image */}
            <img
                ref={resumeRef}
                src={Resume}
                alt="Resume Preview"
                className="h-full w-full object-contain rounded-md pt-2"
            />
        </div>
    );
};


/* 2️⃣ Communication Visual — synchronized GSAP animation */

const CommunicationVisual = () => {
    const micRef = useRef(null);
    const waveRef = useRef(null);
    const userRefs = useRef([]);

    useEffect(() => {
        // Ensure the array is only ever 4 elements long
        userRefs.current = userRefs.current.slice(0, 4);

        const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

        // 🎙️ Mic pulse animation (starts at 0s)
        tl.to(
            micRef.current,
            {
                scale: 1.08,
                duration: 1,
                ease: 'power2.inOut',
                yoyo: true,
                repeat: 1,
            },
            0
        );

        // 🌊 Wave expansion animation (starts at 0s)
        tl.fromTo(
            waveRef.current,
            { scale: 0.8, opacity: 0 },
            {
                scale: 7,
                opacity: 0.4,
                duration: 3,
                ease: 'power2.out', // Corrected 'inout' to 'out' for a smoother expansion
            },
            0
        );

        // 👤 Users fade in *after* the wave has started expanding (starts at 0.8s)
        tl.to(
            userRefs.current,
            {
                opacity: 1,
                scale: 1,
                duration: 1.8,
                ease: 'power2.out',
                stagger: 0,
            },
            0.8 // Position parameter: Start this animation 0.8s into the timeline
        );

        // 💨 Fade out wave AND users together
        tl.to(
            [...userRefs.current,], // <--- KEY CHANGE HERE
            {
                opacity: 0,
                scale: 0.9,
                duration: 1.5,
                ease: 'power1.in',
            },
            3 // Position parameter: Start this animation 3s into the timeline
        );

        // Cleanup function to kill the timeline on component unmount
        return () => tl.kill();
    }, []);

    return (
        <div className="relative flex h-full w-full items-center justify-center scale-90 overflow-hidden">
            <style>
                {`
          .chat-shadow {
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
          }
          .icon-shadow {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.20);
          }
        `}
            </style>

            {/* 🌊 Wave */}
            <div
                ref={waveRef}
                className="absolute z-0 h-16 w-16 rounded-full border border-gray-200"
                style={{ opacity: 0 }}
            />

            {/* 🎙 Mic */}
            <div
                ref={micRef}
                className="z-10 flex h-14 w-14 items-center justify-center rounded-full bg-gray-200 icon-shadow"
            >
                <Mic size={25} className="text-black" />
            </div>

            {/* 👤 Users with mixed icons & varied sizes */}
            {[

                { top: "bottom-12", left: "left-[9%]", icon: RiSpeakFill, size: 27 },
                { top: "top-6", left: "right-[12%]", icon: IoPersonSharp, size: 25 },
                { top: "bottom-4", left: "right-[2%]", icon: IoPersonSharp, size: 20 },
            ].map((pos, index) => {
                const Icon = pos.icon;
                return (
                    <div
                        key={index}
                        ref={(el) => (userRefs.current[index] = el)}
                        className={`absolute flex h-14 w-14 items-center justify-center rounded-full bg-gray-200 icon-shadow ${pos.top} ${pos.left}`}
                        style={{ opacity: 0, scale: 0.9 }}
                    >
                        <Icon size={pos.size} className="text-black" />
                    </div>
                );
            })}
        </div>
    );
};
/* 3️⃣ Aptitude Test Content */
const topics = [
    "Numerical Ability",
    "Logical Reasoning",
    "Data Interpretation (DI)",
    "Verbal Ability",
    "Quantitative Comparison",
    "Critical Thinking ",
    "Problem Solving",
];const AptitudeTestContent = () => {
  const listRef = useRef(null);

  const [topicList, setTopicList] = useState([
    topics[topics.length - 1],
    ...topics.slice(0, topics.length - 1),
  ]);

  useEffect(() => {
    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.4, // Slightly longer, smoother pause
    });

    tl.to(listRef.current, {
      y: "-=50px",
      duration: 1, // slower, more fluid
      ease: "power2.inOut", // smooth ease curve
      onUpdate: () => {
        // subtle easing update (for buttery motion)
        gsap.to(listRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: "sine.out",
        });
      },
      onComplete: () => {
        setTopicList((prevTopics) => {
          const updatedTopics = [...prevTopics.slice(1), prevTopics[0]];
          return updatedTopics;
        });
        gsap.set(listRef.current, { y: 0 });
      },
    });

    return () => tl.kill();
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto flex items-center justify-between p-4 h-72 font-sans rounded-2xl shadow-xl">
      {/* Left section: Animated topics list */}
      <div className="relative max-w-xl h-full flex items-center justify-center">
        <div className="relative w-full h-[150px] overflow-hidden">

          {/* Static border element */}
          <div className="absolute top-1/2 left-0 w-full h-[40px] -translate-y-1/2 border-2 border-gray-200 rounded-lg pointer-events-none"></div>

          {/* The list of topics that animates */}
          <ul
            ref={listRef}
            className="flex flex-col items-center"
            style={{ willChange: "transform" }}
          >
            {topicList.map((topic, index) => (
              <li
                key={`${topic}-${index}`}
                className={`flex items-center justify-center text-md font-semibold h-[50px] w-full px-3 text-center transition-all duration-200 ${
                  index === 1 ? "text-black scale-100 duration-200" : "text-gray-300 "
                }`}
              >
                {topic}
              </li>
            ))}
          </ul>

          {/* Top and Bottom gradient fades */}
          <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[#F6F6F6] to-transparent pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#F6F6F6] to-transparent pointer-events-none"></div>
        </div>
      </div>

      {/* Right side: Button */}
      <div className="flex items-center justify-center">
        <button
          className="text-black text-sm px-4 py-2 font-semibold rounded-xl border   border-gray-300 transition-all duration-300 "
          style={{
            boxShadow: " 0  4px 12px rgba(0, 0, 0.15, 0.15) ",
          }}
        >
          Start Learn
        </button>
      </div>
    </div>
  );
};

/* 4️⃣ SQL Chat (looping fade-in) */const SqlVisual1 = () => {
    const [key, setKey] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setKey((k) => k + 1), 6000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const lines = gsap.utils.toArray(".chat-line");
        gsap.fromTo(
            lines,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, stagger: 1.2, duration: 1.5, ease: "power2.out" }
        );
    }, [key]);

    return (
        <div
            key={key}
            className="w-full h-full p-4 flex flex-col justify-center space-y-3 overflow-hidden"
        >
            <style>
                {`
                .chat-shadow {
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
                }
                .icon-shadow {
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
                }
                `}
            </style>

            {/* 1️⃣ First Line */}
            <div className="flex items-center space-x-2 self-start chat-line">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center icon-shadow">
                    <BsStars size={18} className="text-black" />
                </div>
                <p className="text-md text-gray-700 bg-gray-100 rounded-lg px-3 py-2 chat-shadow">
                    I've watched 10 SQL tutorials... but still can't solve real problems.
                </p>
            </div>

            {/* 2️⃣ Second Line */}
            <div className="flex items-center space-x-2 self-end chat-line">
                <p className="text-md text-gray-700 bg-gray-100 rounded-lg px-3 py-2 chat-shadow">
                    Every lesson is a story. Every query moves the plot forward.
                </p>
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center icon-shadow">
                    <IoPersonSharp size={18} className="text-black" />
                </div>
            </div>

            {/* 3️⃣ Third Line */}
            <div className="flex items-center space-x-2 self-start chat-line">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center icon-shadow">
                    <BsStars size={18} className="text-black " />
                </div>
                <p className="text-md text-gray-700 bg-gray-100 rounded-lg px-3 py-2 chat-shadow">
                    Let's solve real-world queries — together.
                </p>
            </div>
        </div>
    );
};


/* 5️⃣ SQL Visual Interface */
const SqlVisual2 = () => (
    <div className="w-full h-full">
        <img src={SQL} className="h-full" alt="" />
    </div>
);

/* 🔹 Card Component *//* 🔹 Card Component */
const HighlightCard = ({ title, description, children, showInput = true }) => (
    <div className="relative bg-gradient-to-br from-white/90 to-gray-50/70 backdrop-blur-md rounded-3xl border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.12)] transition-all duration-500 overflow-hidden group">
      {/* glowing gradient edge */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100 via-pink-50 to-transparent opacity-40 group-hover:opacity-70 transition-opacity duration-500 -z-10"></div>
  
      {/* card content */}
      <div className="p-5 flex flex-col h-full">
        <div className="h-52 flex items-center justify-center rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-inner mb-5">
          {children}
        </div>
  
        <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">{description}</p>
  
        {showInput && (
          <div className="flex items-center p-2 gap-3 rounded-xl bg-white/60 border border-gray-200 shadow-inner group-hover:border-indigo-400 transition-all duration-300">
            <input
              type="text"
              disabled
              placeholder="Try Yourself With Us"
              className="flex-grow bg-transparent text-sm text-gray-400 placeholder-gray-400 focus:outline-none group-hover:text-gray-800 transition-all"
            />
            <button className="text-gray-400 hover:text-white bg-gray-100 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-pink-500 p-2 rounded-lg transition-all duration-300 shadow-md">
              <Send size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );


/* 🌟 Final Layout */
function OurSection() {
    const topHighlights = [
      {
        id: 1,
        title: "ATS Resume Checker",
        description:
          "Upload your resume and get instant feedback with AI-driven match scores and keyword optimization tips.",
        content: <ResumePreview />,
      },
      {
        id: 2,
        title: "Communication Test",
        description:
          "Record answers to interview questions. Receive AI insights on clarity, confidence, and tone.",
        content: <CommunicationVisual />,
      },
      {
        id: 3,
        title: "Aptitude Test",
        description:
          "Timed quizzes covering logic, reasoning, and data interpretation used by top tech companies.",
        content: <AptitudeTestContent />,
      },
    ];
  
    const sqlHighlights = [
      {
        id: 4,
        title: "SQL Learning Portal",
        description:
          "Learn SQL hands-on using real datasets (Spotify, Airbnb) through guided problem-solving.",
        content: <SqlVisual1 />,
      },
      {
        id: 5,
        title: "SQL Visual Interface",
        description:
          "Explore schema visually and run live queries with step-by-step interactive feedback.",
        content: <SqlVisual2 />,
      },
    ];
  
    return (
      <div className="relative bg-gradient-to-b from-gray-50 to-white py-20 px-6 sm:px-10">
        {/* background glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100/50 via-pink-50/30 to-transparent blur-3xl -z-10"></div>
  
        <main className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h1 className="text-4xl sm:text-5xl font-bold mb-3 bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
              Solutions We Provide
            </h1>
            <p className="text-gray-500 text-lg">
              Practical learning. Real results. Interactive experiences powered by{" "}
              <span className="font-semibold text-indigo-600">Upzure</span>.
            </p>
          </div>
  
          {/* Top Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {topHighlights.map((item) => (
              <HighlightCard
                key={item.id}
                title={item.title}
                description={item.description}
              >
                {item.content}
              </HighlightCard>
            ))}
          </div>
  
          {/* SQL Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sqlHighlights.map((item) => (
              <HighlightCard
                key={item.id}
                title={item.title}
                description={item.description}
              >
                {item.content}
              </HighlightCard>
            ))}
          </div>
        </main>
      </div>
    );
  }
  
  export default OurSection;