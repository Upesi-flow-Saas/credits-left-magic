import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Calendar, Check, Zap } from "lucide-react";

export default function Billing() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Billing & Subscription</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="hover-glow">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Current Plan</span>
              <Badge className="bg-purple-100 text-purple-700">Pro</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-2xl font-bold">$59/month</p>
                <p className="text-gray-600">Renews on Dec 15, 2024</p>
              </div>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <CreditCard className="w-4 h-4 mr-2" />
                Manage Billing
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-glow">
          <CardHeader>
            <CardTitle>Plan Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {["Unlimited agents", "Priority support", "Custom workflows", "Advanced analytics"].map((benefit) => (
                <div key={benefit} className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}