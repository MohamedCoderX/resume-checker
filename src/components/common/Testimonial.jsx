import React, { useState } from "react";

const testimonials = [
  {
    img: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe",
    name: "Priya R.",
    role: "Data Analyst @ Amazon",
    text: "The ATS checker helped me increase my resume match score from 42% to 89%. Got 3 interviews in a week!",
  },
  {
    img: "https://images.unsplash.com/photo-1511367461989-f85a21fda167",
    name: "Arjun M.",
    role: "Frontend Engineer @ Google",
    text: "This tool improved my resume visibility on job boards significantly!",
  },
  {
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    name: "Sarah L.",
    role: "UX Designer @ Spotify",
    text: "Clean, efficient, and really helpful to understand how ATS works.",
  },
  {
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    name: "Emily W.",
    role: "Marketing Manager @ Airbnb",
    text: "I refined my resume based on insights here — landed my dream job!",
  },
  {
    img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91",
    name: "Ravi K.",
    role: "Finance Analyst @ Deloitte",
    text: "Simple yet powerful. My match score skyrocketed in just one session.",
  },
];

export default function Testimonial() {
  const [active, setActive] = useState(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12">
      <h2 className="text-4xl font-bold text-gray-800 mb-10">Testimonials</h2>

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