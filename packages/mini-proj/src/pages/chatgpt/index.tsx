import { View, Text } from "@tarojs/components";
import "./index.less";

import { User } from "proj-service";

function ChatGPT() {
  return (
    <View className="index">
      <Text>{User.UserRoles.join(",")}</Text>
    </View>
  );
}

export default ChatGPT;
