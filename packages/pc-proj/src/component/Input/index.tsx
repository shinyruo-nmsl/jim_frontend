// interface ImageInputProps {
//   value: string;
//   onChange: (value: string) => void;
//   onPasteImg: (base64: string) => void;
//   onUploadImg: (base64: string[]) => void;
// }

// function ImageInput({
//   value,
//   onChange,
//   onPasteImg,
//   onUploadImg,
// }: ImageInputProps) {
//   const [isUploading, setIsUploading] = useState(false);

//   const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files) return;
//     const base64s = await Promise.all(
//       Array.from(files).map((file) => File.convertFile2Base64(file))
//     );
//     onUploadImg(base64s);
//   };

//   return (
//     <div className="flex items-center gap-5">
//       <input type="file" accept="image/*" multiple onChange={handleUpload} />
//       <TextArea
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         onPaste={async (e) => {
//           const file = e.clipboardData.items[0].getAsFile();
//           if (file && file.type.includes("image")) {
//             const base64 = await File.convertImgFile2Base64(file);
//             onPasteImg(base64);
//           }
//         }}
//         placeholder="请输入问题"
//         style={{ height: 120, resize: "none" }}
//       />
//     </div>
//   );
// }
