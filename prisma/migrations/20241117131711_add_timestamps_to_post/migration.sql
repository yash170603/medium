-- First set a default value for existing rows
ALTER TABLE "Post" ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Post" ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Then remove the default from updatedAt for future inserts
ALTER TABLE "Post" ALTER COLUMN "updatedAt" DROP DEFAULT;