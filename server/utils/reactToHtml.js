// Server-side email template generator using your EXACT React templates
// This implements the exact templates you sent me, converted to pure HTML

function getTopBusinessPaths(quizData, businessModelScores) {
    if (!quizData || !businessModelScores || businessModelScores.length === 0) {
        // Fallback to generic data if no quiz data or scores
        return [
            {
                id: 'online-reselling',
                name: 'Online Reselling',
                emoji: '💡',
                fitScore: 92,
                pros: ['Low startup costs', 'Flexible work schedule', 'Scalable business model'],
                description: 'Perfect for entrepreneurs who want to start with minimal investment and scale up based on market demand.',
                detailedDescription: 'Perfect for entrepreneurs who want to start with minimal investment and scale up based on market demand.'
            }
        ];
    }
    
    try {
        // Import business paths data to get rich descriptions
        const { businessPaths } = require('../../shared/businessPaths.js');
        
        // Use the pre-calculated business model scores passed from the email service
        const topPaths = businessModelScores
            .sort((a, b) => b.score - a.score)
            .slice(0, 3)
            .map(model => {
                // Find the corresponding business path with rich data
                const businessPath = businessPaths.find(path => path.id === model.id);
                
                if (businessPath) {
                    // Use the rich business path data
                    return {
                        id: model.id,
                        name: model.name,
                        emoji: businessPath.emoji || '💡',
                        fitScore: Math.round(model.score),
                        pros: businessPath.pros ? businessPath.pros.slice(0, 3) : ['High potential', 'Good fit', 'Scalable'],
                        description: businessPath.description || 'A business model that aligns well with your skills and preferences.',
                        detailedDescription: businessPath.detailedDescription || businessPath.description || 'A business model that aligns well with your skills and preferences.'
                    };
                } else {
                    // Fallback if business path not found
                    return {
                        id: model.id,
                        name: model.name,
                        emoji: '💡',
                        fitScore: Math.round(model.score),
                        pros: ['High potential', 'Good fit', 'Scalable'],
                        description: 'A business model that aligns well with your skills and preferences.',
                        detailedDescription: 'A business model that aligns well with your skills and preferences.'
                    };
                }
            });
        
        return topPaths;
    } catch (error) {
        console.error('Error processing business model scores:', error);
        // Fallback to generic data if processing fails
        return [
            {
                id: 'online-reselling',
                name: 'Online Reselling',
                emoji: '💡',
                fitScore: 92,
                pros: ['Low startup costs', 'Flexible work schedule', 'Scalable business model'],
                description: 'Perfect for entrepreneurs who want to start with minimal investment and scale up based on market demand.',
                detailedDescription: 'Perfect for entrepreneurs who want to start with minimal investment and scale up based on market demand.'
            }
        ];
    }
}

function getPersonalizedSnapshot(quizData) {
    if (!quizData) return [
        'Prefer flexibility with structure',
        'Thrive on independent projects',
        'Are motivated by financial freedom',
        'Learn best by doing',
        'Adapt quickly to new tools and systems',
        'Value passion and personal meaning in your work',
    ];
    
    const lines = [];
    
    // 1. Work structure
    if (quizData.workStructurePreference === 'some-structure' || quizData.workStructurePreference === 'mix-both') {
        lines.push('Prefer flexibility with structure');
    } else if (quizData.workStructurePreference === 'full-structure') {
        lines.push('Prefer clear structure and routines');
    } else {
        lines.push('Comfortable with flexible or unstructured work');
    }
    
    // 2. Collaboration
    if (quizData.workCollaborationPreference === 'mostly-solo' || quizData.workCollaborationPreference === 'solo-flexible') {
        lines.push('Thrive on independent projects');
    } else if (quizData.workCollaborationPreference === 'team') {
        lines.push('Enjoy collaborating with others');
    } else {
        lines.push('Open to both solo and team work');
    }
    
    // 3. Motivation
    if (quizData.mainMotivation === 'financial-freedom' || quizData.primaryMotivation === 'financial-independence') {
        lines.push('Are motivated by financial freedom');
    } else if (quizData.mainMotivation === 'passion' || quizData.passionIdentityAlignment >= 4) {
        lines.push('Driven by passion and personal meaning');
    } else {
        lines.push('Motivated by growth and new challenges');
    }
    
    // 4. Learning style
    if (quizData.learningPreference === 'hands-on') {
        lines.push('Learn best by doing');
    } else if (quizData.learningPreference === 'after-some-research') {
        lines.push('Prefer to research before taking action');
    } else {
        lines.push('Adapt learning style to the situation');
    }
    
    // 5. Tech skills/adaptability
    if (quizData.techSkillsRating >= 4) {
        lines.push('Confident with technology and new tools');
    } else if (quizData.techSkillsRating === 3) {
        lines.push('Comfortable with most digital tools');
    } else {
        lines.push('Willing to learn new technology as needed');
    }
    
    // 6. Resilience/self-motivation
    if (quizData.longTermConsistency >= 4 || quizData.selfMotivationLevel >= 4) {
        lines.push('Highly self-motivated and consistent');
    } else if (quizData.longTermConsistency === 3) {
        lines.push('Stay motivated with clear goals and support');
    } else {
        lines.push('Working to build consistency and motivation');
    }
    
    return lines.slice(0, 6);
}

