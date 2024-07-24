import { ChangeEvent, ClipboardEvent, KeyboardEvent } from "react";
import { Input } from "antd";
import { File } from "proj-util";

interface ImageInputProps {
  value: string;
  multiple: boolean;
  textareaProps?: Partial<Parameters<typeof Input.TextArea>[0]>;
  onChange: (value: string) => void;
  onPressEnter: (value: string) => void;
  onPasteImg: (base64: string[]) => void;
  onUploadImg: (base64: string[]) => void;
}

export function ImageTextArea({
  value,
  multiple,
  textareaProps = {},
  onChange,
  onPressEnter,
  onPasteImg,
  onUploadImg,
}: ImageInputProps) {
  const { TextArea } = Input;

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const base64 = await Promise.all(
      Array.from(files).map((file) => File.convertImgFile2Base64(file))
    );
    onUploadImg(base64);
  };

  const handlePressEnter = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 229) {
      return;
    }
    onPressEnter(value);
  };

  const handlePaste = async (e: ClipboardEvent<HTMLTextAreaElement>) => {
    const files = [...e.clipboardData.items].map((item) => item.getAsFile());
    const base64s = await Promise.all(
      files
        .filter((f) => f && f.type.includes("image"))
        .map((file) => File.convertImgFile2Base64(file!))
    );
    onPasteImg(base64s);
  };

  return (
    <div className="flex items-center gap-5">
      <input
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleUpload}
      />
      <TextArea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onPaste={handlePaste}
        onPressEnter={handlePressEnter}
        placeholder="请输入问题"
        style={{ height: 120, resize: "none" }}
        {...textareaProps}
      />
    </div>
  );
}
