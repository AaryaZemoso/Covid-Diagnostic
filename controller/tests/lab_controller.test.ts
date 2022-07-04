import LabService from "../../service/LabService";
import LabController from "../LabController";
import * as httpMocks from 'node-mocks-http';

function setup() {
    return {
        createMock: jest.spyOn(LabService.prototype, 'create'),
        updateMock: jest.spyOn(LabService.prototype, 'update'),
        removeMock: jest.spyOn(LabService.prototype, 'delete'),
        getAllMock: jest.spyOn(LabService.prototype, 'getAll'),
        getByIdMock: jest.spyOn(LabService.prototype, 'getById'),
    };
}

describe("Lab Controller", () => {

    it("Create", async () => {

        const labService = new LabService();
        const { create } = LabController(labService);
        const { createMock } = setup();

        createMock.mockResolvedValue({});

        const mockRequest = httpMocks.createRequest({});
        const mockResponse = httpMocks.createResponse();

        await create(mockRequest, mockResponse, () => { /**Empty Function */});

        expect(createMock).toBeCalled();
        expect(mockResponse.statusCode).toBe(201);
    });

    it("Create - Excpetion", async () => {

        const labService = new LabService();
        const { create } = LabController(labService);
        const { createMock } = setup();

        createMock.mockRejectedValue({});

        const mockRequest = httpMocks.createRequest({});
        const mockResponse = httpMocks.createResponse();

        await create(mockRequest, mockResponse, () => { /**Empty Function */});

        expect(createMock).toBeCalled();
        expect(mockResponse.statusCode).toBe(500);
    });

    it("Update", async () => {
        const labService = new LabService();
        const { update } = LabController(labService);
        const { updateMock } = setup();

        updateMock.mockResolvedValue({});

        const mockRequest = httpMocks.createRequest({});
        const mockResponse = httpMocks.createResponse();

        await update(mockRequest, mockResponse, () => { /**Empty Function */});

        expect(updateMock).toBeCalled();
        expect(mockResponse.statusCode).toBe(200);
    });

    it("Update - Exception", async () => {
        const labService = new LabService();
        const { update } = LabController(labService);
        const { updateMock } = setup();

        updateMock.mockRejectedValue({});

        const mockRequest = httpMocks.createRequest({});
        const mockResponse = httpMocks.createResponse();

        await update(mockRequest, mockResponse, () => { /**Empty Function */});

        expect(updateMock).toBeCalled();
        expect(mockResponse.statusCode).toBe(500);
    });

    it("Delete", async () => {
        const labService = new LabService();
        const { remove } = LabController(labService);
        const { removeMock } = setup();

        removeMock.mockResolvedValue();

        const mockRequest = httpMocks.createRequest({});
        const mockResponse = httpMocks.createResponse();

        await remove(mockRequest, mockResponse, () => { /**Empty Function */});

        expect(removeMock).toBeCalled();
        expect(mockResponse.statusCode).toBe(200);
    });

    it("Delete - Exception", async () => {
        const labService = new LabService();
        const { remove } = LabController(labService);
        const { removeMock } = setup();

        removeMock.mockRejectedValue({});

        const mockRequest = httpMocks.createRequest({});
        const mockResponse = httpMocks.createResponse();

        await remove(mockRequest, mockResponse, () => { /**Empty Function */});

        expect(removeMock).toBeCalled();
        expect(mockResponse.statusCode).toBe(500);
    });

    it("GetAll", async () => {
        const labService = new LabService();
        const { getAll } = LabController(labService);
        const { getAllMock } = setup();

        getAllMock.mockResolvedValue([]);

        const mockRequest = httpMocks.createRequest({});
        const mockResponse = httpMocks.createResponse();

        await getAll(mockRequest, mockResponse, () => { /**Empty Function */});

        expect(getAllMock).toBeCalled();
        expect(mockResponse.statusCode).toBe(200);
    });

    it("GetAll - Exception", async () => {
        const labService = new LabService();
        const { getAll } = LabController(labService);
        const { getAllMock } = setup();

        getAllMock.mockRejectedValue({});

        const mockRequest = httpMocks.createRequest({});
        const mockResponse = httpMocks.createResponse();

        await getAll(mockRequest, mockResponse, () => { /**Empty Function */});

        expect(getAllMock).toBeCalled();
        expect(mockResponse.statusCode).toBe(500);
    });

    it("GetById", async () => {
        const labService = new LabService();
        const { getById } = LabController(labService);
        const { getByIdMock } = setup();

        getByIdMock.mockResolvedValue([]);

        const mockRequest = httpMocks.createRequest({});
        const mockResponse = httpMocks.createResponse();

        await getById(mockRequest, mockResponse, () => { /**Empty Function */});

        expect(getByIdMock).toBeCalled();
        expect(mockResponse.statusCode).toBe(200);
    });

    it("GetById - Error 404", async () => {
        const labService = new LabService();
        const { getById } = LabController(labService);
        const { getByIdMock } = setup();

        getByIdMock.mockResolvedValue(undefined);

        const mockRequest = httpMocks.createRequest({});
        const mockResponse = httpMocks.createResponse();

        await getById(mockRequest, mockResponse, () => { /**Empty Function */});

        expect(getByIdMock).toBeCalled();
        expect(mockResponse.statusCode).toBe(404);
    });

    it("GetById - Exception", async () => {
        const labService = new LabService();
        const { getById } = LabController(labService);
        const { getByIdMock } = setup();

        getByIdMock.mockRejectedValue({});

        const mockRequest = httpMocks.createRequest({});
        const mockResponse = httpMocks.createResponse();

        await getById(mockRequest, mockResponse, () => { /**Empty Function */});

        expect(getByIdMock).toBeCalled();
        expect(mockResponse.statusCode).toBe(500);
    });

});