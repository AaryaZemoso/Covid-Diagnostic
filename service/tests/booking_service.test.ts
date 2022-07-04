import { now } from "mongoose";
import Booking from "../../model/bookings";
import Patient from "../../model/patient";
import BookingService from "../BookingService";
import PatientService from "../PatientService";

function setup() {
  return {
    saveMock: jest.spyOn(Booking.prototype, "save"),
    findOneMock: jest.spyOn(Booking, "findOne"),
    removeMock: jest.spyOn(Booking.prototype, "remove"),
    findAllMock: jest.spyOn(Booking, "find"),
  };
}

function patientServiceSetup() {
  return {
    createMock: jest.spyOn(PatientService.prototype, "create"),
    updateMock: jest.spyOn(PatientService.prototype, "update"),
  };
}

describe("Booking Service", () => {

    it("Create", async () => {
      
      const patientService = new PatientService();
      const service = new BookingService(patientService);

      const { createMock } = patientServiceSetup();
      const { saveMock, findOneMock } = setup();

      findOneMock.mockResolvedValue(undefined);
      createMock.mockResolvedValue({});
      saveMock.mockResolvedValue({});

      await service.create("1", "2", { patient_name: "a", patient_blood_group: "s"}, now(), 1);

      expect(createMock).toBeCalled();
      expect(saveMock).toBeCalled();

    });

    it("Create - Exception", async () => {

      const patientService = new PatientService();
      const service = new BookingService(patientService);

      const { findOneMock } = setup();

      findOneMock.mockResolvedValue({});

      try {
        await service.create("1", "2", { patient_name: "a", patient_blood_group: "s"}, now(), 1);
        fail("Should throw error!!");
      } catch (err) {
        
      }
    });

    it("Payment", async () => {

      const patientService = new PatientService();
      const service = new BookingService(patientService);

      const { updateMock } = patientServiceSetup();
      const { saveMock, findOneMock } = setup();

      findOneMock.mockResolvedValue(new Booking({patient: new Patient({_id: "1"}) }));
      updateMock.mockResolvedValue({});
      saveMock.mockResolvedValue({});

      await service.payment("1", "2", "as");

      expect(updateMock).toBeCalled();
      expect(saveMock).toBeCalled();

    });

    it("Payment - Exception", async () => {

      const patientService = new PatientService();
      const service = new BookingService(patientService);

      const { findOneMock } = setup();

      findOneMock.mockResolvedValue(undefined);

      try {
        await service.payment("1", "2", "ASD");
        fail("Should throw error!!");
      } catch (err) {
        
      }
    });

    it("Delete", async () => {

      const { removeMock, findOneMock } = setup();

      const patientService = new PatientService();
      const service = new BookingService(patientService);

      findOneMock.mockResolvedValue(new Booking({}));
      removeMock.mockResolvedValue({});

      await service.delete("1");

      expect(removeMock).toBeCalled();
      expect(findOneMock).toBeCalled();
    });

    it("Delete - Exception", async () => {

      const { findOneMock } = setup();

      const patientService = new PatientService();
      const service = new BookingService(patientService);

      findOneMock.mockResolvedValue(undefined);
      
      try {
        await service.delete("1");
        fail("Should throw error!!");
      } catch (err) {

      }
    });

    it("DeleteById", async () => {

      const { removeMock, findOneMock } = setup();

      const patientService = new PatientService();
      const service = new BookingService(patientService);

      findOneMock.mockResolvedValue(new Booking({}));
      removeMock.mockResolvedValue({});

      await service.deleteByLabIdAndUserId("1", "2");

      expect(removeMock).toBeCalled();
      expect(findOneMock).toBeCalled();
    });

    it("DeleteById - Exception", async () => {

      const { findOneMock } = setup();

      const patientService = new PatientService();
      const service = new BookingService(patientService);

      findOneMock.mockResolvedValue(undefined);
      
      try {
        await service.deleteByLabIdAndUserId("1", "2");
        fail("Should throw error!!");
      } catch (err) {

      }
    });

    it("GetUserAppointments", async () => {

      const { findAllMock } = setup();

      const patientService = new PatientService();
      const service = new BookingService(patientService);

      findAllMock.mockResolvedValue([]);

      await service.getUserAppointments(1);

      expect(findAllMock).toBeCalled();

    });

    it("GetById", async () => {

      const { findOneMock } = setup();

      const patientService = new PatientService();
      const service = new BookingService(patientService);

      findOneMock.mockResolvedValue({});
      
      await service.getById("1");

      expect(findOneMock).toBeCalled();
    });

    it("GetById - Exception", async () => {

      const { findOneMock } = setup();

      const patientService = new PatientService();
      const service = new BookingService(patientService);

      findOneMock.mockResolvedValue(undefined);

      try {
        await service.getById("1")
        fail("Should throw error");
      } catch (err) {

      }
    });

    it("GetAll", async () => {
      
      const { findAllMock } = setup();

      const patientService = new PatientService();
      const service = new BookingService(patientService);

      findAllMock.mockResolvedValue([{}, {}]);

      const data = await service.getAll();

      expect(findAllMock).toBeCalled();
      expect(data).not.toBeNull();
      expect(data.length).toBe(2);

    });
});
