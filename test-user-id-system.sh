#!/bin/bash

echo "👤 Testing User ID System"

BASE_URL="http://localhost:9000"
TEST_EMAIL="user-id-test-$(date +%s)@example.com"

echo "📧 Test email: $TEST_EMAIL"

# Step 1: Test user creation via quiz attempt
echo ""
echo "1️⃣ Testing user creation via quiz attempt..."
QUIZ_DATA='{"email":"'$TEST_EMAIL'","quizData":{"mainMotivation":"financial_freedom","brandFaceComfort":5,"timeCommitment":4,"techComfort":3,"investmentCapacity":4,"incomeGoal":5,"audienceSize":3}}'

QUIZ_RESULT=$(curl -s -X POST "$BASE_URL/api/quiz-attempts/attempt" \
  -H "Content-Type: application/json" \
  -d "$QUIZ_DATA")

ATTEMPT_ID=$(echo "$QUIZ_RESULT" | grep -o '"attemptId":[0-9]*' | grep -o '[0-9]*')
QUIZ_SUCCESS=$(echo "$QUIZ_RESULT" | grep -o '"success":true' | wc -l)

if [ "$QUIZ_SUCCESS" -eq 1 ] && [ -n "$ATTEMPT_ID" ]; then
  echo "✅ Quiz attempt created, triggering user creation"
  
  # Step 2: Test user lookup by email
  echo ""
  echo "2️⃣ Testing user lookup by email..."
  USER_RESULT=$(curl -s -X POST "$BASE_URL/api/user-by-email" \
    -H "Content-Type: application/json" \
    -d '{"email":"'$TEST_EMAIL'"}')
  
  USER_ID=$(echo "$USER_RESULT" | grep -o '"id":[0-9]*' | head -1 | grep -o '[0-9]*')
  USER_EMAIL=$(echo "$USER_RESULT" | grep -o '"email":"[^"]*"' | head -1)
  
  if [ -n "$USER_ID" ] && [[ "$USER_EMAIL" == *"$TEST_EMAIL"* ]]; then
    echo "✅ User lookup working, User ID: $USER_ID"
    
    # Verify it's a proper integer ID
    if [[ "$USER_ID" =~ ^[0-9]+$ ]]; then
      echo "✅ User ID is proper integer format"
    else
      echo "❌ User ID is not proper integer format: $USER_ID"
    fi
    
    # Step 3: Test user's quiz attempts by user ID
    echo ""
    echo "3️⃣ Testing quiz attempts by user ID..."
    USER_ATTEMPTS=$(curl -s "$BASE_URL/api/quiz-attempts/user/$USER_ID")
    ATTEMPTS_COUNT=$(echo "$USER_ATTEMPTS" | grep -o '"id":[0-9]*' | wc -l)
    
    if [ "$ATTEMPTS_COUNT" -gt 0 ]; then
      echo "✅ User quiz attempts retrieval working ($ATTEMPTS_COUNT attempts found)"
    else
      echo "❌ User quiz attempts retrieval failed"
    fi
    
    # Step 4: Test duplicate email handling
    echo ""
    echo "4️⃣ Testing duplicate email handling..."
    DUPLICATE_RESULT=$(curl -s -X POST "$BASE_URL/api/quiz-attempts/attempt" \
      -H "Content-Type: application/json" \
      -d "$QUIZ_DATA")
    
    DUPLICATE_ATTEMPT_ID=$(echo "$DUPLICATE_RESULT" | grep -o '"attemptId":[0-9]*' | grep -o '[0-9]*')
    
    if [ -n "$DUPLICATE_ATTEMPT_ID" ]; then
      echo "✅ Duplicate email handling working (new attempt ID: $DUPLICATE_ATTEMPT_ID)"
      
      # Verify both attempts link to same user
      SECOND_USER_RESULT=$(curl -s -X POST "$BASE_URL/api/user-by-email" \
        -H "Content-Type: application/json" \
        -d '{"email":"'$TEST_EMAIL'"}')
      
      SECOND_USER_ID=$(echo "$SECOND_USER_RESULT" | grep -o '"id":[0-9]*' | head -1 | grep -o '[0-9]*')
      
      if [ "$USER_ID" = "$SECOND_USER_ID" ]; then
        echo "✅ Same user ID for duplicate email (consistent user identity)"
      else
        echo "❌ Different user IDs for same email (inconsistent user identity)"
      fi
    else
      echo "❌ Duplicate email handling failed"
    fi
    
  else
    echo "❌ User lookup failed"
    echo "Response preview: $(echo "$USER_RESULT" | head -c 100)"
  fi
  
else
  echo "❌ Quiz attempt creation failed"
  echo "Response: $QUIZ_RESULT"
fi

echo ""
echo "🎯 User ID system test completed"