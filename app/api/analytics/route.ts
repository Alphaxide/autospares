import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    // Get total sales
    const { data: salesData, error: salesError } = await supabase
      .from("orders")
      .select("total_amount")
      .eq("payment_status", "Paid")

    if (salesError) {
      return NextResponse.json({ error: salesError.message }, { status: 500 })
    }

    const totalSales = salesData.reduce((sum, order) => sum + order.total_amount, 0)

    // Get total orders
    const { count: totalOrders, error: ordersError } = await supabase
      .from("orders")
      .select("*", { count: "exact", head: true })

    if (ordersError) {
      return NextResponse.json({ error: ordersError.message }, { status: 500 })
    }

    // Get total customers
    const { count: totalCustomers, error: customersError } = await supabase
      .from("customers")
      .select("*", { count: "exact", head: true })

    if (customersError) {
      return NextResponse.json({ error: customersError.message }, { status: 500 })
    }

    // Get total products
    const { count: totalProducts, error: productsError } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true })

    if (productsError) {
      return NextResponse.json({ error: productsError.message }, { status: 500 })
    }

    // Get recent orders
    const { data: recentOrders, error: recentOrdersError } = await supabase
      .from("orders")
      .select(`
        *,
        customer:customers(first_name, last_name)
      `)
      .order("created_at", { ascending: false })
      .limit(5)

    if (recentOrdersError) {
      return NextResponse.json({ error: recentOrdersError.message }, { status: 500 })
    }

    // Get top selling products
    const { data: topProducts, error: topProductsError } = await supabase
      .from("order_items")
      .select(`
        product_id,
        product:products(name),
        quantity
      `)
      .order("quantity", { ascending: false })
      .limit(5)

    if (topProductsError) {
      return NextResponse.json({ error: topProductsError.message }, { status: 500 })
    }

    return NextResponse.json({
      totalSales,
      totalOrders,
      totalCustomers,
      totalProducts,
      recentOrders,
      topProducts,
    })
  } catch (error) {
    console.error("Analytics error:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}

