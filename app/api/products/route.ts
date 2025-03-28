import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const category = searchParams.get("category")
  const brand = searchParams.get("brand")
  const featured = searchParams.get("featured")
  const search = searchParams.get("search")
  const limit = Number.parseInt(searchParams.get("limit") || "12")
  const page = Number.parseInt(searchParams.get("page") || "1")
  const offset = (page - 1) * limit

  let query = supabase
    .from("products")
    .select(`
      *,
      category:categories(name),
      brand:brands(name),
      images:product_images(*)
    `)
    .eq("status", "Active")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1)

  if (category) {
    const { data: categoryData } = await supabase.from("categories").select("id").eq("slug", category).single()

    if (categoryData) {
      query = query.eq("category_id", categoryData.id)
    }
  }

  if (brand) {
    const { data: brandData } = await supabase.from("brands").select("id").eq("slug", brand).single()

    if (brandData) {
      query = query.eq("brand_id", brandData.id)
    }
  }

  if (featured === "true") {
    query = query.eq("is_featured", true)
  }

  if (search) {
    query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,sku.ilike.%${search}%`)
  }

  const { data, error, count } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Get total count for pagination
  const { count: totalCount } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })
    .eq("status", "Active")

  return NextResponse.json({
    products: data,
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

  // Extract product data and images
  const { images, ...productData } = body

  // Insert product
  const { data: product, error: productError } = await supabase.from("products").insert(productData).select().single()

  if (productError) {
    return NextResponse.json({ error: productError.message }, { status: 500 })
  }

  // Insert images if provided
  if (images && images.length > 0) {
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

