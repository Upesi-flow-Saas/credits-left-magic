export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      agents: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          features: Json | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          price_monthly: number
          template_data: Json | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          features?: Json | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          price_monthly: number
          template_data?: Json | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          features?: Json | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          price_monthly?: number
          template_data?: Json | null
        }
        Relationships: []
      }
      billing_events: {
        Row: {
          amount: number | null
          created_at: string | null
          currency: string | null
          event_type: string
          id: string
          metadata: Json | null
          status: string | null
          stripe_event_id: string | null
          subscription_id: string | null
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          currency?: string | null
          event_type: string
          id?: string
          metadata?: Json | null
          status?: string | null
          stripe_event_id?: string | null
          subscription_id?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          currency?: string | null
          event_type?: string
          id?: string
          metadata?: Json | null
          status?: string | null
          stripe_event_id?: string | null
          subscription_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "billing_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      custom_agent_requests: {
        Row: {
          additional_files: string[] | null
          admin_notes: string | null
          agent_name: string
          budget_range: string | null
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          n8n_workflow_id: string | null
          status: string | null
          updated_at: string | null
          urgency: string | null
          user_id: string | null
        }
        Insert: {
          additional_files?: string[] | null
          admin_notes?: string | null
          agent_name: string
          budget_range?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          n8n_workflow_id?: string | null
          status?: string | null
          updated_at?: string | null
          urgency?: string | null
          user_id?: string | null
        }
        Update: {
          additional_files?: string[] | null
          admin_notes?: string | null
          agent_name?: string
          budget_range?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          n8n_workflow_id?: string | null
          status?: string | null
          updated_at?: string | null
          urgency?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "custom_agent_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          id: string
          name: string | null
          plan: string | null
          renewal_date: string | null
          role: string | null
          stripe_customer_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          id?: string
          name?: string | null
          plan?: string | null
          renewal_date?: string | null
          role?: string | null
          stripe_customer_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          plan?: string | null
          renewal_date?: string | null
          role?: string | null
          stripe_customer_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      service_connections: {
        Row: {
          connection_data: Json | null
          created_at: string | null
          expires_at: string | null
          id: string
          service_name: string
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          connection_data?: Json | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          service_name: string
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          connection_data?: Json | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          service_name?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_connections_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_agent_subscriptions: {
        Row: {
          agent_id: string | null
          config: Json | null
          connected_services: Json | null
          created_at: string | null
          expires_at: string | null
          id: string
          n8n_workflow_id: string | null
          status: string | null
          stripe_subscription_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          agent_id?: string | null
          config?: Json | null
          connected_services?: Json | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          n8n_workflow_id?: string | null
          status?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          agent_id?: string | null
          config?: Json | null
          connected_services?: Json | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          n8n_workflow_id?: string | null
          status?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_agent_subscriptions_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_agent_subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_executions: {
        Row: {
          created_at: string | null
          error_message: string | null
          execution_data: Json | null
          finished_at: string | null
          id: string
          n8n_execution_id: string | null
          started_at: string | null
          status: string | null
          subscription_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          execution_data?: Json | null
          finished_at?: string | null
          id?: string
          n8n_execution_id?: string | null
          started_at?: string | null
          status?: string | null
          subscription_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          execution_data?: Json | null
          finished_at?: string | null
          id?: string
          n8n_execution_id?: string | null
          started_at?: string | null
          status?: string | null
          subscription_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workflow_executions_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "user_agent_subscriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_executions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
