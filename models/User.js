import mongoose, { mongo } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Username is required"],
    trim: true,
    minlength: [3, "Username must be at least  3 characters long"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters long"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// hash  password before saving it
userSchema.pre("save", async function (next) {
  if(!this.isModified('password')){
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password  = await bcrypt.hash(this.password , salt);
  }
  catch(error){
    next(error);
  }
});

// method to compare the passwords
userSchema.methods.comparePassword = async function (candidatePassword ) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;