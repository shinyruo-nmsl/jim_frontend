import { PPT } from "proj-util";
import { AIPSImage } from "proj-service";
import { createFetchStream } from "@/util/http";
import ImageTextArea, { InputImg } from "@/component/TextArea";
import { fetchUploadImgFile } from "@/api/file";
import { useState } from "react";
import { downloadFileFromBlob } from "@/util/html";
import { extractOuterJson } from "proj-util/src/tool";

function PPTGener() {
  const prompt: AIPSImage.Prompt = {
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
    const stream = await createFetchStream(AIPSImage.URL.ParseImage, {
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
      JSON.parse(extractOuterJson(result.trim()))
    );

    const ppt = await PPT.genPPT(JSON.parse(extractOuterJson(result.trim())));

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
          onChange={() => {}}
          onUploadImg={(img) => setTempImg(img)}
          onRemoveImg={() => setTempImg(null)}
        />
      </div>
    </div>
  );
}

export default PPTGener;
