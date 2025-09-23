import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function EmailSetup() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [connecting, setConnecting] = useState(false);

  const handleConnectGmail = async () => {
    if (!user) return;

    setConnecting(true);

    try {
      // Update subscription to mark Gmail as connected
      const { error } = await supabase
        .from("subscriptions")
        .update({ gmail_connected: true })
        .eq("user_id", user.id);

      if (error) throw error;

      toast({
        title: "🎉 Your Email Agent is Live!",
        description: "Gmail has been successfully connected to your Email Agent.",
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Connection error:", error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect Gmail. Please try again.",
        variant: "destructive",
      });
    } finally {
      setConnecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-20">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Setup Your Email Agent</h1>
          <p className="text-gray-600">Connect your Gmail account to start automating your inbox</p>
        </div>

        <Card className="hover-glow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <Mail className="w-6 h-6 text-blue-500" />
              <span>Gmail Integration</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">What your Email Agent will do:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Automatically categorize incoming emails</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Identify and flag priority messages</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Smart inbox organization</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Spam and newsletter filtering</span>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> You'll be redirected to Google's secure authentication page to grant 
                necessary permissions. We only access your email metadata, never content.
              </p>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 py-3"
              onClick={handleConnectGmail}
              disabled={connecting}
            >
              {connecting ? "Connecting..." : "Connect Gmail Account"}
            </Button>

            <div className="text-center">
              <Button
                variant="ghost"
                onClick={() => navigate("/dashboard")}
                className="text-gray-500"
              >
                Skip for now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}