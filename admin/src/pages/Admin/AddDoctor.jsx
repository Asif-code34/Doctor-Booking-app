// import React, { useContext, useState } from "react";
// import { assets } from "../../assets/assets";
// import { AdminContext } from "../../context/AdminContext";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const AddDoctor = () => {
//   const [docImg, setDocImg] = useState(false);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [experience, setExperience] = useState("1 Year");
//   const [fees, setFees] = useState("");
//   const [about, setAbout] = useState("");
//   const [speciality, setSpeciality] = useState("General Physician");
//   const [degree, setDegree] = useState("");
//   const [address1, setAddress1] = useState("");
//   const [address2, setAddress2] = useState("");

//   const { backendUrl, aToken } = useContext(AdminContext);

//   const navigate = useNavigate();

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       if (!docImg) {
//         return toast.error("Image Not Selected");
//       }
//       const formdata = new FormData();
//       formdata.append("image", docImg);
//       formdata.append("name", name);
//       formdata.append("email", email);
//       formdata.append("password", password);
//       formdata.append("experience", experience);
//       formdata.append("fees", fees);
//       formdata.append("about", about);
//       formdata.append("speciality", speciality);
//       formdata.append("degree", degree);
//       formdata.append(
//         "address",
//         JSON.stringify({ line1: address1, line2: address2 }),
//       );

//       //console log form data
//       formdata.forEach((value, key) => {
//         console.log(`${key} :${value}`);
//       });
//       // const { data } = await axios.post(backendUrl + "/api/admin/add-doctor",
//       //   formdata,
//       //   { headers: { aToken } }
//       // );
//       const { data } = await axios.post(
//         backendUrl + "/api/admin/add-doctor",
//         formdata,
//         { headers: { aToken } },
//       );
//       if (data.success) {
//         toast.success(data.message);
//         setDocImg(false);
//         setName("");
//         setPassword("");
//         setEmail("");
//         setExperience("");
//         setAddress1("");
//         setAddress2("");
//         setDegree("");
//         setAbout("");
//         setFees("");
//         navigate("/doctor-list");
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//       console.log(error);
//     }
//   };
//   return (
//     <form onSubmit={onSubmitHandler} className="m-5 w-full">
//       <p className="mb-3 text-lg font-medium">Add Doctor</p>
//       <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] min-h-[60vh]">
//         <div className="flex items-center gap-4 mb-8 text-gray-500">
//           <label htmlFor="doc-img">
//             <img
//               className="w-16 bg-gray-100 rounded-full cursor-pointer"
//               src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
//               alt=""
//             />
//           </label>
//           <input
//             onChange={(e) => setDocImg(e.target.files[0])}
//             type="file"
//             id="doc-img"
//             hidden
//           />
//           <p>
//             {" "}
//             Upload doctor <br /> picture
//           </p>
//         </div>
//         <div className="flex flex-col lg:flex-row items-center gap-10 text-gray-600">
//           <div className="w-full lg:flex-1 flex flex-col gap-4">
//             <div className="flex-1 flex flex-col gap-1">
//               <p>Doctor NAme</p>
//               <input
//                 onChange={(e) => setName(e.target.value)}
//                 value={name}
//                 className="border rounded px-3 py-2"
//                 type="text"
//                 placeholder="Name"
//                 required
//               />
//             </div>
//             <div className="flex-1 flex flex-col gap-1">
//               <p>Doctor Email</p>
//               <input
//                 onChange={(e) => setEmail(e.target.value)}
//                 value={email}
//                 className="border rounded px-3 py-2"
//                 type="email"
//                 placeholder="Email"
//                 required
//               />
//             </div>
//             <div className="flex-1 flex flex-col gap-1">
//               <p>Doctor Password</p>
//               <input
//                 onChange={(e) => setPassword(e.target.value)}
//                 value={password}
//                 className="border rounded px-3 py-2"
//                 type="password"
//                 placeholder="Password"
//                 autoComplete="new-password"
//                 minLength={8}
//                 required
//               />
//             </div>
//             <div className="flex-1 flex flex-col gap-1">
//               <p>Experience</p>
//               <select
//                 onChange={(e) => setExperience(e.target.value)}
//                 value={experience}
//                 className="border rounded px-3 py-2"
//               >
//                 <option value="1 Year">1 Year</option>
//                 <option value="2 Year">2 Year</option>
//                 <option value="3Year">3 Year</option>
//                 <option value="4 Year">4 Year</option>
//                 <option value="5 Year">5 Year</option>
//                 <option value=" 6Year">6 Year</option>
//                 <option value="7 Year"> 7Year</option>
//                 <option value="8 Year">8 Year</option>
//                 <option value="9 Year"> 9 Year</option>
//                 <option value=" 10 Year">10 Year</option>
//               </select>
//             </div>
//             <div className="flex-1 flex flex-col gap-1">
//               <p>Fees</p>
//               <input
//                 onChange={(e) => setFees(e.target.value)}
//                 value={fees}
//                 className="border rounded px-3 py-2"
//                 type="number"
//                 placeholder="fees"
//                 required
//               />
//             </div>
//           </div>
//           <div className="w-full lg:flex-1 flex flex-col gap-4">
//             <div className="flex-1 flex flex-col gap-1">
//               <p>Speciality</p>
//               <select
//                 onChange={(e) => setSpeciality(e.target.value)}
//                 value={speciality}
//                 className="border rounded px-3 py-2"
//               >
//                 <option value="General physician">General physician</option>
//                 <option value="Gynecologist">Gynecologist</option>
//                 <option value="Dermatologist">Dermatologist</option>
//                 <option value="Pediatricians">Pediatricians</option>
//                 <option value="Neurologist">Neurologist</option>
//                 <option value="Gastroenterologist">Gastroenterologist</option>
//               </select>
//             </div>
//             <div className="flex-1 flex flex-col gap-1">
//               <p>Edcucation</p>
//               <input
//                 onChange={(e) => setDegree(e.target.value)}
//                 value={degree}
//                 className="border rounded px-3 py-2"
//                 type="text"
//                 placeholder="Eductaion"
//                 required
//               />
//             </div>
//             <div className="flex-1 flex flex-col gap-1">
//               <p>Address</p>
//               <input
//                 onChange={(e) => setAddress1(e.target.value)}
//                 value={address1}
//                 className="border rounded px-3 py-2"
//                 type="text"
//                 placeholder="address 1"
//                 required
//               />
//               <input
//                 onChange={(e) => setAddress2(e.target.value)}
//                 value={address2}
//                 className="border rounded px-3 py-2"
//                 type="text"
//                 placeholder="address 2"
//                 required
//               />
//             </div>
//           </div>
//         </div>
//         <div>
//           <p className="mt-4 mb-2">About Doctor</p>
//           <textarea
//             onChange={(e) => setAbout(e.target.value)}
//             value={about}
//             className="w-full px-4 pt-2 border rounded"
//             placeholder="write about doctor"
//             rows={5}
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-primary text-white mt-4 px-10 py-3 rounded-full"
//         >
//           Add Doctor
//         </button>
//       </div>
//     </form>
//   );
// };

// export default AddDoctor;

import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!docImg) {
        return toast.error("Image Not Selected");
      }

      const formdata = new FormData();

      formdata.append("image", docImg);
      formdata.append("name", name);
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("experience", experience);
      formdata.append("fees", fees);
      formdata.append("about", about);
      formdata.append("speciality", speciality);
      formdata.append("degree", degree);
      formdata.append(
        "address",
        JSON.stringify({
          line1: address1,
          line2: address2,
        }),
      );

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formdata,
        {
          headers: { aToken },
        },
      );

      if (data.success) {
        toast.success(data.message);

        setDocImg(false);
        setName("");
        setPassword("");
        setEmail("");
        setExperience("");
        setAddress1("");
        setAddress2("");
        setDegree("");
        setAbout("");
        setFees("");

        navigate("/doctor-list");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong",
      );
    }
  };

  return (
    <main className="w-full p-4 sm:p-5 md:p-6">
      <form onSubmit={onSubmitHandler} className="w-full">
        <h1 className="mb-4 text-lg font-semibold text-gray-800 sm:text-xl">
          Add Doctor
        </h1>

        <div
          className="
            w-full max-w-5xl
            rounded-xl border border-gray-200
            bg-white
            p-4 shadow-sm
            sm:p-6 md:p-8
          "
        >
          {/* Doctor Image */}
          <div className="mb-7 flex items-center gap-4 border-b border-gray-100 pb-6">
            <label htmlFor="doc-img" className="group shrink-0 cursor-pointer">
              <img
                className="
                  h-20 w-20 rounded-full
                  border border-gray-200
                  bg-gray-100
                  object-cover
                  transition-opacity
                  group-hover:opacity-80
                "
                src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                alt="Upload doctor"
              />
            </label>

            <input
              onChange={(e) => setDocImg(e.target.files[0])}
              type="file"
              id="doc-img"
              accept="image/*"
              hidden
            />

            <div>
              <p className="text-sm font-medium text-gray-700">
                Doctor Picture
              </p>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Click the image to upload
                <br />
                JPG, PNG or other image formats
              </p>
            </div>
          </div>

          {/* Main Form */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-8">
            {/* Left Column */}
            <div className="flex flex-col gap-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="doctor-name"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Doctor Name
                </label>

                <input
                  id="doctor-name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="
                    w-full rounded-lg border border-gray-300
                    px-3 py-2.5 text-sm
                    outline-none transition
                    focus:border-primary
                    focus:ring-2 focus:ring-primary/20
                  "
                  type="text"
                  placeholder="Enter doctor name"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="doctor-email"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Doctor Email
                </label>

                <input
                  id="doctor-email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="
                    w-full rounded-lg border border-gray-300
                    px-3 py-2.5 text-sm
                    outline-none transition
                    focus:border-primary
                    focus:ring-2 focus:ring-primary/20
                  "
                  type="email"
                  placeholder="Enter doctor email"
                  autoComplete="email"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="doctor-password"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Doctor Password
                </label>

                <input
                  id="doctor-password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="
                    w-full rounded-lg border border-gray-300
                    px-3 py-2.5 text-sm
                    outline-none transition
                    focus:border-primary
                    focus:ring-2 focus:ring-primary/20
                  "
                  type="password"
                  placeholder="Enter password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </div>

              {/* Experience */}
              <div>
                <label
                  htmlFor="experience"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Experience
                </label>

                <select
                  id="experience"
                  onChange={(e) => setExperience(e.target.value)}
                  value={experience}
                  className="
                    w-full rounded-lg border border-gray-300
                    bg-white px-3 py-2.5 text-sm
                    outline-none transition
                    focus:border-primary
                    focus:ring-2 focus:ring-primary/20
                  "
                >
                  <option value="1 Year">1 Year</option>
                  <option value="2 Year">2 Year</option>
                  <option value="3 Year">3 Year</option>
                  <option value="4 Year">4 Year</option>
                  <option value="5 Year">5 Year</option>
                  <option value="6 Year">6 Year</option>
                  <option value="7 Year">7 Year</option>
                  <option value="8 Year">8 Year</option>
                  <option value="9 Year">9 Year</option>
                  <option value="10 Year">10 Year</option>
                </select>
              </div>

              {/* Fees */}
              <div>
                <label
                  htmlFor="fees"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Consultation Fees
                </label>

                <input
                  id="fees"
                  onChange={(e) => setFees(e.target.value)}
                  value={fees}
                  className="
                    w-full rounded-lg border border-gray-300
                    px-3 py-2.5 text-sm
                    outline-none transition
                    focus:border-primary
                    focus:ring-2 focus:ring-primary/20
                  "
                  type="number"
                  min="0"
                  placeholder="Enter consultation fees"
                  required
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-5">
              {/* Speciality */}
              <div>
                <label
                  htmlFor="speciality"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Speciality
                </label>

                <select
                  id="speciality"
                  onChange={(e) => setSpeciality(e.target.value)}
                  value={speciality}
                  className="
                    w-full rounded-lg border border-gray-300
                    bg-white px-3 py-2.5 text-sm
                    outline-none transition
                    focus:border-primary
                    focus:ring-2 focus:ring-primary/20
                  "
                >
                  <option value="General physician">General physician</option>
                  <option value="Gynecologist">Gynecologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Pediatricians">Pediatricians</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Gastroenterologist">Gastroenterologist</option>
                </select>
              </div>

              {/* Education */}
              <div>
                <label
                  htmlFor="education"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Education
                </label>

                <input
                  id="education"
                  onChange={(e) => setDegree(e.target.value)}
                  value={degree}
                  className="
                    w-full rounded-lg border border-gray-300
                    px-3 py-2.5 text-sm
                    outline-none transition
                    focus:border-primary
                    focus:ring-2 focus:ring-primary/20
                  "
                  type="text"
                  placeholder="Enter education / degree"
                  required
                />
              </div>

              {/* Address */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Address
                </label>

                <div className="flex flex-col gap-3">
                  <input
                    onChange={(e) => setAddress1(e.target.value)}
                    value={address1}
                    className="
                      w-full rounded-lg border border-gray-300
                      px-3 py-2.5 text-sm
                      outline-none transition
                      focus:border-primary
                      focus:ring-2 focus:ring-primary/20
                    "
                    type="text"
                    placeholder="Address line 1"
                    required
                  />

                  <input
                    onChange={(e) => setAddress2(e.target.value)}
                    value={address2}
                    className="
                      w-full rounded-lg border border-gray-300
                      px-3 py-2.5 text-sm
                      outline-none transition
                      focus:border-primary
                      focus:ring-2 focus:ring-primary/20
                    "
                    type="text"
                    placeholder="Address line 2"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* About Doctor */}
          <div className="mt-6">
            <label
              htmlFor="about-doctor"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              About Doctor
            </label>

            <textarea
              id="about-doctor"
              onChange={(e) => setAbout(e.target.value)}
              value={about}
              className="
                min-h-[140px] w-full resize-y
                rounded-lg border border-gray-300
                px-3 py-2.5 text-sm
                outline-none transition
                focus:border-primary
                focus:ring-2 focus:ring-primary/20
              "
              placeholder="Write something about the doctor..."
              rows={5}
              required
            />
          </div>

          {/* Submit */}
          <div className="mt-6 flex justify-start">
            <button
              type="submit"
              className="
                w-full rounded-lg
                bg-primary px-8 py-3
                text-sm font-medium text-white
                transition-all duration-200
                hover:opacity-90
                focus:outline-none
                focus:ring-2 focus:ring-primary
                focus:ring-offset-2
                sm:w-auto
              "
            >
              Add Doctor
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default AddDoctor;
