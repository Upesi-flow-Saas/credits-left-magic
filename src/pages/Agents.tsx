import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/ui/status-badge";
import GradientCard from "@/components/ui/gradient-card";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  Settings, 
  Play, 
  Pause, 
  ExternalLink,
  Filter,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { mockAgents, handleSubscribe } from "@/api/mockApi";
import { useToast } from "@/hooks/use-toast";

export default function Agents() {
  const [agents, setAgents] = useState(mockAgents);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubscribeClick = async (agentId: string) => {
    setLoading(agentId);
    try {
      const result = await handleSubscribe(agentId);
      if (result.success) {
        toast({
          title: "Success!",
          description: result.message,
        });
        // Update agent status
        setAgents(prev => prev.map(agent => 
          agent.id === agentId 
            ? { ...agent, status: 'pending' }
            : agent
        ));
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe to agent",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || agent.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Agents</h1>
          <p className="text-gray-600">Manage and configure your AI automation agents</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
          <Bot className="w-4 h-4 mr-2" />
          Request Custom Agent
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <Input
            placeholder="Search agents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex space-x-2">
          {["all", "active", "pending", "not_subscribed", "error"].map((status) => (
            <Button
              key={status}
              variant={filterStatus === status ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus(status)}
              className="capitalize"
            >
              {status.replace("_", " ")}
            </Button>
          ))}
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <Card key={agent.id} className="hover-glow relative overflow-hidden">
            <div className={`absolute top-0 left-0 right-0 h-1 ${
              agent.status === 'active' ? 'bg-gradient-to-r from-green-500 to-green-600' :
              agent.status === 'pending' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
              agent.status === 'error' ? 'bg-gradient-to-r from-red-500 to-red-600' :
              'bg-gradient-to-r from-gray-400 to-gray-500'
            }`}></div>
            
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{agent.icon}</div>
                  <div>
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                    <Badge variant="outline" className="mt-1">
                      {agent.category}
                    </Badge>
                  </div>
                </div>
                <StatusBadge status={agent.status as any} />
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-gray-600 mb-4 line-clamp-2">{agent.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-2xl font-bold text-gray-900">${agent.price}</span>
                  <span className="text-gray-600 text-sm">/month</span>
                </div>
                {agent.connected && (
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    Connected
                  </Badge>
                )}
              </div>

              <div className="flex space-x-2">
                {agent.status === 'not_subscribed' ? (
                  <Button 
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    onClick={() => handleSubscribeClick(agent.id)}
                    disabled={loading === agent.id}
                  >
                    {loading === agent.id ? "Subscribing..." : "Subscribe"}
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Settings className="w-4 h-4 mr-2" />
                      Configure
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className={agent.status === 'active' ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'}
                    >
                      {agent.status === 'active' ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </Button>
                  </>
                )}
              </div>

              {agent.status === 'error' && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">
                    Connection error. Please check your integration settings.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAgents.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Bot className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No agents found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery || filterStatus !== "all" 
                ? "Try adjusting your search or filters"
                : "Get started by subscribing to your first agent"
              }
            </p>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Browse Available Agents
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}