import { NextFunction, Request, Response } from "express";
import BookingService from "../service/BookingService";

export interface IBookController {
  book: (req: Request, res: Response, next: NextFunction) => {};
  unbook: (req: Request, res: Response, next: NextFunction) => {};
  payment: (req: Request, res: Response, next: NextFunction) => {};
}

function BookingController(service: BookingService) {
  const book = async (req: Request, res: Response, next: NextFunction) => {
    const lab_id = req.params.id;
    const user_id = res.locals.userID;

    const patient_name = req.body.name;
    const patient_blood_group = req.body.blood_group;
    const date = new Date(req.body.date);
    const time = req.body.timeslot;

    if (
      !(
        lab_id &&
        user_id &&
        patient_blood_group &&
        patient_name &&
        date &&
        time
      )
    ) {
      res.status(400).json({
        status: 400,
        message: "Bad Request",
      });
      return;
    }

    try {
      await service.create(
        user_id,
        lab_id,
        {
          patient_name: patient_name,
          patient_blood_group: patient_blood_group,
        },
        date,
        time
      );

      res.status(200).json({
        status: 200,
        message: "Proceed for payment",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  };

  const unbook = async (req: Request, res: Response, next: NextFunction) => {
    const lab_id = req.params.id;
    const user_id = res.locals.userID;

    try {
      await service.deleteByLabIdAndUserId(lab_id, user_id);

      res.status(200).json({
        status: 200,
        message: "Booking cancelled",
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  };

  const payment = async (req: Request, res: Response, next: NextFunction) => {
    const lab_id = req.params.id;
    const user_id = res.locals.userID;

    const patient_address = req.body.address;

    if (!patient_address) {
      res.status(400).json({
        status: 400,
        message: "Bad Request",
      });
      return;
    }

    try {
      console.log(user_id, lab_id);
      await service.payment(user_id, lab_id, patient_address);
      res.json({
        status: 200,
        message: "Payment Recieved!! Appointment all set.",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  };

  return {
    book: book,
    unbook: unbook,
    payment: payment,
  } as IBookController;
}

export default BookingController;
