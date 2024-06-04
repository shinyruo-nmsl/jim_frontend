import { Component, PropsWithChildren } from "react";
import { View, Text } from "@tarojs/components";
import "./index.less";

import { User } from "proj-service";

export default class Index extends Component<PropsWithChildren> {
  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="index">
        <Text>{User.UserRoles.join(",")}</Text>
        <Text>Hello world!</Text>
      </View>
    );
  }
}
