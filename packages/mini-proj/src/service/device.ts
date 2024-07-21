import { fetchUploadBase64Image } from "@/api/file";
import { chooseImgAndConvert2Base64 } from "@/util/device";
import { convertTempImgPath2Base64 } from "@/util/file";

export async function chooseAndUploadImage({
  count,
  size = 1024 * 1024 * 20,
}: {
  count: number;
  size: number;
}) {
  const base64s = await chooseImgAndConvert2Base64({ count });

  if (base64s.some((base64) => base64.length > size)) {
    throw new Error("图片太大啦~");
  }

  return (
    await Promise.all(
      base64s.map((base64) => fetchUploadBase64Image({ base64Img: base64 })),
    )
  ).map(({ url }) => url);
}

export async function uploadImageFromTempPath({
  tempPath,
  size = 1024 * 1024 * 20,
}: {
  tempPath: string;
  size: number;
}) {
  const base64 = await convertTempImgPath2Base64(tempPath);

  if (base64.length > size) {
    throw new Error("图片太大啦~");
  }

  return fetchUploadBase64Image({ base64Img: base64 });
}
