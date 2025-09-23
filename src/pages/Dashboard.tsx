import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import GradientCard from "@/components/ui/gradient-card";
import StatusBadge from "@/components/ui/status-badge";
import { 
  Bot, 
  Calendar, 
  Mail, 
  Shield, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Lightbulb,
  Activity,
  Settings,
  Sparkles
} from "lucide-react";
import { fetchDashboardData } from "@/api/mockApi";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

export default function Dashboard() {
  const navigate = useNavigate();
  const { profile, user } = useAuth();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchDashboardData();
        setDashboardData(data);
        
        if (user) {
          const { data: subData } = await supabase
            .from("subscriptions")
            .select("*")
            .eq("user_id", user.id)
            .single();
          setSubscription(subData);
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [user]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const { stats, recentActivity } = dashboardData;

  const getAgentStatus = (agentType: string) => {
    if (!subscription) return 'locked';
    
    const hasAgent = subscription.plan === agentType || 
                    subscription.plan === 'tier4' ||
                    (subscription.plan === 'tier2' && ['email', 'whatsapp'].includes(agentType)) ||
                    (subscription.plan === 'tier3' && ['email', 'social'].includes(agentType));
    
    if (!hasAgent) return 'locked';
    
    if (agentType === 'email' && subscription.gmail_connected) return 'active';
    if (agentType === 'whatsapp' && subscription.whatsapp_connected) return 'active';
    if (agentType === 'social' && subscription.social_connected) return 'active';
    
    return 'needs_setup';
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col space-y-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {profile?.name || 'User'} 👋
          </h1>
          <p className="text-gray-600 text-sm md:text-base">Here's what's happening with your AI agents today.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
        {/* Active Agents */}
        <GradientCard variant="primary" className="text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-xs md:text-sm font-medium">Active Agents</p>
              <p className="text-xl md:text-3xl font-bold mt-1 md:mt-2">{stats.activeAgents}</p>
            </div>
            <Bot className="w-6 h-6 md:w-8 md:h-8 text-purple-200" />
          </div>
        </GradientCard>

        {/* Pending Setup */}
        <GradientCard variant="secondary" className="text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100 text-xs md:text-sm font-medium">Pending Setup</p>
              <p className="text-xl md:text-3xl font-bold mt-1 md:mt-2">{stats.pendingSetup}</p>
            </div>
            <Clock className="w-6 h-6 md:w-8 md:h-8 text-pink-200" />
          </div>
        </GradientCard>

        {/* Errors */}
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 text-xs md:text-sm font-medium">Errors</p>
                <p className="text-xl md:text-3xl font-bold text-red-700 mt-1 md:mt-2">{stats.errors}</p>
              </div>
              <AlertCircle className="w-6 h-6 md:w-8 md:h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        {/* Total Requests */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-xs md:text-sm font-medium">Total Requests</p>
                <p className="text-xl md:text-3xl font-bold text-green-700 mt-1 md:mt-2">{stats.totalRequests}</p>
              </div>
              <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          {/* Agent Cards */}
          <Card className="hover-glow">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2 text-base md:text-lg">
                <Bot className="w-5 h-5 text-purple-500" />
                <span>Your AI Agents</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {/* Email Agent */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Mail className="w-8 h-8 text-blue-500" />
                    <div>
                      <h3 className="font-semibold">Email Agent</h3>
                      <StatusBadge status={getAgentStatus('email') as any} />
                    </div>
                  </div>
                  {getAgentStatus('email') === 'needs_setup' && (
                    <Button size="sm" onClick={() => navigate('/setup/email')} className="w-full">
                      Setup
                    </Button>
                  )}
                  {getAgentStatus('email') === 'locked' && (
                    <Button size="sm" variant="outline" onClick={() => navigate('/pricing')} className="w-full">
                      🔒 Upgrade
                    </Button>
                  )}
                </div>

                {/* WhatsApp Agent */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 text-green-500">
                      <svg fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">WhatsApp Agent</h3>
                      <StatusBadge status={getAgentStatus('whatsapp') as any} />
                    </div>
                  </div>
                  {getAgentStatus('whatsapp') === 'needs_setup' && (
                    <Button size="sm" onClick={() => navigate('/setup/whatsapp')} className="w-full">
                      Setup
                    </Button>
                  )}
                  {getAgentStatus('whatsapp') === 'locked' && (
                    <Button size="sm" variant="outline" onClick={() => navigate('/pricing')} className="w-full">
                      🔒 Upgrade
                    </Button>
                  )}
                </div>

                {/* Social Agent */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Sparkles className="w-8 h-8 text-purple-500" />
                    <div>
                      <h3 className="font-semibold">Social Agent</h3>
                      <StatusBadge status={getAgentStatus('social') as any} />
                    </div>
                  </div>
                  {getAgentStatus('social') === 'needs_setup' && (
                    <Button size="sm" onClick={() => navigate('/setup/social')} className="w-full">
                      Setup
                    </Button>
                  )}
                  {getAgentStatus('social') === 'locked' && (
                    <Button size="sm" variant="outline" onClick={() => navigate('/pricing')} className="w-full">
                      🔒 Upgrade
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Subscription Overview */}
          <Card className="hover-glow">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2 text-base md:text-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Subscription Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-3 sm:space-y-0">
                <div>
                  <p className="text-base md:text-lg font-semibold text-gray-900">{profile?.plan || 'Free'} Plan</p>
                  <p className="text-gray-600 text-sm">Renews on {profile?.renewal_date ? new Date(profile.renewal_date).toLocaleDateString() : 'N/A'}</p>
                </div>
                <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-sm">
                  Upgrade Plan
                </Button>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">Plan Benefits</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Unlimited agents</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Priority support</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Connection Status */}
          <Card className="hover-glow">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2 text-base md:text-lg">
                <Shield className="w-5 h-5 text-blue-500" />
                <span>Connection Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Gmail</p>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600">Connected</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Calendar</p>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600">Connected</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-4 md:space-y-6">
          {/* Security Card */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover-glow">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm md:text-base">Security</h3>
                  <p className="text-xs md:text-sm text-gray-600">Enterprise Grade</p>
                </div>
              </div>
              <p className="text-xs md:text-sm text-gray-700 mb-4">
                Your data is encrypted with AES-256 and stored securely in SOC 2 compliant data centers.
              </p>
              <Button variant="outline" size="sm" className="w-full text-xs md:text-sm">
                View Security Details
              </Button>
            </CardContent>
          </Card>

          {/* Tip Card */}
          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 hover-glow float-animation">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm md:text-base">Pro Tip</h3>
                  <p className="text-xs md:text-sm text-gray-600">Automation Hack</p>
                </div>
              </div>
              <p className="text-xs md:text-sm text-gray-700 mb-4">
                Submit a custom agent request to unlock more automation possibilities for your workflow.
              </p>
              <Button variant="outline" size="sm" className="w-full text-xs md:text-sm">
                Create Custom Agent
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="hover-glow">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2 text-base md:text-lg">
                <Activity className="w-5 h-5 text-purple-500" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity: any, index: number) => (
                  <div key={index} className="flex items-center space-x-3 py-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs md:text-sm font-medium text-gray-900 truncate">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}