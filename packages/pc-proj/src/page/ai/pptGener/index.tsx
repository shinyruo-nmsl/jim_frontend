import { useState } from "react";
import { Tool } from "proj-util";
import { genPPT } from "proj-util/src/ppt";
import { AIImgParser } from "proj-service";
import { fetchUploadImgFile } from "@web/api/file";
import { createFetchStream } from "@web/util/http";
import { downloadFileFromBlob } from "@web/util/html";
import ImageTextArea, { InputImg } from "@/component/TextArea";


function PPTGenerPage() {
  const prompt: AIImgParser.Prompt = {
    description:
      "请根据图片描述和下面TypeScript类型定义，生成一个类型为 PPTSource 的对象，并且只输出这个对象：```interface TableCell { text?: string; } type TableRow = TableCell[]; type TableElement = { type: 'table'; content: TableRow[]; }; type ShapeElement = { type: 'shape'; content: string; }; type TextElement = { type: 'text'; content: string; }; type SildeElement = TableElement | ShapeElement | TextElement; type PPTSlide = { elements: SildeElement[]; }; type PPTSource = { slides: PPTSlide[]; }```",
    imgUrl: "",
  };

  const [tempImg, setTempImg] = useState<InputImg | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handlePressEnter = async () => {
    if (!tempImg || !prompt.description || isPending) return;
    setIsPending(true);

    const { url } = await fetchUploadImgFile({
      imgFile: tempImg.file,
    });
    const stream = await createFetchStream(AIImgParser.URL.ParseImage, {
      message: {
        description: prompt.description,
        imgUrl: url,
      },
    });

    let result = "";
    for await (const chunk of stream) {
      result += chunk;
    }

    console.log("result:", result.trim());
    console.log(
      "JSON.parse(result.trim()):",
      JSON.parse(Tool.extractOuterJson(result.trim()))
    );

    const ppt = await genPPT(JSON.parse(Tool.extractOuterJson(result.trim())));

    console.log("ppt:", ppt);

    downloadFileFromBlob(ppt, "PPTGener.pptx");

    setIsPending(false);
  };

  return (
    <div>
      <h1>PPTGener</h1>
      <div className="box-border w-full h-fit p-[24px] flex-none">
        <ImageTextArea
          value={prompt.description}
          img={tempImg}
          textareaProps={{
            placeholder: "使用图片时，复制图片到此处，或者点击上传",
            maxLength: 1000,
            disabled: isPending,
          }}
          onPressEnter={handlePressEnter}
          onChange={() => { }}
          onUploadImg={(img) => setTempImg(img)}
          onRemoveImg={() => setTempImg(null)}
        />
      </div>
    </div>
  );
}

export default PPTGenerPage;
