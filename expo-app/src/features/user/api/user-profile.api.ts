import { authenticatedTypedFetch } from "../../../lib/auth/typed-fetch";
import { userProfileSchema } from "../schemas/user-profile.schema";

export const getUserProfileApi = async () => {
  return await authenticatedTypedFetch({
    url: "user/profile",
    method: "GET",
    schema: userProfileSchema,
  });
};
