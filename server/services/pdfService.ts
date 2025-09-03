import * as puppeteer from "puppeteer";
import { QuizData } from "../../shared/types";

export interface PDFGenerationOptions {
  quizData: QuizData;
  userEmail?: string;
  aiAnalysis?: any;
  topBusinessPath?: any;
  baseUrl: string;
}

export class PDFService {
  private static instance: PDFService;
  private browser: puppeteer.Browser | null = null;

  private constructor() {}

  static getInstance(): PDFService {
    if (!PDFService.instance) {
      PDFService.instance = new PDFService();
    }
    return PDFService.instance;
  }

  async initializeBrowser(): Promise<void> {
    if (!this.browser) {
      try {
        // Render-compatible configuration for PDF generation
        const puppeteerOptions = {
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu'
          ],
          headless: true
        };
        this.browser = await puppeteer.launch(puppeteerOptions);
        console.log("Browser initialized successfully");
      } catch (error) {
        console.error("Failed to initialize browser:", error);
        throw error;
      }
    }
  }

  async generatePDF(options: PDFGenerationOptions): Promise<Buffer> {
    const { quizData, userEmail, aiAnalysis, topBusinessPath, baseUrl } =
      options;

    try {
      // Check if we can access the client-side PDF report page
      const canAccessClient = await this.checkClientAccessibility(baseUrl);
      
      if (canAccessClient) {
        // Try to use Puppeteer for real PDF generation
        await this.initializeBrowser();

        if (!this.browser) {
          console.log("Browser not available, falling back to HTML");
          return this.generateHTMLFallback(options);
        }

        const page = await this.browser.newPage();

        // Create the PDF report URL with encoded data including AI analysis
        const reportData = {
          quizData,
          userEmail,
          aiAnalysis,
          topBusinessPath,
        };
        const encodedData = encodeURIComponent(JSON.stringify(reportData));
        const pdfUrl = `${baseUrl}/pdf-report?data=${encodedData}`;

        console.log("Loading PDF report page:", pdfUrl);

        // Navigate to the PDF report page
        await page.goto(pdfUrl, {
          waitUntil: "networkidle2",
          timeout: 30000,
        });

        // Wait for the page to fully render
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Generate PDF with optimized settings
        const pdfBuffer = await page.pdf({
          format: "A4",
          printBackground: true,
          preferCSSPageSize: true,
          margin: {
            top: "0.5in",
            right: "0.5in",
            bottom: "0.5in",
            left: "0.5in",
          },
          displayHeaderFooter: false,
        });

        await page.close();
        console.log("PDF generated successfully with Puppeteer");

        return Buffer.from(pdfBuffer);
      } else {
        console.log("Client-side PDF report not accessible, using HTML fallback");
        return this.generateHTMLFallback(options);
      }
    } catch (error) {
      console.error("PDF generation failed, falling back to HTML:", error);
      return this.generateHTMLFallback(options);
    }
  }

  private async checkClientAccessibility(baseUrl: string): Promise<boolean> {
    try {
      const response = await fetch(`${baseUrl}/pdf-report`);
      return response.ok;
    } catch (error) {
      console.log("Client accessibility check failed:", error instanceof Error ? error.message : String(error));
      return false;
    }
  }

  private generateHTMLFallback(options: PDFGenerationOptions): Buffer {
    const { quizData, userEmail, aiAnalysis, topBusinessPath } = options;

    // Helper function to safely escape HTML
    const escapeHtml = (text: string | undefined | null): string => {
      if (!text) return "";
      return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;");
    };

    // Helper function to safely format currency
    const formatCurrency = (value: number | undefined | null): string => {
      if (typeof value !== "number" || isNaN(value)) return "0";
      return value.toLocaleString();
    };

    // Helper function to safely format timeline
    const formatTimeline = (timeline: string | undefined | null): string => {
      if (!timeline) return "Not specified";
      return escapeHtml(timeline.replace(/-/g, " "));
    };

    // Safe user display name
    const safeUserName = escapeHtml(userEmail?.split("@")[0] || "User");

    // Enhanced HTML template with inline CSS for better PDF compatibility
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Business Path Analysis Report</title>
        <style>
            @media print {
                body { 
                    print-color-adjust: exact; 
                    -webkit-print-color-adjust: exact;
                    color-adjust: exact;
                }
                .page-break { page-break-before: always; }
                .avoid-break { page-break-inside: avoid; }
                .gradient-bg {
                    background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%) !important;
                }
            }
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                margin: 0;
                padding: 0;
                background: white;
                color: #1f2937;
                line-height: 1.6;
            }
            .gradient-bg {
                background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
            }
            .container {
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
            }
            .header {
                text-align: center;
                padding: 40px 20px;
                margin-bottom: 40px;
                color: white;
            }
            .section {
                margin-bottom: 40px;
                page-break-inside: avoid;
            }
            .grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
                margin: 20px 0;
            }
            .card {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                padding: 20px;
                text-align: center;
                backdrop-filter: blur(4px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .text-center { text-align: center; }
            .text-2xl { font-size: 1.5rem; }
            .text-xl { font-size: 1.25rem; }
            .text-lg { font-size: 1.125rem; }
            .font-bold { font-weight: 700; }
            .font-semibold { font-weight: 600; }
            .mb-2 { margin-bottom: 0.5rem; }
            .mb-4 { margin-bottom: 1rem; }
            .mb-6 { margin-bottom: 1.5rem; }
            .mb-8 { margin-bottom: 2rem; }
            .p-4 { padding: 1rem; }
            .p-6 { padding: 1.5rem; }
            .p-8 { padding: 2rem; }
            .rounded-xl { border-radius: 0.75rem; }
            .rounded-2xl { border-radius: 1rem; }
            .text-white { color: white; }
            .text-gray-700 { color: #374151; }
            .text-blue-600 { color: #2563eb; }
            .text-green-600 { color: #16a34a; }
            .text-purple-600 { color: #9333ea; }
            .bg-white { background: white; }
            .bg-blue-50 { background: #eff6ff; }
            .bg-purple-50 { background: #faf5ff; }
            .space-y-4 > * + * { margin-top: 1rem; }
            .space-y-6 > * + * { margin-top: 1.5rem; }
            .space-y-8 > * + * { margin-top: 2rem; }
            .flex { display: flex; }
            .items-start { align-items: flex-start; }
            .items-center { align-items: center; }
            .justify-center { justify-content: center; }
            .mr-2 { margin-right: 0.5rem; }
            .mt-2 { margin-top: 0.5rem; }
            .mt-4 { margin-top: 1rem; }
            .border-t { border-top: 1px solid #e5e7eb; }
            .pt-6 { padding-top: 1.5rem; }
            .opacity-90 { opacity: 0.9; }
            .opacity-75 { opacity: 0.75; }
            .from-blue-50 { background: linear-gradient(to right, #eff6ff, #faf5ff); }
            .to-purple-50 { background: linear-gradient(to right, #eff6ff, #faf5ff); }
            .page-break { page-break-before: always; }
            .avoid-break { page-break-inside: avoid; }
            .text-sm { font-size: 0.875rem; }
            .font-medium { font-weight: 500; }
            .text-blue-500 { color: #3b82f6; }
            .bg-gradient-to-r { background: linear-gradient(to right, var(--from-color), var(--to-color)); }
            .from-blue-50 { --from-color: #eff6ff; }
            .to-purple-50 { --to-color: #faf5ff; }
            .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
            .shadow-xl { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
            .backdrop-blur-sm { backdrop-filter: blur(4px); }
            .border-l-4 { border-left: 4px solid; }
            .border-blue-500 { border-color: #3b82f6; }
            .border-green-500 { border-color: #16a34a; }
            .border-purple-500 { border-color: #9333ea; }
        </style>
    </head>
    <body>
        <div class="container">
            <!-- Header -->
            <div class="gradient-bg header">
                <h1 class="text-2xl font-bold mb-4">Business Path Analysis Report</h1>
                <p class="text-xl opacity-90">Personalized Recommendations for ${safeUserName}</p>
                <p class="text-sm opacity-75 mt-2">Generated on ${new Date().toLocaleDateString()}</p>
                
                <div class="grid">
                    <div class="card">
                        <div class="mb-2">
                            <span class="font-semibold">Income Goal</span>
                        </div>
                        <p class="text-2xl font-bold">$${formatCurrency(quizData.successIncomeGoal)}/month</p>
                    </div>
                    
                    <div class="card">
                        <div class="mb-2">
                            <span class="font-semibold">Timeline</span>
                        </div>
                        <p class="text-2xl font-bold">${formatTimeline(quizData.firstIncomeTimeline)}</p>
                    </div>
                    
                    <div class="card">
                        <div class="mb-2">
                            <span class="font-semibold">Investment</span>
                        </div>
                        <p class="text-2xl font-bold">$${formatCurrency(quizData.upfrontInvestment)}</p>
                    </div>
                </div>
            </div>

            <!-- Summary Section -->
            <section class="section">
                <h2 class="text-2xl font-bold mb-6">Executive Summary</h2>
                
                <div class="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl shadow-lg">
                    <div class="space-y-4">
                            <div>
                                <h3 class="font-semibold text-gray-900">Your Profile</h3>
                                <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 0.5rem; font-size: 0.875rem;">
                                                                        <div><span class="font-medium">Income Goal:</span> $${formatCurrency(quizData.successIncomeGoal)}/month</div>
                                                                        <div><span class="font-medium">Timeline:</span> ${formatTimeline(quizData.firstIncomeTimeline)}</div>
                                                                        <div><span class="font-medium">Investment:</span> $${formatCurrency(quizData.upfrontInvestment)}</div>
                                                                        <div><span class="font-medium">Time Commitment:</span> ${formatCurrency(quizData.weeklyTimeCommitment)} hours/week</div>
                                </div>
                            </div>
                            
                            <div>
                                <h3 class="font-semibold text-gray-900">Key Recommendations</h3>
                                <p class="text-gray-700">Based on your responses, we've identified personalized business paths that align with your goals, skills, and preferences. This report provides actionable insights to help you start your entrepreneurial journey.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Action Plan -->
                <section class="section page-break">
                    <h2 class="text-2xl font-bold mb-6">Your 90-Day Action Plan</h2>
                    
                    <div class="space-y-6">
                        <div class="avoid-break bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
                            <h3 class="text-lg font-semibold mb-3 text-blue-600">Week 1: Foundation</h3>
                            <ul class="space-y-2 text-gray-700">
                                <li class="flex items-start">
                                    <span class="text-blue-500 mr-2">•</span>
                                    Set up your workspace and essential tools
                                </li>
                                <li class="flex items-start">
                                    <span class="text-blue-500 mr-2">•</span>
                                    Research your target market and competition
                                </li>
                                <li class="flex items-start">
                                    <span class="text-blue-500 mr-2">•</span>
                                    Create your business plan outline
                                </li>
                            </ul>
                        </div>

                        <div class="avoid-break bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
                            <h3 class="text-lg font-semibold mb-3 text-green-600">Month 1: Launch Preparation</h3>
                            <ul class="space-y-2 text-gray-700">
                                <li class="flex items-start">
                                    <span class="text-green-500 mr-2">•</span>
                                    Build your minimum viable product/service
                                </li>
                                <li class="flex items-start">
                                    <span class="text-green-500 mr-2">•</span>
                                    Establish your online presence
                                </li>
                                <li class="flex items-start">
                                    <span class="text-green-500 mr-2">•</span>
                                    Test with initial customers
                                </li>
                            </ul>
                        </div>

                        <div class="avoid-break bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
                            <h3 class="text-lg font-semibold mb-3 text-purple-600">Month 2-3: Growth & Optimization</h3>
                            <ul class="space-y-2 text-gray-700">
                                <li class="flex items-start">
                                    <span class="text-purple-500 mr-2">•</span>
                                    Scale your marketing efforts
                                </li>
                                <li class="flex items-start">
                                    <span class="text-purple-500 mr-2">•</span>
                                    Optimize based on customer feedback
                                </li>
                                <li class="flex items-start">
                                    <span class="text-purple-500 mr-2">•</span>
                                    Establish consistent revenue streams
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <!-- Footer -->
                <footer class="text-center text-gray-500 text-sm border-t pt-6">
                    <p>This personalized report was generated based on your quiz responses.</p>
                    <p>For updates and additional resources, visit our platform.</p>
                    <div class="mt-4 space-y-1">
                        <p class="font-medium">Get Started Today:</p>
                        <p>Visit our website for additional tools, resources, and personalized guidance</p>
                        <p>Access your full business analysis and detailed recommendations online</p>
                    </div>
                </footer>
            </div>
        </div>
        
        <script>
            // Optional: Auto-print when loaded (for HTML fallback)
            // window.onload = function() { window.print(); };
        </script>
    </body>
    </html>
    `;

    return Buffer.from(htmlContent, "utf8");
  }

  async closeBrowser(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}

export const pdfService = PDFService.getInstance();