// UNPAID USER TEMPLATE - EXACTLY as you provided
function generateUnpaidEmailHtml(quizData, userEmail, businessModelScores) {
    const topPaths = getTopBusinessPaths(quizData, businessModelScores);
    const snapshotLines = getPersonalizedSnapshot(quizData);
    
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light">
  <title>BizModelAI Email</title>
</head>
<body style="margin: 0; padding: 0; font-family: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif; background: #f4f6fa; min-height: 100vh;">
  <div style="background: #f4f6fa; min-height: 100vh; padding: 0;">
    <div style="max-width: 700px; margin: 40px auto 0 auto; border-radius: 24px; box-shadow: 0 8px 32px rgba(37, 99, 235, 0.10); background: #fff; overflow: hidden;">
      <!-- Gradient Hero with Centered Logo -->
      <div style="background: linear-gradient(135deg, #4338ca 0%, #6366f1 40%, #7c3aed 100%); padding: 56px 32px 56px 32px; text-align: center; border-radius: 0; margin: 0;">
        <div style="font-size: 54px; margin-bottom: 10px; margin-top: 0;">🎉</div>
        <h1 style="font-size: 36px; font-weight: 800; color: #fff; margin: 0; letter-spacing: -0.02em; line-height: 1.1;">Your AI-Powered Business Blueprint</h1>
        <p style="color: #e0e7ef; font-size: 15px; margin: 18px 0 0 0; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Personalized recommendations based on your unique goals, skills, and preferences</p>
      </div>
      
      <div style="padding: 40px 32px 32px 32px; background: #fff; border-bottom-left-radius: 0; border-bottom-right-radius: 0;">
        <!-- Hidden description for email preview -->
        <div style="display: none; color: #fff;">Your personalized business model results are ready! See your best fit, AI insights, and how to unlock your full report.</div>
        
        <!-- Best Fit Business Model (only show first one) -->
        ${topPaths[0] ? `
        <div style="margin-bottom: 32px; border-radius: 16px; border: none; box-shadow: 0 8px 32px rgba(30, 41, 59, 0.18); padding: 40px 40px 24px 40px; background: #f1f5f9; text-align: left; position: relative; min-height: 140px; display: flex; flex-direction: column; justify-content: center;">
          <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 14px;">
            <div style="display: flex; align-items: center; gap: 18px;">
              <span style="font-size: 38px; margin-right: 8px;">${topPaths[0].emoji}</span>
              <h3 style="font-size: 27px; font-weight: 900; color: #18181b; margin: 0; letter-spacing: -0.01em; line-height: 1.1;">${topPaths[0].name}</h3>
            </div>
            <div style="text-align: center; margin-left: 18px;">
              <div style="font-weight: 900; font-size: 32px; color: #6366f1; line-height: 1;">${topPaths[0].fitScore}%</div>
              <div style="font-weight: 500; font-size: 15px; color: #64748b; line-height: 1; margin-top: 6px;">AI Match</div>
            </div>
          </div>
          <div style="margin-bottom: 16px;">
            <div style="font-weight: 700; color: #6366f1; font-size: 16px; margin-bottom: 6px;">Top Benefits</div>
            <ul style="color: #334155; font-size: 15px; margin: 0; padding: 0 0 0 18px; line-height: 1.7; list-style: disc;">
              ${topPaths[0].pros.map(pro => `<li style="margin-bottom: 6px;">${pro}</li>`).join('')}
            </ul>
          </div>
          <p style="color: #18181b; font-size: 16px; margin-bottom: 24px; line-height: 1.7;">${topPaths[0].description}</p>
        </div>
        ` : ''}

        <!-- Unlock Message -->
        <div style="background: #f1f5f9; border-radius: 16px; margin: 0 0 32px 0; padding: 14px 32px; box-shadow: 0 8px 32px rgba(30,41,59,0.18); border: none; text-align: center; color: #18181b; font-weight: 700; font-size: 15px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
          <span style="margin-right: 8px;">🔒</span>Get more business model matches by purchasing the full report.
        </div>
      
        <!-- Personalized Snapshot -->
        <div style="background: #f1f5f9; border-radius: 16px; margin: 0 0 32px 0; padding: 28px 32px; box-shadow: 0 8px 32px rgba(30,41,59,0.18); border: none; text-align: left;">
          <div style="font-weight: 700; font-size: 18px; color: #18181b; display: flex; align-items: center; gap: 8px; margin-bottom: 10px;"><span>📝</span>Personalized Snapshot</div>
          <div style="border-top: 1px solid #e5e7eb; margin: 0 0 18px 0; height: 1px;"></div>
          <ul style="color: #18181b; font-size: 15px; margin: 0; padding: 0 0 0 18px; line-height: 1.7; list-style: disc;">
            ${snapshotLines.map(line => `<li style="margin-bottom: 6px;">${line.replace(/^• /, '')}</li>`).join('')}
          </ul>
        </div>

        <!-- Unlock Section -->
        <div style="background: #f1f5f9; border-radius: 16px; margin: 0 0 32px 0; padding: 28px 32px; box-shadow: 0 8px 32px rgba(30,41,59,0.18); border: none; text-align: left; color: #18181b; font-size: 16px;">
          <div style="font-weight: 700; font-size: 18px; display: flex; align-items: center; gap: 8px; color: #18181b; margin-bottom: 10px;"><span>📈</span>Unlock Your Full Report To Access:</div>
          <div style="border-top: 1px solid #e5e7eb; margin: 0 0 18px 0; height: 1px;"></div>
          <ul style="color: #18181b; font-size: 15px; margin: 0; padding: 0 0 0 18px; line-height: 1.7; list-style: disc;">
            <li>Business model fit scores & reasoning</li>
            <li>Projected income & startup costs</li>
            <li>AI-generated pros/cons per model</li>
            <li>Personalized step-by-step launch plans</li>
            <li>Lifetime access to all 25 business guides</li>
            <li>30-day action roadmap</li>
          </ul>
        </div>

        <!-- Welcome Message -->
        <div style="background: #f1f5f9; border-radius: 16px; box-shadow: 0 8px 32px rgba(30,41,59,0.18); margin: 0 0 32px 0; padding: 28px 32px; font-size: 16px; color: #18181b; font-style: italic; text-align: left; line-height: 1.7; position: relative;">
          <div style="margin-bottom: 8px; font-weight: 600;">Dear User,</div>
          <div>
            Thanks for taking the BizModelAI quiz. Based on your responses, our system has carefully analyzed your skills, preferences, and entrepreneurial traits to identify the business models that best align with your goals. This personalized analysis is designed to help you take action with clarity and confidence—so you can stop second-guessing and start building a business that fits who you are and where you want to go.
          </div>
          <div style="text-align: right; margin-top: 16px; font-style: italic; font-weight: 500; display: flex; justify-content: flex-end; align-items: center;">
            <span style="text-align: right;">With love,<br/>The BizModelAI Team 💌</span>
          </div>
        </div>

        <!-- CTA Button -->
        <div style="margin: 48px 0 0 0; text-align: center;">
          <a href="https://bizmodelai.com/full-report" style="display: inline-block; background: linear-gradient(90deg, #2563eb 0%, #7c3aed 100%); color: #fff; padding: 20px 48px; border-radius: 999px; font-weight: 900; font-size: 22px; text-decoration: none; box-shadow: 0 6px 24px rgba(59,130,246,0.13); letter-spacing: -0.01em; margin-bottom: 14px;">👉 Unlock My Full Report</a>
          <div style="color: #2563eb; font-weight: 700; font-size: 18px; margin: 18px 0 8px 0;">Only $9.99 — One-time payment for lifetime access</div>
          <div style="color: #64748b; font-size: 14px; margin: 14px auto 32px auto; text-align: center; background: none; max-width: 480px;">
            <strong>Data Retention Notice:</strong> Your quiz results and data will be stored securely for 3 months from today. After this period, your data will be automatically deleted from our systems unless you create a paid account.
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div style="width: 100%; margin: 0 0 0 0; padding: 0; text-align: center;">
      <div style="background: #1e293b; border-top-left-radius: 0; border-top-right-radius: 0; border-bottom-left-radius: 24px; border-bottom-right-radius: 24px; padding: 32px 0 24px 0; color: #fff; margin: 0 auto; box-shadow: 0 2px 12px rgba(30,41,59,0.10); width: 90%; max-width: 700px;">
        <div style="display: flex; align-items: center; justify-content: center; gap: 14px; margin: 0 auto 0 auto; width: fit-content;">
          <img src="https://cdn.builder.io/api/v1/image/assets%2F8eb83e4a630e4b8d86715228efeb581b%2F8de3245c79ad43b48b9a59be9364a64e?format=webp&width=60" alt="BizModelAI Logo" style="width: 36px; height: 36px; border-radius: 8px; background: none; margin: 0 0 0 0; display: block;">
          <span style="font-weight: 800; font-size: 20px; letter-spacing: -0.01em; color: #fff;">BizModelAI</span>
        </div>
        <div style="height: 18px;"></div>
        <div style="color: #cbd5e1; font-size: 14px; margin-top: 18px; margin-bottom: 0;">
          Need help or have questions? Just reply to this email or contact team@bizmodelai.com.<br>
          Your preview is saved for the next 90 days.
        </div>
        <div style="margin: 18px 0 18px 0; display: flex; justify-content: center; gap: 22px;">
          <a href="https://www.tiktok.com/@bizmodelai" target="_blank" rel="noopener noreferrer" style="display: inline-block;">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tiktok.svg" alt="TikTok" style="width: 26px; height: 26px; filter: brightness(0) invert(0.7);">
          </a>
          <a href="https://www.instagram.com/bizmodelai/" target="_blank" rel="noopener noreferrer" style="display: inline-block;">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" alt="Instagram" style="width: 26px; height: 26px; filter: brightness(0) invert(0.7);">
          </a>
          <a href="https://twitter.com/bizmodelai" target="_blank" rel="noopener noreferrer" style="display: inline-block;">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg" alt="X (Twitter)" style="width: 26px; height: 26px; filter: brightness(0) invert(0.7);">
          </a>
          <a href="https://www.pinterest.com/bizmodelai/" target="_blank" rel="noopener noreferrer" style="display: inline-block;">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/pinterest.svg" alt="Pinterest" style="width: 26px; height: 26px; filter: brightness(0) invert(0.7);">
          </a>
        </div>
        <div style="margin-top: 18px;"></div>
        
        <!-- Divider below Unsubscribe -->
        <div style="border-top: 1px solid #334155; margin: 24px 0 0 0; height: 1px; width: 80%; margin-left: 10%; margin-right: 10%;"></div>
        <div style="color: #94a3b8; font-size: 13px; margin-top: 18px;">&copy; 2025 BizModelAI. All rights reserved.</div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

// PAID USER TEMPLATE - EXACTLY as you provided
function generatePaidEmailHtml(quizData, userEmail, businessModelScores) {
    const topPaths = getTopBusinessPaths(quizData, businessModelScores);
    const snapshotLines = getPersonalizedSnapshot(quizData);
    
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light">
  <title>BizModelAI Email</title>
</head>
<body style="margin: 0; padding: 0; font-family: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif; background: #f4f6fa; min-height: 100vh;">
  <div style="background: #f4f6fa; min-height: 100vh; padding: 0;">
    <div style="max-width: 700px; margin: 40px auto 0 auto; border-radius: 24px; box-shadow: 0 8px 32px rgba(37, 99, 235, 0.10); background: #fff; overflow: hidden;">
      <!-- Gradient Hero with Centered Logo -->
      <div style="background: linear-gradient(135deg, #4338ca 0%, #6366f1 40%, #7c3aed 100%); padding: 56px 32px 56px 32px; text-align: center; border-radius: 0; margin: 0;">
        <div style="font-size: 54px; margin-bottom: 10px; margin-top: 0;">🎉</div>
        <h1 style="font-size: 36px; font-weight: 800; color: #fff; margin: 0; letter-spacing: -0.02em; line-height: 1.1;">Your AI-Powered Business Blueprint</h1>
        <p style="color: #e0e7ef; font-size: 15px; margin: 18px 0 0 0; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Personalized recommendations based on your unique goals, skills, and preferences</p>
      </div>
      
      <div style="padding: 40px 32px 32px 32px; background: #fff; border-bottom-left-radius: 0; border-bottom-right-radius: 0;">
        <!-- Show all 3 business model cards -->
        <div style="display: none; color: #fff;">Your personalized business model results are ready! See your best fit, AI insights, and your full report.</div>
        ${topPaths.map((path, idx) => {
            const emoji = path.emoji || '💡';
            const fitScore = path.fitScore || 92;
            const pros = path.pros ? path.pros.slice(0, 3) : [];
            const description = path.detailedDescription || path.description;
            return `
            <div style="margin-bottom: 32px; border-radius: 16px; border: none; box-shadow: 0 8px 32px rgba(30, 41, 59, 0.18); padding: 40px 40px 24px 40px; background: #f1f5f9; text-align: left; position: relative; transition: box-shadow 0.2s; min-height: 140px; display: flex; flex-direction: column; justify-content: center;">
              <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 14px;">
                <div style="display: flex; align-items: center; gap: 18px;">
                  <span style="font-size: 38px; margin-right: 8px;">${emoji}</span>
                  <h3 style="font-size: 27px; font-weight: 900; color: #18181b; margin: 0; letter-spacing: -0.01em; line-height: 1.1;">${path.name}</h3>
                </div>
                <div style="text-align: center; margin-left: 18px;">
                  <div style="font-weight: 900; font-size: 32px; color: #6366f1; line-height: 1;">${fitScore}%</div>
                  <div style="font-weight: 500; font-size: 15px; color: #64748b; line-height: 1; margin-top: 6px;">AI Match</div>
                </div>
              </div>
              <div style="margin-bottom: 16px;">
                <div style="font-weight: 700; color: #6366f1; font-size: 16px; margin-bottom: 6px;">Top Benefits</div>
                <ul style="color: #334155; font-size: 15px; margin: 0; padding: 0 0 0 18px; line-height: 1.7; list-style: disc;">
                  ${pros.map(pro => `<li style="margin-bottom: 6px;">${pro}</li>`).join('')}
                </ul>
              </div>
              <p style="color: #18181b; font-size: 16px; margin-bottom: 24px; line-height: 1.7;">${description}</p>
            </div>
            `;
        }).join('')}

        <!-- Personalized Snapshot -->
        <div style="background: #f1f5f9; border-radius: 16px; margin: 0 0 32px 0; padding: 28px 32px; box-shadow: 0 8px 32px rgba(30,41,59,0.18); border: none; text-align: left;">
          <div style="font-weight: 700; font-size: 18px; color: #18181b; display: flex; align-items: center; gap: 8px; margin-bottom: 10px;"><span>📝</span>Personalized Snapshot</div>
          <div style="border-top: 1px solid #e5e7eb; margin: 0 0 18px 0; height: 1px;"></div>
          <ul style="color: #18181b; font-size: 15px; margin: 0; padding: 0 0 0 18px; line-height: 1.7; list-style: disc;">
            ${snapshotLines.map(line => `<li style="margin-bottom: 6px;">${line.replace(/^• /, '')}</li>`).join('')}
          </ul>
        </div>

        <!-- Welcome Message -->
        <div style="background: #f1f5f9; border-radius: 16px; box-shadow: 0 8px 32px rgba(30,41,59,0.18); margin: 0 0 32px 0; padding: 28px 32px; font-size: 16px; color: #18181b; font-style: italic; text-align: left; line-height: 1.7; position: relative;">
          <div style="margin-bottom: 8px; font-weight: 600;">Dear User,</div>
          <div>
            Thanks for taking the BizModelAI quiz. Based on your responses, our system has carefully analyzed your skills, preferences, and entrepreneurial traits to identify the business models that best align with your goals. This personalized analysis is designed to help you take action with clarity and confidence—so you can stop second-guessing and start building a business that fits who you are and where you want to go.
          </div>
          <div style="text-align: right; margin-top: 16px; font-style: italic; font-weight: 500; display: flex; justify-content: flex-end; align-items: center;">
            <span style="text-align: right;">With love,<br/>The BizModelAI Team 💌</span>
          </div>
        </div>

        <!-- View Full Results button for paid users -->
        <div style="text-align: center; margin: 0 0 32px 0;">
          ${(() => {
              const userId = quizData?.userId || quizData?.userID || quizData?.user_id || '';
              const attemptId = quizData?.attemptId || quizData?.attemptID || quizData?.attempt_id || '';
              let url = 'https://bizmodelai.com/results';
              const params = [];
              if (userId) params.push(`userId=${encodeURIComponent(userId)}`);
              if (attemptId) params.push(`attemptId=${encodeURIComponent(attemptId)}`);
              if (params.length) url += '?' + params.join('&');
              return `
                <a href="${url}" style="display: inline-block; background: linear-gradient(90deg, #2563eb 0%, #7c3aed 100%); color: #fff; padding: 16px 40px; border-radius: 999px; font-weight: 900; font-size: 20px; text-decoration: none; box-shadow: 0 6px 24px rgba(59,130,246,0.13); letter-spacing: -0.01em; margin-top: 0;">View Full Results</a>
              `;
          })()}
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div style="width: 100%; margin: 0 0 0 0; padding: 0; text-align: center;">
      <div style="background: #1e293b; border-top-left-radius: 0; border-top-right-radius: 0; border-bottom-left-radius: 24px; border-bottom-right-radius: 24px; padding: 32px 0 24px 0; color: #fff; margin: 0 auto; box-shadow: 0 2px 12px rgba(30,41,59,0.10); width: 90%; max-width: 700px;">
        <div style="display: flex; align-items: center; justify-content: center; gap: 14px; margin: 0 auto 0 auto; width: fit-content;">
          <img src="https://cdn.builder.io/api/v1/image/assets%2F8eb83e4a630e4b8d86715228efeb581b%2F8de3245c79ad43b48b9a59be9364a64e?format=webp&width=60" alt="BizModelAI Logo" style="width: 36px; height: 36px; border-radius: 8px; background: none; margin: 0 0 0 0; display: block;">
          <span style="font-weight: 800; font-size: 20px; letter-spacing: -0.01em; color: #fff;">BizModelAI</span>
        </div>
        <div style="height: 18px;"></div>
        <div style="color: #cbd5e1; font-size: 14px; margin-top: 18px; margin-bottom: 0;">
          Need help or have questions? Just reply to this email or contact team@bizmodelai.com.
        </div>
        <div style="margin: 18px 0 18px 0; display: flex; justify-content: center; gap: 22px;">
          <a href="https://www.tiktok.com/@bizmodelai" target="_blank" rel="noopener noreferrer" style="display: inline-block;">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tiktok.svg" alt="TikTok" style="width: 26px; height: 26px; filter: brightness(0) invert(0.7);">
          </a>
          <a href="https://www.instagram.com/bizmodelai/" target="_blank" rel="noopener noreferrer" style="display: inline-block;">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" alt="Instagram" style="width: 26px; height: 26px; filter: brightness(0) invert(0.7);">
          </a>
          <a href="https://twitter.com/bizmodelai" target="_blank" rel="noopener noreferrer" style="display: inline-block;">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg" alt="X (Twitter)" style="width: 26px; height: 26px; filter: brightness(0) invert(0.7);">
          </a>
          <a href="https://www.pinterest.com/bizmodelai/" target="_blank" rel="noopener noreferrer" style="display: inline-block;">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/pinterest.svg" alt="Pinterest" style="width: 26px; height: 26px; filter: brightness(0) invert(0.7);">
          </a>
        </div>
        <div style="margin-top: 18px;"></div>
        
        <!-- Divider below Unsubscribe -->
        <div style="border-top: 1px solid #334155; margin: 24px 0 0 0; height: 1px; width: 80%; margin-left: 10%; margin-right: 10%;"></div>
        <div style="color: #94a3b8; font-size: 13px; margin-top: 18px;">&copy; 2025 BizModelAI. All rights reserved.</div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

export {
  generateUnpaidEmailHtml,
  generatePaidEmailHtml
};
