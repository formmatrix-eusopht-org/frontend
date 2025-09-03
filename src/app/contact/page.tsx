'use client';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">We'd Love to Hear From You!</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            At FormMatic, we prioritize our customers' experience. Our goal is to provide software that not only enhances your business efficiency but also makes your life easier.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-6">
              We value your feedback and constructive criticism. If there is anything we can do to improve your user experience, or if you would simply like to say hello, please feel free to reach out.
            </p>
            
            <p className="mb-6">
              We believe in continuous improvement and your insights help us to constantly evolve. Whether you have a suggestion for a new feature, encountered a bug, or have a question about how to get the most out of our software, our dedicated support team is here to assist you.
            </p>
            
            <p className="mb-6">
              Your satisfaction is our top priority, and we strive to respond to all inquiries promptly and thoroughly.
            </p>
            
            <p className="font-semibold">
              Thank you for choosing FormMatic.
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Email Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow duration-300">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Us</h3>
            <a 
              href="mailto:FormMatic@gmail.com" 
              className="text-blue-600 hover:text-blue-800 text-lg font-medium transition-colors break-all"
            >
              FormMatic@gmail.com
            </a>
            <p className="mt-4 text-gray-600">Send us an email anytime. We typically respond within 24 hours.</p>
          </div>

          {/* Phone Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow duration-300">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Call Us</h3>
            <div className="space-y-2">
              <div>
                <a 
                  href="tel:3105085523" 
                  className="text-gray-900 hover:text-blue-600 text-lg font-medium transition-colors block"
                >
                  (310) 508-5523
                </a>
              </div>
              <div>
                <a 
                  href="tel:3109890722" 
                  className="text-gray-900 hover:text-blue-600 text-lg font-medium transition-colors block"
                >
                  (310) 989-0722
                </a>
              </div>
            </div>
            <p className="mt-4 text-gray-600">Our support team is available Monday to Friday, 9AM to 5PM PST.</p>
          </div>
        </div>

        {/* Support Info */}
        <div className="mt-12 bg-blue-50 rounded-2xl p-8 border border-blue-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">How We Can Help</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Feature Requests</h3>
              <p className="text-gray-600 text-sm">Have an idea for a new feature? We'd love to hear about it.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Report Issues</h3>
              <p className="text-gray-600 text-sm">Encountered a bug? Let us know so we can fix it promptly.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Help</h3>
              <p className="text-gray-600 text-sm">Questions about our software? Our team is here to assist you.</p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-gray-600">
          <p>We strive to respond to all inquiries within 24 hours during business days.</p>
        </div>
      </div>
    </div>
  );
}