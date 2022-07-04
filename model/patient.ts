import mongoose, { Schema } from "mongoose";

const Patient = mongoose.model("Patient", new Schema({
    name: String,
    address: String,
    blood_group: String
}));

export default Patient;