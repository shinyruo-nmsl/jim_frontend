import { View, Text, Image, Button } from "@tarojs/components";
import { AtAvatar } from 'taro-ui'

import { useUserLoginInfo } from "@/context/user";

import "./index.scss";
import { useCallback, useState } from "react";

function Home() {

  const { userName, avatar } = useUserLoginInfo();

  return (
    <View className="index">
      <Text>{userName}</Text>
      <AtAvatar circle image={avatar}></AtAvatar>
    </View>
  );
}

export default Home;
