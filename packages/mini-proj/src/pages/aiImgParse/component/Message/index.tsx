import { AtAvatar, AtActivityIndicator } from "taro-ui";
import { View, Image } from "@tarojs/components";

import { AIPSImage } from "proj-service";
import { useUserLoginInfo } from "@/context/user";

import OPENAI_IMG from "@/assets/openai.png";

function UserMessageBox({ content }: { content: AIPSImage.Prompt }) {
  const { avatar } = useUserLoginInfo();

  return (
    <View className="w-full box-border p-20 mb-10 flex gap-5 justify-end">
      <View className="mr-10 w-fit h-fit mt-10 max-w-500 rounded-12 p-12 text-24 leading-28 text-white bg-green flex flex-col items-center gap-20">
        <Image mode="heightFix" className="h-100" src={content.imgUrl} />
        <View className="self-start">{`描述：${content.description}`}</View>
      </View>
      <AtAvatar
        className="flex-none"
        size="small"
        circle
        image={avatar}
      ></AtAvatar>
    </View>
  );
}

function GPTMessageBox({ content }: { content: string }) {
  const isLoading = content.length < 1;

  return (
    <View className="w-full box-border p-20 mb-10 flex gap-5 justify-start">
      <AtAvatar
        className="w-60 h-60 flex items-center justify-center"
        circle
        image={OPENAI_IMG}
      ></AtAvatar>

      <View className="ml-10 w-fit h-fit mt-10  max-w-500 rounded-12 p-12 text-24 leading-28 bg-azure border-1 border-blue border-solid">
        {isLoading ? (
          <AtActivityIndicator size={24} mode="normal" content="思考中..." />
        ) : (
          content
        )}
      </View>
    </View>
  );
}

function MessageBox({ message }: { message: AIPSImage.Message }) {
  if (message.type === "ai") return <GPTMessageBox content={message.content} />;
  return <UserMessageBox content={message.content} />;
}

export default MessageBox;
