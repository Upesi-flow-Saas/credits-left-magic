import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Mail, Calendar, Sparkles, Check, ArrowRight } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Navigation */}
      <nav className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">Upesi Hub</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/login">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-purple-100 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-purple-800 font-medium text-sm">AI-Powered Automation</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Choose your AI Agent and
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {" "}start automating{" "}
            </span>
            instantly
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your workflow with intelligent AI agents that handle your repetitive tasks, 
            so you can focus on what matters most.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your AI Agent</h2>
            <p className="text-xl text-gray-600">Start with the perfect agent for your needs</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Starter Plan */}
            <Card className="relative overflow-hidden hover-glow">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Personal Email Organizer</h3>
                    <p className="text-gray-600">Starter</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900">$29</span>
                    <span className="text-gray-600 ml-1">/month</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Smart inbox organization</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Priority email detection</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Auto-categorization</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Gmail integration</span>
                  </li>
                </ul>

                <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="relative overflow-hidden hover-glow border-2 border-purple-200">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              </div>
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">AI Personal Assistant</h3>
                    <p className="text-gray-600">Pro</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900">$59</span>
                    <span className="text-gray-600 ml-1">/month</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Everything in Starter</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Calendar management</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Task automation</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Priority support</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Custom workflows</span>
                  </li>
                </ul>

                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Upesi Hub?</h2>
            <p className="text-xl text-gray-600">Powerful automation made simple</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Instant Setup</h3>
              <p className="text-gray-600">Get started in minutes with our one-click integrations</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">AI-Powered</h3>
              <p className="text-gray-600">Advanced machine learning adapts to your workflow</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Reliable</h3>
              <p className="text-gray-600">99.9% uptime with enterprise-grade security</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600">© 2024 Upesi Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}