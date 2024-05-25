export type UserData = {
  user: UserType;
  services: { name: string; id: number }[];
};

export type UserType = {
  id: number;
  username?: string;
  first_name: string;
  last_name?: string;
  services?: Map<number, string>;
};

export type Service = {
  id: number;
  name: string;
  description: string;
};

export type ServiceData = {
  id: number;
  name: string;
  description: string;
  users?: UserType[];
};

export type UsersFullInfo = {
  stat: {
    [key: number]: number;
  };
  users: UserType[];
};
