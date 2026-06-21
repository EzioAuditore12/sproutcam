import type { Request, Response } from "express";
import { NotFoundError } from "express-error-toolkit";

import { userService } from "@/services/user.service";
import { StatusCodes } from "http-status-codes";

export class UserController {
  private readonly userService = userService;

  public get = async (req: Request, res: Response) => {
    const userId = req.user?.id!;

    const result = await this.userService.get(userId);

    if (!result)
      throw new NotFoundError(`Not able to find user with id ${userId}`);

    return res.status(StatusCodes.ACCEPTED).send(result);
  };
}

export const userController = new UserController();
