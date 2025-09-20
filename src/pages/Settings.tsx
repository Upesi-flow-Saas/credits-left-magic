import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { User, Shield, Bell } from "lucide-react";

export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
      
      <div className="space-y-6">
        <Card className="hover-glow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Profile Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Full Name</Label>
                <Input defaultValue="Sarah Johnson" />
              </div>
              <div>
                <Label>Email</Label>
                <Input defaultValue="sarah.johnson@example.com" />
              </div>
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Save Changes
            </Button>
          </CardContent>
        </Card>

        <Card className="hover-glow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Notifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Email notifications", description: "Get notified about agent updates" },
              { label: "Agent alerts", description: "Receive alerts when agents encounter issues" },
              { label: "Weekly reports", description: "Get weekly summary of agent performance" }
            ].map((setting) => (
              <div key={setting.label} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{setting.label}</p>
                  <p className="text-sm text-gray-600">{setting.description}</p>
                </div>
                <Switch />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}