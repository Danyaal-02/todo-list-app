import { supabase } from "../app.js";
import User from "../models/user.model.js";

export const authenticate = async (req, res, next) => {
  try {
    console.log('Headers:', req.headers);
    console.log('Cookies:', req.cookies);
    
    const token = getToken(req);
    console.log('Retrieved token:', token);
    const sessionId = getSessionId(req);

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "User is not logged in - token missing",
      });
    }

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: "User is not logged in - sessionId missing",
      });
    }

    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data || !data.user) {
      throw new Error("Invalid or expired token");
    }

    const dbUser = await User.findOne({ supabaseId: data.user.id });
    if (!dbUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = {
      id: dbUser._id,
      email: dbUser.email,
      username: dbUser.username,
      sessionId,
    };

    next();
  } catch (error) {
    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};

function getToken(req) {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token && req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  return token;
}

function getSessionId(req) {
  let sessionId;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    sessionId = req.headers.authorization.split(" ")[1];
  }

  if (!sessionId && req.cookies && req.cookies.sessionId) {
    sessionId = req.cookies.sessionId;
  }

  return sessionId;
}
