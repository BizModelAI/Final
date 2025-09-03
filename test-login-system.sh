#!/bin/bash

echo "🔐 Testing Login System"

BASE_URL="http://localhost:9000"

# Step 1: Test auth endpoints availability
echo ""
echo "1️⃣ Testing auth endpoints availability..."

# Test /me endpoint
ME_RESULT=$(curl -s "$BASE_URL/api/auth/me")
ME_RESPONSE=$(echo "$ME_RESULT" | grep -o '"user":null\|"user":{' | head -1)

if [ -n "$ME_RESPONSE" ]; then
  echo "✅ Auth /me endpoint responding"
else
  echo "❌ Auth /me endpoint failed"
fi

# Step 2: Test session management
echo ""
echo "2️⃣ Testing session management..."
SESSION_COOKIE=$(curl -s -I "$BASE_URL/api/auth/me" | grep -i "set-cookie" | head -1)

if [[ "$SESSION_COOKIE" == *"session"* ]]; then
  echo "✅ Session cookies being set"
else
  echo "❌ Session cookies not being set properly"
fi

# Step 3: Test password requirements (if login endpoint exists)
echo ""
echo "3️⃣ Testing login endpoint..."
LOGIN_TEST=$(curl -s -X POST "$BASE_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass"}')

LOGIN_RESPONSE=$(echo "$LOGIN_TEST" | grep -o "error\|success\|missing\|invalid" | head -1)

if [ -n "$LOGIN_RESPONSE" ]; then
  echo "✅ Login endpoint responding with validation"
else
  echo "❌ Login endpoint not responding properly"
fi

# Step 4: Test signup endpoint
echo ""
echo "4️⃣ Testing signup endpoint..."
SIGNUP_TEST=$(curl -s -X POST "$BASE_URL/api/auth/signup" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass"}')

SIGNUP_RESPONSE=$(echo "$SIGNUP_TEST" | grep -o "error\|success\|missing\|invalid" | head -1)

if [ -n "$SIGNUP_RESPONSE" ]; then
  echo "✅ Signup endpoint responding with validation"
else
  echo "❌ Signup endpoint not responding properly"
fi

# Step 5: Test authentication state management
echo ""
echo "5️⃣ Testing authentication state management..."
AUTH_STATE_TEST=$(curl -s -X GET "$BASE_URL/api/auth/me" \
  -H "Cookie: session=test-session-id")

AUTH_STATE_RESPONSE=$(echo "$AUTH_STATE_TEST" | grep -o '"authenticated":\|"user":' | head -1)

if [ -n "$AUTH_STATE_RESPONSE" ]; then
  echo "✅ Authentication state management working"
else
  echo "❌ Authentication state management failed"
fi

echo ""
echo "🎯 Login system test completed"