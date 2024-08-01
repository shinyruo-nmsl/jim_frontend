import { ChangeEvent, ClipboardEvent, KeyboardEvent } from "react";
import { Input, Image } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
import { File as FileUtil } from "proj-util";

export interface InputImg {
  file: File;
  base64: string;
}
interface ImageInputProps {
  value: string;
  img: InputImg | null;
  textareaProps?: Partial<Parameters<typeof Input.TextArea>[0]>;
  onChange: (value: string) => void;
  onPressEnter: (value: string) => void;
  onUploadImg: (img: InputImg) => void;
  onRemoveImg: (img: InputImg) => void;
}

export function ImageTextArea({
  value,
  img,
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
    const base64 = await FileUtil.imgFile2Base64(files[0]);
    onUploadImg({ file: files[0], base64 });
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
    const base64 = await FileUtil.imgFile2Base64(files[0]);
    onUploadImg({ file: files[0], base64 });
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
        {img && (
          <div className="relative w-full h-full flex justify-center items-center ">
            <CloseCircleFilled
              className="absolute z-10  right-0 top-0 translate-x-1/2 -translate-y-1/2 text-gray-500 bg-white rounded-full"
              onClick={() => onRemoveImg(img)}
            />
            <Image
              src={img.base64}
              alt="img"
              className="max-w-[100px] max-h-[100px] h-auto w-auto"
            />
          </div>
        )}

        {!img && (
          <label htmlFor="upload" className="cursor-pointer w-full h-full">
            <i className="icon-upload w-full h-full" />
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
