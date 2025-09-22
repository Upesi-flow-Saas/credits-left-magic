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
        .eq('user_id', user.id)
        .single();

      if (profileError && profileError.code === 'PGRST116') {
        // Profile doesn't exist, create it
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert({
            user_id: user.id,
            email: user.email!,
            name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
            avatar_url: user.user_metadata?.avatar_url,
            plan: 'free'
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

  // AGENT MANAGEMENT - Using mock data for now
  async fetchAgents() {
    try {
      await this.sleep(600);
      
      // Return mock data until tables are set up
      return [
        {
          id: '1',
          name: 'Email Assistant',
          description: 'Automates email responses and organization',
          icon: '📧',
          category: 'Communication',
          subscriptionStatus: 'not-subscribed',
          status: 'inactive',
          connected: false
        },
        {
          id: '2', 
          name: 'Calendar Manager',
          description: 'Schedules meetings and manages your calendar',
          icon: '📅',
          category: 'Productivity',
          subscriptionStatus: 'not-subscribed', 
          status: 'inactive',
          connected: false
        }
      ];
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

      // Mock subscription for now
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

  // CUSTOM REQUESTS - Mock for now
  async submitCustomRequest(formData: any) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      await this.sleep(800);

      // Mock request submission
      return {
        success: true,
        requestId: 'mock-' + Date.now(),
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
      await this.sleep(600);
      
      // Return mock data for now
      return [];
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
