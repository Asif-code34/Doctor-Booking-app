// import jwt from 'jsonwebtoken'
// //doctor authentication middlware
//  export const authDoctor =async(req,res,next)=>{
//   try {
//     const {dtoken} =req.headers
//     if(!dtoken){
//       return  res.json({
//             success:false,
//             message:"not Authorized Login Again"
//         })
//     }
//     const token_decode =jwt.verify(dtoken,process.env.JWT_SECRET)
//      req.body.docId =token_decode.id
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

// Doctor authentication middleware
export const authDoctor = (req, res, next) => {
  try {
    const dtoken = req.headers.dtoken;

    if (!dtoken) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Please login again.",
      });
    }

    const tokenDecode = jwt.verify(dtoken, process.env.JWT_SECRET);

    if (!tokenDecode?.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token.",
      });
    }

    req.body.docId = tokenDecode.id;

    next();
  } catch (error) {
    console.error("Doctor authentication error:", error.message);

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
