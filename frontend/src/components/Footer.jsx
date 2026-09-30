// import React from "react";
// import { assets } from "../assets/assets";
// const Footer = () => {
//   return (
//     <div className="md:mx-10">
//       <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
//         <div>
//           <img className="mb-5 w-40" src={assets.logo} alt="" />
//           <p className="w-full md:w-2/3 text-gray-600 leading-6">
//             Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias
//             labore vero voluptates nam deleniti iusto nesciunt ad culpa
//             praesentium blanditiis?
//           </p>
//         </div>
//         <div>
//           <p className="text-xl font-medium mb-5">Company</p>
//           <ul className="flex flex-col gap-2 text-gray-600">
//             <li>Home</li>
//             <li>About us</li>
//             <li>Contact us</li>
//             <li>Privacy Policy</li>
//           </ul>
//         </div>
//         <div>
//           <p className="text-xl font-medium mb-5">Get in Touch</p>
//           <ul className="flex flex-col gap-2 text-gray-600">
//             <li>8740864334</li>
//             <li>asifshah1129@gmail.com</li>
//           </ul>
//         </div>
//       </div>
//       <div>
//         <hr />
//         <p className="py-5 text-sm text-center">
//           Copyright2024@MediSlot-AllRightReserved
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Footer;

import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-16 sm:mt-20 lg:mt-24">
      {/* ==================== MAIN FOOTER ==================== */}
      <div className="border-t border-gray-200 pt-10 sm:pt-12 lg:pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-10 sm:gap-12 lg:gap-16">
          {/* ==================== BRAND ==================== */}
          <div className="text-center sm:text-left">
            <Link
              to="/"
              onClick={handleHomeClick}
              className="inline-flex justify-center sm:justify-start"
            >
              <img
                src={assets.logo}
                alt="MediSlot"
                className="w-32 sm:w-36 lg:w-40 h-auto object-contain"
              />
            </Link>

            <p className="mt-5 max-w-md mx-auto sm:mx-0 text-sm text-gray-500 leading-6">
              MediSlot makes it easier to find trusted doctors, explore
              specialities, and book appointments conveniently from one
              platform.
            </p>

            <p className="mt-4 text-sm text-gray-500">
              Simple healthcare. Easier appointments.
            </p>
          </div>

          {/* ==================== COMPANY ==================== */}
          <div className="text-center sm:text-left">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">
              Company
            </h2>

            <nav className="mt-5" aria-label="Footer navigation">
              <ul className="flex flex-col items-center sm:items-start gap-3 text-sm text-gray-500">
                <li>
                  <Link
                    to="/"
                    onClick={handleHomeClick}
                    className="hover:text-primary transition-colors"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    to="/about"
                    onClick={handleHomeClick}
                    className="hover:text-primary transition-colors"
                  >
                    About Us
                  </Link>
                </li>

                <li>
                  <Link
                    to="/contact"
                    onClick={handleHomeClick}
                    className="hover:text-primary transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>

                <li>
                  <Link
                    to="/doctors"
                    onClick={handleHomeClick}
                    className="hover:text-primary transition-colors"
                  >
                    Find Doctors
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* ==================== GET IN TOUCH ==================== */}
          <div className="text-center sm:text-left">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">
              Get in Touch
            </h2>

            <div className="mt-5 flex flex-col items-center sm:items-start gap-3 text-sm text-gray-500">
              <a
                href="tel:+918740864334"
                className="hover:text-primary transition-colors"
              >
                +91 87408 64334
              </a>

              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=asifshah1129@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="max-w-full break-all hover:text-primary transition-colors"
              >
                medislot1129@gmail.com
              </a>
            </div>

            <div className="mt-6 max-w-sm mx-auto sm:mx-0">
              <p className="text-sm font-medium text-gray-700">
                Available for appointment support
              </p>

              <p className="mt-1 text-xs sm:text-sm text-gray-500 leading-relaxed">
                Contact us if you need help managing your MediSlot appointments.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== COPYRIGHT ==================== */}
      <div className="border-t border-gray-200">
        <div className="py-5 flex flex-col items-center justify-center gap-2 text-xs sm:text-sm text-gray-500 text-center">
          <p>© {currentYear} MediSlot. All rights reserved.</p>

          <p>Healthcare appointment platform</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
