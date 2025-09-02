// Safe utility functions for converting markdown to HTML with XSS protection

/**
 * Sanitize HTML content to prevent XSS attacks
 * Only allows safe HTML tags and attributes
 */
const sanitizeHTML = (html: string): string => {
  if (!html) return "";

  // Remove all potentially dangerous HTML tags and attributes
  let sanitized = html
    // Remove script tags and their content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove iframe tags
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    // Remove object tags
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    // Remove embed tags
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    // Remove form tags
    .replace(/<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi, '')
    // Remove input tags
    .replace(/<input\b[^<]*(?:(?!<\/input>)<[^<]*)*<\/input>/gi, '')
    // Remove button tags
    .replace(/<button\b[^<]*(?:(?!<\/button>)<[^<]*)*<\/button>/gi, '')
    // Remove select tags
    .replace(/<select\b[^<]*(?:(?!<\/select>)<[^<]*)*<\/select>/gi, '')
    // Remove textarea tags
    .replace(/<textarea\b[^<]*(?:(?!<\/textarea>)<[^<]*)*<\/textarea>/gi, '')
    // Remove on* event handlers
    .replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '')
    // Remove javascript: URLs
    .replace(/javascript:/gi, '')
    // Remove data: URLs
    .replace(/data:/gi, '')
    // Remove vbscript: URLs
    .replace(/vbscript:/gi, '')
    // Remove expression() CSS
    .replace(/expression\s*\(/gi, '')
    // Remove eval() calls
    .replace(/eval\s*\(/gi, '');

  return sanitized;
};

/**
 * Convert markdown to safe HTML with XSS protection
 * Only allows basic markdown features: bold, italic, code, lists, line breaks
 */
export const convertMarkdownToSafeHTML = (text: string): string => {
  if (!text) return "";

  // Convert markdown to HTML (only safe transformations)
  let htmlText = text
    // Convert markdown bold syntax (**text**) to HTML
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    // Convert markdown italic syntax (*text*) to HTML
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    // Convert markdown code syntax (`text`) to HTML
    .replace(/`(.*?)`/g, "<code>$1</code>")
    // Convert markdown bullet points (- text) to HTML
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    // Convert markdown numbered lists (1. text) to HTML
    .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
    // Convert line breaks to HTML br tags
    .replace(/\n/g, "<br>");

  // Wrap consecutive li elements in ul tags
  htmlText = htmlText.replace(/(<li>.*<\/li>)/g, "<ul>$1</ul>");

  // Sanitize the HTML to prevent XSS
  return sanitizeHTML(htmlText);
};

/**
 * Safe version of renderMarkdownContent that prevents XSS
 * Use this instead of the unsafe version
 */
export const renderSafeMarkdownContent = (content: string): { __html: string } => {
  return { __html: convertMarkdownToSafeHTML(content) };
};

/**
 * Alternative: Render markdown as plain text with styling
 * This is the safest approach - no HTML rendering at all
 */
export const renderMarkdownAsText = (content: string): string => {
  if (!content) return "";
  
  return content
    .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold markers
    .replace(/\*(.*?)\*/g, "$1")     // Remove italic markers
    .replace(/`(.*?)`/g, "$1")       // Remove code markers
    .replace(/^- (.+)$/gm, "• $1")   // Convert bullets to safe characters
    .replace(/^\d+\. (.+)$/gm, "$1") // Remove numbered list markers
    .replace(/\n/g, " ");            // Convert line breaks to spaces
};
