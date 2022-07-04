import mongoose, { Schema } from "mongoose";

const Booking = mongoose.model("Booking", new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    lab: { type: Schema.Types.ObjectId, ref: 'Lab' },
    patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
    date: Date,
    timeslot: Number,
    status: Number
}));

export default Booking;