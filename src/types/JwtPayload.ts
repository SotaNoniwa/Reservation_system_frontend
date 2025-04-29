export type JwtPayload = {
  username: string;
  email: string;
  roles: { name: string }[];
  [key: string]: any;
};
