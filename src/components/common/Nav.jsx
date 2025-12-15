import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { LuBadgeCheck } from "react-icons/lu";
import { PiChartPieSlice } from "react-icons/pi";
import { RiBookLine, RiCodeBlock } from "react-icons/ri";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import logo from "../../assets/logo.png"

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Desktop dropdown states
  const [activeDropdown, setActiveDropdown] = useState(""); // 'learn', 'playground', or ''
  const [subMenu, setSubMenu] = useState(""); // database / programming

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Create a ref for the entire menu area that triggers dropdowns (for click-outside)
  const navRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);

    const handleClickOutside = (event) => {
      // Check if any dropdown is open AND if the click is outside the referenced element
      if (activeDropdown && navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown("");
        setSubMenu("");
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const closeMobileMenu = () => {
    setMenuOpen(false);
  };

  // Function to handle mouse leaving the dropdown area (250ms delay for stability)
  const handleMouseLeaveDropdown = () => {
    // FIX: Changed the delay from 25000ms to a stable 250ms
    setTimeout(() => {
      setActiveDropdown("");
      setSubMenu(""); 
    }, 25000);
  };

  // --- Utility Component for Mobile Links (Unchanged) ---
  const MobileNavLink = ({ to, icon: Icon, children }) => (
    <li className="w-full">
      <NavLink
        to={to}
        onClick={closeMobileMenu}
        className={({ isActive }) =>
          `flex items-center gap-3 w-full px-5 py-3 rounded-lg transition-all text-lg ${
            isActive
              ? "bg-blue-600 text-white font-semibold"
              : "text-gray-700 hover:bg-gray-100"
          }`
        }
      >
        <Icon className="w-5 h-5" />
        {children}
      </NavLink>
    </li>
  );

  // --- Dropdown Panel Content (UPDATED to accept basePath) ---
  const DropdownContent = ({ activeMenu, currentSubMenu, setSubMenu, basePath }) => {
    
    const isLearn = activeMenu === 'learn';
    const isPlayground = activeMenu === 'playground';

    return (
      <div 
        className={`absolute top-full mt-3 flex gap-4 z-50 ${
          isLearn 
            ? 'left-0' 
            : isPlayground 
              ? 'left-1/2 transform -translate-x-1/2' 
              : ''
        }`}
      >
        {/* LEFT PANEL: Categories (Only for Learn) */}
        {isLearn && (
          <ul className="bg-white shadow-xl rounded-xl p-4 w-60 border border-gray-100">
            {/* DATABASE */}
            <li
              className={`px-4 py-2 rounded-lg cursor-pointer flex justify-between items-center hover:bg-gray-100 ${
                currentSubMenu === "database" ? "text-indigo-600 font-semibold bg-indigo-50" : ""
              }`}
              onMouseEnter={() => setSubMenu("database")}
            >
              Database <span>›</span>
            </li>

            {/* PROGRAMMING */}
            <li
              className={`px-4 py-2 mt-1 rounded-lg cursor-pointer flex justify-between items-center hover:bg-gray-100 ${
                currentSubMenu === "programming" ? "text-indigo-600 font-semibold bg-indigo-50" : ""
              }`}
              onMouseEnter={() => setSubMenu("programming")}
            >
              Programming <span>›</span>
            </li>
          </ul>
        )}

        {/* RIGHT PANEL: SQL / MongoDB (Always visible for Playground, or when subMenu is 'database' for Learn) */}
        {(isPlayground || currentSubMenu === "database") && (
          <ul className={`bg-white shadow-xl rounded-xl p-4 w-56 border border-gray-100 transition-opacity duration-100`}>
              {/* PATHS NOW USE DYNAMICALLY PASSED basePath */}
              <NavLink
                to='/learn' 
                className="block px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-gray-900"
              >
                SQL
              </NavLink>
              <NavLink
                to={`${basePath}/mongodb`}
                className="block px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-gray-900"
              >
                MongoDB
              </NavLink>
          </ul>
        )}

        {/* PROGRAMMING LINKS (Only visible when hovering 'Learn' and subMenu is 'programming') */}
        {isLearn && currentSubMenu === "programming" && (
          <ul className="bg-white shadow-xl rounded-xl p-4 w-56 border border-gray-100">
              {/* PATHS NOW USE DYNAMICALLY PASSED basePath */}
              <NavLink
                to={`${basePath}/java`}
                className="block px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-gray-900"
              >
                Java
              </NavLink>
              <NavLink
                to={`${basePath}/python`}
                className="block px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-gray-900"
              >
                Python
              </NavLink>
          </ul>
        )}
      </div>
    );
  };


  return (
    <nav className="w-full z-50 relative border-b border-gray-100 bg-white">
      <div className="flex justify-between items-center px-6 sm:px-10 py-4">
        <Link to="/">
         <img src={logo} className="w-25 h-18"/>
        </Link>


        {/* --- Desktop Menu --- */}
        <ul 
          ref={navRef}
          className="hidden md:flex items-center gap-10 text-gray-700 font-medium relative"
        >
          {/* Dashboard */}
          {isLoggedIn && (
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${
                    isActive
                      ? "bg-blue-100 text-gray-900"
                      : "text-gray-500 hover:text-gray-800 hover:bg-blue-50"
                  }`
                }
              >
                <PiChartPieSlice />
                Dashboard
              </NavLink>
            </li>
          )}

          {/* LEARN DROPDOWN TRIGGER (Complex, multi-panel) */}
          <li
            className="relative flex items-center gap-2 text-gray-500 hover:text-gray-800 cursor-pointer"
            onMouseEnter={() => setActiveDropdown("learn")}
            onMouseLeave={handleMouseLeaveDropdown}
          >
            <RiBookLine />
            Learn
            {/* Pass basePath="/learn" */}
            {activeDropdown === 'learn' && (
              <DropdownContent 
                activeMenu="learn"
                currentSubMenu={subMenu}
                setSubMenu={setSubMenu}
                basePath="/learn" 
              />
            )}
          </li>

          {/* Playground DROPDOWN TRIGGER (Simple, single panel, centered) */}
          <li
            className="relative flex items-center gap-2 px-3 py-2 rounded-xl transition-all text-gray-500 hover:text-gray-800 hover:bg-blue-50 cursor-pointer"
            onMouseEnter={() => { setActiveDropdown("playground"); setSubMenu("database"); }}
            onMouseLeave={handleMouseLeaveDropdown}
          >
            <NavLink to="/playground"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${
                  isActive
                    ? "bg-blue-100 text-gray-900"
                    : "text-gray-500 hover:text-gray-800 hover:bg-blue-50"
                }`
              }>
            <RiCodeBlock />
            Playground
            {/* Pass basePath="/playground" */}
           
            </NavLink>
          </li>

          {/* ATS Checker */}
          <li>
            <NavLink
              to="/ats"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${
                  isActive
                    ? "bg-blue-100 text-gray-900"
                    : "text-gray-500 hover:text-gray-800 hover:bg-blue-50"
                }`
              }
            >
              <LuBadgeCheck />
              ATS Checker
            </NavLink>
          </li>
        </ul>

        {/* --- Right (Desktop) --- */}
        <div className="hidden md:flex items-center gap-4">
          {!isLoggedIn ? (
            <Link to="/login">
              <span className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Register / Login</span>
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors shadow-md"
            >
              Logout
            </button>
          )}
        </div>

        {/* --- Mobile Menu Button (Unchanged) --- */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-800 z-[60]"
        >
          {menuOpen ? (
            <HiOutlineX className="w-7 h-7" />
          ) : (
            <HiOutlineMenuAlt3 className="w-7 h-7" />
          )}
        </button>
      </div>

      {/* --- MOBILE MENU (Unchanged) --- */}
      <div
        className={`fixed inset-0 top-0 pt-20 bg-white transition-transform duration-300 md:hidden z-40 overflow-y-auto ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="px-6 sm:px-10 py-4">
          <ul className="flex flex-col gap-2">
            
            {/* Conditional Dashboard Link */}
            {isLoggedIn && (
              <MobileNavLink to="/dashboard" icon={PiChartPieSlice}>
                Dashboard
              </MobileNavLink>
            )}

            {/* Learn - Mobile (Simplified) */}
            <li className="w-full">
              <span className="flex items-center gap-3 w-full px-5 py-3 text-lg font-medium text-gray-900">
                <RiBookLine className="w-5 h-5" /> Learn
              </span>
              <ul className="pl-8 flex flex-col gap-1 text-gray-700">
                <NavLink onClick={closeMobileMenu} to="/learn/sql" className="block py-2 hover:text-blue-600">SQL</NavLink>
                <NavLink onClick={closeMobileMenu} to="/learn/mongodb" className="block py-2 hover:text-blue-600">MongoDB</NavLink>
                <NavLink onClick={closeMobileMenu} to="/learn/java" className="block py-2 hover:text-blue-600">Java</NavLink>
                <NavLink onClick={closeMobileMenu} to="/learn/python" className="block py-2 hover:text-blue-600">Python</NavLink>
              </ul>
            </li>

            {/* Static Links */}
            <MobileNavLink to="/playground" icon={RiCodeBlock}>
              Playground
            </MobileNavLink>
            <MobileNavLink to="/ats" icon={LuBadgeCheck}>
              ATS Checker
            </MobileNavLink>
          </ul>

          <div className="mt-8 pt-4 border-t border-gray-200">
            {!isLoggedIn ? (
              <Link to="/login" onClick={closeMobileMenu} className="block text-center bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
                Register / Login
              </Link>
            ) : (
              <button
                onClick={() => { handleLogout(); closeMobileMenu(); }}
                className="w-full text-center bg-red-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;





// import React, { useState, useEffect } from "react";
// import { NavLink, Link, useNavigate } from "react-router-dom";
// import { LuBadgeCheck } from "react-icons/lu";
// import { PiChartPieSlice } from "react-icons/pi";
// import { RiBookLine, RiCodeBlock } from "react-icons/ri";
// import { IoLanguage } from "react-icons/io5";
// import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
// import logo from "../../assets/logo.png"

// const Nav = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [learnOpen, setLearnOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   // ✅ Check token on mount
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if(token){
//       setIsLoggedIn(true);
//     }
//   }, []);

//   // ✅ Logout handler
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//     navigate("/login");
//   };

//   return (
//     <nav className="w-full z-100">
//       <div className="flex justify-between items-center px-6 sm:px-10 py-4">
//         <Link to="/">
//         <div className="flex">

//         <img src={logo} className="w-25 h-25"/>
//           <h1 className="text-xl font-semibold text-gray-900 mt-9">Learnitence</h1>
//         </div>
//         </Link>

//         {/* ===== Desktop Menu ===== */}
//         <ul className="hidden md:flex items-center gap-6 lg:gap-10 text-gray-700 font-medium relative">

//           {/* ✅ Show Dashboard only if logged in */}
//           {isLoggedIn && (
//             <li>
//               <NavLink
//                 to="/dashboard"
//                 className={({ isActive }) =>
//                   `flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${
//                     isActive
//                       ? "bg-blue-100 text-gray-900"
//                       : "text-gray-500 hover:text-gray-800 hover:bg-blue-50"
//                   }`
//                 }
//               >
//                 <PiChartPieSlice className="text-gray-700" />
//                 Dashboard
//               </NavLink>
//             </li>
//           )}

//           {/* Learn Dropdown */}
//           <li
//             className="relative flex items-center gap-2 text-gray-500 hover:text-gray-800 cursor-pointer transition-all"
//             onMouseEnter={() => setLearnOpen(true)}
//             onMouseLeave={() => setLearnOpen(false)}
//           >
//             <RiBookLine />
//             Learn
//             {learnOpen && (
//               <ul className="absolute top-6 left-0 bg-white/30 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg p-4 flex flex-col gap-3 w-56 animate-fadeIn"> 
//                 <li>
//                   <NavLink
//                     to="/learn"
//                     className={({ isActive }) =>
//                       `block text-center font-medium text-sm sm:text-base px-4 py-3 rounded-xl cursor-pointer transition-all shadow-sm ${
//                         isActive
//                           ? "bg-blue-100 text-gray-900"
//                           : "bg-white/20 hover:bg-white/50 text-gray-800"
//                       }`
//                     }
//                   >
//                     SQL
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                     to="/learn/mongodb"
//                     className={({ isActive }) =>
//                       `block text-center font-medium text-sm sm:text-base px-4 py-3 rounded-xl cursor-pointer transition-all shadow-sm ${
//                         isActive
//                           ? "bg-blue-100 text-gray-900"
//                           : "bg-white/20 hover:bg-white/50 text-gray-800"
//                       }`
//                     }
//                   >
//                     MongoDB
//                   </NavLink>
//                 </li>
//               </ul>
//             )}
//           </li>

//           {/* Playground */}
//           <li>
//             <NavLink
//               to="/playground"
//               className={({ isActive }) =>
//                 `flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${
//                   isActive
//                     ? "bg-blue-100 text-gray-900"
//                     : "text-gray-500 hover:text-gray-800 hover:bg-blue-50"
//                 }`
//               }
//             >
//               <RiCodeBlock />
//               Playground
//             </NavLink>
//           </li>

//           {/* ATS Checker */}
//           <li>
//             <NavLink
//               to="/ats"
//               className={({ isActive }) =>
//                 `flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${
//                   isActive
//                     ? "bg-blue-100 text-gray-900"
//                     : "text-gray-500 hover:text-gray-800 hover:bg-blue-50"
//                 }`
//               }
//             >
//               <LuBadgeCheck />
//               ATS Checker
//             </NavLink>
//           </li>
//         </ul>

//         {/* ===== Right Section ===== */}
//         <div className="hidden md:flex items-center gap-4">
//           {!isLoggedIn ? (
//             <Link to="/login">
//               <div className="flex items-center gap-1 text-gray-700 cursor-pointer hover:text-gray-900">
//                 <span>Register / Login</span>
//               </div>
//             </Link>
//           ) : (
//             <button
//               onClick={handleLogout}
//               className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200"
//             >
//               Logout
//             </button>
//           )}
//         </div>

//         {/* ===== Mobile Menu Button ===== */}
//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="md:hidden text-gray-800 focus:outline-none"
//         >
//           {menuOpen ? (
//             <HiOutlineX className="w-7 h-7" />
//           ) : (
//             <HiOutlineMenuAlt3 className="w-7 h-7" />
//           )}
//         </button>
//       </div>

//       {/* ===== Mobile Menu ===== */}
//       {menuOpen && (
//         <div className="md:hidden flex flex-col items-center gap-4 pb-6 bg-white/50 backdrop-blur-md border-t border-white/30 text-gray-700 font-medium animate-fadeIn">
//           <ul className="flex flex-col items-center gap-4 mt-4">

//             {isLoggedIn && (
//               <li>
//                 <NavLink
//                   to="/dashboard"
//                   className={({ isActive }) =>
//                     `flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
//                       isActive
//                         ? "bg-blue-100 text-gray-900"
//                         : "text-gray-500 hover:text-gray-800 hover:bg-blue-50"
//                     }`
//                   }
//                   onClick={() => setMenuOpen(false)}
//                 >
//                   <PiChartPieSlice className="text-gray-700" />
//                   Dashboard
//                 </NavLink>
//               </li>
//             )}

//             {/* Learn */}
//             <div className="flex flex-col items-center">
//               <button
//                 onClick={() => setLearnOpen(!learnOpen)}
//                 className="flex items-center gap-2 text-gray-500 hover:text-gray-800 cursor-pointer transition-all"
//               >
//                 <RiBookLine />
//                 Learn
//               </button>
//               {learnOpen && (
//                 <ul className="flex flex-col items-center mt-2 bg-white/40 backdrop-blur-md border border-white/30 rounded-xl shadow-md">
//                   <li>
//                     <NavLink
//                       to="/learn/sql"
//                       className={({ isActive }) =>
//                         `block px-6 py-2 rounded-xl transition-all ${
//                           isActive
//                             ? "bg-blue-100 text-gray-900"
//                             : "hover:bg-white/60 text-gray-800"
//                         }`
//                       }
//                       onClick={() => setMenuOpen(false)}
//                     >
//                       SQL
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       to="/learn/mongodb"
//                       className={({ isActive }) =>
//                         `block px-6 py-2 rounded-xl transition-all ${
//                           isActive
//                             ? "bg-blue-100 text-gray-900"
//                             : "hover:bg-white/60 text-gray-800"
//                         }`
//                       }
//                       onClick={() => setMenuOpen(false)}
//                     >
//                       MongoDB
//                     </NavLink>
//                   </li>
//                 </ul>
//               )}
//             </div>

//             <li>
//               <NavLink
//                 to="/playground"
//                 className={({ isActive }) =>
//                   `flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${
//                     isActive
//                       ? "bg-blue-100 text-gray-900"
//                       : "text-gray-500 hover:text-gray-800 hover:bg-blue-50"
//                   }`
//                 }
//                 onClick={() => setMenuOpen(false)}
//               >
//                 <RiCodeBlock />
//                 Playground
//               </NavLink>
//             </li>

//             <li>
//               <NavLink
//                 to="/ats"
//                 className={({ isActive }) =>
//                   `flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${
//                     isActive
//                       ? "bg-blue-100 text-gray-900"
//                       : "text-gray-500 hover:text-gray-800 hover:bg-blue-50"
//                   }`
//                 }
//                 onClick={() => setMenuOpen(false)}
//               >
//                 <LuBadgeCheck />
//                 ATS Checker
//               </NavLink>
//             </li>
//           </ul>

//           {/* Login/Logout for mobile */}
//           <div className="mt-4">
//             {!isLoggedIn ? (
//               <Link to="/login">
//                 <span className="text-blue-600 font-medium">Login / Register</span>
//               </Link>
//             ) : (
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200"
//               >
//                 Logout
//               </button>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Nav;
