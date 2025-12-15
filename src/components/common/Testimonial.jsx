import React, { useState } from "react";
import review1 from "../../assets/review-1.jpg"
import review2 from "../../assets/review-2.jpeg"
import review3 from "../../assets/review-3.jpeg"
import review4 from "../../assets/review-4.jpeg"
import review5 from "../../assets/review-5.jpeg"

const testimonials = [
  {
    img: review1,
    name: "Praveen",
    role: "Student @ Mam College",
    text: "This helped me to learn sql queries and give me best resume suggestions",
  },
  {
    img: review2,
    name: "Prajeet",
    role: "Student @ Kncet ",
    text: "This tool improved my resume visibility on job boards significantly!",
  },
  {
    img: review3,
    name: "Anand",
    role: "Student @ KNCET",
    text: "Clean, efficient, and really helpful to understand how SQL Works",
  },
  {
    img: review4,
    name: "Surya",
    role: "Student @ PSG College",
    text: "I refined my resume based on insights here and landed multiple interviews.",
  },
  {
    img: review5,
    name: "Prem",
    role: "Student @ SSM College",
    text: "Simple yet powerful. My match score skyrocketed in just one session.",
  },
];

export default function Testimonial() {
  const [active, setActive] = useState(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12">
     <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent font-semibold md:text-5xl mb-6">Testimonials</span> 

      <div className="flex justify-center items-center gap-3 w-full max-w-6xl px-4">
        {testimonials.map((t, index) => (
          <div
            key={index}
            onMouseEnter={() => setActive(index)}
            onMouseLeave={() => setActive(null)}
            className={`relative rounded-2xl overflow-hidden shadow-xl border-5 border-gray-200 transition-all duration-500 ease-in-out cursor-pointer ${
              active === index ? "w-180" : "w-40"
            } h-[480px]`}
          >
          
            <img
              src={t.img}
              alt={t.name}
              className="w-full h-full object-cover  transition-transform  duration-500"
            />

         
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/90 to-transparent transition-opacity duration-500 ${
                active === index ? "opacity-100" : "opacity-0"
              }`}
            ></div>

          
            <div
              className={`absolute bottom-0 left-0 right-0 p-6 text-white transition-all duration-500 ${
                active === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <h3 className="  text-2xl font-semibold">
                {t.name}, <span className="font-normal">{t.role}</span>
              </h3>
              <p className="text-sm mt-2 text-gray-200 leading-relaxed">
                {t.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}