-- CreateIndex
CREATE INDEX "idx_ai_content_type" ON "ai_content"("content_type");

-- CreateIndex
CREATE INDEX "idx_ai_content_generated" ON "ai_content"("generated_at");

-- CreateIndex
CREATE INDEX "idx_ai_content_hash" ON "ai_content"("content_hash");

-- CreateIndex
CREATE INDEX "idx_business_model_scores_score" ON "business_model_scores"("overall_fit_score");

-- CreateIndex
CREATE INDEX "idx_business_model_scores_calculated" ON "business_model_scores"("calculated_at");

-- CreateIndex
CREATE INDEX "idx_payment_type" ON "payments"("type");

-- CreateIndex
CREATE INDEX "idx_payment_created" ON "payments"("created_at");

-- CreateIndex
CREATE INDEX "idx_payment_completed" ON "payments"("completed_at");

-- CreateIndex
CREATE INDEX "idx_payment_quiz_attempt" ON "payments"("quiz_attempt_id");

-- CreateIndex
CREATE INDEX "idx_quiz_attempt_user" ON "quiz_attempts"("user_id");

-- CreateIndex
CREATE INDEX "idx_quiz_attempt_session" ON "quiz_attempts"("session_id");

-- CreateIndex
CREATE INDEX "idx_quiz_attempt_paid" ON "quiz_attempts"("is_paid");

-- CreateIndex
CREATE INDEX "idx_quiz_attempt_expires" ON "quiz_attempts"("expires_at");

-- CreateIndex
CREATE INDEX "idx_quiz_attempt_completed" ON "quiz_attempts"("completed_at");

-- CreateIndex
CREATE INDEX "idx_refund_payment" ON "refunds"("payment_id");

-- CreateIndex
CREATE INDEX "idx_refund_status" ON "refunds"("status");

-- CreateIndex
CREATE INDEX "idx_refund_created" ON "refunds"("created_at");

-- CreateIndex
CREATE INDEX "idx_refund_admin" ON "refunds"("admin_user_id");

-- CreateIndex
CREATE INDEX "idx_report_access_unlocked" ON "report_access"("is_unlocked");

-- CreateIndex
CREATE INDEX "idx_report_access_type" ON "report_access"("report_type");

-- CreateIndex
CREATE INDEX "idx_report_access_expires" ON "report_access"("expires_at");

-- CreateIndex
CREATE INDEX "idx_report_view_user" ON "report_views"("user_id");

-- CreateIndex
CREATE INDEX "idx_report_view_session" ON "report_views"("session_id");

-- CreateIndex
CREATE INDEX "idx_report_view_quiz_attempt" ON "report_views"("quiz_attempt_id");

-- CreateIndex
CREATE INDEX "idx_report_view_viewed" ON "report_views"("viewed_at");

-- CreateIndex
CREATE INDEX "idx_user_paid" ON "users"("is_paid");

-- CreateIndex
CREATE INDEX "idx_user_temporary" ON "users"("is_temporary");

-- CreateIndex
CREATE INDEX "idx_user_expires" ON "users"("expires_at");

-- CreateIndex
CREATE INDEX "idx_user_session" ON "users"("session_id");
