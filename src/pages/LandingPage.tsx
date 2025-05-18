
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BarChart, Users, Calendar, FileText, ArrowRight } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-forest-600 to-forest-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Elevate Your Coaching Business with Coachlytic
              </h1>
              <p className="text-xl mb-8 text-white/90">
                The all-in-one platform for professional coaches to manage clients, schedule sessions, 
                and track performance — all in one beautiful dashboard.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-lavender-500 hover:bg-lavender-600 text-white rounded-full px-8 py-6 text-lg">
                  <Link to="/auth">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-white text-forest-700 border-white hover:bg-white/90 rounded-full px-8 py-6 text-lg">
                  <Link to="#features">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                <img 
                  src="/placeholder.svg" 
                  alt="Coachlytic Dashboard" 
                  className="w-full" 
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
              Everything You Need to Succeed
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Coachlytic brings all your coaching tools together in one seamless experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-forest-100 p-3 inline-block rounded-lg mb-4">
                <Users className="h-6 w-6 text-forest-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Client Management</h3>
              <p className="text-gray-600">
                Organize client information, track progress, and manage communication in one place.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-lavender-100 p-3 inline-block rounded-lg mb-4">
                <Calendar className="h-6 w-6 text-lavender-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Smart Scheduling</h3>
              <p className="text-gray-600">
                Interactive calendar that makes booking sessions and managing your time effortless.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-forest-100 p-3 inline-block rounded-lg mb-4">
                <FileText className="h-6 w-6 text-forest-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Program Builder</h3>
              <p className="text-gray-600">
                Create and manage coaching programs with customizable packages and pricing.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-lavender-100 p-3 inline-block rounded-lg mb-4">
                <BarChart className="h-6 w-6 text-lavender-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Insightful Analytics</h3>
              <p className="text-gray-600">
                Track performance metrics and gain valuable insights to grow your coaching practice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-lavender-50 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
            Ready to take your coaching to the next level?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of coaches who trust Coachlytic to manage their business.
          </p>
          <Button asChild size="lg" className="bg-forest-600 hover:bg-forest-700 text-white rounded-full px-8 py-6 text-lg">
            <Link to="/auth" className="inline-flex items-center">
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-forest-500 rounded-lg mr-2"></div>
                <span className="text-xl font-bold text-white">Coachlytic</span>
              </div>
              <p className="mt-2 text-gray-400">Empowering coaches, transforming practices.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Product</h3>
                <div className="mt-4 space-y-2">
                  <a href="#" className="block text-gray-300 hover:text-white">Features</a>
                  <a href="#" className="block text-gray-300 hover:text-white">Pricing</a>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Support</h3>
                <div className="mt-4 space-y-2">
                  <a href="#" className="block text-gray-300 hover:text-white">Help Center</a>
                  <a href="#" className="block text-gray-300 hover:text-white">Contact</a>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Legal</h3>
                <div className="mt-4 space-y-2">
                  <a href="#" className="block text-gray-300 hover:text-white">Privacy</a>
                  <a href="#" className="block text-gray-300 hover:text-white">Terms</a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400">&copy; 2025 Coachlytic. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
