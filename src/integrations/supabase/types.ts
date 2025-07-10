export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      badges: {
        Row: {
          challenge_id: string | null
          description: string | null
          earned_at: string
          id: string
          image_url: string | null
          nft_token_id: string | null
          nft_transaction_hash: string | null
          story: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          challenge_id?: string | null
          description?: string | null
          earned_at?: string
          id?: string
          image_url?: string | null
          nft_token_id?: string | null
          nft_transaction_hash?: string | null
          story?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          challenge_id?: string | null
          description?: string | null
          earned_at?: string
          id?: string
          image_url?: string | null
          nft_token_id?: string | null
          nft_transaction_hash?: string | null
          story?: string | null
          title?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "badges_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "badges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["id"]
          },
        ]
      }
      brand_challenges: {
        Row: {
          badge_image_url: string | null
          brand_id: string
          created_at: string
          description: string
          expires_at: string | null
          id: string
          is_active: boolean | null
          points: number | null
          requirements: string | null
          title: string
        }
        Insert: {
          badge_image_url?: string | null
          brand_id: string
          created_at?: string
          description: string
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          points?: number | null
          requirements?: string | null
          title: string
        }
        Update: {
          badge_image_url?: string | null
          brand_id?: string
          created_at?: string
          description?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          points?: number | null
          requirements?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "brand_challenges_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
        ]
      }
      brand_hours: {
        Row: {
          brand_id: string
          close_time: string | null
          day_of_week: number
          id: string
          is_closed: boolean | null
          open_time: string | null
        }
        Insert: {
          brand_id: string
          close_time?: string | null
          day_of_week: number
          id?: string
          is_closed?: boolean | null
          open_time?: string | null
        }
        Update: {
          brand_id?: string
          close_time?: string | null
          day_of_week?: number
          id?: string
          is_closed?: boolean | null
          open_time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "brand_hours_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
        ]
      }
      brand_qr_codes: {
        Row: {
          brand_id: string
          challenge_id: string | null
          geo_location: Json | null
          id: string
          is_active: boolean | null
          qr_code_url: string
          radius_meters: number | null
          valid_from: string
          valid_until: string | null
        }
        Insert: {
          brand_id: string
          challenge_id?: string | null
          geo_location?: Json | null
          id?: string
          is_active?: boolean | null
          qr_code_url: string
          radius_meters?: number | null
          valid_from?: string
          valid_until?: string | null
        }
        Update: {
          brand_id?: string
          challenge_id?: string | null
          geo_location?: Json | null
          id?: string
          is_active?: boolean | null
          qr_code_url?: string
          radius_meters?: number | null
          valid_from?: string
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "brand_qr_codes_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "brand_qr_codes_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "brand_challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      brand_reviews: {
        Row: {
          brand_id: string
          content: string
          created_at: string
          id: string
          is_public: boolean | null
          photo_url: string | null
          rating: number | null
          user_id: string
        }
        Insert: {
          brand_id: string
          content: string
          created_at?: string
          id?: string
          is_public?: boolean | null
          photo_url?: string | null
          rating?: number | null
          user_id: string
        }
        Update: {
          brand_id?: string
          content?: string
          created_at?: string
          id?: string
          is_public?: boolean | null
          photo_url?: string | null
          rating?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "brand_reviews_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
        ]
      }
      brand_verifications: {
        Row: {
          brand_id: string
          document_type: string
          document_url: string
          feedback: string | null
          id: string
          status: string | null
          submitted_at: string
        }
        Insert: {
          brand_id: string
          document_type: string
          document_url: string
          feedback?: string | null
          id?: string
          status?: string | null
          submitted_at?: string
        }
        Update: {
          brand_id?: string
          document_type?: string
          document_url?: string
          feedback?: string | null
          id?: string
          status?: string | null
          submitted_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "brand_verifications_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
        ]
      }
      brand_visits: {
        Row: {
          badge_unlocked: boolean | null
          brand_id: string
          id: string
          qr_code_id: string | null
          user_id: string
          visited_at: string
        }
        Insert: {
          badge_unlocked?: boolean | null
          brand_id: string
          id?: string
          qr_code_id?: string | null
          user_id: string
          visited_at?: string
        }
        Update: {
          badge_unlocked?: boolean | null
          brand_id?: string
          id?: string
          qr_code_id?: string | null
          user_id?: string
          visited_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "brand_visits_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "brand_visits_qr_code_id_fkey"
            columns: ["qr_code_id"]
            isOneToOne: false
            referencedRelation: "brand_qr_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      brands: {
        Row: {
          badge_id: string | null
          category: string | null
          created_at: string
          description: string | null
          id: string
          is_verified: boolean | null
          location: string | null
          logo_url: string | null
          name: string
          owner_id: string | null
          qr_code_url: string | null
        }
        Insert: {
          badge_id?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_verified?: boolean | null
          location?: string | null
          logo_url?: string | null
          name: string
          owner_id?: string | null
          qr_code_url?: string | null
        }
        Update: {
          badge_id?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_verified?: boolean | null
          location?: string | null
          logo_url?: string | null
          name?: string
          owner_id?: string | null
          qr_code_url?: string | null
        }
        Relationships: []
      }
      Brands: {
        Row: {
          badge_id: string | null
          category: string | null
          created_at: string
          description: string | null
          id: string
          is_verified: boolean | null
          location: string | null
          logo_url: string | null
          name: string | null
          owner_id: string | null
          qr_code_url: string | null
        }
        Insert: {
          badge_id?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_verified?: boolean | null
          location?: string | null
          logo_url?: string | null
          name?: string | null
          owner_id?: string | null
          qr_code_url?: string | null
        }
        Update: {
          badge_id?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_verified?: boolean | null
          location?: string | null
          logo_url?: string | null
          name?: string | null
          owner_id?: string | null
          qr_code_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Brands_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["id"]
          },
        ]
      }
      challenge_completions: {
        Row: {
          challenge_id: string
          completed_at: string
          id: string
          is_verified: boolean | null
          location_proof: Json | null
          photo_proof_url: string | null
          user_id: string
        }
        Insert: {
          challenge_id: string
          completed_at?: string
          id?: string
          is_verified?: boolean | null
          location_proof?: Json | null
          photo_proof_url?: string | null
          user_id: string
        }
        Update: {
          challenge_id?: string
          completed_at?: string
          id?: string
          is_verified?: boolean | null
          location_proof?: Json | null
          photo_proof_url?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "challenge_completions_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "brand_challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      challenge_participations: {
        Row: {
          challenge_id: string | null
          id: string
          joined_at: string
          status: string | null
          user_id: string | null
        }
        Insert: {
          challenge_id?: string | null
          id?: string
          joined_at?: string
          status?: string | null
          user_id?: string | null
        }
        Update: {
          challenge_id?: string | null
          id?: string
          joined_at?: string
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "challenge_participations_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "challenge_participations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["id"]
          },
        ]
      }
      challenges: {
        Row: {
          badge_image_url: string | null
          category: string
          created_at: string
          creator_id: string | null
          description: string
          difficulty: string | null
          featured: boolean | null
          id: string
          participants_count: number | null
          points: number | null
          region: string | null
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          badge_image_url?: string | null
          category: string
          created_at?: string
          creator_id?: string | null
          description: string
          difficulty?: string | null
          featured?: boolean | null
          id?: string
          participants_count?: number | null
          points?: number | null
          region?: string | null
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          badge_image_url?: string | null
          category?: string
          created_at?: string
          creator_id?: string | null
          description?: string
          difficulty?: string | null
          featured?: boolean | null
          id?: string
          participants_count?: number | null
          points?: number | null
          region?: string | null
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "challenges_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["id"]
          },
        ]
      }
      franchise_regions: {
        Row: {
          admin_id: string | null
          code: string
          created_at: string
          id: string
          name: string
          subdomain: string
        }
        Insert: {
          admin_id?: string | null
          code: string
          created_at?: string
          id?: string
          name: string
          subdomain: string
        }
        Update: {
          admin_id?: string | null
          code?: string
          created_at?: string
          id?: string
          name?: string
          subdomain?: string
        }
        Relationships: [
          {
            foreignKeyName: "franchise_regions_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["id"]
          },
        ]
      }
      imprints: {
        Row: {
          content: string
          created_at: string
          from_user_id: string | null
          id: string
          to_user_id: string | null
          type: string | null
        }
        Insert: {
          content: string
          created_at?: string
          from_user_id?: string | null
          id?: string
          to_user_id?: string | null
          type?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          from_user_id?: string | null
          id?: string
          to_user_id?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "imprints_from_user_id_fkey"
            columns: ["from_user_id"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "imprints_to_user_id_fkey"
            columns: ["to_user_id"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["id"]
          },
        ]
      }
      proof_submissions: {
        Row: {
          challenge_id: string | null
          feedback: string | null
          id: string
          proof_type: string
          proof_url: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string | null
          story: string | null
          submitted_at: string
          user_id: string | null
        }
        Insert: {
          challenge_id?: string | null
          feedback?: string | null
          id?: string
          proof_type: string
          proof_url?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          story?: string | null
          submitted_at?: string
          user_id?: string | null
        }
        Update: {
          challenge_id?: string | null
          feedback?: string | null
          id?: string
          proof_type?: string
          proof_url?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          story?: string | null
          submitted_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "proof_submissions_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proof_submissions_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proof_submissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["id"]
          },
        ]
      }
      Users: {
        Row: {
          created_at: string
          email: string | null
          id: string
          is_verified: boolean | null
          name: string | null
          profile_type: string | null
          referrer: string | null
          role: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          is_verified?: boolean | null
          name?: string | null
          profile_type?: string | null
          referrer?: string | null
          role?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          is_verified?: boolean | null
          name?: string | null
          profile_type?: string | null
          referrer?: string | null
          role?: string | null
        }
        Relationships: []
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
