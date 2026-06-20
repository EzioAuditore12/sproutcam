import { badgeRepository } from "../repositories/badge.repository";
import { missionRepository } from "../repositories/mission.repository";
import { DEFAULT_BADGES } from "./badges";
import { DEFAULT_MISSIONS } from "./missions";

export class DatabaseSeeder {
  private readonly missionRepository = missionRepository;
  private readonly badgeRepository = badgeRepository;

  public async seed() {
    await this.seedBadges();
    await this.seedMissions();
  }

  private async seedBadges() {
    const badgeCount = await this.badgeRepository.count();

    if (badgeCount === 0) {
      await this.badgeRepository.createMany(DEFAULT_BADGES);
    }
  }

  private async seedMissions() {
    const missionCount = await this.missionRepository.count();

    if (missionCount === 0) {
      await this.missionRepository.createMany(DEFAULT_MISSIONS);
    }
  }
}

export const databaseSeeder = new DatabaseSeeder();
