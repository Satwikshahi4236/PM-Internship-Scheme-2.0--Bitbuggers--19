import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      home: 'Home',
      internshipPortal: 'Internship Portal',
      login: 'Login',
      signup: 'Sign Up',
      contactUs: 'Contact Us',
      dashboard: 'Dashboard',
      logout: 'Logout',
      
      // Hero Section
      heroTitle: 'Empowering 1 Crore Youth with Industry Experience',
      heroSubtitle: 'Prime Minister Internship Scheme - Connecting talented youth with India\'s top 500 companies',
      applyNow: 'Apply Now',
      learnMore: 'Learn More',
      
      // Scheme Overview
      keyBenefits: 'Key Benefits',
      monthlyStipend: '₹5,000 Monthly Stipend',
      oneTimeGrant: '₹6,000 One-time Grant',
      duration: '12-Month Duration',
      targetInternships: '1 Crore Internships',
      insuranceCoverage: 'Insurance Coverage',
      ageEligibility: 'Age 21-24 Years',
      
      // Statistics
      totalApplications: 'Total Applications',
      activeInternships: 'Active Internships',
      partnerCompanies: 'Partner Companies',
      successfulPlacements: 'Successful Placements',
      
      // Internship Portal
      searchPlaceholder: 'Search by company, position, or location...',
      filterBySector: 'Filter by Sector',
      filterByLocation: 'Filter by Location',
      filterByCompany: 'Filter by Company',
      filterByStatus: 'Filter by Status',
      allSectors: 'All Sectors',
      allLocations: 'All Locations',
      allCompanies: 'All Companies',
      allStatuses: 'All Statuses',
      gridView: 'Grid View',
      listView: 'List View',
      resultsFound: 'results found',
      applicationDeadline: 'Application Deadline',
      monthsInternship: 'months internship',
      
      // Authentication
      loginTitle: 'Login to Your Account',
      signupTitle: 'Create New Account',
      emailPhone: 'Email or Phone',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      name: 'Full Name',
      phone: 'Phone Number',
      aadhaar: 'Aadhaar Number',
      education: 'Education Level',
      state: 'State',
      forgotPassword: 'Forgot Password?',
      alreadyHaveAccount: 'Already have an account?',
      dontHaveAccount: 'Don\'t have an account?',
      
      // Contact
      contactTitle: 'Get in Touch',
      phoneSupport: 'Phone Support',
      emailSupport: 'Email Support',
      liveChat: 'Live Chat',
      regionalOffices: 'Regional Offices',
      grievanceRedressal: 'Grievance Redressal',
      
      // Common
      submit: 'Submit',
      cancel: 'Cancel',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      loading: 'Loading...',
      error: 'Error occurred',
      success: 'Success',
      previous: 'Previous',
      next: 'Next',
      page: 'Page',
      of: 'of',
      
      // Sectors
      banking: 'Banking & Finance',
      automotive: 'Automotive',
      energy: 'Energy & Utilities',
      it: 'Information Technology',
      healthcare: 'Healthcare',
      manufacturing: 'Manufacturing',
      retail: 'Retail & E-commerce',
      telecom: 'Telecommunications',
    }
  },
  hi: {
    translation: {
      // Navigation
      home: 'मुख्य पृष्ठ',
      internshipPortal: 'इंटर्नशिप पोर्टल',
      login: 'लॉगिन',
      signup: 'साइन अप',
      contactUs: 'संपर्क करें',
      dashboard: 'डैशबोर्ड',
      logout: 'लॉगआउट',
      
      // Hero Section
      heroTitle: '1 करोड़ युवाओं को उद्योग अनुभव के साथ सशक्त बनाना',
      heroSubtitle: 'प्रधानमंत्री इंटर्नशिप योजना - प्रतिभाशाली युवाओं को भारत की शीर्ष 500 कंपनियों से जोड़ना',
      applyNow: 'अभी आवेदन करें',
      learnMore: 'और जानें',
      
      // Scheme Overview
      keyBenefits: 'मुख्य लाभ',
      monthlyStipend: '₹5,000 मासिक वृत्ति',
      oneTimeGrant: '₹6,000 एकमुश्त अनुदान',
      duration: '12 महीने की अवधि',
      targetInternships: '1 करोड़ इंटर्नशिप',
      insuranceCoverage: 'बीमा कवरेज',
      ageEligibility: 'आयु 21-24 वर्ष',
      
      // Statistics
      totalApplications: 'कुल आवेदन',
      activeInternships: 'सक्रिय इंटर्नशिप',
      partnerCompanies: 'भागीदार कंपनियां',
      successfulPlacements: 'सफल प्लेसमेंट',
      
      // Internship Portal
      searchPlaceholder: 'कंपनी, पद या स्थान से खोजें...',
      filterBySector: 'क्षेत्र के अनुसार फ़िल्टर करें',
      filterByLocation: 'स्थान के अनुसार फ़िल्टर करें',
      filterByCompany: 'कंपनी के अनुसार फ़िल्टर करें',
      filterByStatus: 'स्थिति के अनुसार फ़िल्टर करें',
      allSectors: 'सभी क्षेत्र',
      allLocations: 'सभी स्थान',
      allCompanies: 'सभी कंपनियां',
      allStatuses: 'सभी स्थितियां',
      gridView: 'ग्रिड दृश्य',
      listView: 'सूची दृश्य',
      resultsFound: 'परिणाम मिले',
      applicationDeadline: 'आवेदन की अंतिम तिथि',
      monthsInternship: 'महीने की इंटर्नशिप',
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
    },
  });

export default i18n;