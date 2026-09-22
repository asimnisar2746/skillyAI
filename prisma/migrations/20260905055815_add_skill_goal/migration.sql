/*
  Warnings:

  - A unique constraint covering the columns `[userId,skillName]` on the table `SkillGoal` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SkillGoal_userId_skillName_key" ON "SkillGoal"("userId", "skillName");
