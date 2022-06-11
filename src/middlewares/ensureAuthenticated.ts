import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error("Token missing");
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, "8ef86431456bd51035bc4f07f74f0d5b");
    console.log(decoded);
    next();
  } catch {
    throw new Error("Invalid token");
  }
};
