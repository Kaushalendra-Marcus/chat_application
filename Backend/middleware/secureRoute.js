import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const secureRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "No token found. Please log in." });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_TOKEN);
    } catch (error) {
      // Handle specific JWT errors
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired. Please log in again." });
      } else if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token. Please log in again." });
      } else if (error.name === "NotBeforeError") {
        return res.status(401).json({ message: "Token not active yet." });
      } else {
        return res.status(401).json({ message: "Authentication error." });
      }
    }

    // Find user
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Secure route error:", err.message);
    return res.status(500).json({ message: "Internal server error in auth middleware." });
  }
};

export default secureRoute;
