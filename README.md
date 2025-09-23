# Prime Minister Internship Scheme (PMIS) Portal

A comprehensive government platform connecting Indian youth aged 21-24 with internship opportunities in top 500 companies.

## 🚀 Features

- **Multilingual Support**: 22 Indian languages including Hindi, Tamil, Telugu, Bengali, and more
- **Modern Tech Stack**: React 18+, TypeScript, Tailwind CSS, shadcn/ui
- **Authentication System**: JWT-based auth with OTP verification
- **Advanced Filtering**: Search internships by sector, location, company, and status
- **Responsive Design**: Mobile-first approach with PWA capabilities
- **Accessibility**: WCAG 2.1 AA compliant with screen reader support
- **Government Compliant**: Official branding and security standards

## 🎯 Scheme Overview

- **Monthly Stipend**: ₹5,000 per intern
- **One-time Grant**: ₹6,000 per intern
- **Duration**: 12 months
- **Target**: 1 crore internships across 5 years
- **Insurance**: PM Jeevan Jyoti & PM Suraksha Bima coverage
- **Sectors**: 24+ sectors including IT, Banking, Manufacturing, Healthcare

## 🛠️ Tech Stack

### Frontend
- **React 18+** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** + **shadcn/ui** for styling
- **React Router v6** for routing
- **React Query** for server state management
- **Zustand** for client state management
- **React Hook Form** + **Zod** for form handling
- **react-i18next** for internationalization

### Backend
- **Supabase** for database, authentication, and real-time features
- **PostgreSQL** database with Row Level Security (RLS)
- **JWT Authentication** with refresh tokens
- **Real-time subscriptions** for live updates

### Development Tools
- **ESLint** + **TypeScript ESLint**
- **PostCSS** + **Autoprefixer**
- **Docker** for containerization

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (for database and authentication)
- Docker (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-repo/pmis-portal.git
   cd pmis-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Add your Supabase URL and anon key to .env
   ```

4. **Set up Supabase**
   - Create a new Supabase project at https://supabase.com
   - Copy your project URL and anon key to `.env`
   - Run the database migrations in the Supabase SQL editor
   - Execute the seed data script to populate sample data

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

### Docker Deployment

1. **Build and run with Docker Compose**
   ```bash
   # Make sure to set your Supabase credentials in .env first
   docker-compose up --build
   ```

2. **Access the application**
   - Frontend: http://localhost:3000

## 🗄️ Database Schema

The application uses Supabase PostgreSQL with the following main tables:

- **users**: User profiles and authentication data
- **companies**: Partner companies offering internships
- **internships**: Available internship positions
- **applications**: User applications for internships
- **statistics**: Portal statistics for dashboard

All tables have Row Level Security (RLS) enabled for data protection.

### Database Setup

1. **Create tables**: Run `supabase/migrations/create_initial_schema.sql`
2. **Seed data**: Run `supabase/migrations/seed_sample_data.sql`
3. **Configure RLS**: Policies are automatically created with the schema

## 📱 Key Pages

### 1. Home Page
- Hero section with scheme overview
- Real-time statistics dashboard
- Key benefits showcase
- Success stories and testimonials
- Partner company logos

### 2. Internship Portal
- Advanced search and filtering
- Grid/List view toggle
- Pagination with 10 items per page
- Company and sector-wise filtering
- Application tracking

### 3. Authentication
- Dual-mode login/signup
- Supabase authentication with email/password
- User profile management
- Secure session handling
- Password recovery

### 4. Contact & Support
- Multi-channel support (Phone, Email, Chat)
- Regional office contacts
- FAQ section
- Grievance portal
- Live chat integration

## 🌐 Multilingual Support

The portal supports 22 Indian languages:

**Primary Languages:**
- English, Hindi

**Regional Languages:**
- Tamil, Telugu, Bengali, Marathi
- Gujarati, Kannada, Malayalam, Odia
- Punjabi, Assamese, Urdu
- And 9 more regional languages

### Language Implementation
```typescript
// Language switching
import { useTranslation } from 'react-i18next';

const { t, i18n } = useTranslation();
i18n.changeLanguage('hi'); // Switch to Hindi
```

## 🎨 Design System

### Color Palette
- **Primary**: Orange (#FF9933), White (#FFFFFF), Green (#138808)
- **Secondary**: Government Blue (#0066CC)
- **Neutral**: Gray variants for text and backgrounds

### Typography
- **English**: Inter font family
- **Indian Languages**: Noto Sans for proper script rendering
- **Responsive**: Mobile-first typography scaling

### Components
- Consistent shadcn/ui components
- Government-compliant styling
- Accessibility-first design
- Dark/Light mode support

## 🔐 Security Features

- **Supabase Authentication** with JWT tokens
- **Row Level Security (RLS)** for database access
- **CSRF Protection** for form submissions
- **Input Sanitization** for all user inputs
- **Secure Headers** implementation
- **Environment Variables** for sensitive data

## 📊 Performance Optimizations

- **Code Splitting**: Route-based lazy loading
- **React Query Caching**: Optimized data fetching
- **Supabase Real-time**: Live updates without polling
- **Image Optimization**: WebP format with fallbacks
- **Bundle Analysis**: Optimized build output

## 🧪 Testing

```bash
# Run tests
npm run test

# Coverage report
npm run test:coverage

# E2E tests
npm run test:e2e
```

## 📈 Analytics & Monitoring

- **User Journey Tracking**: Application funnel analysis
- **Performance Monitoring**: Core Web Vitals
- **Error Tracking**: Comprehensive logging
- **A/B Testing**: Conversion optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Supabase Dashboard**: Monitor database and authentication
- **Email**: support@pmis.gov.in
- **Phone**: 1800-XXX-PMIS (7647)
- **Documentation**: [Wiki](https://github.com/your-repo/pmis-portal/wiki)
- **Issues**: [GitHub Issues](https://github.com/your-repo/pmis-portal/issues)

## 🏛️ Government Compliance

This portal is developed in accordance with:
- **Government of India** web standards
- **Digital India** guidelines
- **GIGW** (Government of India Guidelines for Web)
- **WCAG 2.1 AA** accessibility standards
- **ISO 27001** security standards

---

**Developed for the Government of India**  
**Prime Minister Internship Scheme - Empowering 1 Crore Youth**

🇮🇳 **Jai Hind** 🇮🇳