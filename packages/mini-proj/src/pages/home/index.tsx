import { View, Text } from "@tarojs/components";
import { AtAvatar } from "taro-ui";

import { useUserLoginInfo } from "@/context/user";

import "./index.scss";

function Home() {
  const { userName, avatar } = useUserLoginInfo();

  return (
    <View className="w-[10px]">
      <View className="user">
        <AtAvatar circle image={avatar}></AtAvatar>
        <Text>{userName}</Text>
      </View>
    </View>
  );
}

export default Home;
