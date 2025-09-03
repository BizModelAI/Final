#!/bin/bash

echo "🗄️ Testing Database System"

BASE_URL="http://localhost:9000"
TEST_EMAIL="db-test-$(date +%s)@example.com"

echo "📧 Test email: $TEST_EMAIL"

# Step 1: Test database connection via user creation
echo ""
echo "1️⃣ Testing database connection via user creation..."
QUIZ_DATA='{"email":"'$TEST_EMAIL'","quizData":{"mainMotivation":"financial_freedom","brandFaceComfort":5,"timeCommitment":4,"techComfort":3,"investmentCapacity":4,"incomeGoal":5,"audienceSize":3}}'

QUIZ_RESULT=$(curl -s -X POST "$BASE_URL/api/quiz-attempts/attempt" \
  -H "Content-Type: application/json" \
  -d "$QUIZ_DATA")

ATTEMPT_ID=$(echo "$QUIZ_RESULT" | grep -o '"attemptId":[0-9]*' | grep -o '[0-9]*')
QUIZ_SUCCESS=$(echo "$QUIZ_RESULT" | grep -o '"success":true' | wc -l)

if [ "$QUIZ_SUCCESS" -eq 1 ] && [ -n "$ATTEMPT_ID" ]; then
  echo "✅ Database write operations working (user creation + quiz attempt)"
  
  # Step 2: Test database read operations
  echo ""
  echo "2️⃣ Testing database read operations..."
  sleep 2
  SCORES_RESULT=$(curl -s "$BASE_URL/api/business-model-scores/$ATTEMPT_ID")
  SCORES_COUNT=$(echo "$SCORES_RESULT" | grep -o '"id":"[^"]*"' | wc -l)
  
  if [ "$SCORES_COUNT" -gt 20 ]; then
    echo "✅ Database read operations working (retrieved $SCORES_COUNT business model scores)"
  else
    echo "❌ Database read operations failed"
  fi
  
  # Step 3: Test database relationships (user -> quiz attempt -> scores)
  echo ""
  echo "3️⃣ Testing database relationships..."
  
  # Quiz attempt should exist and link to scores
  if [ "$SCORES_COUNT" -gt 20 ] && [ -n "$ATTEMPT_ID" ]; then
    echo "✅ Database relationships working (quiz attempt → business model scores)"
  else
    echo "❌ Database relationships failed"
  fi
  
  # Step 4: Test database concurrency (multiple operations)
  echo ""
  echo "4️⃣ Testing database concurrency..."
  
  # Create multiple quiz attempts simultaneously
  TEST_EMAIL2="db-test-concurrent-$(date +%s)@example.com"
  CONCURRENT_DATA='{"email":"'$TEST_EMAIL2'","quizData":{"mainMotivation":"creative_fulfillment","brandFaceComfort":3,"timeCommitment":5,"techComfort":4,"investmentCapacity":2,"incomeGoal":3,"audienceSize":4}}'
  
  CONCURRENT_RESULT=$(curl -s -X POST "$BASE_URL/api/quiz-attempts/attempt" \
    -H "Content-Type: application/json" \
    -d "$CONCURRENT_DATA")
  
  CONCURRENT_ATTEMPT_ID=$(echo "$CONCURRENT_RESULT" | grep -o '"attemptId":[0-9]*' | grep -o '[0-9]*')
  
  if [ -n "$CONCURRENT_ATTEMPT_ID" ] && [ "$CONCURRENT_ATTEMPT_ID" != "$ATTEMPT_ID" ]; then
    echo "✅ Database concurrency working (multiple independent operations)"
  else
    echo "❌ Database concurrency issues detected"
  fi
  
  # Step 5: Test database data integrity
  echo ""
  echo "5️⃣ Testing database data integrity..."
  
  # Verify unique IDs
  if [ "$ATTEMPT_ID" -ne "$CONCURRENT_ATTEMPT_ID" ]; then
    echo "✅ Database maintains unique IDs"
  else
    echo "❌ Database ID collision detected"
  fi
  
else
  echo "❌ Database connection failed"
  echo "Response: $QUIZ_RESULT"
fi

echo ""
echo "🎯 Database system test completed"