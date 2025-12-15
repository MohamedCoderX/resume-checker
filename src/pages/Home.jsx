import React, { useState, useEffect } from "react";



import Testimonial from "../components/common/Testimonial";
import HeroSection from "../components/common/HeroSection";
import OurSection from "../components/common/OurSection";
import Faq from "../components/common/Faq";

import Chatbot from "../components/common/Chatbot";
import About from "../components/common/About";

const Home = () => {
  

  return (
    <div className="w-full ">
      {/* Particle effect first */}
     
          <HeroSection />
          {/* <Chatbot/> */}
          <About/>
          <OurSection />
          {/* <Faq /> */}
          <Testimonial />
          <Faq/>
        
    </div>
  );
};

export default Home;
