export interface SettingStore {
  isOnboardingCompleted: boolean;
  lastSyncedAt: number;

  setOnBoardingCompleted: () => void;

  getLastSyncedAt: () => Date | undefined;
  setLastSyncedAt: (lastSyncedAt: Date) => void;
}
