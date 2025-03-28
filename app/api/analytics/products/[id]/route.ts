import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    // Get product details
    const { data: product, error: productError } = await supabase.from("products").select("*").eq("id", id).single()

    if (productError) {
      return NextResponse.json({ error: productError.message }, { status: 404 })
    }

    // Get total sales for this product
    const { data: salesData, error: salesError } = await supabase
      .from("order_items")
      .select("quantity, total_price")
      .eq("product_id", id)

    if (salesError) {
      return NextResponse.json({ error: salesError.message }, { status: 500 })
    }

    const totalQuantitySold = salesData.reduce((sum, item) => sum + item.quantity, 0)
    const totalRevenue = salesData.reduce((sum, item) => sum + item.total_price, 0)

    // Get monthly sales data (last 6 months)
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const { data: monthlySales, error: monthlySalesError } = await supabase
      .from("order_items")
      .select(`
        order_id,
        quantity,
        total_price,
        orders!order_items_order_id_fkey(created_at)
      `)
      .eq("product_id", id)
      .gte("orders.created_at", sixMonthsAgo.toISOString())

    if (monthlySalesError) {
      return NextResponse.json({ error: monthlySalesError.message }, { status: 500 })
    }

    // Process monthly data
    const monthlyData: Record<string, { sales: number; revenue: number }> = {}

    monthlySales.forEach((item) => {
      const date = new Date(item.orders.created_at)
      const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`

      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = { sales: 0, revenue: 0 }
      }

      monthlyData[monthYear].sales += item.quantity
      monthlyData[monthYear].revenue += item.total_price
    })

    // Get related products (same category)
    const { data: relatedProducts, error: relatedError } = await supabase
      .from("products")
      .select(`
        id, 
        name,
        price,
        category_id,
        order_items(quantity)
      `)
      .eq("category_id", product.category_id)
      .neq("id", id)
      .limit(5)

    if (relatedError) {
      return NextResponse.json({ error: relatedError.message }, { status: 500 })
    }

    // Process related products data
    const relatedProductsData = relatedProducts.map((prod) => ({
      id: prod.id,
      name: prod.name,
      price: prod.price,
      totalSold: prod.order_items.reduce((sum, item) => sum + item.quantity, 0),
    }))

    return NextResponse.json({
      product,
      sales: {
        totalQuantitySold,
        totalRevenue,
        monthlyData: Object.entries(monthlyData).map(([month, data]) => ({
          month,
          sales: data.sales,
          revenue: data.revenue,
        })),
      },
      relatedProducts: relatedProductsData,
    })
  } catch (error) {
    console.error("Product analytics error:", error)
    return NextResponse.json({ error: "Failed to fetch product analytics" }, { status: 500 })
  }
}

