import { ObjectId } from "mongodb";
import Booking from "../model/bookings";
import PatientService from "./PatientService";

class BookingService {

    patientService: PatientService;

    constructor(patientService: PatientService) {
        this.patientService = patientService;
    }

    async create(
        user_id: string, 
        lab_id: string, 
        {
            patient_name, 
            patient_blood_group
        }: {
            patient_name: string,
            patient_blood_group: string
        }, 
        date: Date, 
        timeslot: number
    ) {
        const booking = await Booking.findOne({ lab: lab_id, date: date, timeslot: timeslot});
        if (booking) {
            throw new Error("Already someone has allocated the timeslot");
        }
        
        const patient = await this.patientService.create(patient_name, "", patient_blood_group);

        const newBooking = new Booking({
            user: user_id,
            lab: lab_id,
            patient: patient,
            date: date,
            timeslot: timeslot,
            status: 0
        });

        return newBooking.save();
    }

    async payment(user_id: string, lab_id: string, patient_address: string) {
        const booking = await Booking.findOne({user: user_id, lab: lab_id, status: 0});
        if (!booking) {
            throw new Error("No active bookings for payments");
        }

        const patient = booking.patient;

        const updatedPatient = await this.patientService.update({id: patient._id, address: patient_address})

        booking.patient = updatedPatient;
        booking.status = 1;

        return booking.save();

    }

    async delete(id: string) {
        const booking = await Booking.findOne({_id: id});
        if (!booking) {
            throw new Error("Could not find booking with id : " + id);
        }

        await booking.remove();
    }

    async deleteByLabIdAndUserId(lab_id: string, user_id: string) {
        const booking = await Booking.findOne({lab: lab_id, user: user_id, status: 0});
        if (!booking) {
            throw new Error("No active bookings");
        }

        await booking.remove();
    }

    async getUserAppointments(user_id: string | number | ObjectId) {
        return Booking.find({user: user_id, status: 1});      
    }

    async getById(id: string) {
        const booking = await Booking.findOne({_id: id});
        if (!booking) {
            throw new Error("Could not find booking with id : " + id);
        }

        return booking;
    }

    async getAll() {
        return Booking.find();
    }
}

export default BookingService;