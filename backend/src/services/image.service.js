import ImageKit from "@imagekit/nodejs";
import "../config/env.js";

const imageKitClient = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

export const uploadFile = async (file) => {
  try {
    const response = await imageKitClient.files.upload({
      file: file,
      fileName: `note_app_${Date.now()}.jpg`,
      folder: "/note_app",
    });

    return response;
  } catch (err) {
    console.error("Error uploading file to ImageKit:", err);
    throw new Error("Failed to upload file");
  }
}
