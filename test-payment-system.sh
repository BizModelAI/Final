#!/bin/bash

echo "💳 Testing Payment System (excluding PayPal)"

BASE_URL="http://localhost:9000"

echo ""
echo "1️⃣ Testing Stripe configuration..."
STRIPE_CONFIG=$(curl -s "$BASE_URL/api/stripe-config")
STRIPE_CONFIGURED=$(echo "$STRIPE_CONFIG" | grep -o '"publishableKey"' | wc -l)

if [ "$STRIPE_CONFIGURED" -eq 1 ]; then
  echo "✅ Stripe configuration accessible"
  
  # Step 2: Test payment endpoints
  echo ""
  echo "2️⃣ Testing admin payment endpoints..."
  PAYMENTS_RESULT=$(curl -s "$BASE_URL/api/admin/payments")
  PAYMENTS_DATA=$(echo "$PAYMENTS_RESULT" | grep -o '"totalUsers"' | wc -l)
  
  if [ "$PAYMENTS_DATA" -eq 1 ]; then
    echo "✅ Admin payments endpoint working"
    
    # Step 3: Test refund endpoints
    echo ""
    echo "3️⃣ Testing refund system..."
    REFUNDS_RESULT=$(curl -s "$BASE_URL/api/admin/refunds")
    REFUNDS_ACCESS=$(echo "$REFUNDS_RESULT" | grep -o '\[' | wc -l)
    
    if [ "$REFUNDS_ACCESS" -eq 1 ]; then
      echo "✅ Refunds endpoint accessible"
    else
      echo "❌ Refunds endpoint failed"
    fi
    
    # Step 4: Test webhook endpoint exists
    echo ""
    echo "4️⃣ Testing webhook endpoint..."
    WEBHOOK_TEST=$(curl -s -X POST "$BASE_URL/api/stripe/webhook" \
      -H "Content-Type: application/json" \
      -d '{"type":"test"}')
    
    WEBHOOK_RESPONSE=$(echo "$WEBHOOK_TEST" | grep -o "error\|success\|invalid" | head -1)
    
    if [ -n "$WEBHOOK_RESPONSE" ]; then
      echo "✅ Webhook endpoint responding"
    else
      echo "❌ Webhook endpoint not responding"
    fi
    
    # Step 5: Test user pricing endpoints
    echo ""
    echo "5️⃣ Testing user pricing..."
    PRICING_RESULT=$(curl -s "$BASE_URL/api/user-pricing/123")
    PRICING_RESPONSE=$(echo "$PRICING_RESULT" | grep -o "error\|user" | head -1)
    
    if [ -n "$PRICING_RESPONSE" ]; then
      echo "✅ User pricing endpoint responding"
    else
      echo "❌ User pricing endpoint not responding"
    fi
    
  else
    echo "❌ Admin payments endpoint failed"
    echo "Response preview: $(echo "$PAYMENTS_RESULT" | head -c 100)"
  fi
  
else
  echo "❌ Stripe configuration not accessible"
  echo "Response: $STRIPE_CONFIG"
fi

echo ""
echo "🎯 Payment system test completed"