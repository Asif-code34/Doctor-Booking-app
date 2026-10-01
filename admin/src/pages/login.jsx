// import React, { useContext, useState } from "react";

// import axios from "axios";
// import { toast } from "react-toastify";
// import { AdminContext } from "../context/AdminContext";
// import { DoctorContext } from "../context/DoctorContext";

// const Login = () => {
//   const [state, setState] = useState("Admin");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const { setAToken, backendUrl } = useContext(AdminContext);
//   const { setDToken } = useContext(DoctorContext);
//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       if (state === "Admin") {
//         const { data } = await axios.post(backendUrl + "/api/admin/login", {
//           email,
//           password,
//         });
//         // if (data.success) {
//         //   localStorage.setItem("aToken", data.token);
//         //   setAToken(data.token);
//         //   toast.success("Login Successfull");
//         // }
//         if (data.success) {
//           localStorage.setItem("aToken", data.token);
//           localStorage.removeItem("dToken");

//           setAToken(data.token);
//           setDToken("");

//           toast.success("Login Successful");
//         } else {
//           toast.error(data.message);
//         }
//       } else {
//         const { data } = await axios.post(backendUrl + "/api/doctor/login", {
//           email,
//           password,
//         });
//         if (data.success) {
//           localStorage.setItem("dToken", data.token);
//           localStorage.removeItem("aToken");

//           setDToken(data.token);
//           setAToken("");

//           toast.success("Login Successful");
//         } else {
//           toast.error(data.message);
//         }
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };
//   return (
//     <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
//       <div className="flex flex-col gap-3 m-auto iten-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
//         <p className="text-2xl font-semibold m-auto">
//           <span className="text-primary">{state}</span>Login
//         </p>
//         <div className="w-full">
//           <p>Email</p>
//           <input
//             className="border border-[#DADADA] rounded w-full p-2 mt-1"
//             type="email"
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             required
//           />
//         </div>
//         <div className="w-full">
//           <p>Password</p>
//           <input
//             className="border border-[#DADADA] rounded w-full p-2 mt-1"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button className="bg-primary text-white w-full py-2 rounded-md text-base">
//           Login
//         </button>
//         {state === "Admin" ? (
//           <p>
//             Doctor Login ?{" "}
//             <span
//               className="text-primary underline cursor-pointer"
//               onClick={() => setState("Doctor")}
//             >
//               {" "}
//               Click here
//             </span>
//           </p>
//         ) : (
//           <p>
//             Admin Login ?
//             <span
//               className="text-primary underline cursor-pointer"
//               onClick={() => setState("Admin")}
//             >
//               {" "}
//               Click here
//             </span>
//           </p>
//         )}
//       </div>
//     </form>
//   );
// };

// export default Login;

import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("aToken", data.token);
          localStorage.removeItem("dToken");

          setAToken(data.token);
          setDToken("");

          toast.success("Login Successful");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/doctor/login", {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("dToken", data.token);
          localStorage.removeItem("aToken");

          setDToken(data.token);
          setAToken("");

          toast.success("Login Successful");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error("Login error:", error);

      toast.error(
        error.response?.data?.message || "Unable to login. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const switchRole = () => {
    setState((prev) => (prev === "Admin" ? "Doctor" : "Admin"));
    setEmail("");
    setPassword("");
  };

  return (
    <main className="min-h-screen bg-[#F8F9FD] px-4 py-10 sm:px-6">
      <form
        onSubmit={onSubmitHandler}
        className="flex min-h-[70vh] items-center justify-center"
      >
        <div
          className="
            w-full max-w-md
            rounded-2xl border border-gray-200
            bg-white p-6
            text-sm text-[#5E5E5E]
            shadow-md
            sm:p-8
          "
        >
          {/* Heading */}
          <div className="mb-7 text-center">
            <h1 className="text-2xl font-semibold text-gray-800 sm:text-3xl">
              <span className="text-primary">{state}</span> Login
            </h1>

            <p className="mt-2 text-xs text-gray-500 sm:text-sm">
              Sign in to access your MediSlot {state.toLowerCase()} panel
            </p>
          </div>

          {/* Email */}
          <div className="mb-4 w-full">
            <label
              htmlFor="email"
              className="mb-1.5 block font-medium text-gray-700"
            >
              Email
            </label>

            <input
              id="email"
              className="
                w-full rounded-lg border border-[#DADADA]
                px-3 py-2.5
                outline-none
                transition
                focus:border-primary
                focus:ring-2 focus:ring-primary/20
              "
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              autoComplete="email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6 w-full">
            <label
              htmlFor="password"
              className="mb-1.5 block font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              className="
                w-full rounded-lg border border-[#DADADA]
                px-3 py-2.5
                outline-none
                transition
                focus:border-primary
                focus:ring-2 focus:ring-primary/20
              "
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {/* Login button */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full rounded-lg
              bg-primary py-2.5
              text-base font-medium text-white
              transition-all duration-200
              hover:opacity-90
              focus:outline-none
              focus:ring-2 focus:ring-primary
              focus:ring-offset-2
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Role switch */}
          <div className="mt-6 text-center text-sm">
            {state === "Admin" ? (
              <p>
                Are you a Doctor?{" "}
                <button
                  type="button"
                  onClick={switchRole}
                  className="font-medium text-primary underline underline-offset-2"
                >
                  Login as Doctor
                </button>
              </p>
            ) : (
              <p>
                Are you an Admin?{" "}
                <button
                  type="button"
                  onClick={switchRole}
                  className="font-medium text-primary underline underline-offset-2"
                >
                  Login as Admin
                </button>
              </p>
            )}
          </div>
        </div>
      </form>
    </main>
  );
};

export default Login;
