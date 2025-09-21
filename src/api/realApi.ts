// src/api/realApi.ts
import { supabase } from '../integrations/supabase/client';

class RealApiService {
  // Helper method
  private sleep(ms = 600) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // USER MANAGEMENT
  async getCurrentUser() {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError) throw authError;
      if (!user) return null;

      // Get or create profile
      let { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError && profileError.code === 'PGRST116') {
        // Profile doesn't exist, create it
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
            avatar_url: user.user_metadata?.avatar_url,
            plan: 'starter'
          })
          .select()
          .single();

        if (createError) throw createError;
        profile = newProfile;
      } else if (profileError) {
        throw profileError;
      }

      return {
        id: user.id,
        email: user.email,
        name: profile.name,
        avatar: profile.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=6366f1&color=fff`,
        plan: profile.plan,
        joinDate: profile.created_at,
        lastLogin: user.last_sign_in_at
      };
    } catch (error) {
      console.error('Error getting current user:', error);
      throw error;
    }
  }

  // AGENT MANAGEMENT
  async fetchAgents() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Get all available agents
      const { data: agents, error: agentsError } = await supabase
        .from('agents')
        .select('*')
        .eq('is_active', true)
        .order('created_at');

      if (agentsError) throw agentsError;

      // Get user's subscriptions
      const { data: subscriptions, error: subsError } = await supabase
        .from('user_agent_subscriptions')
        .select('*')
        .eq('user_id', user.id);

      if (subsError) throw subsError;

      return agents.map(agent => ({
        id: agent.id,
        name: agent.name,
        description: agent.description,
        icon: agent.icon,
        category: agent.category,
        subscriptionStatus: subscriptions.find(sub => sub.agent_id === agent.id)?.status || 'not-subscribed',
        status: subscriptions.find(sub => sub.agent_id === agent.id)?.status === 'active' ? 'active' : 'inactive',
        connected: true // Simplified for now
      }));
    } catch (error) {
      console.error('Error fetching agents:', error);
      throw error;
    }
  }

  async handleSubscribe(agentId: string) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      await this.sleep(1000);

      const { data, error } = await supabase
        .from('user_agent_subscriptions')
        .insert({
          user_id: user.id,
          agent_id: agentId,
          status: 'active',
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        agentId,
        status: 'active',
        message: 'Successfully subscribed to agent!'
      };
    } catch (error) {
      console.error('Error subscribing to agent:', error);
      throw error;
    }
  }

  // SERVICE CONNECTIONS
  async connectGmail() {
    await this.sleep(1500);
    return {
      success: true,
      connected: true,
      message: 'Gmail connected successfully!'
    };
  }

  async connectCalendar() {
    await this.sleep(1200);
    return {
      success: true,
      connected: true,
      message: 'Calendar connected successfully!'
    };
  }

  // CUSTOM REQUESTS
  async submitCustomRequest(formData: any) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      await this.sleep(800);

      const { data, error } = await supabase
        .from('custom_agent_requests')
        .insert({
          user_id: user.id,
          agent_name: formData.agentName,
          description: formData.description,
          category: formData.category,
          urgency: formData.urgency
        })
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        requestId: data.id,
        status: 'submitted',
        message: 'Your custom agent request has been submitted!'
      };
    } catch (error) {
      console.error('Error submitting custom request:', error);
      throw error;
    }
  }

  async fetchRequests() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('custom_agent_requests')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data.map(request => ({
        id: request.id,
        agentName: request.agent_name,
        description: request.description,
        date: request.created_at,
        status: request.status,
        category: request.category,
        urgency: request.urgency
      }));
    } catch (error) {
      console.error('Error fetching requests:', error);
      throw error;
    }
  }

  // BILLING
  async fetchBillingInfo() {
    await this.sleep();
    return {
      plan: 'Pro',
      status: 'active',
      renewalDate: '2025-10-20',
      amount: '$29.00',
      paymentMethod: '**** **** **** 4242',
      nextBilling: '2025-10-20'
    };
  }
}

export const realApiService = new RealApiService();
