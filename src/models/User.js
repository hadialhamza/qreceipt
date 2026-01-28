import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      select: false, // Security: Do not return password by default in queries
    },
    role: {
      type: String,
      default: "admin", // Useful if you have multiple roles later
    },
  },
  { timestamps: true },
);

// Prevent model recompilation error in Next.js
export default mongoose.models.User || mongoose.model("User", UserSchema);
