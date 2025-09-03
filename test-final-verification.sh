#!/bin/bash

echo "🔍 Testing Email & Consistency Fixes"

BASE_URL="http://localhost:9000"
TEST_EMAIL="fix-test-$(date +%s)@example.com"

echo "📧 Test email: $TEST_EMAIL"

# Test the complete flow with proper quiz attempt creation
echo ""
echo "1️⃣ Creating quiz attempt with proper integer ID..."
QUIZ_DATA='{"email":"'$TEST_EMAIL'","quizData":{"mainMotivation":"financial_freedom","brandFaceComfort":5,"timeCommitment":4,"techComfort":3,"investmentCapacity":4,"incomeGoal":5,"audienceSize":3}}'

QUIZ_RESULT=$(curl -s -X POST "$BASE_URL/api/quiz-attempts/attempt" \
  -H "Content-Type: application/json" \
  -d "$QUIZ_DATA")

ATTEMPT_ID=$(echo "$QUIZ_RESULT" | grep -o '"attemptId":[0-9]*' | grep -o '[0-9]*')
QUIZ_SUCCESS=$(echo "$QUIZ_RESULT" | grep -o '"success":true' | wc -l)

if [ "$QUIZ_SUCCESS" -eq 1 ] && [ -n "$ATTEMPT_ID" ]; then
  echo "✅ Quiz attempt created with INTEGER ID: $ATTEMPT_ID"
  
  # Verify it's an integer, not UUID
  if [[ "$ATTEMPT_ID" =~ ^[0-9]+$ ]]; then
    echo "✅ Confirmed: ID is proper integer format (not UUID)"
  else
    echo "❌ ERROR: ID is not integer format: $ATTEMPT_ID"
    exit 1
  fi
  
  # Wait for scoring
  sleep 3
  
  # Get results page scores
  echo ""
  echo "2️⃣ Getting results page scores..."
  RESULTS_SCORES=$(curl -s "$BASE_URL/api/business-model-scores/$ATTEMPT_ID")
  
  if [ -n "$RESULTS_SCORES" ] && [[ "$RESULTS_SCORES" != *"error"* ]]; then
    TOP_3_RESULTS=$(echo "$RESULTS_SCORES" | jq -r '.[:3] | .[] | "\(.name): \(.score)%"' 2>/dev/null | head -3)
    echo "✅ Results page scores retrieved:"
    echo "$TOP_3_RESULTS"
    
    # Test email sending
    echo ""
    echo "3️⃣ Testing email sending..."
    EMAIL_RESULT=$(curl -s -X POST "$BASE_URL/api/quiz-attempts/attempt/$ATTEMPT_ID/email" \
      -H "Content-Type: application/json" \
      -d '{"email":"'$TEST_EMAIL'"}')
    
    EMAIL_SUCCESS=$(echo "$EMAIL_RESULT" | grep -o '"success":true' | wc -l)
    
    if [ "$EMAIL_SUCCESS" -eq 1 ]; then
      echo "✅ Email sent successfully!"
      echo "✅ Check server logs to verify consistent scores and emojis"
    else
      echo "❌ Email sending failed"
      echo "Response: $EMAIL_RESULT"
    fi
  else
    echo "❌ Failed to get results page scores"
    echo "Response: $RESULTS_SCORES"
  fi
  
else
  echo "❌ Quiz attempt creation failed"
  echo "Response: $QUIZ_RESULT"
fi

echo ""
echo "🎯 Test completed - check server logs for detailed scoring info"