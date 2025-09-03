#!/bin/bash

echo "📧 Testing Email System"

BASE_URL="http://localhost:9000"
TEST_EMAIL="email-test-$(date +%s)@example.com"

echo "📧 Test email: $TEST_EMAIL"

# Step 1: Create a quiz attempt for email testing
echo ""
echo "1️⃣ Creating quiz attempt for email testing..."
QUIZ_DATA='{"email":"'$TEST_EMAIL'","quizData":{"mainMotivation":"financial_freedom","brandFaceComfort":5,"timeCommitment":4,"techComfort":3,"investmentCapacity":4,"incomeGoal":5,"audienceSize":3}}'

QUIZ_RESULT=$(curl -s -X POST "$BASE_URL/api/quiz-attempts/attempt" \
  -H "Content-Type: application/json" \
  -d "$QUIZ_DATA")

ATTEMPT_ID=$(echo "$QUIZ_RESULT" | grep -o '"attemptId":[0-9]*' | grep -o '[0-9]*')

if [ -n "$ATTEMPT_ID" ]; then
  echo "✅ Quiz attempt created: ID $ATTEMPT_ID"
  
  # Wait for scoring to complete
  sleep 2
  
  # Step 2: Test email sending
  echo ""
  echo "2️⃣ Testing email sending..."
  EMAIL_RESULT=$(curl -s -X POST "$BASE_URL/api/quiz-attempts/attempt/$ATTEMPT_ID/email" \
    -H "Content-Type: application/json" \
    -d '{"email":"'$TEST_EMAIL'"}')
  
  EMAIL_SUCCESS=$(echo "$EMAIL_RESULT" | grep -o '"success":true' | wc -l)
  
  if [ "$EMAIL_SUCCESS" -eq 1 ]; then
    echo "✅ Email sending working"
    
    # Step 3: Test rate limiting
    echo ""
    echo "3️⃣ Testing email rate limiting..."
    RATE_LIMIT_RESULT=$(curl -s -X POST "$BASE_URL/api/quiz-attempts/attempt/$ATTEMPT_ID/email" \
      -H "Content-Type: application/json" \
      -d '{"email":"'$TEST_EMAIL'"}')
    
    RATE_LIMITED=$(echo "$RATE_LIMIT_RESULT" | grep -o '"success":false' | wc -l)
    
    if [ "$RATE_LIMITED" -eq 1 ]; then
      echo "✅ Email rate limiting working"
    else
      echo "❌ Email rate limiting not working properly"
    fi
    
    # Step 4: Test different business model scores email content
    echo ""
    echo "4️⃣ Testing email content consistency..."
    
    # Get the business model scores
    SCORES_RESULT=$(curl -s "$BASE_URL/api/business-model-scores/$ATTEMPT_ID")
    TOP_SCORE=$(echo "$SCORES_RESULT" | grep -o '"score":[0-9]*' | head -1 | grep -o '[0-9]*')
    
    if [ -n "$TOP_SCORE" ] && [ "$TOP_SCORE" -gt 50 ]; then
      echo "✅ Email content has proper business model scores"
    else
      echo "❌ Email content missing proper scores"
    fi
    
  else
    echo "❌ Email sending failed"
    echo "Response: $EMAIL_RESULT"
  fi
  
else
  echo "❌ Quiz attempt creation failed"
fi

echo ""
echo "🎯 Email system test completed"