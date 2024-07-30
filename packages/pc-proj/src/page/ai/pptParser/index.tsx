import { File } from "proj-util";
import { createFetchStream } from "@/util/http";
import { ChatGPT } from "proj-service";

function PPTParser() {
  const testPPT = async (e) => {
    const files = e.target.files;
    if (!files?.[0]) return;
    const ppt = await File.pptFile2Json(files[0]);

    const stream = await createFetchStream(ChatGPT.URL.GetGPTContent, {
      messages: [
        {
          role: "user",
          content: `下面这段JSON结构表示了一个PPT的内容，请对每个幻灯片内容进行概括分析，并且不需要对其结构进行描述，并在最后给出总结：${JSON.stringify(ppt)}}`,
        },
      ],
    });

    for await (const msg of stream) {
      console.log(msg);
    }
  };

  return (
    <div>
      <h1>PPTParser</h1>
      <input type="file" onChange={testPPT} accept=".pptx" />
    </div>
  );
}

export default PPTParser;
