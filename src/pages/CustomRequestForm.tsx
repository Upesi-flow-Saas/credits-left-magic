import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  PlusCircle, 
  Upload, 
  X, 
  Zap, 
  Clock, 
  DollarSign,
  FileText,
  Lightbulb
} from "lucide-react";
import { submitCustomRequest } from "@/api/mockApi";
import { useToast } from "@/hooks/use-toast";

const categories = [
  "Email Management",
  "Calendar & Scheduling", 
  "Social Media",
  "Content Creation",
  "Data Analysis",
  "Customer Support",
  "Finance & Accounting",
  "Project Management",
  "Marketing Automation",
  "Other"
];

const urgencyLevels = [
  { value: "low", label: "Low - 2-4 weeks", color: "bg-green-100 text-green-700 border-green-200" },
  { value: "medium", label: "Medium - 1-2 weeks", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  { value: "high", label: "High - 3-7 days", color: "bg-red-100 text-red-700 border-red-200" },
];

export default function CustomRequestForm() {
  const [formData, setFormData] = useState({
    agentName: "",
    description: "",
    category: "",
    urgency: "",
    budget: "",
    requirements: [] as string[],
  });
  const [currentRequirement, setCurrentRequirement] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const addRequirement = () => {
    if (currentRequirement.trim()) {
      setFormData(prev => ({
        ...prev,
        requirements: [...prev.requirements, currentRequirement.trim()]
      }));
      setCurrentRequirement("");
    }
  };

  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await submitCustomRequest({
        ...formData,
        files: files.map(f => f.name),
      });
      
      if (result.success) {
        toast({
          title: "Request Submitted! 🎉",
          description: result.message,
        });
        navigate("/my-requests");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Request Custom Agent</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Describe your unique automation needs and our team will build a custom AI agent just for you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Main Form */}
          <div className="space-y-6">
            <Card className="hover-glow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  <span>Agent Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="agentName">Agent Name *</Label>
                  <Input
                    id="agentName"
                    placeholder="e.g., LinkedIn Auto-Poster"
                    value={formData.agentName}
                    onChange={(e) => setFormData({ ...formData, agentName: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what you want this agent to do, what triggers it should respond to, and what actions it should take..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="hover-glow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span>Requirements</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Specific Requirements</Label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add a requirement..."
                      value={currentRequirement}
                      onChange={(e) => setCurrentRequirement(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addRequirement())}
                    />
                    <Button type="button" onClick={addRequirement} size="sm">
                      <PlusCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {formData.requirements.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm">Added Requirements:</Label>
                    <div className="space-y-2">
                      {formData.requirements.map((req, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                          <span className="text-sm">{req}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeRequirement(index)}
                            className="h-6 w-6 p-0"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="files">Supporting Files (Optional)</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-purple-300 transition-colors">
                    <input
                      id="files"
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                    />
                    <label htmlFor="files" className="cursor-pointer flex flex-col items-center space-y-2">
                      <Upload className="w-8 h-8 text-gray-400" />
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-700">Upload files</p>
                        <p className="text-xs text-gray-500">PDF, DOC, images up to 10MB</p>
                      </div>
                    </label>
                  </div>

                  {files.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                          <span className="text-sm truncate">{file.name}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="h-6 w-6 p-0"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="hover-glow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  <span>Timeline & Budget</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Urgency Level *</Label>
                  <Select value={formData.urgency} onValueChange={(value) => setFormData({ ...formData, urgency: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      {urgencyLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          <div className="flex items-center space-x-2">
                            <span>{level.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formData.urgency && (
                    <Badge className={`mt-2 ${urgencyLevels.find(l => l.value === formData.urgency)?.color}`}>
                      {urgencyLevels.find(l => l.value === formData.urgency)?.label}
                    </Badge>
                  )}
                </div>

                <div>
                  <Label htmlFor="budget">Budget Range (USD)</Label>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <Input
                      id="budget"
                      placeholder="e.g., 500-1000"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Optional: Help us understand your budget expectations
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover-glow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Pro Tips</h3>
                    <p className="text-sm text-gray-600">For better results</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Be specific about triggers and actions</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Include examples if possible</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Mention integrations needed</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg py-3"
              disabled={loading || !formData.agentName || !formData.description || !formData.category}
            >
              {loading ? "Submitting..." : "Submit Request"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}