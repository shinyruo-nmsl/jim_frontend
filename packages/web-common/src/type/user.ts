import { User } from "proj-service";

export type UserLoginDisplayInfo = {
  userName?: string;
  avatar?: string;
  role: User.Role;
};

export type UserLoginDispatch = (
  action:
    | { type: "exit" }
    | { type: "refresh" }
    | { type: "update_display_info"; userInfo: UserLoginDisplayInfo }
) => Promise<void>;
