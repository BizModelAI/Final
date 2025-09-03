#!/bin/bash

echo "🧪 Starting User Conversion Test"

# Test configuration
BASE_URL="http://localhost:9000"
TEST_EMAIL="test-conversion-$(date +%s)@example.com"
QUIZ_DATA='{"email":"'$TEST_EMAIL'","quizData":{"mainMotivation":"financial_freedom","brandFaceComfort":5,"timeCommitment":4,"techComfort":3,"investmentCapacity":4,"incomeGoal":5,"audienceSize":3}}'

echo "📧 Test email: $TEST_EMAIL"

# Step 1: Create quiz attempt
echo ""
echo "1️⃣ Creating quiz attempt..."
QUIZ_RESULT=$(curl -s -X POST "$BASE_URL/api/quiz-attempts/attempt" \
  -H "Content-Type: application/json" \
  -d "$QUIZ_DATA")

QUIZ_SUCCESS=$(echo "$QUIZ_RESULT" | grep -o '"success":true' | wc -l)
ATTEMPT_ID=$(echo "$QUIZ_RESULT" | grep -o '"attemptId":[0-9]*' | grep -o '[0-9]*')

if [ "$QUIZ_SUCCESS" -eq 1 ] && [ -n "$ATTEMPT_ID" ]; then
  echo "✅ Quiz attempt created: ID $ATTEMPT_ID"
  
  # Wait for scoring to complete
  sleep 2
  
  # Step 2: Check scoring
  echo ""
  echo "2️⃣ Checking scoring system..."
  SCORES_RESULT=$(curl -s "$BASE_URL/api/business-model-scores/$ATTEMPT_ID")
  SCORES_COUNT=$(echo "$SCORES_RESULT" | grep -o '"id":"[^"]*"' | wc -l)
  
  if [ "$SCORES_COUNT" -gt 20 ]; then
    echo "✅ Scoring system working"
    
    # Step 3: Test email sending
    echo ""
    echo "3️⃣ Testing email sending..."
    EMAIL_RESULT=$(curl -s -X POST "$BASE_URL/api/quiz-attempts/attempt/$ATTEMPT_ID/email" \
      -H "Content-Type: application/json" \
      -d '{"email":"'$TEST_EMAIL'"}')
    
    EMAIL_SUCCESS=$(echo "$EMAIL_RESULT" | grep -o '"success":true' | wc -l)
    
    if [ "$EMAIL_SUCCESS" -eq 1 ]; then
      echo "✅ Email sending working"
    else
      echo "❌ Email sending failed"
      echo "Response: $EMAIL_RESULT"
    fi
    
    # Step 4: Test report access
    echo ""
    echo "4️⃣ Testing report access..."
    REPORT_RESULT=$(curl -s "$BASE_URL/api/quiz-attempts/attempt/$ATTEMPT_ID")
    REPORT_HAS_QUIZ_DATA=$(echo "$REPORT_RESULT" | grep -o '"quizData"' | wc -l)
    
    if [ "$REPORT_HAS_QUIZ_DATA" -eq 1 ]; then
      echo "✅ Report access working"
    else
      echo "❌ Report access failed"
      echo "Response preview: $(echo "$REPORT_RESULT" | head -c 200)"
    fi
  else
    echo "❌ Scoring system failed"
    echo "Response: $SCORES_RESULT"
  fi
else
  echo "❌ Quiz attempt creation failed"
  echo "Response: $QUIZ_RESULT"
fi

echo ""
echo "🎯 User conversion test completed"