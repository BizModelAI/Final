-- CreateTable
CREATE TABLE "report_access" (
    "id" SERIAL NOT NULL,
    "quiz_attempt_id" INTEGER NOT NULL,
    "report_type" TEXT NOT NULL,
    "is_unlocked" BOOLEAN NOT NULL DEFAULT false,
    "unlocked_at" TIMESTAMP(3),
    "unlocked_by" TEXT,
    "expires_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "report_access_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "report_access_quiz_attempt_id_report_type_key" ON "report_access"("quiz_attempt_id", "report_type");

-- AddForeignKey
ALTER TABLE "report_access" ADD CONSTRAINT "report_access_quiz_attempt_id_fkey" FOREIGN KEY ("quiz_attempt_id") REFERENCES "quiz_attempts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
