import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Government Information */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-8 w-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">GoI</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">Prime Minister Internship Scheme</h3>
                <p className="text-sm text-gray-300">Government of India</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Empowering 1 crore youth with industry experience through internships 
              in India's top 500 companies. Building skills, creating opportunities, 
              and fostering innovation for a better tomorrow.
            </p>
            <div className="flex space-x-4 text-gray-300">
              <Mail className="h-5 w-5" />
              <span className="text-sm">support@pmis.gov.in</span>
            </div>
            <div className="flex space-x-4 text-gray-300 mt-2">
              <Phone className="h-5 w-5" />
              <span className="text-sm">1800-XXX-PMIS (7647)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-300 hover:text-orange-400">About Scheme</Link></li>
              <li><Link to="/eligibility" className="text-gray-300 hover:text-orange-400">Eligibility</Link></li>
              <li><Link to="/guidelines" className="text-gray-300 hover:text-orange-400">Guidelines</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-orange-400">FAQ</Link></li>
              <li><Link to="/grievance" className="text-gray-300 hover:text-orange-400">Grievance</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="text-gray-300 hover:text-orange-400">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-orange-400">Terms & Conditions</Link></li>
              <li><Link to="/accessibility" className="text-gray-300 hover:text-orange-400">Accessibility</Link></li>
              <li><Link to="/sitemap" className="text-gray-300 hover:text-orange-400">Sitemap</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2024 Government of India. All rights reserved.
            </p>
            <div className="flex space-x-1 mt-4 md:mt-0">
              <div className="w-6 h-4 bg-orange-500"></div>
              <div className="w-6 h-4 bg-white"></div>
              <div className="w-6 h-4 bg-green-600"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}