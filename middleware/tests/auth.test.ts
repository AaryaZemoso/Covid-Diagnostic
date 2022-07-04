import assert from "assert";
import auth from "../auth";

const httpMocks = require('node-mocks-http');

const VALID_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiIxIiwiaWF0IjoxNjU0NTgwMDgwfQ.IHOPJeOsGmSlsCrGWAP1yB7aEBjBgCja2a_dMjzo3OU";
const INVALID_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiIxIiwiaWF0IjoxNjU0NTgwMDgwfQ.IHOPJeOsGmSlsCrGWAP1yB7aEBjBgCja2a_dMjzo3U";
const GARBAGE_TOKEN = "Bearer ASDF"

describe("Test Suite - Auth Middleware", () => {

    it("Auth - Success", () => {
        const mockRequest = httpMocks.createRequest({
            headers: {
                Authorization: VALID_TOKEN
            }
        });

        const mockResponse = httpMocks.createResponse();
        
        auth(mockRequest, mockResponse, () => {
            //@ts-ignore
        })

        assert.equal(mockResponse.statusCode, 200)
    });

    it("Auth - Failure Unauthorized", () => {
        const mockRequest = httpMocks.createRequest({
            headers: {
                Authorization: INVALID_TOKEN
            }
        });

        const mockResponse = httpMocks.createResponse();
        
        auth(mockRequest, mockResponse, () => {
            //@ts-ignore
        })

        assert.equal(mockResponse.statusCode, 401)
    });

    it("Auth - Failure Unauthorized using Garbage Token", () => {
        const mockRequest = httpMocks.createRequest({
            headers: {
                Authorization: GARBAGE_TOKEN
            }
        });

        const mockResponse = httpMocks.createResponse();
        
        auth(mockRequest, mockResponse, () => {
            //@ts-ignore
        })

        assert.equal(mockResponse.statusCode, 401)
    });

    it("Auth - Failure Bad Request", () => {
        const mockRequest = httpMocks.createRequest({});

        const mockResponse = httpMocks.createResponse();
        
        auth(mockRequest, mockResponse, () => {
            //@ts-ignore
        })

        assert.equal(mockResponse.statusCode, 400)
    });
});