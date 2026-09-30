// import { assets } from "../assets/assets";
// const Contact = () => {
//   return (
//     <div>
//       <div className="text-center text-2xl pt-10 text-gray-500">
//         <p>
//           CONTACT <span className="text-gray-700 font-semibold">US</span>
//         </p>
//       </div>
//       <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-20 text-sm">
//         <img className="w-full md:max-w-[360px]" src={assets.contact_image} />
//         <div className="flex flex-col gap-6 justify-center item start ">
//           <p className="font-semibold text-lg text-gray-600">OUR OFFICE</p>
//           <p className="text-gray-500">
//             549 Wilms station <br /> suite 350,Washington USA
//           </p>
//           <p className="text-gray-500">
//             TEL:87490976555 <br />
//             Email:asifshah1129@gmail.com
//           </p>
//           <p className="font-semibold text-lg text-gray-600">
//             Careers at MediSlot
//           </p>
//           <p className="text-gray-500">
//             Learn more about our teams and job openings.
//           </p>
//           <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
//             Explore jobs
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;

import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <main className="py-8 sm:py-10 lg:py-14">
      {/* ==================== PAGE HEADER ==================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm sm:text-base font-medium tracking-widest text-primary uppercase">
            Contact MediSlot
          </p>

          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight">
            We're here to
            <span className="text-primary"> help you</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-500 leading-relaxed">
            Have a question about MediSlot or need help with your appointments?
            Get in touch with our team.
          </p>
        </div>

        {/* ==================== CONTACT CONTENT ==================== */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Contact Image */}
          <div className="w-full">
            <div className="bg-indigo-50 rounded-2xl overflow-hidden">
              <img
                src={assets.contact_image}
                alt="Contact MediSlot"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="w-full">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-7 lg:p-8 shadow-sm">
              <div>
                <p className="text-sm font-medium text-primary uppercase tracking-wide">
                  Get in touch
                </p>

                <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-gray-900">
                  Contact Information
                </h2>

                <p className="mt-3 text-sm sm:text-base text-gray-500 leading-relaxed">
                  Reach out to us through any of the following channels. We will
                  be happy to assist you.
                </p>
              </div>

              {/* Office */}
              <div className="mt-7 flex gap-4">
                <div className="shrink-0 w-11 h-11 flex items-center justify-center rounded-xl bg-indigo-50 text-primary">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 21h18M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16M9 7h2m-2 4h2m-2 4h2m4-8h2m-2 4h2m-2 4h2"
                    />
                  </svg>
                </div>

                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900">Our Office</h3>

                  <address className="not-italic mt-1 text-sm sm:text-base text-gray-500 leading-relaxed">
                    549 Wilms Station
                    <br />
                    Suite 350, Washington, USA
                  </address>
                </div>
              </div>

              {/* Phone */}
              <div className="mt-6 flex gap-4">
                <div className="shrink-0 w-11 h-11 flex items-center justify-center rounded-xl bg-indigo-50 text-primary">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a2 2 0 011.94 1.515l.7 2.81a2 2 0 01-.52 1.86l-1.47 1.47a16 16 0 006.43 6.43l1.47-1.47a2 2 0 011.86-.52l2.81.7A2 2 0 0121 17.72V21a2 2 0 01-2 2h-1C9.716 23 1 14.284 1 6V5h2z"
                    />
                  </svg>
                </div>

                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900">Phone</h3>

                  <a
                    href="tel:+9187490976555"
                    className="inline-block mt-1 text-sm sm:text-base text-gray-500 hover:text-primary transition-colors break-all"
                  >
                    +91 8740864334
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="mt-6 flex gap-4">
                <div className="shrink-0 w-11 h-11 flex items-center justify-center rounded-xl bg-indigo-50 text-primary">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 7l9 6 9-6"
                    />
                  </svg>
                </div>

                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900">Email</h3>

                  {/* <a
                    href="mailto:asifshah1129@gmail.com"
                    className="inline-block mt-1 text-sm sm:text-base text-gray-500 hover:text-primary transition-colors break-all"
                  >
                    medislot1129@gmail.com
                  </a> */}
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=asifshah1129@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-1 text-sm sm:text-base text-gray-500 hover:text-primary transition-colors break-all"
                  >
                    medislot1129@gmail.com
                  </a>
                </div>
              </div>

              {/* Divider */}
              <div className="my-7 border-t border-gray-100" />

              {/* Careers */}
              <div>
                <p className="text-sm font-medium text-primary uppercase tracking-wide">
                  Careers
                </p>

                <h2 className="mt-2 text-xl sm:text-2xl font-semibold text-gray-900">
                  Join our team
                </h2>

                <p className="mt-2 text-sm sm:text-base text-gray-500 leading-relaxed">
                  Interested in working with MediSlot? Get in touch with us to
                  learn more about available opportunities.
                </p>

                <a
                  href="mailto:asifshah1129@gmail.com?subject=MediSlot%20Career%20Opportunity"
                  className="inline-flex items-center justify-center gap-2 mt-5 px-6 py-3 rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Explore Opportunities
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14m-6-6l6 6-6 6"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
