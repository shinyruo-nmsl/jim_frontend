import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import {
  View,
  Textarea,
  ScrollView,
  Button,
  Image,
  Text,
} from "@tarojs/components";
import { AIImgParser } from "proj-service";
import StorageUtil from "@/util/storage";
import { uploadImageFromTempPath } from "@/service/device";
import { useUserLoginInfo } from "@/context/user";
import { fetchGetAIParseMessage } from "@/api/ai";
import { chooseImg } from "@/util/device";
import MessageBox from "./component/Message";

function AIImgParsePage() {
  const { userId } = useUserLoginInfo();

  const { prompt, setPrompt, messages, chat } = AIImgParser.useAIImgParser(
    userId,
    StorageUtil,
  );

  const [tmpUrl, setTmpUrl] = useState("");

  const [isPending, setIsPending] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);

  const getImgFromDevice = async () => {
    try {
      const [tmpUrl] = await chooseImg({
        count: 1,
      });
      setTmpUrl(tmpUrl);
    } catch (err: any) {
      Taro.showToast({
        title: err.message,
        icon: "error",
      });
    }
  };

  const handleConfirmPrompt = async () => {
    if (isPending || !tmpUrl || !prompt.description) return;

    const { url } = await uploadImageFromTempPath({
      tempPath: tmpUrl,
      size: 1024 * 1024 * 50,
    });

    setPrompt((prompt) => ({
      ...prompt,
      imgUrl: url,
    }));

    setTmpUrl("");
  };

  const handleChat = async () => {
    if (isPending) return;

    setIsPending(true);
    try {
      await chat(fetchGetAIParseMessage);
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (prompt.imgUrl && prompt.description) {
      handleChat();
    }
  }, [prompt]);

  useEffect(() => {
    const query = Taro.createSelectorQuery();
    query.select(".chat-gpt-main").boundingClientRect();
    query.select(".messages").boundingClientRect();
    query.exec((res) => {
      const scorllHeight = res[0]?.height;
      const listHeight = res[1]?.height;
      if (
        typeof scorllHeight !== "undefined" &&
        typeof listHeight !== "undefined"
      ) {
        setScrollTop(listHeight - scorllHeight);
      }
    });
  }, [messages]);

  return (
    <View className="h-100vh">
      <ScrollView
        className="chat-gpt-main h-calc-100vh-minus-150 box-border mb-24"
        scrollY
        scrollTop={scrollTop}
      >
        <View className="messages">
          {messages.map((message, index) => (
            <MessageBox key={index} message={message} />
          ))}
        </View>
      </ScrollView>

      <View className="position: fixed left-0 bottom-0 w-full box-border p-20  bg-grey">
        {tmpUrl && (
          <View className="w-full flex items-center justify-between">
            <View className="relative w-fit h-fit">
              <Image mode="heightFix" className="h-100" src={tmpUrl} />
              <View className="absolute right-0 top-0 w-30 h-30 bg-gray-400 rounded-full flex items-center justify-center">
                <Text className="text-white" onClick={() => setTmpUrl("")}>
                  X
                </Text>
              </View>
            </View>

            <Button
              className="w-100 h-40  mr-5 text-white rounded-md text-28 leading-40 ml-20 whitespace-nowrap  flex items-center justify-center bg-blue"
              onClick={handleConfirmPrompt}
            >
              send
            </Button>
          </View>
        )}
        <View className="w-full flex items-center">
          <Textarea
            className="min-h-60 round-5 box-border bg-white"
            autoHeight
            placeholder="请输入图片描述"
            value={prompt.description}
            onInput={(e) =>
              setPrompt((prompt) => ({
                ...prompt,
                description: e.detail.value,
              }))
            }
          ></Textarea>
          <Button
            className="w-100 h-40 text-white rounded-md text-28 leading-40 ml-20 whitespace-nowrap m-auto flex items-center justify-center bg-blue"
            onClick={getImgFromDevice}
          >
            upload
          </Button>
        </View>
      </View>
    </View>
  );
}

export default AIImgParsePage;
