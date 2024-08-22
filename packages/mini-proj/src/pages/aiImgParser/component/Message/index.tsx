import Taro from "@tarojs/taro";
import { AtAvatar, AtActivityIndicator } from "taro-ui";
import { View, Image } from "@tarojs/components";

import { AIImgParser } from "proj-service";
import { useUserLoginInfo } from "@/context/user";

import OPENAI_IMG from "@/assets/openai.png";
import COPY_SVG from "@/assets/copy.svg";

function UserMessageBox({ content }: { content: AIImgParser.Prompt }) {
  const { avatar } = useUserLoginInfo();

  return (
    <View className='w-full box-border p-20 mb-10 flex gap-5 justify-end'>
      <View className='mr-10 w-fit h-fit mt-10 max-w-500 rounded-12 p-12 text-24 leading-28 text-white bg-green flex flex-col items-center gap-20'>
        <Image mode='heightFix' className='h-100' src={content.imgUrl} />
        <View className='self-start'>{`描述：${content.description}`}</View>
      </View>
      <AtAvatar
        className='flex-none'
        size='small'
        circle
        image={avatar}
      ></AtAvatar>
    </View>
  );
}

function GPTMessageBox({ content }: { content: string }) {
  const isLoading = content.length < 1;

  const copy = () => {
    Taro.setClipboardData({
      data: content,
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
    <View className='w-full box-border p-20 mb-10 flex gap-5 justify-start'>
      <AtAvatar
        className='w-60 h-60 flex items-center justify-center'
        circle
        image={OPENAI_IMG}
      ></AtAvatar>

      <View className='relative overflow-hidden ml-10 w-fit h-fit mt-10  max-w-500 rounded-12 p-12 pt-24 pr-24 text-24 leading-28 bg-azure border-1 border-blue border-solid'>
        {isLoading ? (
          <AtActivityIndicator size={24} mode='normal' content='思考中...' />
        ) : (
          content
        )}
        {!isLoading && (
          <View
            className='absolute top-0 right-0 p-5  h-15 w-20 bg-zinc-400  flex items-center justify-center rounded-5'
            onClick={copy}
          >
            <Image className='w-15' mode='widthFix' src={COPY_SVG} />
          </View>
        )}
      </View>
    </View>
  );
}

function MessageBox({ message }: { message: AIImgParser.Message }) {
  if (message.type === "assistant")
    return <GPTMessageBox content={message.content} />;
  return <UserMessageBox content={message.content} />;
}

export default MessageBox;
