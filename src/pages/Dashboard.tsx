import { useState, useEffect } from "react";
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
  Activity
} from "lucide-react";
import { fetchDashboardData } from "@/api/mockApi";
import { useAuth } from "@/contexts/AuthContext";

export default function Dashboard() {
  const { profile } = useAuth();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

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

  const { user, stats, recentActivity } = dashboardData;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {profile?.name || 'User'} 👋
          </h1>
          <p className="text-gray-600">Here's what's happening with your AI agents today.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Active Agents */}
        <GradientCard variant="primary" className="text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Active Agents</p>
              <p className="text-3xl font-bold mt-2">{stats.activeAgents}</p>
            </div>
            <Bot className="w-8 h-8 text-purple-200" />
          </div>
        </GradientCard>

        {/* Pending Setup */}
        <GradientCard variant="secondary" className="text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100 text-sm font-medium">Pending Setup</p>
              <p className="text-3xl font-bold mt-2">{stats.pendingSetup}</p>
            </div>
            <Clock className="w-8 h-8 text-pink-200" />
          </div>
        </GradientCard>

        {/* Errors */}
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 text-sm font-medium">Errors</p>
                <p className="text-3xl font-bold text-red-700 mt-2">{stats.errors}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        {/* Total Requests */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Total Requests</p>
                <p className="text-3xl font-bold text-green-700 mt-2">{stats.totalRequests}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Subscription Overview */}
          <Card className="hover-glow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Subscription Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-lg font-semibold text-gray-900">{profile?.plan || 'Free'} Plan</p>
                  <p className="text-gray-600">Renews on {profile?.renewal_date ? new Date(profile.renewal_date).toLocaleDateString() : 'N/A'}</p>
                </div>
                <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                  Upgrade Plan
                </Button>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">Plan Benefits</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
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
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-blue-500" />
                <span>Connection Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
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
        <div className="space-y-6">
          {/* Security Card */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover-glow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Security</h3>
                  <p className="text-sm text-gray-600">Enterprise Grade</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-4">
                Your data is encrypted with AES-256 and stored securely in SOC 2 compliant data centers.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                View Security Details
              </Button>
            </CardContent>
          </Card>

          {/* Tip Card */}
          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 hover-glow float-animation">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Pro Tip</h3>
                  <p className="text-sm text-gray-600">Automation Hack</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-4">
                Submit a custom agent request to unlock more automation possibilities for your workflow.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Create Custom Agent
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="hover-glow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-purple-500" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity: any, index: number) => (
                  <div key={index} className="flex items-center space-x-3 py-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
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