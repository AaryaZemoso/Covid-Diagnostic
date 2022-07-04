import UserService from "../../service/UserService";

import * as httpMocks from "node-mocks-http";
import TokenController from "../TokenController";

describe("Token Controller", () => {
  it("Generate Token", async () => {
    
    const service = new UserService();
    const { generateToken } = TokenController(service);

    const getByEmailMock = jest.spyOn(UserService.prototype, 'getByEmail').mockResolvedValue({_id: 1});
    
    const mockRequest = httpMocks.createRequest({});
    const mockResponse = httpMocks.createResponse();

    await generateToken(mockRequest, mockResponse, () => {
      /** Empty Function */
    });

    expect(mockResponse.statusCode).toBe(200);
    expect(JSON.parse(mockResponse._getData()).token).not.toBeNull();
    expect(getByEmailMock).toBeCalled();
  });

  it("Generate Token - Wrong Password", async () => {
    
    const service = new UserService();
    const { generateToken } = TokenController(service);

    const getByEmailMock = jest.spyOn(UserService.prototype, 'getByEmail').mockResolvedValue({_id: 1, password: "123"});
    
    const mockRequest = httpMocks.createRequest({
        body: {
            password: "1234"
        }
    });
    const mockResponse = httpMocks.createResponse();

    await generateToken(mockRequest, mockResponse, () => {
      /** Empty Function */
    });

    expect(mockResponse.statusCode).toBe(400);
    expect(getByEmailMock).toBeCalled();
  });

  it("Generate Token - Wrong Password", async () => {
    
    const service = new UserService();
    const { generateToken } = TokenController(service);

    const getByEmailMock = jest.spyOn(UserService.prototype, 'getByEmail').mockRejectedValue({});
    
    const mockRequest = httpMocks.createRequest({
        body: {
            password: "1234"
        }
    });
    const mockResponse = httpMocks.createResponse();

    await generateToken(mockRequest, mockResponse, () => {
      /** Empty Function */
    });

    expect(mockResponse.statusCode).toBe(500);
    expect(getByEmailMock).toBeCalled();
  });

});
