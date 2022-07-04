import LabService from "../LabService";
import Lab from "../../model/lab";
import { ObjectId } from "mongodb";

function setup() {
  return {
    saveMock: jest.spyOn(Lab.prototype, "save"),
    findOneMock: jest.spyOn(Lab, "findOne"),
    removeMock: jest.spyOn(Lab.prototype, "remove"),
    findAllMock: jest.spyOn(Lab, "find"),
  };
}

describe("Lab Service Tests", () => {

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("Create", async () => {
    const service = new LabService();
    const saveMock = jest.spyOn(Lab.prototype, "save");
    saveMock.mockResolvedValue({ _id: "123", name: "Lab 2", price: 0 });
    service.create("Lab 2", 0);

    expect(saveMock).toBeCalled();
  });

  it("Update", async () => {
    const service = new LabService();

    const { saveMock, findOneMock } = setup();
    findOneMock.mockResolvedValue(
      new Lab({ _id: new ObjectId(1), name: "A", price: 21 })
    );
    saveMock.mockResolvedValue({
      _id: new ObjectId(1),
      name: "Lab 2",
      price: 0,
    });

    await service.update({
      id: 1,
      name: "New Covid",
    });

    await service.update({
      id: 1,
      price: 21,
    });

    expect(saveMock).toBeCalledTimes(2);
  });

  it("Update - Lab does not exist", async () => {
    const service = new LabService();

    const { saveMock, findOneMock } = setup();
    findOneMock.mockResolvedValue(undefined);
    saveMock.mockResolvedValue({
      _id: new ObjectId(1),
      name: "Lab 2",
      price: 0,
    });

    try {
      await service.update({
        id: new ObjectId(1),
      });
      fail("Should throw error");
    } catch (err) {
      // console.log(err)
    }

    expect(findOneMock).toBeCalledTimes(1);
    expect(saveMock).toBeCalledTimes(0);
  });

  it("Delete", async () => {
    const service = new LabService();

    const { removeMock, findOneMock } = setup();
    findOneMock.mockResolvedValue(
      new Lab({ _id: new ObjectId(1), name: "A", price: 21 })
    );
    removeMock.mockResolvedValue({
      _id: new ObjectId(1),
      name: "Lab 2",
      price: 0,
    });

    await service.delete(1);

    expect(findOneMock).toBeCalledTimes(1);
    expect(removeMock).toBeCalledTimes(1);
  });

  it("Delete - Exception", async () => {
    const service = new LabService();

    const { findOneMock } = setup();
    findOneMock.mockResolvedValue(undefined);

    try {
      await service.delete(1);
      fail("Error should be thrown");
    } catch (err) {
      // console.log(err)
    }

    expect(findOneMock).toBeCalledTimes(1);
  });

  it("GetById", async () => {
    const service = new LabService();

    const { findOneMock } = setup();

    findOneMock.mockResolvedValue({_id: 1})
    const data = await service.getById(1);

    expect(findOneMock).toBeCalledTimes(1);
    expect(data).not.toBeNull();
  });

  it("GetById - Exception", async () => {
    const service = new LabService();

    const { findOneMock } = setup();

    findOneMock.mockResolvedValue(undefined);

    try {
      await service.getById(1);
      fail("Should throw error");
    } catch (err) {}

    expect(findOneMock).toBeCalledTimes(1);
  });

  it("GetAll", async () => {
    const service = new LabService();

    const { findAllMock } = setup();
    findAllMock.mockResolvedValue([{_id: 1}, {_id: 2}]);

    const data = await service.getAll();

    expect(findAllMock).toBeCalledTimes(1);
    expect(data.length).toBe(2);
  });
});
