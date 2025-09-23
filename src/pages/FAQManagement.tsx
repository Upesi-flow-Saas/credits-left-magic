import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Plus, Upload, Link } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  source: string;
  source_url?: string;
  created_at: string;
}

export default function FAQManagement() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Manual form state
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // URL form state
  const [websiteUrl, setWebsiteUrl] = useState("");

  // CSV upload state
  const [csvFile, setCsvFile] = useState<File | null>(null);

  useEffect(() => {
    if (user) {
      fetchFAQs();
    }
  }, [user]);

  const fetchFAQs = async () => {
    try {
      const { data, error } = await supabase
        .from("faqs")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setFaqs(data || []);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      toast({
        title: "Error",
        description: "Failed to load FAQs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !question.trim() || !answer.trim()) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from("faqs")
        .insert({
          user_id: user.id,
          question: question.trim(),
          answer: answer.trim(),
          source: "manual"
        });

      if (error) throw error;

      toast({
        title: "FAQ Added",
        description: "Your FAQ has been successfully added.",
      });

      setQuestion("");
      setAnswer("");
      fetchFAQs();
    } catch (error) {
      console.error("Error adding FAQ:", error);
      toast({
        title: "Error",
        description: "Failed to add FAQ",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !websiteUrl.trim()) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from("faqs")
        .insert({
          user_id: user.id,
          question: "Website FAQ Import",
          answer: "FAQs will be imported from the provided website URL",
          source: "url",
          source_url: websiteUrl.trim()
        });

      if (error) throw error;

      toast({
        title: "URL Saved",
        description: "Website URL has been saved for FAQ import.",
      });

      setWebsiteUrl("");
      fetchFAQs();
    } catch (error) {
      console.error("Error saving URL:", error);
      toast({
        title: "Error",
        description: "Failed to save URL",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCsvUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !csvFile) return;

    setSaving(true);
    try {
      // Parse CSV file
      const text = await csvFile.text();
      const lines = text.split('\n').filter(line => line.trim());
      
      if (lines.length < 2) {
        throw new Error("CSV file must have at least a header and one data row");
      }

      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      const questionIndex = headers.findIndex(h => h.includes('question'));
      const answerIndex = headers.findIndex(h => h.includes('answer'));

      if (questionIndex === -1 || answerIndex === -1) {
        throw new Error("CSV must contain 'question' and 'answer' columns");
      }

      const faqsToInsert = [];
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        if (values.length > Math.max(questionIndex, answerIndex)) {
          faqsToInsert.push({
            user_id: user.id,
            question: values[questionIndex]?.trim() || "",
            answer: values[answerIndex]?.trim() || "",
            source: "csv"
          });
        }
      }

      if (faqsToInsert.length === 0) {
        throw new Error("No valid FAQ entries found in CSV");
      }

      const { error } = await supabase
        .from("faqs")
        .insert(faqsToInsert);

      if (error) throw error;

      toast({
        title: "CSV Imported",
        description: `Successfully imported ${faqsToInsert.length} FAQs from CSV.`,
      });

      setCsvFile(null);
      fetchFAQs();
    } catch (error) {
      console.error("Error uploading CSV:", error);
      toast({
        title: "Import Failed",
        description: error instanceof Error ? error.message : "Failed to import CSV",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteFAQ = async (id: string) => {
    try {
      const { error } = await supabase
        .from("faqs")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "FAQ Deleted",
        description: "FAQ has been successfully removed.",
      });

      fetchFAQs();
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      toast({
        title: "Error",
        description: "Failed to delete FAQ",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">Loading FAQs...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">FAQ Management</h1>
          <p className="text-gray-600">Manage FAQs for your WhatsApp Agent</p>
        </div>

        <Tabs defaultValue="manual" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            <TabsTrigger value="csv">CSV Upload</TabsTrigger>
            <TabsTrigger value="url">Website URL</TabsTrigger>
          </TabsList>

          <TabsContent value="manual">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Add FAQ Manually</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleManualSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="question">Question</Label>
                    <Input
                      id="question"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="What is your return policy?"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="answer">Answer</Label>
                    <Textarea
                      id="answer"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="We offer a 30-day return policy for all products..."
                      rows={4}
                      required
                    />
                  </div>
                  <Button type="submit" disabled={saving}>
                    {saving ? "Adding..." : "Add FAQ"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="csv">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="w-5 h-5" />
                  <span>Upload CSV File</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">CSV Format Requirements:</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Must contain columns named "question" and "answer"</li>
                      <li>• First row should be headers</li>
                      <li>• Use commas to separate values</li>
                    </ul>
                  </div>
                  
                  <form onSubmit={handleCsvUpload} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="csv">Select CSV File</Label>
                      <Input
                        id="csv"
                        type="file"
                        accept=".csv"
                        onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
                        required
                      />
                    </div>
                    <Button type="submit" disabled={saving || !csvFile}>
                      {saving ? "Importing..." : "Import CSV"}
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="url">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Link className="w-5 h-5" />
                  <span>Import from Website</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUrlSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="url">Website FAQ URL</Label>
                    <Input
                      id="url"
                      type="url"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      placeholder="https://example.com/faq"
                      required
                    />
                    <p className="text-sm text-gray-600">
                      Provide a URL to your existing FAQ page. We'll extract the questions and answers.
                    </p>
                  </div>
                  <Button type="submit" disabled={saving}>
                    {saving ? "Saving..." : "Save URL"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* FAQ List */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Your FAQs ({faqs.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {faqs.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No FAQs added yet</p>
            ) : (
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                        <p className="text-gray-700 mt-1">{faq.answer}</p>
                        <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                          <span className="bg-gray-100 px-2 py-1 rounded">{faq.source}</span>
                          <span>{new Date(faq.created_at).toLocaleDateString()}</span>
                          {faq.source_url && (
                            <a 
                              href={faq.source_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              View Source
                            </a>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteFAQ(faq.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}