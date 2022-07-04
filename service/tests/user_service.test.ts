import User from "../../model/users";
import UserService from "../UserService";

function setup() {
  return {
    saveMock: jest.spyOn(User.prototype, "save"),
    findOneMock: jest.spyOn(User, "findOne"),
    removeMock: jest.spyOn(User.prototype, "remove"),
    findAllMock: jest.spyOn(User, "find"),
  };
}

describe("Lab Service Tests", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("Create", async () => {
    const service = new UserService();

    const { saveMock, findOneMock } = setup();

    findOneMock.mockResolvedValue(undefined);
    saveMock.mockResolvedValue({ _id: "123", name: "Lab 2" });
    await service.create("Lab 2", "email", "password");

    expect(findOneMock).toBeCalledTimes(1)
    expect(saveMock).toBeCalledTimes(1);
  });

  it("Create - Exception", async () => {
    const service = new UserService();

    const { saveMock, findOneMock } = setup();

    findOneMock.mockResolvedValue({_id: "123"});
    saveMock.mockResolvedValue({ _id: "123", name: "Lab 2" });

    try {
      await service.create("Aarya", "a@gmail.com", "aarya");
      fail("Error should occur");
    } catch (err) {
      expect((err as Error).message).toBe(
        "User already exists with this email"
      );
    }
  });

  it("Update", async () => {
    const service = new UserService();

    const { saveMock, findOneMock } = setup();

    findOneMock.mockResolvedValue(new User({_id: "123"}));
    saveMock.mockResolvedValue({ _id: "123", name: "ASD" });

    await service.update({
      id: 1,
      name: "Dev",
    });

    await service.update({
      id: 1,
    });

    expect(findOneMock).toBeCalledTimes(2);
    expect(saveMock).toBeCalledTimes(2);
  });

  it("Update - User does not exist", async () => {
    const service = new UserService();

    const { findOneMock } = setup();
    findOneMock.mockResolvedValue(undefined);

    try {
      await service.update({
        id: 1,
      });
      fail("Should throw error");
    } catch (err) {
      // console.log(err)
    }

    expect(findOneMock).toBeCalledTimes(1);
  });

  it("Delete", async () => {
    const service = new UserService();

    const { findOneMock, removeMock } = setup();
    findOneMock.mockResolvedValue(new User({_id: 1}));
    removeMock.mockResolvedValue({});

    await service.delete(1);

    expect(findOneMock).toBeCalled();
    expect(removeMock).toBeCalled();
  });

  it("Delete - Exception", async () => {
    const service = new UserService();

    const { findOneMock } = setup();
    findOneMock.mockResolvedValue(undefined);

    try {
      await service.delete(1);
      fail("Error should be thrown");
    } catch (err) {
      // console.log(err)
    }

    expect(findOneMock).toBeCalled();
  });

  it("GetById", async () => {
    const service = new UserService();

    const { findOneMock } = setup();
    findOneMock.mockResolvedValue({});

    const data = await service.getById(1);

    expect(data).not.toBeNull();
    expect(findOneMock).toBeCalled();
  });

  it("GetById - Exception", async () => {
    const service = new UserService();

    const { findOneMock } = setup();
    findOneMock.mockResolvedValue(undefined);

    try {
      await service.getById(1);
      fail("Should throw error");
    } catch (err) {}
  });

  it("GetByEmail", async () => {
    const service = new UserService();

    const { findOneMock } = setup();
    findOneMock.mockResolvedValue({});

    const user = await service.getByEmail("a@gmail.com");

    expect(user).not.toBeNull();
    expect(findOneMock).toBeCalled();
  });

  it("GetByEmail - Exception", async () => {
    const service = new UserService();

    const { findOneMock } = setup();
    findOneMock.mockResolvedValue(undefined);
    
    try {
      await service.getByEmail("A");
      fail("Should throw error");
    } catch (err) {}

    expect(findOneMock).toBeCalled();
  });

  it("GetAll", async () => {
    const service = new UserService();

    const { findAllMock } = setup();
    findAllMock.mockResolvedValue([{}, {}])

    const data = await service.getAll();

    expect(findAllMock).toBeCalled();
    expect(data).not.toBeNull();
    expect(data.length).toBe(2);
  });
});
