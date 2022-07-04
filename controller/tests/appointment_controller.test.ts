import BookingService from "../../service/BookingService";
import LabService from "../../service/LabService";
import PatientService from "../../service/PatientService";
import UserService from "../../service/UserService";

import * as httpMocks from 'node-mocks-http';
import AppointmentController from "../AppointmentController";


describe("Appointment Controller", () => {

    it("Appoinments", async () => {

        const labService = new LabService();
        const userService = new UserService()
        const patientService = new PatientService();
        const bookingService = new BookingService(patientService);

        const userAppointmentsMock = jest.spyOn(BookingService.prototype, 'getUserAppointments').mockResolvedValue([{user: "2", lab: "2"}, { user: "3", lab: "3"}]);
        const userGetByIdMock = jest.spyOn(UserService.prototype, 'getById').mockResolvedValue({});
        const patientGetByIdMock = jest.spyOn(PatientService.prototype, 'getById').mockResolvedValue({});
        const labGetByIdMock = jest.spyOn(LabService.prototype, 'getById').mockResolvedValue({});

        const mockRequest = httpMocks.createRequest({});
        const mockResponse = httpMocks.createResponse();

        const { appointments } = AppointmentController(bookingService, userService, labService, patientService);

        await appointments(mockRequest, mockResponse, () => {/**Empty Function */})

        expect(userAppointmentsMock).toBeCalled();
        expect(userGetByIdMock).toBeCalled();
        expect(patientGetByIdMock).toBeCalled();
        expect(labGetByIdMock).toBeCalled();
        expect(mockResponse.statusCode).toBe(200);

    });

    it("Appoinments - Exception", async () => {

        const patientService = new PatientService();
        const bookingService = new BookingService(patientService);

        const userAppointmentsMock = jest.spyOn(BookingService.prototype, 'getUserAppointments').mockRejectedValue({})

        const mockRequest = httpMocks.createRequest({});
        const mockResponse = httpMocks.createResponse();

        const { appointments } = AppointmentController(bookingService, new UserService(), new LabService(), patientService);

        await appointments(mockRequest, mockResponse, () => {/**Empty Function */})

        expect(userAppointmentsMock).toBeCalled();
        expect(mockResponse.statusCode).toBe(500);

    });

});