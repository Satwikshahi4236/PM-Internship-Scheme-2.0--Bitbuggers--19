import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  FileText,
  Headphones 
} from 'lucide-react';

const contactChannels = [
  {
    icon: <Phone className="h-8 w-8 text-orange-600" />,
    title: 'Phone Support',
    description: '24/7 Helpline',
    contact: '1800-XXX-PMIS (7647)',
    subtitle: 'Toll-free across India',
  },
  {
    icon: <Mail className="h-8 w-8 text-orange-600" />,
    title: 'Email Support',
    description: 'Get help via email',
    contact: 'support@pmis.gov.in',
    subtitle: 'Response within 24 hours',
  },
  {
    icon: <MessageCircle className="h-8 w-8 text-orange-600" />,
    title: 'Live Chat',
    description: 'Instant assistance',
    contact: 'Available 9 AM - 6 PM',
    subtitle: 'Monday to Friday',
  },
  {
    icon: <FileText className="h-8 w-8 text-orange-600" />,
    title: 'Grievance Portal',
    description: 'File complaints',
    contact: 'grievance@pmis.gov.in',
    subtitle: 'Quick resolution',
  },
];

const regionalOffices = [
  {
    region: 'Northern Region',
    address: 'PMIS Regional Office, Connaught Place, New Delhi - 110001',
    phone: '011-XXXX-XXXX',
    email: 'north@pmis.gov.in',
  },
  {
    region: 'Western Region',
    address: 'PMIS Regional Office, Bandra Kurla Complex, Mumbai - 400051',
    phone: '022-XXXX-XXXX',
    email: 'west@pmis.gov.in',
  },
  {
    region: 'Southern Region',
    address: 'PMIS Regional Office, Anna Salai, Chennai - 600002',
    phone: '044-XXXX-XXXX',
    email: 'south@pmis.gov.in',
  },
  {
    region: 'Eastern Region',
    address: 'PMIS Regional Office, Salt Lake City, Kolkata - 700064',
    phone: '033-XXXX-XXXX',
    email: 'east@pmis.gov.in',
  },
];

const faqItems = [
  {
    question: 'What is the Prime Minister Internship Scheme?',
    answer: 'PMIS is a flagship program by the Government of India to provide internship opportunities to 1 crore youth in top 500 companies with monthly stipend and insurance coverage.',
  },
  {
    question: 'Who is eligible for the scheme?',
    answer: 'Youth aged 21-24 years who have completed secondary education (12th pass or equivalent) are eligible to apply.',
  },
  {
    question: 'What is the duration of the internship?',
    answer: 'The internship duration is 12 months with a monthly stipend of ₹5,000 and a one-time grant of ₹6,000.',
  },
  {
    question: 'How do I apply for an internship?',
    answer: 'You can apply through the PMIS portal by creating an account, completing your profile, and applying for available positions.',
  },
  {
    question: 'Is there any fee for registration?',
    answer: 'No, the registration and application process is completely free. Beware of fraudulent charges.',
  },
];

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('contactTitle')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're here to help you with any questions about the Prime Minister Internship Scheme
          </p>
        </div>

        {/* Contact Channels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactChannels.map((channel, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow text-center">
              <CardContent className="p-6">
                <div className="mb-4 flex justify-center">
                  {channel.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {channel.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {channel.description}
                </p>
                <p className="font-semibold text-gray-900 mb-1">
                  {channel.contact}
                </p>
                <p className="text-xs text-gray-500">
                  {channel.subtitle}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" className="mt-1" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" className="mt-1" />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" className="mt-1" />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" className="mt-1" />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      rows={5} 
                      className="mt-1"
                      placeholder="Please describe your query in detail..."
                    />
                  </div>
                  
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    {t('submit')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {faqItems.map((faq, index) => (
                    <div key={index} className="border-b pb-4 last:border-b-0">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {faq.question}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Regional Offices */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {t('regionalOffices')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {regionalOffices.map((office, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {office.region}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                      <p className="text-sm text-gray-600">{office.address}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <p className="text-sm text-gray-600">{office.phone}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <p className="text-sm text-gray-600">{office.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Office Hours */}
        <div className="mt-12 bg-orange-50 rounded-lg p-8 text-center">
          <Clock className="h-12 w-12 text-orange-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Office Hours
          </h3>
          <p className="text-gray-600">
            <strong>Monday to Friday:</strong> 9:00 AM - 6:00 PM IST<br />
            <strong>Saturday:</strong> 10:00 AM - 2:00 PM IST<br />
            <strong>Sunday:</strong> Closed
          </p>
          <p className="text-sm text-orange-600 mt-4">
            * 24/7 helpline available for urgent queries
          </p>
        </div>
      </div>
    </div>
  );
}