import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Mail, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function Pricing() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);

  const handlePurchase = async (plan: string) => {
    if (!user) {
      navigate("/login");
      return;
    }

    setLoading(plan);

    try {
      // Simulate payment by saving to subscriptions table
      const { error } = await supabase
        .from("subscriptions")
        .insert({
          user_id: user.id,
          plan: plan,
          status: "pending_setup"
        });

      if (error) throw error;

      toast({
        title: "Purchase Successful! 🎉",
        description: `Welcome to ${plan}! Let's set up your agents.`,
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Purchase error:", error);
      toast({
        title: "Purchase Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your AI Agent</h1>
          <p className="text-xl text-gray-600">Start with the perfect agent for your needs</p>
        </div>

        {/* Single Agent Options */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Single Agent Options</h2>
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

                <Button 
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                  onClick={() => handlePurchase("email")}
                  disabled={loading === "email"}
                >
                  {loading === "email" ? "Processing..." : "Get Email Agent"}
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

                <Button 
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  onClick={() => handlePurchase("whatsapp")}
                  disabled={loading === "whatsapp"}
                >
                  {loading === "whatsapp" ? "Processing..." : "Get WhatsApp Agent"}
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

                <Button 
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  onClick={() => handlePurchase("social")}
                  disabled={loading === "social"}
                >
                  {loading === "social" ? "Processing..." : "Get Social Agent"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bundled Tiers */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Bundled Tiers</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Tier 1 */}
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

                <Button 
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                  onClick={() => handlePurchase("tier1")}
                  disabled={loading === "tier1"}
                >
                  {loading === "tier1" ? "Processing..." : "Choose Tier 1"}
                </Button>
              </CardContent>
            </Card>

            {/* Tier 2 */}
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

                <Button 
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                  onClick={() => handlePurchase("tier2")}
                  disabled={loading === "tier2"}
                >
                  {loading === "tier2" ? "Processing..." : "Choose Tier 2"}
                </Button>
              </CardContent>
            </Card>

            {/* Tier 3 */}
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

                <Button 
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  onClick={() => handlePurchase("tier3")}
                  disabled={loading === "tier3"}
                >
                  {loading === "tier3" ? "Processing..." : "Choose Tier 3"}
                </Button>
              </CardContent>
            </Card>

            {/* Tier 4 */}
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

                <Button 
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  onClick={() => handlePurchase("tier4")}
                  disabled={loading === "tier4"}
                >
                  {loading === "tier4" ? "Processing..." : "Choose Tier 4"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}