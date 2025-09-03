#!/bin/bash

echo "🔍 Final Comprehensive Production Readiness Test"

BASE_URL="http://localhost:9000"
TEST_EMAIL="final-test-$(date +%s)@example.com"

echo "📧 Test email: $TEST_EMAIL"
echo ""

# Test 1: Complete User Journey
echo "1️⃣ Testing Complete User Journey..."
QUIZ_DATA='{"email":"'$TEST_EMAIL'","quizData":{"mainMotivation":"financial_freedom","brandFaceComfort":5,"timeCommitment":4,"techComfort":3,"investmentCapacity":4,"incomeGoal":5,"audienceSize":3}}'

QUIZ_RESULT=$(curl -s -X POST "$BASE_URL/api/quiz-attempts/attempt" \
  -H "Content-Type: application/json" \
  -d "$QUIZ_DATA")

ATTEMPT_ID=$(echo "$QUIZ_RESULT" | grep -o '"attemptId":[0-9]*' | grep -o '[0-9]*')
QUIZ_SUCCESS=$(echo "$QUIZ_RESULT" | grep -o '"success":true' | wc -l)

if [ "$QUIZ_SUCCESS" -eq 1 ] && [ -n "$ATTEMPT_ID" ]; then
  echo "  ✅ Quiz creation successful: ID $ATTEMPT_ID"
  
  # Wait for processing
  sleep 3
  
  # Test scoring
  SCORES_RESULT=$(curl -s "$BASE_URL/api/business-model-scores/$ATTEMPT_ID")
  SCORES_COUNT=$(echo "$SCORES_RESULT" | grep -o '"id":"[^"]*"' | wc -l)
  
  if [ "$SCORES_COUNT" -gt 20 ]; then
    echo "  ✅ Business model scoring working ($SCORES_COUNT models scored)"
    
    # Test email sending
    EMAIL_RESULT=$(curl -s -X POST "$BASE_URL/api/quiz-attempts/attempt/$ATTEMPT_ID/email" \
      -H "Content-Type: application/json" \
      -d '{"email":"'$TEST_EMAIL'"}')
    
    EMAIL_SUCCESS=$(echo "$EMAIL_RESULT" | grep -o '"success":true' | wc -l)
    
    if [ "$EMAIL_SUCCESS" -eq 1 ]; then
      echo "  ✅ Email sending working"
    else
      echo "  ❌ Email sending failed"
    fi
  else
    echo "  ❌ Business model scoring failed"
  fi
else
  echo "  ❌ Quiz creation failed"
fi

# Test 2: API Health Checks
echo ""
echo "2️⃣ Testing API Health..."

# OpenAI status
AI_STATUS=$(curl -s "$BASE_URL/api/openai-status")
AI_CONFIGURED=$(echo "$AI_STATUS" | grep -o '"configured":true' | wc -l)

if [ "$AI_CONFIGURED" -eq 1 ]; then
  echo "  ✅ OpenAI integration healthy"
else
  echo "  ❌ OpenAI integration issues"
fi

# Stripe config
STRIPE_CONFIG=$(curl -s "$BASE_URL/api/stripe-config")
STRIPE_KEY=$(echo "$STRIPE_CONFIG" | grep -o '"publishableKey"' | wc -l)

if [ "$STRIPE_KEY" -eq 1 ]; then
  echo "  ✅ Stripe configuration accessible"
else
  echo "  ❌ Stripe configuration issues"
fi

# Test 3: Performance Check
echo ""
echo "3️⃣ Testing Performance..."

START_TIME=$(date +%s%N)
PERF_RESULT=$(curl -s "$BASE_URL/api/openai-status")
END_TIME=$(date +%s%N)

RESPONSE_TIME=$(( (END_TIME - START_TIME) / 1000000 ))

if [ "$RESPONSE_TIME" -lt 2000 ]; then
  echo "  ✅ API response time acceptable (${RESPONSE_TIME}ms)"
else
  echo "  ⚠️ API response time slow (${RESPONSE_TIME}ms)"
fi

# Test 4: Error Handling
echo ""
echo "4️⃣ Testing Error Handling..."

# Test invalid endpoint
ERROR_RESPONSE=$(curl -s -w "%{http_code}" "$BASE_URL/api/nonexistent" -o /dev/null)

if [ "$ERROR_RESPONSE" = "404" ]; then
  echo "  ✅ 404 error handling working"
else
  echo "  ❌ Error handling issues (got $ERROR_RESPONSE)"
fi

# Test 5: Frontend Accessibility
echo ""
echo "5️⃣ Testing Frontend Accessibility..."

FRONTEND_RESPONSE=$(curl -s -w "%{http_code}" "http://localhost:5173" -o /dev/null)

if [ "$FRONTEND_RESPONSE" = "200" ]; then
  echo "  ✅ Frontend accessible"
else
  echo "  ❌ Frontend accessibility issues (got $FRONTEND_RESPONSE)"
fi

echo ""
echo "🎯 Final comprehensive test completed"
echo ""
echo "🚀 PRODUCTION READINESS SUMMARY:"
echo "=================================="