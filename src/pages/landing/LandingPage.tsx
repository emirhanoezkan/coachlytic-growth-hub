
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useI18n } from "@/contexts/I18nContext";
import { CheckIcon, Users, Calendar, FileText, BarChart } from "lucide-react";

const LandingPage = () => {
  const { t, locale, changeLocale } = useI18n();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="bg-white py-4 px-6 border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-forest-500 text-white rounded-lg p-2 flex items-center justify-center">
              <span className="text-lg font-bold">C</span>
            </div>
            <h1 className="text-xl font-display font-semibold ml-2 text-forest-600">Coachlytic</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-forest-600">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-forest-600">Pricing</a>
            <a href="#contact" className="text-gray-600 hover:text-forest-600">{t('contactUs')}</a>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex border rounded-md overflow-hidden">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => changeLocale('en')}
                className={`rounded-none ${locale === 'en' ? 'bg-gray-100' : ''}`}
              >
                EN
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => changeLocale('tr')}
                className={`rounded-none ${locale === 'tr' ? 'bg-gray-100' : ''}`}
              >
                TR
              </Button>
            </div>
            
            <Button variant="outline" asChild>
              <Link to="/login">{t('login')}</Link>
            </Button>
            <Button className="bg-forest-500 hover:bg-forest-600" asChild>
              <Link to="/signup">{t('signup')}</Link>
            </Button>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-forest-50 to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-6">
            {t('heroTitle')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10">
            {t('heroSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-forest-500 hover:bg-forest-600 text-lg px-8 py-6 h-auto" asChild>
              <Link to="/signup">{t('getStarted')}</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto" asChild>
              <a href="#features">{t('learnMore')}</a>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              A complete platform for coaching professionals
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Streamline your coaching practice with our all-in-one solution designed specifically for coaches
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Users className="h-8 w-8 text-forest-500" />} 
              title={t('featureTitle1')} 
              description={t('featureDesc1')}
            />
            <FeatureCard 
              icon={<Calendar className="h-8 w-8 text-forest-500" />} 
              title={t('featureTitle2')} 
              description={t('featureDesc2')}
            />
            <FeatureCard 
              icon={<FileText className="h-8 w-8 text-forest-500" />} 
              title={t('featureTitle3')} 
              description={t('featureDesc3')}
            />
            <FeatureCard 
              icon={<BarChart className="h-8 w-8 text-forest-500" />} 
              title={t('featureTitle4')} 
              description={t('featureDesc4')}
            />
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              {t('pricingTitle')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your coaching business
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard 
              title={t('soloTitle')} 
              price={locale === 'en' ? t('soloPrice') : t('soloPrice')} 
              description={t('soloDesc')} 
              features={[
                "Up to 30 clients",
                "Session scheduling",
                "Program management",
                "Basic analytics",
                "Invoicing"
              ]}
              buttonText={t('getStarted')}
            />
            
            <PricingCard 
              title={t('firmTitle')} 
              price={locale === 'en' ? t('firmPrice') : t('firmPrice')} 
              description={t('firmDesc')} 
              features={[
                "Unlimited clients",
                "Team management",
                "Custom branding",
                "Advanced reporting",
                "Multi-user access"
              ]}
              buttonText={t('getStarted')}
              highlighted
            />
            
            <PricingCard 
              title={t('enterpriseTitle')} 
              price={locale === 'en' ? t('enterprisePrice') : t('enterprisePrice')} 
              description={t('enterpriseDesc')} 
              features={[
                "All Firm features",
                "AI insights",
                "API access",
                "Dedicated support",
                "Custom integrations"
              ]}
              buttonText={t('contactUs')}
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-forest-600 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Ready to elevate your coaching practice?
          </h2>
          <p className="text-xl text-forest-100 max-w-2xl mx-auto mb-10">
            Join thousands of coaches who are growing their business with Coachlytic
          </p>
          <Button size="lg" className="bg-white text-forest-600 hover:bg-forest-50 text-lg px-8 py-6 h-auto" asChild>
            <Link to="/signup">
              {t('getStarted')} - {t('free')} 14-day trial
            </Link>
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-forest-500 text-white rounded-lg p-2 flex items-center justify-center">
                  <span className="text-lg font-bold">C</span>
                </div>
                <h3 className="text-xl font-display font-semibold ml-2 text-white">Coachlytic</h3>
              </div>
              <p className="mb-4">Elevate your coaching practice with our powerful platform.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Integration</a></li>
                <li><a href="#" className="hover:text-white">Testimonials</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
                <li><a href="#" className="hover:text-white">Coaching Resources</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2025 Coachlytic. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="p-6 bg-gray-50 rounded-lg">
    <div className="mb-4 inline-block p-3 bg-forest-100 rounded-lg">
      {icon}
    </div>
    <h3 className="text-xl font-display font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  highlighted?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ 
  title, 
  price, 
  description, 
  features, 
  buttonText,
  highlighted = false 
}) => {
  const { t } = useI18n();
  
  return (
    <div className={`rounded-lg overflow-hidden ${
      highlighted 
        ? 'border-2 border-forest-500 shadow-lg transform scale-105 -mt-4' 
        : 'border border-gray-200'
    }`}>
      <div className={`p-6 ${highlighted ? 'bg-forest-50' : 'bg-white'}`}>
        <h3 className="text-xl font-display font-semibold mb-2">{title}</h3>
        <div className="mb-4">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-gray-600">{t('perMonth')}</span>
        </div>
        <p className="text-gray-600 mb-6">{description}</p>
        <Button 
          className={`w-full ${
            highlighted 
              ? 'bg-forest-500 hover:bg-forest-600' 
              : 'bg-gray-800 hover:bg-gray-700'
          }`}
          asChild
        >
          <Link to="/signup">{buttonText}</Link>
        </Button>
      </div>
      <div className="p-6 bg-gray-50 border-t border-gray-200">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckIcon className="h-5 w-5 text-forest-500 mr-2 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LandingPage;
