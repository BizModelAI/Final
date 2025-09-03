import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: January 3, 2025</p>
          <p className="text-gray-500 text-sm mt-2">
            This Privacy Policy describes how BizModelAI ("we," "our," or "us") collects, uses, and protects your information when you use our AI-powered business model discovery platform.
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
            <p className="text-gray-700 mb-4">
              We collect information you provide directly to us, such as when you:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Create an account or complete our business assessment quiz</li>
              <li>Subscribe to our newsletter or communications</li>
              <li>Contact us for support or inquiries</li>
              <li>Use our website and services</li>
              <li>Make payments for premium features</li>
              <li>Download reports or access premium content</li>
            </ul>
            <p className="text-gray-700 mb-4">
              This information may include your name, email address, quiz responses, payment information, and any other information you choose to provide.
            </p>
            <p className="text-gray-700 mb-4">
              We also automatically collect certain information when you use our services, including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Usage data (pages visited, time spent, features used)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Provide personalized business recommendations and AI-powered analysis</li>
              <li>Generate and deliver your quiz results and business model reports</li>
              <li>Process payments and provide premium features</li>
              <li>Send you important updates about your account and our services</li>
              <li>Communicate with you about new features, promotions, and educational content</li>
              <li>Improve our AI algorithms and platform functionality</li>
              <li>Provide customer support and respond to your inquiries</li>
              <li>Ensure platform security and prevent fraud</li>
              <li>Comply with legal obligations and enforce our terms of service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
            <p className="text-gray-700 mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties except:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>With your explicit consent</li>
              <li>To trusted service providers who assist us in operating our platform (e.g., payment processors, email services, cloud hosting)</li>
              <li>With AI service providers (like OpenAI) for processing your quiz responses and generating personalized recommendations</li>
              <li>When required by law or to protect our rights and the safety of our users</li>
              <li>In connection with a business transfer, merger, or acquisition</li>
              <li>To prevent fraud or abuse of our services</li>
            </ul>
            <p className="text-gray-700 mb-4">
              We may share aggregated, anonymized data that cannot be used to identify you for research, analytics, or business purposes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
            <p className="text-gray-700 mb-4">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Our security measures include:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Encryption of data in transit and at rest</li>
              <li>Secure authentication and access controls</li>
              <li>Regular security audits and monitoring</li>
              <li>Secure cloud infrastructure and hosting</li>
              <li>Employee training on data protection practices</li>
            </ul>
            <p className="text-gray-700 mb-4">
              However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Cookies and Tracking</h2>
            <p className="text-gray-700 mb-4">
              We use cookies and similar tracking technologies to enhance your experience on our website. These technologies help us:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Remember your preferences and settings</li>
              <li>Keep you logged in to your account</li>
              <li>Analyze how you use our platform to improve our services</li>
              <li>Provide personalized content and recommendations</li>
              <li>Ensure platform security and prevent fraud</li>
            </ul>
            <p className="text-gray-700 mb-4">
              You can control cookie settings through your browser preferences. However, disabling certain cookies may affect the functionality of our platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
            <p className="text-gray-700 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Access and update your personal information</li>
              <li>Request deletion of your data (right to be forgotten)</li>
              <li>Opt out of marketing communications (unsubscribe from emails)</li>
              <li>Request a copy of your data in a portable format</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Object to certain processing of your data</li>
              <li>Withdraw consent for data processing where applicable</li>
            </ul>
            <p className="text-gray-700 mb-4">
              To exercise these rights, please contact us at privacy@bizmodelai.com. We will respond to your request within 30 days.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Third-Party Services</h2>
            <p className="text-gray-700 mb-4">
              Our platform integrates with several third-party services to provide you with the best experience:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li><strong>OpenAI:</strong> For AI-powered analysis and personalized recommendations</li>
              <li><strong>Stripe:</strong> For secure payment processing</li>
              <li><strong>Email Services:</strong> For delivering your results and communications</li>
              <li><strong>Cloud Hosting:</strong> For secure data storage and platform hosting</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Our website may also contain links to third-party websites or services. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Children's Privacy</h2>
            <p className="text-gray-700 mb-4">
              Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Changes to This Policy</h2>
            <p className="text-gray-700 mb-4">
              We may update this privacy policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Posting the new policy on this page</li>
              <li>Updating the "Last updated" date</li>
              <li>Sending you an email notification for significant changes</li>
              <li>Displaying a notice on our platform</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Your continued use of our services after any changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this privacy policy or our data practices, please contact us at:
            </p>
            <div className="bg-gray-50 p-6 rounded-xl">
              <p className="text-gray-700 mb-2">
                <strong>Email:</strong> privacy@bizmodelai.com
              </p>
              <p className="text-gray-700 mb-2">
                <strong>General Support:</strong> support@bizmodelai.com
              </p>
              <p className="text-gray-700">
                <strong>Website:</strong> https://www.bizmodelai.com
              </p>
            </div>
            <p className="text-gray-700 mt-4">
              We will respond to your privacy-related inquiries within 30 days.
            </p>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <Link 
              to="/" 
              className="text-blue-600 hover:text-blue-700 font-medium mb-4 sm:mb-0"
            >
              ← Back to Home
            </Link>
            <div className="flex space-x-6 text-sm text-gray-500">
              <Link to="/contact#top" className="hover:text-gray-700">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;