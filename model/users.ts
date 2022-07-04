import mongoose, { Schema } from "mongoose";

const User = mongoose.model("User", new Schema({
    name: String,
    email: String,
    password: String
}));

export default User;