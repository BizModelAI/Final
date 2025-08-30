"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Removed require statement - using ES modules now

function generatePreviewEmailHTML(quizData, quizAttemptId) {
  try {
    // For now, return a simple HTML template until we get the React templates working
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your BizModelAI Results</title>
      </head>
        <body style="margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #F8FAFC;">
          <div style="max-width: 700px; margin: 0 auto; background: #FFFFFF; border-radius: 24px; overflow: hidden; box-shadow: 0 8px 32px rgba(37, 99, 235, 0.10);">
            <!-- Hero Section -->
            <div style="background: linear-gradient(135deg, #4338ca 0%, #6366f1 40%, #7c3aed 100%); padding: 56px 32px; text-align: center;">
              <div style="font-size: 54px; margin-bottom: 10px;">🎉</div>
              <h1 style="font-size: 36px; font-weight: 800; color: #fff; margin: 0; letter-spacing: -0.02em; line-height: 1.1;">Your AI-Powered Business Blueprint</h1>
              <p style="color: #e0e7ef; font-size: 15px; margin: 18px 0 0 0; font-weight: 500;">Personalized recommendations based on your unique goals, skills, and preferences</p>
            </div>

            <!-- Content Section -->
            <div style="padding: 40px 32px 32px 32px; background: #fff;">
              <div style="background: #f1f5f9; border-radius: 16px; margin: 0 0 32px 0; padding: 28px 32px; box-shadow: 0 8px 32px rgba(30,41,59,0.18);">
                <h3 style="font-weight: 700; font-size: 18px; color: #18181b; margin-bottom: 16px;">📝 Your Business Profile</h3>
                <p style="color: #18181b; font-size: 16px; line-height: 1.7; margin: 0;">
                  Based on your quiz responses, we've identified the business models that best align with your skills, preferences, and goals.
                </p>
              </div>

              <div style="background: #f1f5f9; border-radius: 16px; margin: 0 0 32px 0; padding: 28px 32px; box-shadow: 0 8px 32px rgba(30,41,59,0.18);">
                <h3 style="font-weight: 700; font-size: 18px; color: #18181b; margin-bottom: 16px;">🔒 Unlock Your Full Report</h3>
                <p style="color: #18181b; font-size: 16px; line-height: 1.7; margin-bottom: 20px;">
                  Get access to all 25 business models, detailed fit scores, implementation guides, and personalized action plans.
                </p>
                <div style="text-align: center;">
                  <a href="https://bizmodelai.com/full-report" style="display: inline-block; background: linear-gradient(90deg, #2563eb 0%, #7c3aed 100%); color: #fff; padding: 16px 32px; border-radius: 999px; font-weight: 700; font-size: 18px; text-decoration: none; box-shadow: 0 6px 24px rgba(59,130,246,0.13);">👉 Unlock My Full Report</a>
                  <div style="color: #2563eb; font-weight: 700; font-size: 16px; margin-top: 12px;">Only $9.99 — One-time payment for lifetime access</div>
              </div>
              </div>

              <div style="background: #f1f5f9; border-radius: 16px; margin: 0 0 32px 0; padding: 28px 32px; box-shadow: 0 8px 32px rgba(30,41,59,0.18); font-style: italic;">
                <p style="color: #18181b; font-size: 16px; line-height: 1.7; margin: 0 0 16px 0;">
                  Thanks for taking the BizModelAI quiz. Our system has carefully analyzed your responses to identify the business models that best align with your goals.
                </p>
                <div style="text-align: right; font-weight: 500;">
                  With love,<br/>The BizModelAI Team 💌
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div style="width: 100%; text-align: center; margin-top: 40px;">
            <div style="background: #1e293b; border-bottom-left-radius: 24px; border-bottom-right-radius: 24px; padding: 32px 0 24px 0; color: #fff; margin: 0 auto; box-shadow: 0 2px 12px rgba(30,41,59,0.10); width: 90%; max-width: 700px;">
              <div style="font-weight: 800; font-size: 20px; letter-spacing: -0.01em; color: #fff; margin-bottom: 16px;">BizModelAI</div>
              <div style="color: #cbd5e1; font-size: 14px; margin-bottom: 20px;">
                Need help? Contact team@bizmodelai.com<br />
                Your preview is saved for the next 90 days.
              </div>
              <div style="color: #94a3b8; font-size: 13px;">&copy; 2025 BizModelAI. All rights reserved.</div>
          </div>
        </div>
      </body>
    </html>
  `;
  } catch (error) {
    console.error('Error generating preview email HTML:', error);
    return '<p>Error generating email content</p>';
  }
}

export {
  generatePreviewEmailHTML
};
