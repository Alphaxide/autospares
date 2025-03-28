import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const search = searchParams.get("search")
  const limit = Number.parseInt(searchParams.get("limit") || "20")
  const page = Number.parseInt(searchParams.get("page") || "1")
  const offset = (page - 1) * limit

  let query = supabase
    .from("customers")
    .select("*, addresses(*)")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1)

  if (search) {
    query = query.or(
      `first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`,
    )
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Get total count for pagination
  const { count: totalCount } = await supabase.from("customers").select("*", { count: "exact", head: true })

  return NextResponse.json({
    customers: data,
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

  const { data, error } = await supabase.from("customers").insert(body).select().single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ customer: data })
}

