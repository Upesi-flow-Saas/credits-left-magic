// Mock API Layer for Upesi Hub
// Simulates backend calls with realistic delays

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user data
export const mockUser = {
  id: '1',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@example.com',
  role: 'Owner',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100&h=100&fit=crop&crop=face',
  plan: 'Pro',
  renewalDate: '2024-12-15'
};

// Mock agents data
export const mockAgents = [
  {
    id: 'email-organizer',
    name: 'Personal Email Organizer',
    description: 'Automatically sort and prioritize your inbox using AI',
    category: 'Email',
    status: 'active',
    connected: true,
    price: 29,
    icon: '📧',
    gradient: 'gradient-card-primary'
  },
  {
    id: 'ai-assistant',
    name: 'AI Personal Assistant',
    description: 'Smart calendar management and task automation',
    category: 'Productivity',
    status: 'pending',
    connected: false,
    price: 59,
    icon: '🤖',
    gradient: 'gradient-card-secondary'
  },
  {
    id: 'content-creator',
    name: 'Content Creator Agent',
    description: 'Generate social media posts and blog content',
    category: 'Marketing',
    status: 'not_subscribed',
    connected: false,
    price: 79,
    icon: '✍️',
    gradient: 'gradient-card-accent'
  },
  {
    id: 'data-analyst',
    name: 'Data Analysis Agent',
    description: 'Automated reports and business insights',
    category: 'Analytics',
    status: 'error',
    connected: false,
    price: 99,
    icon: '📊',
    gradient: 'gradient-card-primary'
  }
];

// Mock requests data
export const mockRequests = [
  {
    id: '1',
    name: 'Social Media Scheduler',
    description: 'Automated posting across platforms',
    category: 'Marketing',
    urgency: 'Medium',
    budget: 150,
    status: 'reviewing',
    date: '2024-01-15'
  },
  {
    id: '2',
    name: 'Invoice Generator',
    description: 'Generate and send invoices automatically',
    category: 'Finance',
    urgency: 'High',
    budget: 200,
    status: 'completed',
    date: '2024-01-10'
  },
  {
    id: '3',
    name: 'Meeting Summarizer',
    description: 'AI-powered meeting notes and action items',
    category: 'Productivity',
    urgency: 'Low',
    budget: 100,
    status: 'submitted',
    date: '2024-01-20'
  }
];

// Mock dashboard stats
export const mockDashboardStats = {
  activeAgents: 2,
  pendingSetup: 1,
  errors: 1,
  totalRequests: 8,
  completedRequests: 3,
  connections: {
    gmail: true,
    calendar: true,
    slack: false,
    notion: true
  }
};

// API Functions
export const handleSubscribe = async (agentId: string) => {
  await sleep(1500);
  console.log(`Subscribed to agent: ${agentId}`);
  return { success: true, message: 'Successfully subscribed!' };
};

export const fetchAgentStatus = async (agentId: string) => {
  await sleep(800);
  const agent = mockAgents.find(a => a.id === agentId);
  return agent?.status || 'unknown';
};

export const connectGmail = async () => {
  await sleep(2000);
  console.log('Gmail connection initiated');
  return { success: true, message: 'Gmail connected successfully!' };
};

export const connectCalendar = async () => {
  await sleep(1800);
  console.log('Calendar connection initiated');
  return { success: true, message: 'Calendar connected successfully!' };
};

export const submitCustomRequest = async (formData: any) => {
  await sleep(1200);
  console.log('Custom request submitted:', formData);
  return { 
    success: true, 
    message: 'Custom agent request submitted successfully!',
    requestId: Date.now().toString()
  };
};

export const fetchRequests = async () => {
  await sleep(600);
  return mockRequests;
};

export const fetchBillingInfo = async () => {
  await sleep(500);
  return {
    plan: 'Pro Plan',
    price: 59,
    renewalDate: '2024-12-15',
    paymentMethod: 'Visa ending in 4242'
  };
};

export const fetchDashboardData = async () => {
  await sleep(1000);
  return {
    user: mockUser,
    stats: mockDashboardStats,
    agents: mockAgents,
    recentActivity: [
      { action: 'Subscribed to Email Organizer', time: '2 hours ago' },
      { action: 'Connected Gmail account', time: '1 day ago' },
      { action: 'Completed agent setup', time: '3 days ago' }
    ]
  };
};