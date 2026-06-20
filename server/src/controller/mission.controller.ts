import { Response } from "express";
import { NotFoundError } from "express-error-toolkit";

import { missionService } from "@/services/mission.service";
import { userMissionService } from "@/services/user_mission.service";

import type { SubscribeMissionRequest } from "@/validators/missions/subscribe/request.schema";
import { StatusCodes } from "http-status-codes";
import { subscribeMissionResponseSchema } from "@/validators/missions/subscribe/response.schema";

export class MissionController {
  private readonly missionService = missionService;
  private readonly userMissionService = userMissionService;

  public subsribe = async (req: SubscribeMissionRequest, res: Response) => {
    const userId = req.user?.id!;
    const missionId = req.params.id;

    const isExistingMission = await this.missionService.findById(missionId);

    if (!isExistingMission)
      throw new NotFoundError(`Unable to find mission with id ${missionId}`);

    const result = await this.userMissionService.create({ missionId, userId });

    const response = subscribeMissionResponseSchema.strip().parse(result);

    return res.status(StatusCodes.CREATED).send(response);
  };
}

export const missionController = new MissionController();
