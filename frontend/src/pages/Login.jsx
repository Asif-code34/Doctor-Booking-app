// import React, { useContext, useEffect, useState } from "react";
// import { AppContext } from "../context/AppContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const navigate = useNavigate();
//   const { backendUrl, token, setToken } = useContext(AppContext);
//   const [currState, setCurrState] = useState("SignUp");
//   const [email, setEmail] = useState("");

//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       if (currState === "SignUp") {
//         const { data } = await axios.post(backendUrl + "/api/user/register", {
//           name,
//           email,
//           password,
//         });
//         if (data.success) {
//           localStorage.setItem("token", data.token);
//           setToken(data.token);
//         } else {
//           toast.error(data.message);
//         }
//       } else {
//         const { data } = await axios.post(backendUrl + "/api/user/login", {
//           email,
//           password,
//         });
//         if (data.success) {
//           toast.success("Login Successfull");
//           localStorage.setItem("token", data.token);
//           setToken(data.token);
//         } else {
//           toast.error(data.message);
//         }
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };
//   useEffect(() => {
//     if (token) {
//       navigate("/");
//     }
//   }, [token]);
//   return (
//     <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
//       <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-[96] rounded-xl text-sm text-zinc-600 shadow-lg">
//         <p className="text-2xl font-semibold">
//           {currState === "SignUp" ? "Create Account" : "Login"}
//         </p>
//         <p>
//           {currState === "SignUp" ? "Sign up" : "Login" + " "}to book
//           appointment
//         </p>
//         {currState === "SignUp" && (
//           <div className="w-full">
//             <p>Full Name</p>
//             <input
//               className="border border-zinc-300 rounded w-full p-2 mt-1"
//               type="text"
//               onChange={(e) => setName(e.target.value)}
//               value={name}
//             />
//           </div>
//         )}

//         <div className="w-full">
//           <p>Email</p>
//           <input
//             className="border border-zinc-300 rounded w-full p-2 mt-1"
//             type="email"
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//           />
//         </div>

//         <div className="w-full">
//           <p>Password</p>
//           <input
//             className="border border-zinc-300 rounded w-full p-2 mt-1"
//             type="password"
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-primary text-white w-full py-2 rounded-md text-base"
//         >
//           {currState === "SignUp" ? "Create Account" : "Login"}
//         </button>
//         {currState === "SignUp" ? (
//           <p>
//             Already have an account?{" "}
//             <span
//               className="text-primary underline cursor-pointer"
//               onClick={() => setCurrState("login")}
//             >
//               Login here
//             </span>
//           </p>
//         ) : (
//           <p>
//             Create a new account{" "}
//             <span
//               className="text-primary underline cursor-pointer"
//               onClick={() => setCurrState("SignUp")}
//             >
//               click here
//             </span>
//           </p>
//         )}
//       </div>
//     </form>
//   );
// };

// export default Login;

import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, token, setToken } = useContext(AppContext);

  const [currState, setCurrState] = useState("SignUp");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedName = name.trim();

    if (currState === "SignUp" && !trimmedName) {
      toast.error("Please enter your full name.");
      return;
    }

    if (!trimmedEmail) {
      toast.error("Please enter your email.");
      return;
    }

    if (!password) {
      toast.error("Please enter your password.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      if (currState === "SignUp") {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name: trimmedName,
          email: trimmedEmail,
          password,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success(data.message || "Account created successfully.");
        } else {
          toast.error(data.message || "Unable to create account.");
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          email: trimmedEmail,
          password,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success(data.message || "Login successful.");
        } else {
          toast.error(data.message || "Invalid email or password.");
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  const switchState = () => {
    setCurrState((prev) => (prev === "SignUp" ? "Login" : "SignUp"));
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <section className="min-h-[70vh] sm:min-h-[75vh] flex items-center justify-center py-10 sm:py-14 px-4">
      <form onSubmit={onSubmitHandler} className="w-full max-w-md" noValidate>
        <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-5 sm:p-7 md:p-8 text-sm text-gray-600">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              {currState === "SignUp" ? "Create Account" : "Welcome Back"}
            </h1>

            <p className="mt-2 text-sm sm:text-base text-gray-500">
              {currState === "SignUp"
                ? "Sign up to book your doctor appointment."
                : "Login to manage your appointments."}
            </p>
          </div>

          {/* Full Name */}
          {currState === "SignUp" && (
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block mb-1.5 text-sm font-medium text-gray-700"
              >
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-1.5 text-sm font-medium text-gray-700"
            >
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-1.5 text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete={
                currState === "SignUp" ? "new-password" : "current-password"
              }
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />

            {currState === "SignUp" && (
              <p className="mt-1.5 text-xs text-gray-400">
                Password must be at least 6 characters.
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-primary text-white text-sm sm:text-base font-medium transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading
              ? currState === "SignUp"
                ? "Creating Account..."
                : "Logging in..."
              : currState === "SignUp"
                ? "Create Account"
                : "Login"}
          </button>

          {/* Switch Login / Signup */}
          <div className="mt-5 text-center text-sm">
            {currState === "SignUp" ? (
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={switchState}
                  disabled={loading}
                  className="text-primary font-medium underline underline-offset-2 hover:opacity-80 disabled:opacity-50"
                >
                  Login here
                </button>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={switchState}
                  disabled={loading}
                  className="text-primary font-medium underline underline-offset-2 hover:opacity-80 disabled:opacity-50"
                >
                  Create account
                </button>
              </p>
            )}
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;
