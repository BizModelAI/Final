#!/bin/bash

echo "🆔 Testing Quiz ID System"

BASE_URL="http://localhost:9000"
TEST_EMAIL="quiz-id-test-$(date +%s)@example.com"

echo "📧 Test email: $TEST_EMAIL"

# Step 1: Test quiz attempt creation and ID generation
echo ""
echo "1️⃣ Testing quiz attempt creation and ID generation..."
QUIZ_DATA='{"email":"'$TEST_EMAIL'","quizData":{"mainMotivation":"financial_freedom","brandFaceComfort":5,"timeCommitment":4,"techComfort":3,"investmentCapacity":4,"incomeGoal":5,"audienceSize":3}}'

QUIZ_RESULT=$(curl -s -X POST "$BASE_URL/api/quiz-attempts/attempt" \
  -H "Content-Type: application/json" \
  -d "$QUIZ_DATA")

ATTEMPT_ID=$(echo "$QUIZ_RESULT" | grep -o '"attemptId":[0-9]*' | grep -o '[0-9]*')
QUIZ_SUCCESS=$(echo "$QUIZ_RESULT" | grep -o '"success":true' | wc -l)

if [ "$QUIZ_SUCCESS" -eq 1 ] && [ -n "$ATTEMPT_ID" ]; then
  echo "✅ Quiz attempt created with ID: $ATTEMPT_ID"
  
  # Verify it's a proper integer ID (not UUID)
  if [[ "$ATTEMPT_ID" =~ ^[0-9]+$ ]]; then
    echo "✅ Quiz ID is proper integer format"
  else
    echo "❌ Quiz ID is not proper integer format: $ATTEMPT_ID"
  fi
  
  # Step 2: Test quiz attempt retrieval by ID
  echo ""
  echo "2️⃣ Testing quiz attempt retrieval by ID..."
  RETRIEVAL_RESULT=$(curl -s "$BASE_URL/api/quiz-attempts/attempt/$ATTEMPT_ID")
  RETRIEVAL_HAS_QUIZ_DATA=$(echo "$RETRIEVAL_RESULT" | grep -o '"quizData"' | wc -l)
  RETRIEVAL_HAS_ID=$(echo "$RETRIEVAL_RESULT" | grep -o "\"id\":$ATTEMPT_ID" | wc -l)
  
  if [ "$RETRIEVAL_HAS_QUIZ_DATA" -eq 1 ] && [ "$RETRIEVAL_HAS_ID" -eq 1 ]; then
    echo "✅ Quiz attempt retrieval by ID working"
  else
    echo "❌ Quiz attempt retrieval failed"
  fi
  
  # Step 3: Test business model scores linked to quiz ID
  echo ""
  echo "3️⃣ Testing business model scores linked to quiz ID..."
  sleep 2  # Wait for scoring
  SCORES_RESULT=$(curl -s "$BASE_URL/api/business-model-scores/$ATTEMPT_ID")
  SCORES_COUNT=$(echo "$SCORES_RESULT" | grep -o '"id":"[^"]*"' | wc -l)
  
  if [ "$SCORES_COUNT" -gt 20 ]; then
    echo "✅ Business model scores properly linked to quiz ID"
  else
    echo "❌ Business model scores not properly linked"
  fi
  
  # Step 4: Test user lookup by quiz attempt
  echo ""
  echo "4️⃣ Testing user lookup by quiz attempt..."
  USER_RESULT=$(curl -s -X POST "$BASE_URL/api/user-by-email" \
    -H "Content-Type: application/json" \
    -d '{"email":"'$TEST_EMAIL'"}')
  
  USER_ID=$(echo "$USER_RESULT" | grep -o '"id":[0-9]*' | head -1 | grep -o '[0-9]*')
  
  if [ -n "$USER_ID" ]; then
    echo "✅ User lookup by email working, User ID: $USER_ID"
    
    # Test user's quiz attempts
    USER_ATTEMPTS=$(curl -s "$BASE_URL/api/quiz-attempts/user/$USER_ID")
    USER_HAS_ATTEMPTS=$(echo "$USER_ATTEMPTS" | grep -o '"quizAttempts"' | wc -l)
    
    if [ "$USER_HAS_ATTEMPTS" -eq 1 ]; then
      echo "✅ User quiz attempts lookup working"
    else
      echo "❌ User quiz attempts lookup failed"
    fi
  else
    echo "❌ User lookup failed"
  fi
  
else
  echo "❌ Quiz attempt creation failed"
  echo "Response: $QUIZ_RESULT"
fi

echo ""
echo "🎯 Quiz ID system test completed"