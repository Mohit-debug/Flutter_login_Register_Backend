import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
        type: String,
        default: null,
        
    },
    password: {
        type: String,
        required: true,
    },
    phone_number: {
      type: Number,
      required: true,
      unique: true
    }
    
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
