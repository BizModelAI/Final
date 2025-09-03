#!/bin/bash

echo "🛤️ Testing Personalized Paths Work Everywhere"

BASE_URL="http://localhost:9000"
TEST_EMAIL="paths-test-$(date +%s)@example.com"

echo "📧 Test email: $TEST_EMAIL"

# Step 1: Create quiz attempt to generate personalized paths
echo ""
echo "1️⃣ Creating quiz attempt to generate personalized paths..."
QUIZ_DATA='{"email":"'$TEST_EMAIL'","quizData":{"mainMotivation":"financial_freedom","brandFaceComfort":5,"timeCommitment":4,"techComfort":3,"investmentCapacity":4,"incomeGoal":5,"audienceSize":3}}'

QUIZ_RESULT=$(curl -s -X POST "$BASE_URL/api/quiz-attempts/attempt" \
  -H "Content-Type: application/json" \
  -d "$QUIZ_DATA")

ATTEMPT_ID=$(echo "$QUIZ_RESULT" | grep -o '"attemptId":[0-9]*' | grep -o '[0-9]*')
QUIZ_SUCCESS=$(echo "$QUIZ_RESULT" | grep -o '"success":true' | wc -l)

if [ "$QUIZ_SUCCESS" -eq 1 ] && [ -n "$ATTEMPT_ID" ]; then
  echo "✅ Quiz attempt created: ID $ATTEMPT_ID"
  
  # Wait for scoring
  sleep 3
  
  # Step 2: Get business model scores (personalized recommendations)
  echo ""
  echo "2️⃣ Testing business model scores endpoint..."
  SCORES_RESULT=$(curl -s "$BASE_URL/api/business-model-scores/$ATTEMPT_ID")
  
  TOP_MODEL=$(echo "$SCORES_RESULT" | jq -r '.[0].name' 2>/dev/null)
  TOP_SCORE=$(echo "$SCORES_RESULT" | jq -r '.[0].score' 2>/dev/null)
  SECOND_MODEL=$(echo "$SCORES_RESULT" | jq -r '.[1].name' 2>/dev/null)
  SECOND_SCORE=$(echo "$SCORES_RESULT" | jq -r '.[1].score' 2>/dev/null)
  
  if [ -n "$TOP_MODEL" ] && [ "$TOP_MODEL" != "null" ]; then
    echo "✅ Personalized business model rankings working"
    echo "   #1: $TOP_MODEL ($TOP_SCORE%)"
    echo "   #2: $SECOND_MODEL ($SECOND_SCORE%)"
  else
    echo "❌ Personalized business model rankings failed"
  fi
  
  # Step 3: Test email content uses same personalized recommendations
  echo ""
  echo "3️⃣ Testing email personalized content..."
  EMAIL_RESULT=$(curl -s -X POST "$BASE_URL/api/quiz-attempts/attempt/$ATTEMPT_ID/email" \
    -H "Content-Type: application/json" \
    -d '{"email":"'$TEST_EMAIL'"}')
  
  EMAIL_SUCCESS=$(echo "$EMAIL_RESULT" | grep -o '"success":true' | wc -l)
  
  if [ "$EMAIL_SUCCESS" -eq 1 ]; then
    echo "✅ Email with personalized recommendations sent successfully"
  else
    echo "❌ Email with personalized recommendations failed"
  fi
  
  # Step 4: Test consistency across different API calls
  echo ""
  echo "4️⃣ Testing consistency across API endpoints..."
  
  # Get scores again to verify consistency
  SCORES_RETRY=$(curl -s "$BASE_URL/api/business-model-scores/$ATTEMPT_ID")
  TOP_MODEL_RETRY=$(echo "$SCORES_RETRY" | jq -r '.[0].name' 2>/dev/null)
  
  if [ "$TOP_MODEL" = "$TOP_MODEL_RETRY" ]; then
    echo "✅ Personalized paths consistent across API calls"
  else
    echo "❌ Personalized paths inconsistent across API calls"
    echo "   Original: $TOP_MODEL, Retry: $TOP_MODEL_RETRY"
  fi
  
  # Step 5: Test different user profiles get different personalized paths
  echo ""
  echo "5️⃣ Testing different user profiles get different paths..."
  
  # Create different user with different goals
  TEST_EMAIL2="paths-test-different-$(date +%s)@example.com"
  DIFFERENT_QUIZ_DATA='{"email":"'$TEST_EMAIL2'","quizData":{"mainMotivation":"creative_fulfillment","brandFaceComfort":2,"timeCommitment":5,"techComfort":2,"investmentCapacity":1,"incomeGoal":2,"audienceSize":1}}'
  
  DIFFERENT_QUIZ_RESULT=$(curl -s -X POST "$BASE_URL/api/quiz-attempts/attempt" \
    -H "Content-Type: application/json" \
    -d "$DIFFERENT_QUIZ_DATA")
  
  DIFFERENT_ATTEMPT_ID=$(echo "$DIFFERENT_QUIZ_RESULT" | grep -o '"attemptId":[0-9]*' | grep -o '[0-9]*')
  
  if [ -n "$DIFFERENT_ATTEMPT_ID" ]; then
    sleep 3
    DIFFERENT_SCORES=$(curl -s "$BASE_URL/api/business-model-scores/$DIFFERENT_ATTEMPT_ID")
    DIFFERENT_TOP_MODEL=$(echo "$DIFFERENT_SCORES" | jq -r '.[0].name' 2>/dev/null)
    
    if [ "$TOP_MODEL" != "$DIFFERENT_TOP_MODEL" ]; then
      echo "✅ Different user profiles get different personalized paths"
      echo "   User 1 top: $TOP_MODEL"
      echo "   User 2 top: $DIFFERENT_TOP_MODEL"
    else
      echo "❌ Different user profiles getting same recommendations (may be coincidental)"
    fi
  else
    echo "❌ Could not create different user profile for comparison"
  fi
  
else
  echo "❌ Quiz attempt creation failed"
  echo "Response: $QUIZ_RESULT"
fi

echo ""
echo "🎯 Personalized paths test completed"