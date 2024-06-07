import { View, Text, Image } from "@tarojs/components";

import { useUserLoginInfo } from "@/context/user";

import "./index.less";

function Home() {
  const { userName, avatar } = useUserLoginInfo();

  return (
    <View className="index">
      <Text>{userName}</Text>
      <Image src={avatar!} />
    </View>
  );
}

export default Home;
