/*
  Warnings:

  - You are about to drop the column `ai_content` on the `quiz_attempts` table. All the data in the column will be lost.
  - You are about to drop the `business_model_scores` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "business_model_scores" DROP CONSTRAINT "business_model_scores_quiz_attempt_id_fkey";

-- AlterTable
ALTER TABLE "quiz_attempts" DROP COLUMN "ai_content";

-- DropTable
DROP TABLE "business_model_scores";
