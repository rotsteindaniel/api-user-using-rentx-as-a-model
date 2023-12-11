import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UnauthorizedError } from "@shared/errors/ApiError";
import auth from "@config/auth";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError("Token missing");
  }

  const [, token] = authHeader.split(" ");

  const { sub: user_id } = verify(token, auth.secret_token) as IPayload;
  
  if (!user_id) {
    throw new UnauthorizedError("Invalid token!");
  }

  request.user = {
    id: user_id,
  };

  next();
}
