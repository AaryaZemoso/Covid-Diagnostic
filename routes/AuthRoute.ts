import { Router } from "express";
import { ITokenController } from "../controller/TokenController";

function AuthRoute (service: ITokenController) {
  const router = Router();
  router.post("/token", service.generateToken);
  return router;
}

export default AuthRoute;