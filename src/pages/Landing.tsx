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
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your AI Agent</h2>
            <p className="text-xl text-gray-600">Start with the perfect agent for your needs</p>
          </div>

          {/* Single Agent Options */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Single Agent Options</h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {/* Email Agent */}
              <Card className="relative overflow-hidden hover-glow">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Email Agent</h3>
                      <p className="text-gray-600 text-sm">Smart inbox management</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold text-gray-900">$25</span>
                      <span className="text-gray-600 ml-1">/month</span>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6 text-sm">
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">Gmail integration</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">Auto-categorization</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">Priority detection</span>
                    </li>
                  </ul>

                  <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600" data-plan="email">
                    Get Email Agent
                  </Button>
                </CardContent>
              </Card>

              {/* WhatsApp Agent */}
              <Card className="relative overflow-hidden hover-glow">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">WhatsApp Agent</h3>
                      <p className="text-gray-600 text-sm">Smart customer support</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold text-gray-900">$35</span>
                      <span className="text-gray-600 ml-1">/month</span>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6 text-sm">
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">WhatsApp integration</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">AI chat responses</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">FAQ management</span>
                    </li>
                  </ul>

                  <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600" data-plan="whatsapp">
                    Get WhatsApp Agent
                  </Button>
                </CardContent>
              </Card>

              {/* Social Agent */}
              <Card className="relative overflow-hidden hover-glow">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Social Agent</h3>
                      <p className="text-gray-600 text-sm">Social media automation</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold text-gray-900">$30</span>
                      <span className="text-gray-600 ml-1">/month</span>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6 text-sm">
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">Multi-platform posting</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">Content scheduling</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">Analytics tracking</span>
                    </li>
                  </ul>

                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600" data-plan="social">
                    Get Social Agent
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bundled Tiers */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Bundled Tiers</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {/* Tier 1 - Email Only */}
              <Card className="relative overflow-hidden hover-glow">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Tier 1</h3>
                    <p className="text-gray-600 text-sm">Email Starter</p>
                  </div>
                  
                  <div className="text-center mb-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-2xl font-bold text-gray-900">$25</span>
                      <span className="text-gray-600 ml-1">/mo</span>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6 text-sm">
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">Email Agent</span>
                    </li>
                    <li className="flex items-center space-x-2 opacity-50">
                      <span className="w-4 h-4 rounded border-2 border-gray-300"></span>
                      <span className="text-gray-400 line-through">WhatsApp Agent</span>
                    </li>
                    <li className="flex items-center space-x-2 opacity-50">
                      <span className="w-4 h-4 rounded border-2 border-gray-300"></span>
                      <span className="text-gray-400 line-through">Social Agent</span>
                    </li>
                  </ul>

                  <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600" data-plan="tier1">
                    Choose Tier 1
                  </Button>
                </CardContent>
              </Card>

              {/* Tier 2 - Email + WhatsApp */}
              <Card className="relative overflow-hidden hover-glow">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-blue-500"></div>
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Tier 2</h3>
                    <p className="text-gray-600 text-sm">Communication Pro</p>
                  </div>
                  
                  <div className="text-center mb-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-2xl font-bold text-gray-900">$55</span>
                      <span className="text-gray-600 ml-1">/mo</span>
                    </div>
                    <p className="text-xs text-green-600 mt-1">Save $5/month</p>
                  </div>

                  <ul className="space-y-2 mb-6 text-sm">
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">Email Agent</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">WhatsApp Agent</span>
                    </li>
                    <li className="flex items-center space-x-2 opacity-50">
                      <span className="w-4 h-4 rounded border-2 border-gray-300"></span>
                      <span className="text-gray-400 line-through">Social Agent</span>
                    </li>
                  </ul>

                  <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600" data-plan="tier2">
                    Choose Tier 2
                  </Button>
                </CardContent>
              </Card>

              {/* Tier 3 - Email + Social */}
              <Card className="relative overflow-hidden hover-glow">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Tier 3</h3>
                    <p className="text-gray-600 text-sm">Marketing Pro</p>
                  </div>
                  
                  <div className="text-center mb-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-2xl font-bold text-gray-900">$50</span>
                      <span className="text-gray-600 ml-1">/mo</span>
                    </div>
                    <p className="text-xs text-green-600 mt-1">Save $5/month</p>
                  </div>

                  <ul className="space-y-2 mb-6 text-sm">
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">Email Agent</span>
                    </li>
                    <li className="flex items-center space-x-2 opacity-50">
                      <span className="w-4 h-4 rounded border-2 border-gray-300"></span>
                      <span className="text-gray-400 line-through">WhatsApp Agent</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">Social Agent</span>
                    </li>
                  </ul>

                  <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600" data-plan="tier3">
                    Choose Tier 3
                  </Button>
                </CardContent>
              </Card>

              {/* Tier 4 - All Agents */}
              <Card className="relative overflow-hidden hover-glow border-2 border-purple-200">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Best Value
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Tier 4</h3>
                    <p className="text-gray-600 text-sm">Complete Suite</p>
                  </div>
                  
                  <div className="text-center mb-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-2xl font-bold text-gray-900">$80</span>
                      <span className="text-gray-600 ml-1">/mo</span>
                    </div>
                    <p className="text-xs text-green-600 mt-1">Save $10/month</p>
                  </div>

                  <ul className="space-y-2 mb-6 text-sm">
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">Email Agent</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">WhatsApp Agent</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">Social Agent</span>
                    </li>
                  </ul>

                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600" data-plan="tier4">
                    Choose Tier 4
                  </Button>
                </CardContent>
              </Card>
            </div>
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