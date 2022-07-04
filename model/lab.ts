import mongoose, { Schema } from "mongoose";

const Lab = mongoose.model("Lab", new Schema({
    name: String,
    price: Number
}));

export default Lab;