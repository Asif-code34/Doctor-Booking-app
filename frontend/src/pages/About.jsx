// import React from "react";
// import { assets } from "../assets/assets";

// const About = () => {
//   return (
//     <div>
//       <div className="text-center text-2xl pt-10 text-gray-500">
//         <p>
//           ABOUT <span className="text-gray-700 font-medium">US</span>
//         </p>
//       </div>
//       <div className="my-10 flex flex-col md:flex-row gap-12">
//         <img
//           className="w-full md:max-w-[360px]"
//           src={assets.about_image}
//           alt=""
//         />
//         <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
//           <p>
//             Welcome to MediSlot, your trusted partner in managing your
//             healthcare needs conveniently and efficiently. At MediSlot, we
//             understand the challenges individuals face when it comes to
//             scheduling doctor appointments and managing their health records.
//           </p>
//           <p>
//             MediSlot is committed to excellence in healthcare technology. We
//             continuously strive to enhance our platform, integrating the latest
//             advancements to improve user experience and deliver superior
//             service. Whether you are booking your first appointment or managing
//             ongoing care, MediSlot is here to support you every step of the way.
//           </p>
//           <b className="text-gray-800">Our Vision</b>
//           <p>
//             Our vision at MediSlot is to create a seamless healthcare experience
//             for every user. We aim to bridge the gap between patients and
//             healthcare providers, making it easier for you to access the care
//             you need, when you need it.
//           </p>
//         </div>
//       </div>
//       <div className="text-xl text-center my-4">
//         <p>
//           WHY <span className="text-gray-700 font-medium">CHOOSE US</span>
//         </p>
//       </div>
//       <div className="flex flex-col md:flex-row mb-20">
//         <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
//           <b>EFFICIENCY:</b>
//           <p>
//             Streamlined appointment scheduling that fits into your busy
//             lifestyle.
//           </p>
//         </div>

//         <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
//           <b>Convenience:</b>
//           <p>
//             Access to a network of trusted healthcare professionals in your
//             area.
//           </p>
//         </div>

//         <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
//           <b>Personlization:</b>
//           <p>
//             Tailored recommendations and reminders to help you stay on top of
//             your health.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;

import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const About = () => {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    navigate("/doctors");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="py-8 sm:py-10 lg:py-14">
      {/* ==================== HERO ==================== */}
      <section className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto px-4">
          <p className="text-sm sm:text-base font-medium tracking-widest text-primary uppercase">
            About MediSlot
          </p>

          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight">
            Making healthcare
            <span className="text-primary"> easier for everyone</span>
          </h1>

          <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-gray-500 leading-relaxed">
            MediSlot makes it easier to discover trusted doctors, find the right
            speciality, and book appointments without unnecessary hassle.
          </p>
        </div>

        {/* ==================== ABOUT CONTENT ==================== */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center px-4 sm:px-6 lg:px-0">
          {/* Image */}
          <div className="w-full">
            <div className="relative overflow-hidden rounded-2xl bg-indigo-50">
              <img
                src={assets.about_image}
                alt="MediSlot healthcare services"
                className="w-full h-auto object-cover"
                loading="lazy"
              />

              {/* Small floating badge */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-md">
                <p className="text-xs text-gray-500">Healthcare made</p>
                <p className="text-sm sm:text-base font-semibold text-gray-900">
                  Simple & Convenient
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            <span className="text-sm font-medium text-primary">Who We Are</span>

            <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight">
              Your healthcare journey, simplified
            </h2>

            <div className="mt-5 space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed">
              <p>
                Welcome to MediSlot, a healthcare appointment platform designed
                to make finding and booking doctor appointments simple and
                convenient.
              </p>

              <p>
                We understand that finding the right doctor and managing
                appointments can sometimes be time-consuming. MediSlot brings
                these essential steps together in one easy-to-use platform.
              </p>

              <p>
                Whether you need to find a specialist, choose an available
                appointment slot, or manage your upcoming appointments, our
                platform is designed to provide a straightforward experience.
              </p>
            </div>

            {/* Vision */}
            <div className="mt-7 p-5 sm:p-6 bg-gray-50 border border-gray-100 rounded-xl">
              <p className="text-sm font-semibold text-gray-900">Our Vision</p>

              <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">
                Our vision is to create a seamless digital healthcare experience
                that helps people connect with healthcare professionals more
                conveniently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== WHY CHOOSE US ==================== */}
      <section className="mt-16 sm:mt-20 lg:mt-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-medium tracking-widest text-primary uppercase">
            Why MediSlot
          </p>

          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900">
            Designed around your convenience
          </h2>

          <p className="mt-3 text-sm sm:text-base text-gray-500 leading-relaxed">
            Everything is designed to make the appointment booking experience
            clear, convenient, and easy to manage.
          </p>
        </div>

        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {/* Efficiency */}
          <article className="group p-6 sm:p-7 lg:p-8 border border-gray-200 rounded-2xl bg-white hover:-translate-y-1 hover:shadow-lg hover:border-primary/30 transition-all duration-300">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-50 text-primary">
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <h3 className="mt-5 text-lg font-semibold text-gray-900">
              Efficiency
            </h3>

            <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">
              Streamlined appointment scheduling helps you find a suitable
              doctor and appointment slot without unnecessary steps.
            </p>
          </article>

          {/* Convenience */}
          <article className="group p-6 sm:p-7 lg:p-8 border border-gray-200 rounded-2xl bg-white hover:-translate-y-1 hover:shadow-lg hover:border-primary/30 transition-all duration-300">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-50 text-primary">
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 21a2 2 0 01-2.828 0l-4.243-4.343a8 8 0 1111.314 0z"
                />
                <circle cx="12" cy="11" r="2.5" />
              </svg>
            </div>

            <h3 className="mt-5 text-lg font-semibold text-gray-900">
              Convenience
            </h3>

            <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">
              Browse doctors by speciality and manage your appointments from a
              single, easy-to-use platform.
            </p>
          </article>

          {/* Personalization */}
          <article className="group p-6 sm:p-7 lg:p-8 border border-gray-200 rounded-2xl bg-white hover:-translate-y-1 hover:shadow-lg hover:border-primary/30 transition-all duration-300">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-50 text-primary">
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 21a8 8 0 00-16 0m12-13a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>

            <h3 className="mt-5 text-lg font-semibold text-gray-900">
              User Focused
            </h3>

            <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">
              A simple interface keeps important healthcare information easy to
              understand and appointments easy to manage.
            </p>
          </article>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="mt-16 sm:mt-20 lg:mt-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="bg-primary rounded-2xl overflow-hidden">
          <div className="px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14 flex flex-col md:flex-row items-center justify-between gap-7">
            <div className="text-center md:text-left max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white">
                Ready to book your appointment?
              </h2>

              <p className="mt-3 text-sm sm:text-base text-white/80 leading-relaxed">
                Find a doctor that matches your needs and choose an available
                appointment slot with MediSlot.
              </p>
            </div>

            <button
              type="button"
              onClick={handleBookAppointment}
              className="shrink-0 inline-flex items-center justify-center px-7 sm:px-8 py-3 rounded-full bg-white text-gray-700 text-sm sm:text-base font-medium hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
            >
              Find a Doctor
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
