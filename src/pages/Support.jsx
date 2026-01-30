import React, { useState } from 'react';
import { DollarSign, ChevronDown, ChevronUp, HelpCircle, QrCode, X } from 'lucide-react';
import { useTheme } from '../ThemeContext.jsx';
import { Navbar, Card, Button } from '../components/index.js';
import qrisImage from '../assets/qris.png';

const Support = () => {
  const { isDarkMode } = useTheme();
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [showQRModal, setShowQRModal] = useState(false);

  const supportMethods = [
    {
      icon: DollarSign,
      title: 'Sociabuzz',
      description: 'Support my work through Sociabuzz donation platform.',
      action: 'https://sociabuzz.com/youngdam_free/tribe',
      buttonText: 'Donate via Sociabuzz'
    },
    {
      icon: QrCode,
      title: 'QRIS',
      description: 'Scan QR code for instant payment support.',
      onClick: () => setShowQRModal(true),
      buttonText: 'Show QR Code'
    }
  ];

  const faqs = [
    {
      question: 'What do my donations support?',
      answer: 'Your donations help me continue creating open-source projects, learning new technologies, and sharing knowledge with the developer community.'
    },
    {
      question: 'Are donations tax-deductible?',
      answer: 'Currently, donations are not processed through a tax-exempt organization. They are direct support for my work as an independent developer.'
    },
    {
      question: 'Can I specify how my donation is used?',
      answer: 'While you can\'t specify exact usage, all donations go towards improving my development environment, learning resources, and creating better content.'
    },
    {
      question: 'Do you offer any perks for supporters?',
      answer: 'Currently, I don\'t offer formal perks, but supporters get early access to new projects and direct communication about my work progress.'
    }
  ];

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white font-mono">
      {/* Navigation */}
      <Navbar currentPage="support" />

      <div className="flex-grow">
        {/* Header */}
        <section className="pt-24 pb-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <HelpCircle size={80} className="mx-auto mb-8" />
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              SUPPORT
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Support my work and help me continue creating amazing projects. Every contribution makes a difference!
            </p>
          </div>
        </section>

        {/* Support Methods */}
        <section className="pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {supportMethods.map((method, index) => (
                <Card key={index} className="text-center p-8 hover:scale-105 transition-transform">
                  <method.icon size={48} className="mx-auto mb-4 text-black dark:text-white" />
                  <h3 className="text-2xl font-bold mb-4">{method.title}</h3>
                  <p className="mb-6">{method.description}</p>
                  <Button
                    as={method.action ? 'a' : 'button'}
                    href={method.action}
                    onClick={method.onClick}
                    className="w-full"
                    variant={'secondary'}
                  >
                    {method.buttonText}
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-center mb-8">
              FREQUENTLY ASKED QUESTIONS
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="p-6">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center text-left"
                  >
                    <div className="flex items-center">
                      <HelpCircle size={24} className="mr-4 text-black dark:text-white" />
                      <h3 className="text-xl font-bold">{faq.question}</h3>
                    </div>
                    {expandedFAQ === index ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </button>

                  {expandedFAQ === index && (
                    <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
                      <p className="text-lg">{faq.answer}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* QR Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50" onClick={() => setShowQRModal(false)}>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowQRModal(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">QRIS Support</h2>
            <img src={qrisImage} alt="QRIS Code" className="w-full h-auto" />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black dark:bg-gray-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg">© 2024 Adam Fawwaz Haq. Crafted with ❤️ and lots of ☕</p>
        </div>
      </footer>
    </div>
  );
};

export default Support;