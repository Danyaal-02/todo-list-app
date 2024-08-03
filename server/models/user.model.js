import moment from "moment-timezone";
import mongoose, { Schema, model } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    username: {
      type: String,
      required: true,
    },
    supabaseId: {
      type: String,
      required: true,
      unique: true,
    },
    sessions: [
      {
        sessionId:String,
        loginTime: {
          type: Date,
        },
        logoutTime: {
          type: Date,
        },
        ipAddress: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);


userSchema.methods.addLoginSession = function(ipAddress) {
  const sessionId = uuidv4();
  const loginTime = moment.tz(new Date(), "Asia/Kolkata").format('YYYY-MM-DD HH:mm:ss');
  this.sessions.push({
    sessionId,
    loginTime,
    ipAddress,
  });
  return this.save();
};

userSchema.methods.updateLogoutTime = function(sessionId) {
  const session = this.sessions.find(s => s.sessionId === sessionId);
  let logoutTime = moment.tz(new Date(), "Asia/Kolkata").format('YYYY-MM-DD HH:mm:ss');
  if (session) {
    session.logoutTime = logoutTime
    return this.save();
  }
  return Promise.resolve(this);
};

const User = mongoose.models.User || model("User", userSchema);

export default User;
