import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id

  const { data, error } = await supabase
    .from("customers")
    .select(`
      *,
      addresses(*),
      orders(*)
    `)
    .eq("id", id)
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 })
  }

  return NextResponse.json({ customer: data })
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id
  const body = await request.json()

  const { data, error } = await supabase.from("customers").update(body).eq("id", id).select().single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ customer: data })
}

