
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BarChart, Users, Calendar, FileText, ArrowRight, CheckCircle } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-r from-forest-700 to-forest-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute -top-[30%] -right-[25%] w-[60%] h-[80%] rounded-full bg-lavender-400 blur-[120px]"></div>
          <div className="absolute top-[40%] -left-[10%] w-[50%] h-[60%] rounded-full bg-lavender-500 blur-[100px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0 animate-fade-in">
              <div className="mb-4 inline-flex items-center px-3 py-1.5 text-sm font-medium bg-white/10 text-white/90 backdrop-blur-sm rounded-full">
                <span className="flex h-2 w-2 rounded-full bg-green-400 mr-2"></span>
                Simplified coaching management
              </div>
              
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-balance">
                Elevate Your Coaching Business with <span className="text-lavender-300">Coachlytic</span>
              </h1>
              <p className="text-xl mb-8 text-white/90 max-w-lg text-pretty">
                The all-in-one platform for professional coaches to manage clients, schedule sessions, 
                and track performance — all in one beautiful dashboard.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-lavender-500 hover:bg-lavender-600 text-white rounded-full px-8 py-6 text-lg shadow-lg shadow-lavender-500/20">
                  <Link to="/auth">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 rounded-full px-8 py-6 text-lg">
                  <Link to="#features">Learn More</Link>
                </Button>
              </div>
              
              <div className="mt-8 flex items-center text-sm text-white/70">
                <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                <span>No credit card required</span>
                <span className="mx-2">•</span>
                <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                <span>14-day free trial</span>
              </div>
            </div>
            <div className="md:w-1/2 animate-slide-in">
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-white/20">
                <img 
                  src="/placeholder.svg" 
                  alt="Coachlytic Dashboard" 
                  className="w-full"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white"></div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1.5 text-sm font-medium bg-forest-100 text-forest-800 rounded-full mb-4">
              <span>Features</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
              Everything You Need to Succeed
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto text-pretty">
              Coachlytic brings all your coaching tools together in one seamless experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-all hover-card group">
              <div className="bg-forest-100 p-3 inline-block rounded-lg mb-4 group-hover:bg-forest-200 transition-colors">
                <Users className="h-6 w-6 text-forest-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Client Management</h3>
              <p className="text-gray-600">
                Organize client information, track progress, and manage communication in one place.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-all hover-card group">
              <div className="bg-lavender-100 p-3 inline-block rounded-lg mb-4 group-hover:bg-lavender-200 transition-colors">
                <Calendar className="h-6 w-6 text-lavender-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Smart Scheduling</h3>
              <p className="text-gray-600">
                Interactive calendar that makes booking sessions and managing your time effortless.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-all hover-card group">
              <div className="bg-forest-100 p-3 inline-block rounded-lg mb-4 group-hover:bg-forest-200 transition-colors">
                <FileText className="h-6 w-6 text-forest-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Program Builder</h3>
              <p className="text-gray-600">
                Create and manage coaching programs with customizable packages and pricing.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-all hover-card group">
              <div className="bg-lavender-100 p-3 inline-block rounded-lg mb-4 group-hover:bg-lavender-200 transition-colors">
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

      {/* Testimonial Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1.5 text-sm font-medium bg-lavender-100 text-lavender-800 rounded-full mb-4">
              <span>Testimonials</span>
            </div>
            <h2 className="text-3xl font-display font-bold text-gray-900">
              Loved by coaches worldwide
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-forest-200 flex items-center justify-center text-forest-700 font-medium">AJ</div>
                <div className="ml-3">
                  <p className="font-medium">Alex Johnson</p>
                  <p className="text-sm text-gray-500">Business Coach</p>
                </div>
              </div>
              <p className="text-gray-600">"Coachlytic transformed my coaching practice. The client management system is intuitive and the analytics help me make better decisions."</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-lavender-200 flex items-center justify-center text-lavender-700 font-medium">SL</div>
                <div className="ml-3">
                  <p className="font-medium">Sarah Lee</p>
                  <p className="text-sm text-gray-500">Life Coach</p>
                </div>
              </div>
              <p className="text-gray-600">"The scheduling features saved me hours every week. My clients appreciate the professional experience, and I can focus on coaching instead of admin work."</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-forest-200 flex items-center justify-center text-forest-700 font-medium">MT</div>
                <div className="ml-3">
                  <p className="font-medium">Mark Thompson</p>
                  <p className="text-sm text-gray-500">Executive Coach</p>
                </div>
              </div>
              <p className="text-gray-600">"I've tried many coaching platforms, but Coachlytic offers the perfect balance of features without being overwhelming. It's become essential to my business."</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-lavender-50 to-forest-50 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
            Ready to take your coaching to the next level?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of coaches who trust Coachlytic to manage their business.
          </p>
          <Button asChild size="lg" className="bg-forest-600 hover:bg-forest-700 text-white rounded-full px-8 py-6 text-lg shadow-lg shadow-forest-600/20">
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
            <div className="mb-8 md:mb-0">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-forest-500 rounded-lg mr-2 shadow-lg shadow-forest-500/30"></div>
                <span className="text-xl font-bold text-white">Coachlytic</span>
              </div>
              <p className="mt-2 text-gray-400">Empowering coaches, transforming practices.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Product</h3>
                <div className="mt-4 space-y-3">
                  <a href="#" className="block text-gray-300 hover:text-white transition-colors">Features</a>
                  <a href="#" className="block text-gray-300 hover:text-white transition-colors">Pricing</a>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Support</h3>
                <div className="mt-4 space-y-3">
                  <a href="#" className="block text-gray-300 hover:text-white transition-colors">Help Center</a>
                  <a href="#" className="block text-gray-300 hover:text-white transition-colors">Contact</a>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Legal</h3>
                <div className="mt-4 space-y-3">
                  <a href="#" className="block text-gray-300 hover:text-white transition-colors">Privacy</a>
                  <a href="#" className="block text-gray-300 hover:text-white transition-colors">Terms</a>
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
