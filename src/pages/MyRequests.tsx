import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import StatusBadge from "@/components/ui/status-badge";
import { 
  Search, 
  Filter, 
  PlusCircle, 
  Calendar, 
  Clock, 
  CheckCircle2,
  Eye,
  MoreHorizontal
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetchRequests } from "@/api/mockApi";

export default function MyRequests() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const data = await fetchRequests();
        setRequests(data);
      } catch (error) {
        console.error('Error loading requests:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadRequests();
  }, []);

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || request.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      submitted: "bg-gray-100 text-gray-700",
      reviewing: "bg-blue-100 text-blue-700", 
      accepted: "bg-yellow-100 text-yellow-700",
      completed: "bg-green-100 text-green-700",
      rejected: "bg-red-100 text-red-700",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  const getUrgencyColor = (urgency: string) => {
    const colors = {
      low: "bg-green-100 text-green-700 border-green-200",
      medium: "bg-yellow-100 text-yellow-700 border-yellow-200", 
      high: "bg-red-100 text-red-700 border-red-200",
    };
    return colors[urgency.toLowerCase() as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Requests</h1>
          <p className="text-gray-600">Track your custom agent requests</p>
        </div>
        <Link to="/requests">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <PlusCircle className="w-4 h-4 mr-2" />
            New Request
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <Input
            placeholder="Search requests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex space-x-2">
          {["all", "submitted", "reviewing", "accepted", "completed", "rejected"].map((status) => (
            <Button
              key={status}
              variant={filterStatus === status ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus(status)}
              className="capitalize"
            >
              {status === "all" ? "All" : status}
            </Button>
          ))}
        </div>
      </div>

      {/* Requests List */}
      {filteredRequests.length > 0 ? (
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <Card key={request.id} className="hover-glow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{request.name}</h3>
                      <StatusBadge status={request.status} />
                      {request.urgency && (
                        <Badge className={getUrgencyColor(request.urgency)}>
                          {request.urgency} Priority
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 mb-3 line-clamp-2">{request.description}</p>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Submitted {new Date(request.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="font-medium">Category:</span>
                        <span>{request.category}</span>
                      </div>
                      {request.budget && (
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">Budget:</span>
                          <span>${request.budget}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      {request.status === 'completed' && (
                        <DropdownMenuItem>
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          View Agent
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-red-600">
                        Cancel Request
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Progress Steps */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4">
                    {["submitted", "reviewing", "accepted", "completed"].map((step, index) => {
                      const isActive = ["submitted", "reviewing", "accepted", "completed"].indexOf(request.status) >= index;
                      const isCurrent = request.status === step;
                      
                      return (
                        <div key={step} className="flex items-center">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            isActive 
                              ? isCurrent 
                                ? 'border-purple-600 bg-purple-600 text-white' 
                                : 'border-green-500 bg-green-500 text-white'
                              : 'border-gray-300 bg-white'
                          }`}>
                            {isActive && !isCurrent ? (
                              <CheckCircle2 className="w-3 h-3" />
                            ) : (
                              <span className="text-xs font-medium">{index + 1}</span>
                            )}
                          </div>
                          <span className={`ml-2 text-xs font-medium capitalize ${
                            isActive ? 'text-gray-900' : 'text-gray-400'
                          }`}>
                            {step}
                          </span>
                          {index < 3 && (
                            <div className={`w-8 h-0.5 mx-3 ${
                              ["submitted", "reviewing", "accepted", "completed"].indexOf(request.status) > index
                                ? 'bg-green-500'
                                : 'bg-gray-200'
                            }`}></div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {request.status === 'completed' && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="text-green-800 font-medium">
                          Your agent is ready! 🎉
                        </span>
                      </div>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        View Agent
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <PlusCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No requests found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery || filterStatus !== "all" 
                ? "Try adjusting your search or filters"
                : "You haven't submitted any custom agent requests yet"
              }
            </p>
            <Link to="/requests">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Create Your First Request
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}