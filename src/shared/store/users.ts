import { reactive } from "vue";

type User = {
  id: string;
  name: string;
};

const users = reactive<{ [key: string]: User }>({});

export const usersStore = () => {
  const addUser = (user: User) => {
    users[user.id] = user;
  };

  const getUser = (id: string) => {
    return users[id];
  };
  const getUsers = () => {
    return users;
  };
  return { users, addUser, getUser, getUsers };
};
