import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ResultsEmailTemplate from '../components/emailTemplates/ResultsEmailTemplate';
import ResultsEmailTemplatePaid from '../components/emailTemplates/ResultsEmailTemplatePaid';

export function convertReactToHtml(component: React.ReactElement): string {
  try {
    // Use ReactDOMServer to render the component to HTML string
    const htmlString = ReactDOMServer.renderToString(component);
    
    // Add DOCTYPE and basic HTML structure
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light">
  <title>BizModelAI Email</title>
</head>
<body>
  ${htmlString}
</body>
</html>`;
  } catch (error) {
    console.error('Error converting React to HTML:', error);
    return '<p>Error generating email content</p>';
  }
}

export function generateUnpaidEmailHtml(quizData: any, userEmail: string): string {
  const component = React.createElement(ResultsEmailTemplate, { quizData, userEmail, isPaid: false });
  return convertReactToHtml(component);
}

export function generatePaidEmailHtml(quizData: any, userEmail: string): string {
  const component = React.createElement(ResultsEmailTemplatePaid, { quizData, userEmail });
  return convertReactToHtml(component);
}
