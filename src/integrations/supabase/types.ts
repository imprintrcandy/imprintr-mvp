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
      Users: {
        Row: {
          created_at: string
          email: string | null
          id: string
          is_verified: boolean | null
          name: string | null
          profile_type: string | null
          referrer: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          is_verified?: boolean | null
          name?: string | null
          profile_type?: string | null
          referrer?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          is_verified?: boolean | null
          name?: string | null
          profile_type?: string | null
          referrer?: string | null
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
