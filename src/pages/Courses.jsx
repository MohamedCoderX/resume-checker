import React from "react";
import { useNavigate } from "react-router-dom";
import {
    SiPython,
    SiJavascript,
    SiMongodb,
    SiNodedotjs,
    SiMysql,
  } from "react-icons/si";
  import { FaJava } from "react-icons/fa"; // Java icon from Font Awesome
  

const courses = [
  {
    id: 1,
    name: "SQL Mastery",
    slug: "learn",
    icon: <SiMysql className="text-blue-600 text-5xl" />,
    shortDesc: "Master SQL with step-by-step visual execution and real-world projects.",
    longDesc:
      "Learn SQL from the ground up — understand how to query databases, join tables, and build optimized queries with interactive exercises and challenges. Ideal for data analysts and backend developers.",
    status: "Available Now",
  },
  {
    id: 2,
    name: "Python Programming",
    slug: "python",
    icon: <SiPython className="text-yellow-500 text-5xl" />,
    shortDesc: "The world’s favorite language for beginners and professionals alike.",
    longDesc:
      "Start your journey with Python — from syntax to automation, data analysis, and Flask API development. Hands-on projects included for real-world experience.",
    status: "Coming Soon",
  },
  {
    id: 3,
    name: "MongoDB",
    slug: "mongodb",
    icon: <SiMongodb className="text-green-600 text-5xl" />,
    shortDesc: "Learn NoSQL database design and data modeling for modern apps.",
    longDesc:
      "Understand how to design flexible, scalable databases using MongoDB. Learn CRUD operations, schema design, and aggregation pipelines — essential for Node.js developers.",
    status: "Coming Soon",
  },
  {
    id: 4,
    name: "Java Fundamentals",
    slug: "java",
    icon: <FaJava className="text-red-500 text-5xl" />,
    shortDesc: "Build a strong foundation in Java for enterprise applications.",
    longDesc:
      "From core OOP concepts to real backend development — this course prepares you for large-scale app building and interview-level understanding.",
    status: "Coming Soon",
  },
  {
    id: 5,
    name: "JavaScript for Web",
    slug: "javascript",
    icon: <SiJavascript className="text-yellow-400 text-5xl" />,
    shortDesc: "The brain behind every interactive website.",
    longDesc:
      "Master modern JavaScript — DOM manipulation, ES6 features, and event handling. Perfect for front-end and React developers who want depth.",
    status: "Coming Soon",
  },
  {
    id: 6,
    name: "Node.js Backend",
    slug: "nodejs",
    icon: <SiNodedotjs className="text-green-700 text-5xl" />,
    shortDesc: "Server-side JavaScript simplified for speed and scale.",
    longDesc:
      "Learn how to build powerful backend APIs using Node.js and Express. Understand routing, authentication, and database integration with MongoDB.",
    status: "Coming Soon",
  },
];

const Courses = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-6 md:px-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
        Explore Our Courses
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {courses.map((course) => (
          <div
            key={course.id}
            className="group bg-white/80 backdrop-blur-md shadow-md hover:shadow-2xl transition-all border border-gray-100 rounded-2xl p-8 relative overflow-hidden"
          >
            {/* Accent bar */}
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-blue-500 to-green-500 rounded-l-xl opacity-0 group-hover:opacity-100 transition-all"></div>

            {/* Icon */}
            <div className="flex items-center gap-4 mb-4">
              {course.icon}
              <h3 className="text-2xl font-semibold text-gray-800">
                {course.name}
              </h3>
            </div>

            {/* Short Description */}
            <p className="text-gray-600 text-sm mb-2">{course.shortDesc}</p>

            {/* Long Description */}
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              {course.longDesc}
            </p>

            {/* Status + Button */}
            <div className="flex justify-between items-center">
              <span
                className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                  course.status === "Available Now"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {course.status}
              </span>

              {course.status === "Available Now" ? (
                <button
                  onClick={() => navigate(`/${course.slug}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-all"
                >
                  Learn Now
                </button>
              ) : (
                <button
                  disabled
                  className="bg-gray-300 text-gray-600 px-4 py-2 rounded-md text-sm font-medium cursor-not-allowed"
                >
                  Coming Soon
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
