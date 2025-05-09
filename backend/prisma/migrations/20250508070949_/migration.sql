-- CreateEnum
CREATE TYPE "CountryCode" AS ENUM ('DZ_213', 'AO_244', 'BJ_229', 'BW_267', 'BF_226', 'BI_257', 'CM_237', 'CV_238', 'CF_236', 'TD_235', 'KM_269', 'CG_242', 'CD_243', 'DJ_253', 'EG_20', 'GQ_240', 'ER_291', 'ET_251', 'GA_241', 'GM_220', 'GH_233', 'GN_224', 'GW_245', 'CI_225', 'KE_254', 'LS_266', 'LR_231', 'LY_218', 'MG_261', 'MW_265', 'ML_223', 'MR_222', 'MU_230', 'MA_212', 'MZ_258', 'NA_264', 'NE_227', 'NG_234', 'RW_250', 'ST_239', 'SN_221', 'SC_248', 'SL_232', 'SO_252', 'ZA_27', 'SS_211', 'SD_249', 'SZ_268', 'TZ_255', 'TG_228', 'TN_216', 'UG_256', 'ZM_260', 'ZW_263');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "countryCodNum" INTEGER,
ADD COLUMN     "countryCode" "CountryCode";

-- CreateTable
CREATE TABLE "Experience" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "location" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "isCurrentRole" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "issuer" TEXT NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3),
    "credentialId" TEXT,
    "url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Certification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certification" ADD CONSTRAINT "Certification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
