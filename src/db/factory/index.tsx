import { Platform } from "react-native";

import { createPowerSyncNativeDatabase } from "./factory.native";
import { createPowerSyncWebDatabase } from "./factory.web";

export const createPowerSyncDatabase =
  Platform.OS === "android" || Platform.OS === "ios"
    ? createPowerSyncNativeDatabase
    : createPowerSyncWebDatabase;
