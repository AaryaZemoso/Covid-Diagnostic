import Patient from "../../model/patient";
import PatientService from "../PatientService";

function setup() {
    return {
      saveMock: jest.spyOn(Patient.prototype, "save"),
      findOneMock: jest.spyOn(Patient, "findOne"),
      removeMock: jest.spyOn(Patient.prototype, "remove"),
      findAllMock: jest.spyOn(Patient, "find"),
    };
  }
  

describe("Patient Service", () => {
    it("Create", async () => {

        const service = new PatientService();
        const { saveMock } = setup();

        saveMock.mockResolvedValue({});
        await service.create("", "", "");

        expect(saveMock).toBeCalled();
    });

    it("Update", async () => {
        
        const service = new PatientService();
        const { saveMock, findOneMock } = setup();

        findOneMock.mockResolvedValue(new Patient({name: "A", address: "B", blood_group: "C"}));
        saveMock.mockResolvedValue({});

        await service.update({id: "1"});
        await service.update({id: "1", name: "C"});
        await service.update({id: "1", address: "D"});
        await service.update({id: "1", blood_group: "E"});

        expect(findOneMock).toBeCalled();
        expect(saveMock).toBeCalled();
    })

    it("Update - Exception", async () => {
        
        const service = new PatientService();
        const { findOneMock } = setup();

        findOneMock.mockResolvedValue(undefined);

        try {
            await service.update({id: "1"})
            fail();
        } catch (err) {

        }

        expect(findOneMock).toBeCalled();
    });

    it("Delete", async () => {
        const service = new PatientService();
        const { findOneMock, removeMock } = setup();

        findOneMock.mockResolvedValue(new Patient({}));
        removeMock.mockResolvedValue({});

        await service.delete("1");

        expect(findOneMock).toBeCalled();
        expect(removeMock).toBeCalled();
    });

    it("Delete - Exception", async () => {
        const service = new PatientService();

        const { findOneMock } = setup();
        findOneMock.mockResolvedValue(undefined);

        try {
            await service.delete("1");
            fail();
        } catch (err) {}

        expect(findOneMock).toBeCalled();

    });

    it("GetById", async () => {
        
        const service = new PatientService();

        const { findOneMock } = setup();
        findOneMock.mockResolvedValue({});

        const data = await service.getById("");

        expect(data).not.toBeNull();
        expect(findOneMock).toBeCalled();
    });

    it("GetById - Exception", async () => {

        const service = new PatientService();

        const { findOneMock } = setup();
        findOneMock.mockResolvedValue(undefined);

        try {
            await service.getById("");
            fail();
        } catch (err) {

        }

        expect(findOneMock).toBeCalled();
    });

    it("GetAll", async () => {
        const service = new PatientService();

        const { findAllMock } = setup();
        findAllMock.mockResolvedValue([{}, {}]);

        const data = await service.getAll();

        expect(data.length).toBe(2);
        expect(findAllMock).toBeCalled();
    })
});
