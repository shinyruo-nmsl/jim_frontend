import Taro from "@tarojs/taro";
import { User } from "proj-service";
import { fetchGetUserLoginInfo } from "@/api/user";

import StorageUtil from "@/util/storage";

export async function getUserLoginInfo(): Promise<User.UserLoginInfo> {
  const user = await fetchGetUserLoginInfo();

  const cache = StorageUtil.get(`__user_display_info__${user.account}`);
  if (cache) {
    const { avatarUrl, nickName } = JSON.parse(cache);
    return {
      ...user,
      avatar: avatarUrl,
      userName: nickName,
    };
  }

  try {
    let confirm = true;
    if (process.env.NODE_ENV === "development") {
      const message = await Taro.showModal({
        title: "提示",
        content: "确认授权获取您的用户信息",
      });
      confirm = message.confirm;
    }

    if (confirm) {
      const wxUserProfile = await Taro.getUserProfile({ desc: "展示用户头像" });
      const { avatarUrl, nickName } = wxUserProfile.userInfo;
      StorageUtil.set(
        `__user_display_info__${user.account}`,
        JSON.stringify({ avatarUrl, nickName }),
        60 * 60 * 24 * 7,
      );

      return {
        ...user,
        avatar: avatarUrl,
        userName: nickName,
      };
    } else {
      return user;
    }
  } catch {
    return user;
  }
}
