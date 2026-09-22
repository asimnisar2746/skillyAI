/*
  Warnings:

  - The `preferredJobRoles` column on the `CareerInterests` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `company` to the `WorkExperience` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CareerInterests" DROP COLUMN "preferredJobRoles",
ADD COLUMN     "preferredJobRoles" TEXT[];

-- AlterTable
ALTER TABLE "Certification" ADD COLUMN     "credentialUrl" TEXT,
ADD COLUMN     "expirationDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "WorkExperience" ADD COLUMN     "company" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Recommendation" (
    "id" TEXT NOT NULL,
    "careerPaths" JSONB NOT NULL,
    "skillGaps" JSONB NOT NULL,
    "inDemandSkills" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Recommendation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedCareerPath" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "savedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SavedCareerPath_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillGoal" (
    "id" TEXT NOT NULL,
    "skillName" TEXT NOT NULL,
    "courseTitle" TEXT,
    "courseUrl" TEXT,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SkillGoal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedCareerPath" ADD CONSTRAINT "SavedCareerPath_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillGoal" ADD CONSTRAINT "SkillGoal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
