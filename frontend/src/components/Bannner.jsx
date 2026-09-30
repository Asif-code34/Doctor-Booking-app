// import React from "react";
// import { assets } from "../assets/assets";
// import { useNavigate } from "react-router-dom";

// const Bannner = () => {
//   const navigate = useNavigate();
//   return (
//     <div className="flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 ld:px-12 my-20 md:mx-10">
//       <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
//         <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white">
//           <p>Book Appointment</p>
//           <p className="mt-4"> With 100+ Trusted Doctors</p>
//         </div>
//         <button
//           onClick={() => {
//             navigate("/login");
//             scrollTo(0, 0);
//           }}
//           className="bg-white mt-6 text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full hover:scale-105 transition-all "
//         >
//           Create Account
//         </button>
//       </div>
//       <div className="hidden md:block md:w-1/2 lg:w-[370px] relative">
//         <img
//           className="w-full absolute bottom-0 right-0 max-w-md"
//           src={assets.appointment_img}
//           alt=""
//         />
//       </div>
//     </div>
//   );
// };

// export default Bannner;

import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Bannner = () => {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate("/login");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="my-12 sm:my-16 lg:my-20 px-4 sm:px-6 lg:px-10">
      <div className="flex flex-col sm:flex-row bg-primary rounded-2xl overflow-hidden">
        {/* Content */}
        <div className="w-full sm:w-1/2 flex-1 flex flex-col justify-center px-6 py-10 sm:px-8 sm:py-12 md:px-10 md:py-16 lg:px-14 lg:py-20">
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
              <span className="block">Book Appointment</span>
              <span className="block mt-2 sm:mt-3">
                With 100+ Trusted Doctors
              </span>
            </h2>

            <button
              type="button"
              onClick={handleCreateAccount}
              className="inline-flex items-center justify-center bg-white text-gray-700 mt-6 px-7 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-medium hover:scale-105 transition-transform duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="hidden sm:flex w-full sm:w-1/2 lg:w-[380px] items-end justify-center">
          <img
            src={assets.appointment_img}
            alt="Doctor appointment illustration"
            loading="lazy"
            className="w-full max-w-sm lg:max-w-md h-auto object-contain self-end"
          />
        </div>
      </div>
    </section>
  );
};

export default Bannner;
