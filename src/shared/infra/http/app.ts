import "reflect-metadata";
// eslint-disable-next-line import-helpers/order-imports
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import "dotenv/config";

import "@shared/container";

import swaggerUI from "swagger-ui-express";

import upload from "@config/upload";
import AppError from "@shared/errors/AppError";
import router from "@shared/infra/http/routes";

import swaggerFile from "../../../swagger.json";

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use("/files", express.static(`${upload.tmpFolder}`));

app.use(router);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

export default app;
