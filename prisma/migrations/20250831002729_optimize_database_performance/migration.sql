-- Add composite indexes for better query performance
-- These indexes will improve performance for common query patterns

-- Optimize AiContent queries by content type and generation date
CREATE INDEX IF NOT EXISTS "idx_ai_content_type_generated" ON "ai_content" ("content_type", "generated_at");

-- Optimize QuizAttempt queries by user and completion date
CREATE INDEX IF NOT EXISTS "idx_quiz_attempt_user_completed" ON "quiz_attempts" ("user_id", "completed_at");

-- Optimize Payment queries by user and status
CREATE INDEX IF NOT EXISTS "idx_payment_user_status" ON "payments" ("user_id", "status");

-- Optimize ReportView queries by user and view date
CREATE INDEX IF NOT EXISTS "idx_report_view_user_viewed" ON "report_views" ("user_id", "viewed_at");

-- Add partial indexes for better performance on filtered queries
-- Only index non-null user_id values for better performance
CREATE INDEX IF NOT EXISTS "idx_quiz_attempt_user_not_null" ON "quiz_attempts" ("user_id") WHERE "user_id" IS NOT NULL;

-- Only index non-null session_id values for better performance
CREATE INDEX IF NOT EXISTS "idx_quiz_attempt_session_not_null" ON "quiz_attempts" ("session_id") WHERE "session_id" IS NOT NULL;

-- Optimize User queries by email and temporary status
CREATE INDEX IF NOT EXISTS "idx_user_email_temporary" ON "users" ("email", "is_temporary");

-- Add GIN index for JSON content in AiContent for better text search
CREATE INDEX IF NOT EXISTS "idx_ai_content_content_gin" ON "ai_content" USING GIN ("content");

-- Add GIN index for JSON quiz data in QuizAttempt for better text search
CREATE INDEX IF NOT EXISTS "idx_quiz_attempt_data_gin" ON "quiz_attempts" USING GIN ("quiz_data");
