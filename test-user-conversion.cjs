#!/usr/bin/env node

const fetch = require('node-fetch');

// Test configuration
const BASE_URL = 'http://localhost:3001';
const TEST_EMAIL = `test-conversion-${Date.now()}@example.com`;
const TEST_QUIZ_DATA = {
  mainMotivation: 'financial_freedom',
  brandFaceComfort: 5,
  timeCommitment: 4,
  techComfort: 3,
  investmentCapacity: 4,
  incomeGoal: 5,
  audienceSize: 3
};

let testResults = {
  quizCreation: false,
  userCreation: false,
  scoring: false,
  emailSend: false,
  reportAccess: false
};

async function testUserConversion() {
  console.log('🧪 Starting User Conversion Test');
  console.log(`📧 Test email: ${TEST_EMAIL}`);
  
  try {
    // Step 1: Create quiz attempt
    console.log('\n1️⃣ Creating quiz attempt...');
    const quizResponse = await fetch(`${BASE_URL}/api/quiz-attempts/record`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: TEST_EMAIL,
        quizData: TEST_QUIZ_DATA
      })
    });
    
    const quizResult = await quizResponse.json();
    if (quizResult.success && quizResult.attemptId) {
      testResults.quizCreation = true;
      console.log(`✅ Quiz attempt created: ID ${quizResult.attemptId}`);
      
      // Step 2: Check user creation
      console.log('\n2️⃣ Checking user creation...');
      const userResponse = await fetch(`${BASE_URL}/api/user-by-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: TEST_EMAIL })
      });
      
      const userResult = await userResponse.json();
      if (userResult.user && userResult.user.email === TEST_EMAIL) {
        testResults.userCreation = true;
        console.log(`✅ User created: ID ${userResult.user.id}`);
        
        // Step 3: Check scoring
        console.log('\n3️⃣ Checking scoring system...');
        const scoresResponse = await fetch(`${BASE_URL}/api/business-model-scores/${quizResult.attemptId}`);
        const scoresResult = await scoresResponse.json();
        
        if (scoresResult.success && scoresResult.scores && scoresResult.scores.length > 0) {
          testResults.scoring = true;
          console.log(`✅ Scoring complete: ${scoresResult.scores.length} business model scores`);
          
          // Step 4: Test email sending
          console.log('\n4️⃣ Testing email sending...');
          const emailResponse = await fetch(`${BASE_URL}/api/quiz-attempts/attempt/${quizResult.attemptId}/email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: TEST_EMAIL })
          });
          
          const emailResult = await emailResponse.json();
          if (emailResult.success) {
            testResults.emailSend = true;
            console.log('✅ Email sent successfully');
            
            // Step 5: Test report access
            console.log('\n5️⃣ Testing report access...');
            const reportResponse = await fetch(`${BASE_URL}/api/quiz-attempts/attempt/${quizResult.attemptId}`);
            const reportResult = await reportResponse.json();
            
            if (reportResult.success && reportResult.quizAttempt) {
              testResults.reportAccess = true;
              console.log('✅ Report access working');
            }
          }
        }
      }
    }
  } catch (error) {
    console.error('❌ Test error:', error.message);
  }
  
  // Results summary
  console.log('\n📊 TEST RESULTS:');
  console.log('=================');
  Object.entries(testResults).forEach(([test, passed]) => {
    console.log(`${passed ? '✅' : '❌'} ${test}: ${passed ? 'PASS' : 'FAIL'}`);
  });
  
  const totalTests = Object.keys(testResults).length;
  const passedTests = Object.values(testResults).filter(Boolean).length;
  console.log(`\n🎯 Overall: ${passedTests}/${totalTests} tests passed`);
  
  return passedTests === totalTests;
}

// Run the test
if (require.main === module) {
  testUserConversion()
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('Test failed:', error);
      process.exit(1);
    });
}

module.exports = { testUserConversion };