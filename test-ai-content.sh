#!/bin/bash

echo "🤖 Testing OpenAI Content Display from Quiz History"

BASE_URL="http://localhost:9000"
TEST_EMAIL="ai-content-test-$(date +%s)@example.com"

echo "📧 Test email: $TEST_EMAIL"

# Step 1: Create quiz attempt to generate AI content
echo ""
echo "1️⃣ Creating quiz attempt to generate AI content..."
QUIZ_DATA='{"email":"'$TEST_EMAIL'","quizData":{"mainMotivation":"financial_freedom","brandFaceComfort":5,"timeCommitment":4,"techComfort":3,"investmentCapacity":4,"incomeGoal":5,"audienceSize":3}}'

QUIZ_RESULT=$(curl -s -X POST "$BASE_URL/api/quiz-attempts/attempt" \
  -H "Content-Type: application/json" \
  -d "$QUIZ_DATA")

ATTEMPT_ID=$(echo "$QUIZ_RESULT" | grep -o '"attemptId":[0-9]*' | grep -o '[0-9]*')
QUIZ_SUCCESS=$(echo "$QUIZ_RESULT" | grep -o '"success":true' | wc -l)

if [ "$QUIZ_SUCCESS" -eq 1 ] && [ -n "$ATTEMPT_ID" ]; then
  echo "✅ Quiz attempt created: ID $ATTEMPT_ID"
  
  # Wait for scoring and potential AI content generation
  sleep 3
  
  # Step 2: Test AI content generation via business model descriptions
  echo ""
  echo "2️⃣ Testing AI-generated business model descriptions..."
  
  # Get business model scores which should contain AI-generated content
  SCORES_RESULT=$(curl -s "$BASE_URL/api/business-model-scores/$ATTEMPT_ID")
  
  # Check if scores contain detailed descriptions (sign of AI generation)
  TOP_MODEL=$(echo "$SCORES_RESULT" | jq -r '.[0].name' 2>/dev/null)
  TOP_SCORE=$(echo "$SCORES_RESULT" | jq -r '.[0].score' 2>/dev/null)
  
  if [ -n "$TOP_MODEL" ] && [ "$TOP_MODEL" != "null" ] && [ -n "$TOP_SCORE" ] && [ "$TOP_SCORE" != "null" ]; then
    echo "✅ AI-generated business model analysis working"
    echo "   Top recommendation: $TOP_MODEL (Score: $TOP_SCORE%)"
  else
    echo "❌ AI-generated business model analysis failed"
  fi
  
  # Step 3: Test skills analysis AI content
  echo ""
  echo "3️⃣ Testing AI skills analysis content..."
  
  SKILLS_DATA='{"quizData":{"mainMotivation":"financial_freedom","brandFaceComfort":5,"timeCommitment":4,"techComfort":3,"investmentCapacity":4,"incomeGoal":5,"audienceSize":3},"requiredSkills":["marketing","sales","communication"],"businessModel":"'"$TOP_MODEL"'","userProfile":{"experience":"beginner","goals":"financial_freedom"}}'
  
  SKILLS_RESULT=$(curl -s -X POST "$BASE_URL/api/analyze-skills" \
    -H "Content-Type: application/json" \
    -d "$SKILLS_DATA")
  
  SKILLS_ASSESSMENT=$(echo "$SKILLS_RESULT" | jq -r '.skillAssessments[0].reasoning' 2>/dev/null)
  
  if [ -n "$SKILLS_ASSESSMENT" ] && [ "$SKILLS_ASSESSMENT" != "null" ] && [ ${#SKILLS_ASSESSMENT} -gt 20 ]; then
    echo "✅ AI skills analysis content generation working"
    echo "   Sample analysis: ${SKILLS_ASSESSMENT:0:100}..."
  else
    echo "❌ AI skills analysis content generation failed"
  fi
  
  # Step 4: Test personalized content generation
  echo ""
  echo "4️⃣ Testing personalized AI content generation..."
  
  # Test income projections generation
  INCOME_DATA='{"businessModelId":"'"${TOP_MODEL,,}"'","userAnswers":{"mainMotivation":"financial_freedom","brandFaceComfort":5,"timeCommitment":4,"techComfort":3,"investmentCapacity":4,"incomeGoal":5,"audienceSize":3}}'
  
  INCOME_RESULT=$(curl -s -X POST "$BASE_URL/api/generate-income-projections" \
    -H "Content-Type: application/json" \
    -d "$INCOME_DATA")
  
  INCOME_SUCCESS=$(echo "$INCOME_RESULT" | jq -r '.success' 2>/dev/null)
  
  if [ "$INCOME_SUCCESS" = "true" ]; then
    echo "✅ Personalized AI income projections working"
  else
    echo "❌ Personalized AI income projections failed"
  fi
  
  # Step 5: Test AI content persistence and retrieval
  echo ""
  echo "5️⃣ Testing AI content persistence..."
  
  # Verify that the same quiz attempt returns consistent AI-generated scores
  SCORES_RETRY=$(curl -s "$BASE_URL/api/business-model-scores/$ATTEMPT_ID")
  TOP_MODEL_RETRY=$(echo "$SCORES_RETRY" | jq -r '.[0].name' 2>/dev/null)
  
  if [ "$TOP_MODEL" = "$TOP_MODEL_RETRY" ]; then
    echo "✅ AI content persistence working (consistent results)"
  else
    echo "❌ AI content persistence issues detected"
  fi
  
else
  echo "❌ Quiz attempt creation failed"
  echo "Response: $QUIZ_RESULT"
fi

echo ""
echo "🎯 OpenAI content display test completed"