
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BarChart, Users, Calendar, FileText, ArrowRight, CheckCircle, DollarSign, Clock, TrendingUp, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/layout/Navbar";

const LandingPage = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white py-12 sm:py-16 lg:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
              <div className="space-y-3 lg:space-y-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  {t('landing.hero.title.part1')} <span className="text-forest-600">{t('landing.hero.title.part2')}</span>
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
                  {t('landing.hero.description')}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="bg-forest-600 hover:bg-forest-700 text-white px-6 py-4 sm:px-8 sm:py-6 text-base lg:text-lg w-full sm:w-auto">
                  <Link to="/auth">{t('landing.hero.button.primary')}</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-6 py-4 sm:px-8 sm:py-6 text-base lg:text-lg w-full sm:w-auto">
                  <Link to="#features">{t('landing.hero.button.secondary')}</Link>
                </Button>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600 justify-center lg:justify-start">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  <span>{t('landing.hero.feature1')}</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  <span>{t('landing.hero.feature2')}</span>
                </div>
              </div>
            </div>
            
            <div className="relative order-first lg:order-last">
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                <img 
                  src="/lovable-uploads/41b3e6af-44c1-4f3d-b5bd-c985f7b47d14.png" 
                  alt="Professional coaching session" 
                  className="w-full h-48 sm:h-64 lg:h-80 xl:h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 lg:mb-4">
              {t('landing.features.heading')}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              {t('landing.features.subheading')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="text-center p-4 lg:p-6">
              <div className="bg-forest-100 p-3 lg:p-4 inline-block rounded-xl mb-3 lg:mb-4">
                <Users className="h-6 w-6 lg:h-8 lg:w-8 text-forest-600" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold mb-2 lg:mb-3 text-gray-900">{t('landing.features.clientManagement.title')}</h3>
              <p className="text-sm lg:text-base text-gray-600">
                {t('landing.features.clientManagement.description')}
              </p>
            </div>
            
            <div className="text-center p-4 lg:p-6">
              <div className="bg-lavender-100 p-3 lg:p-4 inline-block rounded-xl mb-3 lg:mb-4">
                <Calendar className="h-6 w-6 lg:h-8 lg:w-8 text-lavender-600" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold mb-2 lg:mb-3 text-gray-900">{t('landing.features.scheduling.title')}</h3>
              <p className="text-sm lg:text-base text-gray-600">
                {t('landing.features.scheduling.description')}
              </p>
            </div>
            
            <div className="text-center p-4 lg:p-6">
              <div className="bg-forest-100 p-3 lg:p-4 inline-block rounded-xl mb-3 lg:mb-4">
                <FileText className="h-6 w-6 lg:h-8 lg:w-8 text-forest-600" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold mb-2 lg:mb-3 text-gray-900">{t('landing.features.program.title')}</h3>
              <p className="text-sm lg:text-base text-gray-600">
                {t('landing.features.program.description')}
              </p>
            </div>
            
            <div className="text-center p-4 lg:p-6">
              <div className="bg-lavender-100 p-3 lg:p-4 inline-block rounded-xl mb-3 lg:mb-4">
                <BarChart className="h-6 w-6 lg:h-8 lg:w-8 text-lavender-600" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold mb-2 lg:mb-3 text-gray-900">{t('landing.features.analytics.title')}</h3>
              <p className="text-sm lg:text-base text-gray-600">
                {t('landing.features.analytics.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 lg:mb-4">
              {t('landing.benefits.heading')}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              {t('landing.benefits.subheading')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm">
              <div className="bg-blue-100 p-2 lg:p-3 inline-block rounded-lg mb-3 lg:mb-4">
                <Clock className="h-5 w-5 lg:h-6 lg:w-6 text-blue-600" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold mb-2 lg:mb-3 text-gray-900">{t('landing.benefits.efficiency.title')}</h3>
              <p className="text-sm lg:text-base text-gray-600">
                {t('landing.benefits.efficiency.description')}
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm">
              <div className="bg-green-100 p-2 lg:p-3 inline-block rounded-lg mb-3 lg:mb-4">
                <TrendingUp className="h-5 w-5 lg:h-6 lg:w-6 text-green-600" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold mb-2 lg:mb-3 text-gray-900">{t('landing.benefits.engagement.title')}</h3>
              <p className="text-sm lg:text-base text-gray-600">
                {t('landing.benefits.engagement.description')}
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm">
              <div className="bg-purple-100 p-2 lg:p-3 inline-block rounded-lg mb-3 lg:mb-4">
                <Shield className="h-5 w-5 lg:h-6 lg:w-6 text-purple-600" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold mb-2 lg:mb-3 text-gray-900">{t('landing.benefits.delivery.title')}</h3>
              <p className="text-sm lg:text-base text-gray-600">
                {t('landing.benefits.delivery.description')}
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm">
              <div className="bg-orange-100 p-2 lg:p-3 inline-block rounded-lg mb-3 lg:mb-4">
                <DollarSign className="h-5 w-5 lg:h-6 lg:w-6 text-orange-600" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold mb-2 lg:mb-3 text-gray-900">{t('landing.benefits.financial.title')}</h3>
              <p className="text-sm lg:text-base text-gray-600">
                {t('landing.benefits.financial.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 lg:mb-4">
              {t('landing.pricing.heading')}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              {t('landing.pricing.subheading')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 lg:p-8">
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">{t('landing.pricing.basic.title')}</h3>
              <div className="mb-4 lg:mb-6">
                <span className="text-2xl lg:text-3xl font-bold text-gray-900">{t('landing.pricing.basic.price')}</span>
                <span className="text-gray-600">/{t('landing.pricing.basic.period')}</span>
              </div>
              <ul className="space-y-2 lg:space-y-3 mb-6 lg:mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                  <span className="text-sm lg:text-base text-gray-600">{t('landing.pricing.basic.feature1')}</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                  <span className="text-sm lg:text-base text-gray-600">{t('landing.pricing.basic.feature2')}</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                  <span className="text-sm lg:text-base text-gray-600">{t('landing.pricing.basic.feature3')}</span>
                </li>
              </ul>
              <Button className="w-full" variant="outline">
                {t('landing.pricing.basic.button')}
              </Button>
            </div>

            {/* Pro Plan */}
            <div className="bg-white border-2 border-forest-500 rounded-xl p-6 lg:p-8 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-forest-500 text-white px-3 lg:px-4 py-1 rounded-full text-xs lg:text-sm font-medium">
                  {t('landing.pricing.pro.badge')}
                </span>
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">{t('landing.pricing.pro.title')}</h3>
              <div className="mb-4 lg:mb-6">
                <span className="text-2xl lg:text-3xl font-bold text-gray-900">{t('landing.pricing.pro.price')}</span>
                <span className="text-gray-600">/{t('landing.pricing.pro.period')}</span>
              </div>
              <ul className="space-y-2 lg:space-y-3 mb-6 lg:mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                  <span className="text-sm lg:text-base text-gray-600">{t('landing.pricing.pro.feature1')}</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                  <span className="text-sm lg:text-base text-gray-600">{t('landing.pricing.pro.feature2')}</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                  <span className="text-sm lg:text-base text-gray-600">{t('landing.pricing.pro.feature3')}</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                  <span className="text-sm lg:text-base text-gray-600">{t('landing.pricing.pro.feature4')}</span>
                </li>
              </ul>
              <Button className="w-full bg-forest-600 hover:bg-forest-700">
                {t('landing.pricing.pro.button')}
              </Button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 lg:p-8">
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">{t('landing.pricing.enterprise.title')}</h3>
              <div className="mb-4 lg:mb-6">
                <span className="text-2xl lg:text-3xl font-bold text-gray-900">{t('landing.pricing.enterprise.price')}</span>
              </div>
              <ul className="space-y-2 lg:space-y-3 mb-6 lg:mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                  <span className="text-sm lg:text-base text-gray-600">{t('landing.pricing.enterprise.feature1')}</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                  <span className="text-sm lg:text-base text-gray-600">{t('landing.pricing.enterprise.feature2')}</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                  <span className="text-sm lg:text-base text-gray-600">{t('landing.pricing.enterprise.feature3')}</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                  <span className="text-sm lg:text-base text-gray-600">{t('landing.pricing.enterprise.feature4')}</span>
                </li>
              </ul>
              <Button className="w-full" variant="outline">
                {t('landing.pricing.enterprise.button')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {t('landing.testimonials.heading')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-3 lg:mb-4">
                <div className="h-8 w-8 lg:h-10 lg:w-10 rounded-full bg-forest-200 flex items-center justify-center text-forest-700 font-medium text-sm lg:text-base">AJ</div>
                <div className="ml-3">
                  <p className="font-medium text-sm lg:text-base">{t('landing.testimonials.person1.name')}</p>
                  <p className="text-xs lg:text-sm text-gray-500">{t('landing.testimonials.person1.role')}</p>
                </div>
              </div>
              <p className="text-sm lg:text-base text-gray-600">{t('landing.testimonials.person1.quote')}</p>
            </div>
            
            <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-3 lg:mb-4">
                <div className="h-8 w-8 lg:h-10 lg:w-10 rounded-full bg-lavender-200 flex items-center justify-center text-lavender-700 font-medium text-sm lg:text-base">SL</div>
                <div className="ml-3">
                  <p className="font-medium text-sm lg:text-base">{t('landing.testimonials.person2.name')}</p>
                  <p className="text-xs lg:text-sm text-gray-500">{t('landing.testimonials.person2.role')}</p>
                </div>
              </div>
              <p className="text-sm lg:text-base text-gray-600">{t('landing.testimonials.person2.quote')}</p>
            </div>
            
            <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-3 lg:mb-4">
                <div className="h-8 w-8 lg:h-10 lg:w-10 rounded-full bg-forest-200 flex items-center justify-center text-forest-700 font-medium text-sm lg:text-base">MT</div>
                <div className="ml-3">
                  <p className="font-medium text-sm lg:text-base">{t('landing.testimonials.person3.name')}</p>
                  <p className="text-xs lg:text-sm text-gray-500">{t('landing.testimonials.person3.role')}</p>
                </div>
              </div>
              <p className="text-sm lg:text-base text-gray-600">{t('landing.testimonials.person3.quote')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-forest-600 to-forest-700 py-12 sm:py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 lg:mb-6">
            {t('landing.cta.heading')}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-forest-100 mb-6 lg:mb-8 max-w-2xl mx-auto">
            {t('landing.cta.subheading')}
          </p>
          <Button asChild size="lg" className="bg-white text-forest-600 hover:bg-gray-100 px-6 py-4 sm:px-8 sm:py-6 text-base lg:text-lg">
            <Link to="/auth" className="inline-flex items-center">
              {t('landing.cta.button')} <ArrowRight className="ml-2 h-4 w-4 lg:h-5 lg:w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="col-span-1 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-3 lg:mb-4">
                <div className="h-6 w-6 lg:h-8 lg:w-8 bg-forest-500 rounded-lg mr-2"></div>
                <span className="text-lg lg:text-xl font-bold text-white">{t('app.name')}</span>
              </div>
              <p className="text-sm lg:text-base text-gray-400">{t('landing.footer.slogan')}</p>
            </div>
            <div>
              <h3 className="text-xs lg:text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3 lg:mb-4">{t('landing.footer.product')}</h3>
              <div className="space-y-2 lg:space-y-3">
                <a href="#features" className="block text-sm lg:text-base text-gray-300 hover:text-white transition-colors">{t('landing.footer.features')}</a>
                <a href="#pricing" className="block text-sm lg:text-base text-gray-300 hover:text-white transition-colors">{t('landing.footer.pricing')}</a>
              </div>
            </div>
            <div>
              <h3 className="text-xs lg:text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3 lg:mb-4">{t('landing.footer.support')}</h3>
              <div className="space-y-2 lg:space-y-3">
                <a href="#" className="block text-sm lg:text-base text-gray-300 hover:text-white transition-colors">{t('landing.footer.helpCenter')}</a>
                <a href="#" className="block text-sm lg:text-base text-gray-300 hover:text-white transition-colors">{t('landing.footer.contact')}</a>
              </div>
            </div>
            <div>
              <h3 className="text-xs lg:text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3 lg:mb-4">{t('landing.footer.legal')}</h3>
              <div className="space-y-2 lg:space-y-3">
                <a href="#" className="block text-sm lg:text-base text-gray-300 hover:text-white transition-colors">{t('landing.footer.privacy')}</a>
                <a href="#" className="block text-sm lg:text-base text-gray-300 hover:text-white transition-colors">{t('landing.footer.terms')}</a>
              </div>
            </div>
          </div>
          <div className="mt-6 lg:mt-8 border-t border-gray-700 pt-6 lg:pt-8 text-center">
            <p className="text-xs lg:text-sm text-gray-400">{t('landing.footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
