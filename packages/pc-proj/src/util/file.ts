export async function convertImgFile2Base64(imgFile: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(imgFile);
    reader.onload = (e) => resolve(e.target!.result as string);
  });
}
