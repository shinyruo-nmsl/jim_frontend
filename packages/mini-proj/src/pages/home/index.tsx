import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtAvatar, AtForm, AtInput } from "taro-ui";
import { User } from "proj-service";
import { useUserLoginInfo } from "@/context/user";

function Home() {
  const { userId, account, role, userName, avatar, platform } =
    useUserLoginInfo();

  const copy = (text: string) => {
    Taro.setClipboardData({
      data: text,
      success: function () {
        Taro.showToast({
          title: "复制成功",
          icon: "success",
          duration: 2000,
        });
      },
      fail: function () {
        Taro.showToast({
          title: "复制失败",
          icon: "none",
          duration: 2000,
        });
      },
    });
  };

  return (
    <View>
      <AtAvatar className='ml-20 mb-20' circle image={avatar}></AtAvatar>
      <AtForm>
        <AtInput
          className='opacity-100'
          name='userId'
          title='用户ID'
          type='text'
          placeholder='禁止输入'
          value={userId}
        >
          <Text className='ml-2 text-blue-500' onClick={() => copy(userId)}>
            复制
          </Text>
        </AtInput>

        <AtInput
          name='account'
          title='账号'
          type='text'
          placeholder='禁止输入'
          value={account}
        >
          <Text className='ml-2 text-blue-500' onClick={() => copy(account)}>
            复制
          </Text>
        </AtInput>
        <AtInput
          name='userName'
          title='用户名'
          type='text'
          placeholder='禁止输入'
          value={userName}
        />
        <AtInput
          name='role'
          title='角色'
          type='text'
          placeholder='禁止输入'
          value={User.formatUserRole(role)}
        />
        <AtInput
          name='platform'
          title='平台'
          type='text'
          placeholder='禁止输入'
          value={User.formatPlatform(platform)}
        />
      </AtForm>
    </View>
  );
}

export default Home;
