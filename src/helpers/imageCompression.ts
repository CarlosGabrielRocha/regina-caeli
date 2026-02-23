import imageCompression from "browser-image-compression";

export default async function compressImage(image: File) {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  try {
    const compressedImage = await imageCompression(image, options);
    return compressedImage;
  } catch (error) {
    console.error("Erro ao comprimir imagem:", error);
    return false;
  }
}