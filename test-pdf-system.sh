#!/bin/bash

echo "📄 Testing PDF System"

BASE_URL="http://localhost:9000"
TEST_EMAIL="pdf-test-$(date +%s)@example.com"

echo "📧 Test email: $TEST_EMAIL"

# Step 1: Create a quiz attempt for PDF testing
echo ""
echo "1️⃣ Creating quiz attempt for PDF testing..."
QUIZ_DATA='{"email":"'$TEST_EMAIL'","quizData":{"mainMotivation":"financial_freedom","brandFaceComfort":5,"timeCommitment":4,"techComfort":3,"investmentCapacity":4,"incomeGoal":5,"audienceSize":3}}'

QUIZ_RESULT=$(curl -s -X POST "$BASE_URL/api/quiz-attempts/attempt" \
  -H "Content-Type: application/json" \
  -d "$QUIZ_DATA")

ATTEMPT_ID=$(echo "$QUIZ_RESULT" | grep -o '"attemptId":[0-9]*' | grep -o '[0-9]*')

if [ -n "$ATTEMPT_ID" ]; then
  echo "✅ Quiz attempt created: ID $ATTEMPT_ID"
  
  # Wait for scoring
  sleep 3
  
  # Step 2: Test PDF generation
  echo ""
  echo "2️⃣ Testing PDF generation..."
  
  PDF_RESULT=$(curl -s -X POST "$BASE_URL/api/generate-pdf" \
    -H "Content-Type: application/json" \
    -d '{"quizData":{"mainMotivation":"financial_freedom","brandFaceComfort":5,"timeCommitment":4,"techComfort":3,"investmentCapacity":4,"incomeGoal":5,"audienceSize":3}}')
  
  PDF_SIZE=$(echo "$PDF_RESULT" | wc -c)
  
  if [ "$PDF_SIZE" -gt 1000 ]; then
    echo "✅ PDF generation working (generated $PDF_SIZE bytes)"
  else
    echo "❌ PDF generation failed or returned minimal content"
    echo "Response preview: $(echo "$PDF_RESULT" | head -c 200)"
  fi
  
  # Step 3: Test PDF with quiz attempt data
  echo ""
  echo "3️⃣ Testing PDF with specific quiz attempt..."
  
  PDF_WITH_DATA=$(curl -s -X POST "$BASE_URL/api/generate-pdf" \
    -H "Content-Type: application/json" \
    -d '{"quizAttemptId":"'$ATTEMPT_ID'"}')
  
  PDF_WITH_DATA_SIZE=$(echo "$PDF_WITH_DATA" | wc -c)
  
  if [ "$PDF_WITH_DATA_SIZE" -gt 1000 ]; then
    echo "✅ PDF with quiz attempt data working (generated $PDF_WITH_DATA_SIZE bytes)"
  else
    echo "❌ PDF with quiz attempt data failed"
  fi
  
else
  echo "❌ Quiz attempt creation failed"
fi

echo ""
echo "🎯 PDF system test completed"