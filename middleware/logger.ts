import { Request, Response, NextFunction } from "express";

const logger = (req: Request, res: Response, next: NextFunction) => {
    res.on('finish', () => {

        const { statusCode } = res;
        const { url, method } = req;

        console.log(statusCode + " " + method + " " + url);
    });

    next();
}

export default logger;

