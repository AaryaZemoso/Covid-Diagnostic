import BookingService from "../../service/BookingService";
import PatientService from "../../service/PatientService";

import * as httpMocks from "node-mocks-http";
import BookingController from "../BookingController";

describe("Booking Controller", () => {
  it("Book", async () => {
    const service = new BookingService(new PatientService());

    const createMock = jest
      .spyOn(BookingService.prototype, "create")
      .mockResolvedValue({});

    const mockRequest = httpMocks.createRequest({
      body: {
        blood_group: "C",
        name: "D",
        date: "2021-12-2",
        timeslot: "F",
      },
      params: {
        id: "A",
      },
    });
    const mockResponse = httpMocks.createResponse({
      locals: {
        userID: "B",
      },
    });

    const { book } = BookingController(service);

    await book(mockRequest, mockResponse, () => {
      /** Empty Function */
    });

    expect(mockResponse.statusCode).toBe(200);
    expect(createMock).toBeCalled();
  });

  it("Book - Bad Request", async () => {
    const service = new BookingService(new PatientService());

    const createMock = jest
      .spyOn(BookingService.prototype, "create")
      .mockResolvedValue({});

    const mockRequest = httpMocks.createRequest({
      body: {
        name: "D",
        date: "2021-12-2",
        timeslot: "F",
      },
      params: {
        id: "A",
      },
    });
    const mockResponse = httpMocks.createResponse({
      locals: {
        userID: "B",
      },
    });

    const { book } = BookingController(service);

    await book(mockRequest, mockResponse, () => {
      /** Empty Function */
    });

    expect(mockResponse.statusCode).toBe(400);
    expect(createMock).toBeCalled();
  });

  it("Book - Exception", async () => {
    const service = new BookingService(new PatientService());
    const createMock = jest
      .spyOn(BookingService.prototype, "create")
      .mockRejectedValue({});

    const mockRequest = httpMocks.createRequest({
      body: {
        blood_group: "C",
        name: "D",
        date: "2021-12-2",
        timeslot: "F",
      },
      params: {
        id: "A",
      },
    });
    const mockResponse = httpMocks.createResponse({
      locals: {
        userID: "B",
      },
    });

    const { book } = BookingController(service);

    await book(mockRequest, mockResponse, () => {
      /** Empty Function */
    });

    expect(mockResponse.statusCode).toBe(500);
    expect(createMock).toBeCalled();
  });

  it("Unbook", async () => {
    const service = new BookingService(new PatientService());
    const deleteMock = jest
      .spyOn(BookingService.prototype, "deleteByLabIdAndUserId")
      .mockResolvedValue();

    const mockRequest = httpMocks.createRequest({
      params: {
        id: "A",
      },
    });
    const mockResponse = httpMocks.createResponse({
      locals: {
        userID: "B",
      },
    });

    const { unbook } = BookingController(service);

    await unbook(mockRequest, mockResponse, () => {
      /** Empty Function */
    });

    expect(mockResponse.statusCode).toBe(200);
    expect(deleteMock).toBeCalled();
  });

  it("Unbook - Exception", async () => {
    const service = new BookingService(new PatientService());
    const deleteMock = jest
      .spyOn(BookingService.prototype, "deleteByLabIdAndUserId")
      .mockRejectedValue({});

    const mockRequest = httpMocks.createRequest({
      params: {
        id: "A",
      },
    });
    const mockResponse = httpMocks.createResponse({
      locals: {
        userID: "B",
      },
    });

    const { unbook } = BookingController(service);

    await unbook(mockRequest, mockResponse, () => {
      /** Empty Function */
    });

    expect(mockResponse.statusCode).toBe(500);
    expect(deleteMock).toBeCalled();
  });

  it("Payment", async () => {
    const service = new BookingService(new PatientService());
    const paymentMock = jest
      .spyOn(BookingService.prototype, "payment")
      .mockResolvedValue({});

    const mockRequest = httpMocks.createRequest({
      body: {
        address: "A",
      },
      params: {
        id: "A",
      },
    });
    const mockResponse = httpMocks.createResponse({
      locals: {
        userID: "B",
      },
    });

    const { payment } = BookingController(service);

    await payment(mockRequest, mockResponse, () => {
      /** Empty Function */
    });

    expect(mockResponse.statusCode).toBe(200);
    expect(paymentMock).toBeCalled();
  });

  it("Payment - Bad Request", async () => {
    const service = new BookingService(new PatientService());
    const paymentMock = jest
      .spyOn(BookingService.prototype, "payment")
      .mockResolvedValue({});

    const mockRequest = httpMocks.createRequest({
      params: {
        id: "A",
      },
    });
    const mockResponse = httpMocks.createResponse({
      locals: {
        userID: "B",
      },
    });

    const { payment } = BookingController(service);

    await payment(mockRequest, mockResponse, () => {
      /** Empty Function */
    });

    expect(mockResponse.statusCode).toBe(400);
    expect(paymentMock).toBeCalled();
  });


  it("Payment - Exception", async () => {
    const service = new BookingService(new PatientService());
    const paymentMock = jest
      .spyOn(BookingService.prototype, "payment")
      .mockRejectedValue({});

    const mockRequest = httpMocks.createRequest({
        body: {
            address: "A"
        },
      params: {
        id: "A",
      },
    });
    const mockResponse = httpMocks.createResponse({
      locals: {
        userID: "B",
      },
    });

    const { payment } = BookingController(service);

    await payment(mockRequest, mockResponse, () => {
      /** Empty Function */
    });

    expect(mockResponse.statusCode).toBe(500);
    expect(paymentMock).toBeCalled();
  });
});
