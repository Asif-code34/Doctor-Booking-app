// import jwt from 'jsonwebtoken'
// //user authentication middlware
//  export const authUser =async(req,res,next)=>{
//   try {
//     const {token} =req.headers
//     if(!token){
//       return  res.json({
//             success:false,
//             message:"not Authorized Login Again"
//         })
//     }
//     const token_decode =jwt.verify(token,process.env.JWT_SECRET)
//      req.body.userId =token_decode.id
//     next()
//   } catch (error) {
//     console.log(error)
//     res.json({
//         success:false,
//         message:error.message
//     })
//   }
// }

import jwt from "jsonwebtoken";

// User authentication middleware
export const authUser = (req, res, next) => {
  try {
    const token =
      req.headers.token ||
      (req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Please login again.",
      });
    }

    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (!tokenDecode?.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token.",
      });
    }

    req.body.userId = tokenDecode.id;

    next();
  } catch (error) {
    console.error("User authentication error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please login again.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token.",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Authentication failed. Please login again.",
    });
  }
};
