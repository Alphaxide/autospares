export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: number
          created_at: string
          name: string
          sku: string
          description: string
          price: number
          cost: number | null
          discount: number | null
          category_id: number
          brand_id: number | null
          stock: number
          weight: number | null
          dimensions: Json | null
          features: string | null
          specifications: string | null
          status: string
          meta_title: string | null
          meta_description: string | null
          is_featured: boolean
          compatible_makes: string[] | null
          compatible_models: Json | null
        }
        Insert: {
          id?: number
          created_at?: string
          name: string
          sku: string
          description: string
          price: number
          cost?: number | null
          discount?: number | null
          category_id: number
          brand_id?: number | null
          stock: number
          weight?: number | null
          dimensions?: Json | null
          features?: string | null
          specifications?: string | null
          status?: string
          meta_title?: string | null
          meta_description?: string | null
          is_featured?: boolean
          compatible_makes?: string[] | null
          compatible_models?: Json | null
        }
        Update: {
          id?: number
          created_at?: string
          name?: string
          sku?: string
          description?: string
          price?: number
          cost?: number | null
          discount?: number | null
          category_id?: number
          brand_id?: number | null
          stock?: number
          weight?: number | null
          dimensions?: Json | null
          features?: string | null
          specifications?: string | null
          status?: string
          meta_title?: string | null
          meta_description?: string | null
          is_featured?: boolean
          compatible_makes?: string[] | null
          compatible_models?: Json | null
        }
      }
      product_images: {
        Row: {
          id: number
          product_id: number
          url: string
          created_at: string
          is_primary: boolean
          alt_text: string | null
        }
        Insert: {
          id?: number
          product_id: number
          url: string
          created_at?: string
          is_primary?: boolean
          alt_text?: string | null
        }
        Update: {
          id?: number
          product_id?: number
          url?: string
          created_at?: string
          is_primary?: boolean
          alt_text?: string | null
        }
      }
      categories: {
        Row: {
          id: number
          name: string
          slug: string
          description: string | null
          parent_id: number | null
          created_at: string
          image_url: string | null
        }
        Insert: {
          id?: number
          name: string
          slug: string
          description?: string | null
          parent_id?: number | null
          created_at?: string
          image_url?: string | null
        }
        Update: {
          id?: number
          name?: string
          slug?: string
          description?: string | null
          parent_id?: number | null
          created_at?: string
          image_url?: string | null
        }
      }
      brands: {
        Row: {
          id: number
          name: string
          slug: string
          description: string | null
          logo_url: string | null
          website: string | null
          created_at: string
          country_of_origin: string | null
          year_established: number | null
        }
        Insert: {
          id?: number
          name: string
          slug: string
          description?: string | null
          logo_url?: string | null
          website?: string | null
          created_at?: string
          country_of_origin?: string | null
          year_established?: number | null
        }
        Update: {
          id?: number
          name?: string
          slug?: string
          description?: string | null
          logo_url?: string | null
          website?: string | null
          created_at?: string
          country_of_origin?: string | null
          year_established?: number | null
        }
      }
      customers: {
        Row: {
          id: number
          first_name: string
          last_name: string
          email: string
          phone: string | null
          created_at: string
          user_id: string | null
        }
        Insert: {
          id?: number
          first_name: string
          last_name: string
          email: string
          phone?: string | null
          created_at?: string
          user_id?: string | null
        }
        Update: {
          id?: number
          first_name?: string
          last_name?: string
          email?: string
          phone?: string | null
          created_at?: string
          user_id?: string | null
        }
      }
      addresses: {
        Row: {
          id: number
          customer_id: number
          address_line: string
          county: string
          town: string
          postal_code: string | null
          is_default: boolean
          created_at: string
        }
        Insert: {
          id?: number
          customer_id: number
          address_line: string
          county: string
          town: string
          postal_code?: string | null
          is_default?: boolean
          created_at?: string
        }
        Update: {
          id?: number
          customer_id?: number
          address_line?: string
          county?: string
          town?: string
          postal_code?: string | null
          is_default?: boolean
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: number
          customer_id: number
          order_number: string
          status: string
          total_amount: number
          shipping_address_id: number
          billing_address_id: number | null
          payment_method: string
          payment_status: string
          created_at: string
          updated_at: string
          shipping_method: string | null
          shipping_cost: number | null
          tax_amount: number | null
          discount_amount: number | null
          notes: string | null
          delivery_company: string | null
          tracking_number: string | null
          delivery_person: string | null
          estimated_delivery_date: string | null
        }
        Insert: {
          id?: number
          customer_id: number
          order_number: string
          status: string
          total_amount: number
          shipping_address_id: number
          billing_address_id?: number | null
          payment_method: string
          payment_status: string
          created_at?: string
          updated_at?: string
          shipping_method?: string | null
          shipping_cost?: number | null
          tax_amount?: number | null
          discount_amount?: number | null
          notes?: string | null
          delivery_company?: string | null
          tracking_number?: string | null
          delivery_person?: string | null
          estimated_delivery_date?: string | null
        }
        Update: {
          id?: number
          customer_id?: number
          order_number?: string
          status?: string
          total_amount?: number
          shipping_address_id?: number
          billing_address_id?: number | null
          payment_method?: string
          payment_status?: string
          created_at?: string
          updated_at?: string
          shipping_method?: string | null
          shipping_cost?: number | null
          tax_amount?: number | null
          discount_amount?: number | null
          notes?: string | null
          delivery_company?: string | null
          tracking_number?: string | null
          delivery_person?: string | null
          estimated_delivery_date?: string | null
        }
      }
      order_items: {
        Row: {
          id: number
          order_id: number
          product_id: number
          quantity: number
          unit_price: number
          total_price: number
          created_at: string
        }
        Insert: {
          id?: number
          order_id: number
          product_id: number
          quantity: number
          unit_price: number
          total_price: number
          created_at?: string
        }
        Update: {
          id?: number
          order_id?: number
          product_id?: number
          quantity?: number
          unit_price?: number
          total_price?: number
          created_at?: string
        }
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
  }
}

