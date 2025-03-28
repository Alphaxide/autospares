import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id

  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      customer:customers(id, first_name, last_name, email, phone),
      shipping_address:addresses!shipping_address_id(*),
      billing_address:addresses!billing_address_id(*),
      items:order_items(
        *,
        product:products(id, name, sku, price)
      )
    `)
    .eq("id", id)
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 })
  }

  return NextResponse.json({ order: data })
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id
  const body = await request.json()

  const { data, error } = await supabase.from("orders").update(body).eq("id", id).select().single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ order: data })
}

