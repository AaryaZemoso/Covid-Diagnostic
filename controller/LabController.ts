import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import LabService from "../service/LabService";

export interface ILabController {
  create: (req: Request, res: Response, next: NextFunction) => {};
  update: (req: Request, res: Response, next: NextFunction) => {};
  remove: (req: Request, res: Response, next: NextFunction) => {};
  getAll: (req: Request, res: Response, next: NextFunction) => {};
  getById: (req: Request, res: Response, next: NextFunction) => {};
}

function LabController(labService: LabService) {
  
  const create = async (req: Request, res: Response, next: NextFunction) => {
    const name = req.body.name;
    const price = parseFloat(req.body.price);

    try {
      await labService.create(name, price);

      return res.status(201).json({
        status: 201,
        message: "Created new object",
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  };

  const update = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const name = req.body.name;
    const price = parseFloat(req.body.price);

    try {
      await labService.update({ id: id, name: name, price: price });

      return res.json({
        status: 200,
        message: "Updated Data",
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  };

  const remove = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    try {
      await labService.delete(id);

      return res.json({
        status: 200,
        message: "Deleted object",
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  };

  const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await labService.getAll();
      return res.json(data);
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  };

  const getById = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    try {
      const data = await labService.getById(id);

      if (!data) {
        return res.status(404).json({
          status: 404,
          message: "Resource Not Found",
        });
      }

      return res.json(data);
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  };

  return {
    create: create,
    update: update,
    remove: remove,
    getAll: getAll,
    getById: getById,
  } as ILabController;
}

export default LabController;
