import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id

  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(id, name, slug),
      brand:brands(id, name, slug),
      images:product_images(*)
    `)
    .eq("id", id)
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 })
  }

  return NextResponse.json({ product: data })
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id
  const body = await request.json()

  // Extract product data and images
  const { images, ...productData } = body

  // Update product
  const { data: product, error: productError } = await supabase
    .from("products")
    .update(productData)
    .eq("id", id)
    .select()
    .single()

  if (productError) {
    return NextResponse.json({ error: productError.message }, { status: 500 })
  }

  // Handle images if provided
  if (images && images.length > 0) {
    // Delete existing images
    await supabase.from("product_images").delete().eq("product_id", id)

    // Insert new images
    const productImages = images.map((url: string, index: number) => ({
      product_id: product.id,
      url,
      is_primary: index === 0,
    }))

    const { error: imagesError } = await supabase.from("product_images").insert(productImages)

    if (imagesError) {
      return NextResponse.json({ error: imagesError.message }, { status: 500 })
    }
  }

  return NextResponse.json({ product })
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id

  const { error } = await supabase.from("products").delete().eq("id", id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

