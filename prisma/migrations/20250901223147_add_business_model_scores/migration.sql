-- CreateTable
CREATE TABLE "business_model_scores" (
    "id" SERIAL NOT NULL,
    "quiz_attempt_id" INTEGER NOT NULL,
    "business_model_id" TEXT NOT NULL,
    "business_model_name" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "fitScore" INTEGER NOT NULL,
    "calculated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "business_model_scores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_business_model_scores_attempt" ON "business_model_scores"("quiz_attempt_id");

-- CreateIndex
CREATE INDEX "idx_business_model_scores_model" ON "business_model_scores"("business_model_id");

-- CreateIndex
CREATE INDEX "idx_business_model_scores_score" ON "business_model_scores"("score");

-- CreateIndex
CREATE INDEX "idx_business_model_scores_category" ON "business_model_scores"("category");

-- CreateIndex
CREATE UNIQUE INDEX "business_model_scores_quiz_attempt_id_business_model_id_key" ON "business_model_scores"("quiz_attempt_id", "business_model_id");

-- AddForeignKey
ALTER TABLE "business_model_scores" ADD CONSTRAINT "business_model_scores_quiz_attempt_id_fkey" FOREIGN KEY ("quiz_attempt_id") REFERENCES "quiz_attempts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
