#!/bin/bash

echo "🤖 Testing AI System Integration"

BASE_URL="http://localhost:9000"
TEST_EMAIL="ai-test-$(date +%s)@example.com"

echo "📧 Test email: $TEST_EMAIL"

# Step 1: Create a quiz attempt first
echo ""
echo "1️⃣ Creating quiz attempt for AI testing..."
QUIZ_DATA='{"email":"'$TEST_EMAIL'","quizData":{"mainMotivation":"financial_freedom","brandFaceComfort":5,"timeCommitment":4,"techComfort":3,"investmentCapacity":4,"incomeGoal":5,"audienceSize":3}}'

QUIZ_RESULT=$(curl -s -X POST "$BASE_URL/api/quiz-attempts/attempt" \
  -H "Content-Type: application/json" \
  -d "$QUIZ_DATA")

ATTEMPT_ID=$(echo "$QUIZ_RESULT" | grep -o '"attemptId":[0-9]*' | grep -o '[0-9]*')

if [ -n "$ATTEMPT_ID" ]; then
  echo "✅ Quiz attempt created: ID $ATTEMPT_ID"
  
  # Wait for scoring to complete
  sleep 2
  
  # Step 2: Test OpenAI Status
  echo ""
  echo "2️⃣ Testing OpenAI status..."
  AI_STATUS=$(curl -s "$BASE_URL/api/openai-status")
  AI_CONFIGURED=$(echo "$AI_STATUS" | grep -o '"configured":true' | wc -l)
  AI_READY=$(echo "$AI_STATUS" | grep -o '"status":"ready"' | wc -l)
  
  if [ "$AI_CONFIGURED" -eq 1 ] && [ "$AI_READY" -eq 1 ]; then
    echo "✅ OpenAI connection working"
    
    # Step 3: Test skill analysis
    echo ""
    echo "3️⃣ Testing skills analysis..."
    SKILLS_DATA='{"quizData":{"mainMotivation":"financial_freedom","brandFaceComfort":5,"timeCommitment":4,"techComfort":3,"investmentCapacity":4,"incomeGoal":5,"audienceSize":3},"requiredSkills":["marketing","sales","communication"],"businessModel":"consulting","userProfile":{"experience":"beginner","goals":"financial_freedom"}}'
    
    SKILLS_RESULT=$(curl -s -X POST "$BASE_URL/api/analyze-skills" \
      -H "Content-Type: application/json" \
      -d "$SKILLS_DATA")
    
    SKILLS_SUCCESS=$(echo "$SKILLS_RESULT" | grep -o '"skillAssessments"' | wc -l)
    
    if [ "$SKILLS_SUCCESS" -eq 1 ]; then
      echo "✅ Skills analysis working"
    else
      echo "❌ Skills analysis failed"
      echo "Response preview: $(echo "$SKILLS_RESULT" | head -c 200)"
    fi
    
    # Step 4: Test business model generation
    echo ""
    echo "4️⃣ Testing business model generation..."
      BM_DATA='{"userId":1,"businessModelId":"consulting","userAnswers":{"mainMotivation":"financial_freedom","brandFaceComfort":5,"timeCommitment":4,"techComfort":3,"investmentCapacity":4,"incomeGoal":5,"audienceSize":3}}'
      
      BM_RESULT=$(curl -s -X POST "$BASE_URL/api/generate-business-fit-descriptions" \
        -H "Content-Type: application/json" \
        -d "$BM_DATA")
      
      BM_SUCCESS=$(echo "$BM_RESULT" | grep -o '"success":true' | wc -l)
      
      if [ "$BM_SUCCESS" -eq 1 ]; then
        echo "✅ Business model generation working"
      else
        echo "❌ Business model generation failed"
        echo "Response preview: $(echo "$BM_RESULT" | head -c 200)"
      fi
    else
      echo "❌ AI content generation failed"
      echo "Response preview: $(echo "$AI_CONTENT_RESULT" | head -c 200)"
    fi
  else
    echo "❌ OpenAI connection failed"
    echo "Response: $AI_STATUS"
  fi
else
  echo "❌ Quiz attempt creation failed"
fi

echo ""
echo "🎯 AI system test completed"