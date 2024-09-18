import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // This ensures that the email must be unique
    // You can add other validation options like match to ensure email format
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
  },
  date: { type: Date, default: Date.now() },
});

const EmailModel = mongoose.models.email || mongoose.model("email", Schema);

export default EmailModel;
