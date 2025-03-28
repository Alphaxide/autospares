import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id

  const { data, error } = await supabase.from("categories").select("*").eq("id", id).single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 })
  }

  return NextResponse.json({ category: data })
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id
  const body = await request.json()

  const { data, error } = await supabase.from("categories").update(body).eq("id", id).select().single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ category: data })
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id

  const { error } = await supabase.from("categories").delete().eq("id", id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

