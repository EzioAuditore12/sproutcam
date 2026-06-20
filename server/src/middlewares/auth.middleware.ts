import type { NextFunction, Request, Response } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { UnauthenticatedError } from "express-error-toolkit";

import { auth } from "@/lib/auth";

export async function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) throw new UnauthenticatedError("Unauthorized to access");

  req.session = session.session;
  req.user = session.user;

  next();
}
