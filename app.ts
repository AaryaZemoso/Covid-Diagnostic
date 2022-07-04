import bodyParser from "body-parser";
import http from "http";

import express, { Application } from "express";

import auth from "./middleware/auth";
import logger from "./middleware/logger";

import properties from "./properties";
import { DBConfig } from "./config/dbconfig";
import CreateMongoDBConnection from "./database/mongodb";

import LabService from "./service/LabService";
import UserService from "./service/UserService";
import BookingService from "./service/BookingService";
import PatientService from "./service/PatientService";

import LabController from "./controller/LabController";
import TokenController from "./controller/TokenController";
import BookingController from "./controller/BookingController";
import AppointmentController from "./controller/AppointmentController";

import LabRoute from "./routes/LabRoute";
import AuthRoute from "./routes/AuthRoute";
import BookingRoute from "./routes/BookingRoute";
import AppointmentRoute from "./routes/AppointmentRoute";

const main = async () => {
    
    const config: DBConfig = {
        host: properties.DB_HOST,
        port: properties.DB_PORT,
        database: properties.DB_DATABASE,
    };

    await CreateMongoDBConnection(config);
    
    const labService = new LabService();
    const userService = new UserService();
    const patientService = new PatientService();
    const bookingService = new BookingService(patientService);

    const labController = LabController(labService);
    const tokenController = TokenController(userService);
    const appointmentController = AppointmentController(bookingService, userService, labService, patientService);
    const bookingController = BookingController(bookingService);
    
    const authRoute = AuthRoute(tokenController);
    const labRoute = LabRoute(labController);
    const appointmentRoute = AppointmentRoute(appointmentController);
    const bookingRoute = BookingRoute(bookingController);

    const app: Application = express();
    const jsonParser = bodyParser.json();

    app.use(logger);
    app.use(jsonParser);

    app.use("/labs", auth, labRoute);
    app.use("/auth", authRoute);
    app.use("/appointments", auth, appointmentRoute);
    app.use("/labs", auth, bookingRoute);
    
    const server = http.createServer(app);
    server.listen(properties.APP_PORT);

    console.log("Started server : http://localhost:" + properties.APP_PORT)
}

main();