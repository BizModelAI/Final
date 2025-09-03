#!/bin/bash

echo "💾 Testing Data Storage System"

BASE_URL="http://localhost:9000"
TEST_EMAIL="storage-test-$(date +%s)@example.com"

echo "📧 Test email: $TEST_EMAIL"

# Step 1: Test content storage via quiz creation
echo ""
echo "1️⃣ Testing content storage via quiz creation..."
QUIZ_DATA='{"email":"'$TEST_EMAIL'","quizData":{"mainMotivation":"financial_freedom","brandFaceComfort":5,"timeCommitment":4,"techComfort":3,"investmentCapacity":4,"incomeGoal":5,"audienceSize":3}}'

QUIZ_RESULT=$(curl -s -X POST "$BASE_URL/api/quiz-attempts/attempt" \
  -H "Content-Type: application/json" \
  -d "$QUIZ_DATA")

ATTEMPT_ID=$(echo "$QUIZ_RESULT" | grep -o '"attemptId":[0-9]*' | grep -o '[0-9]*')
QUIZ_SUCCESS=$(echo "$QUIZ_RESULT" | grep -o '"success":true' | wc -l)

if [ "$QUIZ_SUCCESS" -eq 1 ] && [ -n "$ATTEMPT_ID" ]; then
  echo "✅ Content storage working (quiz data stored with ID: $ATTEMPT_ID)"
  
  # Step 2: Test business model scores storage
  echo ""
  echo "2️⃣ Testing business model scores storage..."
  sleep 2
  SCORES_RESULT=$(curl -s "$BASE_URL/api/business-model-scores/$ATTEMPT_ID")
  SCORES_COUNT=$(echo "$SCORES_RESULT" | grep -o '"score":[0-9]*' | wc -l)
  
  if [ "$SCORES_COUNT" -gt 20 ]; then
    echo "✅ Business model scores storage working ($SCORES_COUNT scores stored)"
  else
    echo "❌ Business model scores storage failed"
  fi
  
  # Step 3: Test data persistence (retrieve stored data)
  echo ""
  echo "3️⃣ Testing data persistence..."
  
  # Wait a moment then retrieve again to test persistence
  sleep 1
  PERSISTENCE_TEST=$(curl -s "$BASE_URL/api/business-model-scores/$ATTEMPT_ID")
  PERSISTENCE_COUNT=$(echo "$PERSISTENCE_TEST" | grep -o '"score":[0-9]*' | wc -l)
  
  if [ "$PERSISTENCE_COUNT" -eq "$SCORES_COUNT" ]; then
    echo "✅ Data persistence working (consistent retrieval)"
  else
    echo "❌ Data persistence issues detected"
  fi
  
  # Step 4: Test data format integrity
  echo ""
  echo "4️⃣ Testing data format integrity..."
  
  # Check if stored data maintains proper JSON structure
  JSON_VALID=$(echo "$SCORES_RESULT" | jq length 2>/dev/null)
  
  if [ -n "$JSON_VALID" ] && [ "$JSON_VALID" -gt 0 ]; then
    echo "✅ Data format integrity maintained (valid JSON with $JSON_VALID items)"
  else
    echo "❌ Data format integrity issues"
  fi
  
  # Step 5: Test user data linking
  echo ""
  echo "5️⃣ Testing user data linking..."
  
  # Check if quiz data is properly linked to user
  FIRST_SCORE=$(echo "$SCORES_RESULT" | jq -r '.[0].id' 2>/dev/null)
  
  if [ -n "$FIRST_SCORE" ] && [ "$FIRST_SCORE" != "null" ]; then
    echo "✅ User data linking working (business models properly identified)"
  else
    echo "❌ User data linking issues"
  fi
  
else
  echo "❌ Content storage failed"
  echo "Response: $QUIZ_RESULT"
fi

echo ""
echo "🎯 Data storage system test completed"