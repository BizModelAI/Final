/*
  Warnings:

  - You are about to drop the `business_analysis` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `email_content` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `personalized_content` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "business_analysis" DROP CONSTRAINT "business_analysis_quiz_attempt_id_fkey";

-- DropForeignKey
ALTER TABLE "email_content" DROP CONSTRAINT "email_content_quiz_attempt_id_fkey";

-- DropForeignKey
ALTER TABLE "personalized_content" DROP CONSTRAINT "personalized_content_quiz_attempt_id_fkey";

-- DropTable
DROP TABLE "business_analysis";

-- DropTable
DROP TABLE "email_content";

-- DropTable
DROP TABLE "personalized_content";

-- CreateTable
CREATE TABLE "business_model_scores" (
    "id" SERIAL NOT NULL,
    "quiz_attempt_id" INTEGER NOT NULL,
    "scores" JSONB NOT NULL,
    "topMatches" JSONB NOT NULL,
    "overall_fit_score" DOUBLE PRECISION NOT NULL,
    "calculated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "business_model_scores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "business_model_scores_quiz_attempt_id_key" ON "business_model_scores"("quiz_attempt_id");

-- AddForeignKey
ALTER TABLE "business_model_scores" ADD CONSTRAINT "business_model_scores_quiz_attempt_id_fkey" FOREIGN KEY ("quiz_attempt_id") REFERENCES "quiz_attempts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
