import { NextFunction, Request, Response } from "express";
import UserService from "../service/UserService";
import * as jwt from "jsonwebtoken";
import properties from "../properties";

export interface ITokenController {
  generateToken: (req: Request, res: Response, next: NextFunction) => {};
}

function TokenController(service: UserService) {
  const generateToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
      const user = await service.getByEmail(email);
      if (user.password === password) {
        const token = jwt.sign(
          {
            userID: user._id,
          },
          properties.jwtSecretKey
        );

        res.json({
          token: token,
        });
        return;
      } else {
        res.status(400).json({
          status: 400,
          message: "Wrong Password!!",
        });
        return;
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  };

  return {
    generateToken: generateToken,
  } as ITokenController;
}

export default TokenController;
