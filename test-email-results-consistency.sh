#!/bin/bash

echo "🔍 Testing Email vs Results Page Consistency"

BASE_URL="http://localhost:9000"
TEST_EMAIL="consistency-test-$(date +%s)@example.com"

echo "📧 Test email: $TEST_EMAIL"

# Create a test quiz attempt
QUIZ_DATA='{"email":"'$TEST_EMAIL'","quizData":{"mainMotivation":"financial_freedom","brandFaceComfort":5,"timeCommitment":4,"techComfort":3,"investmentCapacity":4,"incomeGoal":5,"audienceSize":3}}'

echo ""
echo "1️⃣ Creating quiz attempt..."
QUIZ_RESULT=$(curl -s -X POST "$BASE_URL/api/quiz-attempts/attempt" \
  -H "Content-Type: application/json" \
  -d "$QUIZ_DATA")

ATTEMPT_ID=$(echo "$QUIZ_RESULT" | grep -o '"attemptId":[0-9]*' | grep -o '[0-9]*')

if [ -n "$ATTEMPT_ID" ]; then
  echo "✅ Quiz attempt created: ID $ATTEMPT_ID"
  
  # Wait for scoring
  sleep 3
  
  echo ""
  echo "2️⃣ Getting results page scores (what user sees)..."
  RESULTS_SCORES=$(curl -s "$BASE_URL/api/business-model-scores/$ATTEMPT_ID")
  
  # Get top 3 scores from results page
  TOP_3_RESULTS=$(echo "$RESULTS_SCORES" | jq -r '.[:3] | .[] | "\(.name): \(.score)%"' 2>/dev/null | head -3)
  
  echo "Results page top 3:"
  echo "$TOP_3_RESULTS"
  
  echo ""
  echo "3️⃣ Sending email and checking consistency..."
  EMAIL_RESULT=$(curl -s -X POST "$BASE_URL/api/quiz-attempts/attempt/$ATTEMPT_ID/email" \
    -H "Content-Type: application/json" \
    -d '{"email":"'$TEST_EMAIL'"}')
  
  EMAIL_SUCCESS=$(echo "$EMAIL_RESULT" | grep -o '"success":true' | wc -l)
  
  if [ "$EMAIL_SUCCESS" -eq 1 ]; then
    echo "✅ Email sent successfully"
    echo ""
    echo "4️⃣ Checking server logs for email template scores..."
    echo "(Check server logs for 'Email template - Top 3 calculated matches')"
  else
    echo "❌ Email sending failed"
  fi
  
else
  echo "❌ Quiz attempt creation failed"
fi

echo ""
echo "🎯 Check the server logs to compare email scores with the results above"