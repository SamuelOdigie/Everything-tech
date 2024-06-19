import jwt from "jsonwebtoken";

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_Secret);
    console.log("jwt verified", decoded);
    return decoded;
  } catch (error) {
    return null;
  }
};
