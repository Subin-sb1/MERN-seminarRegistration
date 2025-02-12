import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access Denied. No Token Provided." });
  }

  try {
    // Remove "Bearer " from token if present
    const cleanedToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
    
    // Verify token
    const decoded = jwt.verify(cleanedToken, process.env.JWT_SECRET);
    
    // Attach user data to request
    req.user = decoded;
    
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    res.status(403).json({ message: "Invalid or Expired Token" });
  }
};

export { authenticateUser};
