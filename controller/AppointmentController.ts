import { NextFunction, Request, Response } from "express";
import BookingService from "../service/BookingService";
import LabService from "../service/LabService";
import PatientService from "../service/PatientService";
import UserService from "../service/UserService";

export interface IAppointmentController {
  appointments: (req: Request, res: Response, next: NextFunction) => {};
}

interface AppointmentDTO {
    id: string,
    lab: {
        name: string,
        price: string,
    },
    patient: {
        name: string,
        blood_group: string,
        address: string,
    },
    booking: {
        name_of_payee: string,
        payment: string,
    },
    date: string,
    timeslot: number,
    status: number,
}

function AppointmentController(
  bookingService: BookingService,
  userService: UserService,
  labService: LabService,
  patientService: PatientService,
) {
  const appointments = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userID = res.locals.userID;
    try {
      const data = await bookingService.getUserAppointments(userID);
      const tempData = await Promise.all(data.map(async (value) => {
        const userData = await userService.getById(value.user);
        const labData = await labService.getById(value.lab);
        const patientData = await patientService.getById(value.patient);

        return {
          id: value._id,
          lab: {
              name: labData.name,
              price: labData.price
          },
          patient: {
              name: patientData.name,
              blood_group: patientData.blood_group,
              address: patientData.address
          },
          booking:{
              name_of_payee: userData.name,
              payment: "Success"
          },
          date: value.date,
          timeslot: value.timeslot,
          status: value.status,
        } as AppointmentDTO;
      }));

      res.json(tempData);
      return;
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  };

  return {
    appointments: appointments,
  } as IAppointmentController;
}

export default AppointmentController;
