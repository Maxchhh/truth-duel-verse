export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      claims: {
        Row: {
          category: string
          created_at: string
          creator_id: string
          creator_stake: number | null
          deadline: string
          description: string | null
          false_stake: number | null
          false_votes: number | null
          id: string
          is_creator_moderated: boolean | null
          outcome: boolean | null
          required_veri_stake: number | null
          resolution_method: string
          resolved_at: string | null
          status: string | null
          title: string
          total_volume: number | null
          true_stake: number | null
          true_votes: number | null
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          creator_id: string
          creator_stake?: number | null
          deadline: string
          description?: string | null
          false_stake?: number | null
          false_votes?: number | null
          id?: string
          is_creator_moderated?: boolean | null
          outcome?: boolean | null
          required_veri_stake?: number | null
          resolution_method: string
          resolved_at?: string | null
          status?: string | null
          title: string
          total_volume?: number | null
          true_stake?: number | null
          true_votes?: number | null
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          creator_id?: string
          creator_stake?: number | null
          deadline?: string
          description?: string | null
          false_stake?: number | null
          false_votes?: number | null
          id?: string
          is_creator_moderated?: boolean | null
          outcome?: boolean | null
          required_veri_stake?: number | null
          resolution_method?: string
          resolved_at?: string | null
          status?: string | null
          title?: string
          total_volume?: number | null
          true_stake?: number | null
          true_votes?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "claims_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      duels: {
        Row: {
          challenged_id: string | null
          challenger_id: string
          challenger_side: boolean
          created_at: string
          id: string
          outcome: boolean | null
          resolved_at: string | null
          stake_amount: number
          statement: string
          status: string | null
        }
        Insert: {
          challenged_id?: string | null
          challenger_id: string
          challenger_side: boolean
          created_at?: string
          id?: string
          outcome?: boolean | null
          resolved_at?: string | null
          stake_amount: number
          statement: string
          status?: string | null
        }
        Update: {
          challenged_id?: string | null
          challenger_id?: string
          challenger_side?: boolean
          created_at?: string
          id?: string
          outcome?: boolean | null
          resolved_at?: string | null
          stake_amount?: number
          statement?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "duels_challenged_id_fkey"
            columns: ["challenged_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "duels_challenger_id_fkey"
            columns: ["challenger_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          predictions_count: number | null
          total_volume: number | null
          truth_score: number | null
          updated_at: string
          user_id: string
          username: string | null
          veri_balance: number | null
          wallet_address: string | null
          win_rate: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          predictions_count?: number | null
          total_volume?: number | null
          truth_score?: number | null
          updated_at?: string
          user_id: string
          username?: string | null
          veri_balance?: number | null
          wallet_address?: string | null
          win_rate?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          predictions_count?: number | null
          total_volume?: number | null
          truth_score?: number | null
          updated_at?: string
          user_id?: string
          username?: string | null
          veri_balance?: number | null
          wallet_address?: string | null
          win_rate?: number | null
        }
        Relationships: []
      }
      resolutions: {
        Row: {
          claim_id: string
          created_at: string
          dispute_count: number | null
          id: string
          oracle_signature: string | null
          outcome: boolean
          resolved_by: string | null
        }
        Insert: {
          claim_id: string
          created_at?: string
          dispute_count?: number | null
          id?: string
          oracle_signature?: string | null
          outcome: boolean
          resolved_by?: string | null
        }
        Update: {
          claim_id?: string
          created_at?: string
          dispute_count?: number | null
          id?: string
          oracle_signature?: string | null
          outcome?: boolean
          resolved_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resolutions_claim_id_fkey"
            columns: ["claim_id"]
            isOneToOne: false
            referencedRelation: "claims"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resolutions_resolved_by_fkey"
            columns: ["resolved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      votes: {
        Row: {
          claim_id: string
          created_at: string
          id: string
          side: boolean
          stake_amount: number
          transaction_signature: string | null
          user_id: string
        }
        Insert: {
          claim_id: string
          created_at?: string
          id?: string
          side: boolean
          stake_amount: number
          transaction_signature?: string | null
          user_id: string
        }
        Update: {
          claim_id?: string
          created_at?: string
          id?: string
          side?: boolean
          stake_amount?: number
          transaction_signature?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "votes_claim_id_fkey"
            columns: ["claim_id"]
            isOneToOne: false
            referencedRelation: "claims"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "votes_user_id_fkey"
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
