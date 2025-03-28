import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const status = searchParams.get("status")
  const limit = Number.parseInt(searchParams.get("limit") || "20")
  const page = Number.parseInt(searchParams.get("page") || "1")
  const offset = (page - 1) * limit

  let query = supabase
    .from("orders")
    .select(`
      *,
      customer:customers(first_name, last_name, email),
      shipping_address:addresses!shipping_address_id(*),
      items:order_items(
        *,
        product:products(name, sku)
      )
    `)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1)

  if (status) {
    query = query.eq("status", status)
  }

  const { data, error, count } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Get total count for pagination
  const { count: totalCount } = await supabase.from("orders").select("*", { count: "exact", head: true })

  return NextResponse.json({
    orders: data,
    pagination: {
      total: totalCount,
      page,
      limit,
      pages: Math.ceil(totalCount! / limit),
    },
  })
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  // Start a transaction
  const { data, error } = await supabase.rpc("create_order", {
    order_data: body.order,
    order_items: body.items,
    customer_data: body.customer,
    address_data: body.address,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ order: data })
}

