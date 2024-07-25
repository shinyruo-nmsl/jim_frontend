import { ChangeEvent, ClipboardEvent, KeyboardEvent } from "react";
import { Input, Image } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
import { File } from "proj-util";
import UPLOAD_SVG from "@/assets/upload.svg";

interface ImageInputProps {
  value: string;
  imgUrl: string;
  textareaProps?: Partial<Parameters<typeof Input.TextArea>[0]>;
  onChange: (value: string) => void;
  onPressEnter: (value: string) => void;
  onUploadImg: (base64: string) => void;
  onRemoveImg: (base64: string) => void;
}

export function ImageTextArea({
  value,
  imgUrl,
  textareaProps = {},
  onChange,
  onPressEnter,
  onUploadImg,
  onRemoveImg,
}: ImageInputProps) {
  const { TextArea } = Input;

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.[0]) return;
    const base64 = await File.convertImgFile2Base64(files[0]);
    onUploadImg(base64);
  };

  const handlePressEnter = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 229) {
      return;
    }
    onPressEnter(value);
  };

  const handlePaste = async (e: ClipboardEvent<HTMLTextAreaElement>) => {
    const files = [...e.clipboardData.items]
      .map((item) => item.getAsFile())
      .filter((f) => f && f.type.includes("image"));
    if (!files?.[0]) return;
    const base64 = await File.convertImgFile2Base64(files[0]);
    onUploadImg(base64);
  };

  return (
    <div className="flex items-center gap-[20px]">
      <TextArea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onPaste={handlePaste}
        onPressEnter={(e) => handlePressEnter(e)}
        placeholder="请输入问题"
        style={{ height: 120, resize: "none" }}
        {...textareaProps}
      />

      <div className="flex-none w-[100px] h-[100px]">
        {imgUrl && (
          <div className="relative w-full h-full flex justify-center items-center ">
            <CloseCircleFilled
              className="absolute z-10  right-0 top-0 translate-x-1/2 -translate-y-1/2 text-gray-500 bg-white rounded-full"
              onClick={() => onRemoveImg(imgUrl)}
            />
            <Image
              src={imgUrl}
              alt="img"
              className="max-w-[100px] max-h-[100px] h-auto w-auto"
            />
          </div>
        )}

        {!imgUrl && (
          <label htmlFor="upload" className="cursor-pointer w-full h-full">
            <img src={UPLOAD_SVG} alt="upload" className="w-full h-full" />
            <input
              className="hidden"
              type="file"
              id="upload"
              accept="image/*"
              multiple={false}
              onChange={handleUpload}
            />
          </label>
        )}
      </div>
    </div>
  );
}
