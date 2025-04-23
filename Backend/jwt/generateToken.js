import jwt from "jsonwebtoken";

const createTokenAndSaveCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
    expiresIn: "7d",
  });

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("jwt", token, {
    httpOnly: true,      // ✅ Secure cookie (can't access via JS)
    secure: false, // ✅ Only https in production
    sameSite: "lax",      // ✅ Works with most frontend setups
    maxAge : 24 * 60 * 60 * 1000,
  });
};

export default createTokenAndSaveCookie;
