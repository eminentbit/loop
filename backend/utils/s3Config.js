import dotenv from "dotenv";
import { S3Client } from "@aws-sdk/client-s3";
dotenv.config();

export const s3Client = new S3Client({
  region: process.env.AWS_REGION, // Your S3 bucket region, e.g., 'us-west-1'
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // From your IAM user
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // From your IAM user
  },
});
