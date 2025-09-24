import { getUserService } from "@/modules/slack/services/get-user-service";
import { safeRequest } from "../utils/safe-request";
import { usersStore } from "../store/users";

const { getUser, addUser } = usersStore();

export async function mapUserById(id: string) {
  const savedUser = getUser(id);
  if (savedUser) {
    return savedUser;
  }
  const [userResponse, error] = await safeRequest(async () => {
    return await getUserService({ user: id });
  });
  if (error || !userResponse?.id) {
    console.error(error);
    return;
  }
  const user = {
    id: userResponse.id,
    name: userResponse.name || "",
  };
  addUser(user);
  return user;
}
