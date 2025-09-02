import express from 'express';
import { Resend } from 'resend';

const app = express();
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/test-email', async (req: express.Request, res: express.Response) => {
  try {
    const { email } = req.body;
    
    const html = `<!DOCTYPE html>
<html>
<head>
  <title>Test Email</title>
</head>
<body>
  <h1>🎉 Test Email</h1>
  <p>This is a test email to: ${email}</p>
  <p>If you see this, the email system is working!</p>
</body>
</html>`;

    const result = await resend.emails.send({
      from: 'BizModelAI <noreply@bizmodelai.com>',
      to: email,
      subject: 'Test Email - BizModelAI',
      html: html,
    });

    res.json({ success: true, message: 'Test email sent!', result });
  } catch (error: any) {
    console.error('Error sending test email:', error);
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

const PORT = 9001;
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
});
