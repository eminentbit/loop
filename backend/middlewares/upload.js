import multer from "multer";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../utils/s3Config.js";
import dotenv from "dotenv";

dotenv.config();

export const uploadFileToS3 = async (buffer, fileName, mimetype, folder) => {
  const key = `${folder}/${fileName}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME, // Your S3 bucket name
    Key: key,
    Body: buffer,
    ContentType: mimetype,
  });

  await s3Client.send(command);

  // Return a permanent public URL
  const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  return fileUrl;
};

const storage = multer.memoryStorage(); // No files saved to disk
export const upload = multer({ storage });

export const applicationFields = upload.fields([
  { name: "cv", maxCount: 1 },
  { name: "cover_letter", maxCount: 1 },
]);

export const postFields = upload.fields([{ name: "attachments", maxCount: 5 }]);

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
