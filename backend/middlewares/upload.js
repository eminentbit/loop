import multer from "multer";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../utils/s3Config.js";
import dotenv from "dotenv";

dotenv.config();

export const uploadFileToS3 = async (
  buffer,
  fileName,
  mimeType,
  uniqueName
) => {
  if (!fileName) {
    throw new Error("File name must be provided.");
  }

  const folderPath = `applications/${uniqueName}/`;

  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${folderPath}${fileName}`,
    Body: buffer,
    ContentType: mimeType,
  };

  try {
    const result = await s3Client.send(new PutObjectCommand(uploadParams));
    return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${folderPath}${fileName}`;
  } catch (error) {
    console.error("Error uploading to S3", error);
    throw new Error("Error uploading file to S3");
  }
};

const storage = multer.memoryStorage(); // No files saved to disk
export const upload = multer({ storage });

export const applicationFields = upload.fields([
  { name: "cv", maxCount: 1 },
  { name: "cover_letter", maxCount: 1 },
]);

export const validateFile = (req, res, next) => {
  const { cv, cover_letter } = req.files;

  if (cv && cv[0].size > 10 * 1024 * 1024) {
    return res.status(400).json({ error: "CV file size exceeds 10 MB" });
  }

  if (cover_letter && cover_letter[0].size > 10 * 1024 * 1024) {
    return res.status(400).json({
      error: "Cover letter file size exceeds 10 MB",
    });
  }

  next();
};
