import { Router } from "express"
import { ILabController } from "../controller/LabController";

function LabRoute(controller: ILabController) {

    const router = Router();

    router.post("/", controller.create);
    router.put("/:id", controller.update);
    router.delete("/:id", controller.remove)
    router.get("/:id", controller.getById);
    router.get("/", controller.getAll);

    return router;

}

export default LabRoute;