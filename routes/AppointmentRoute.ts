import { Router } from "express";
import { IAppointmentController } from "../controller/AppointmentController";

function AppointmentRoute (controller: IAppointmentController) {
    const router = Router();
    router.get("/", controller.appointments);
    return router;
}

export default AppointmentRoute;