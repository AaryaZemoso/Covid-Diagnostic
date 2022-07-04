import { Router } from "express";
import { IBookController } from "../controller/BookingController";

function BookingRoute(controller: IBookController) {
    const router = Router();
    router.post("/:id/book", controller.book);
    router.delete("/:id/unbook", controller.unbook);
    router.post("/:id/payment", controller.payment);
    return router;
}

export default BookingRoute;