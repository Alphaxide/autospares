import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function seedDatabase() {
  console.log("Seeding database with initial data...")

  // Seed categories
  const categories = [
    { name: "Engine Parts", slug: "engine-parts", description: "Essential components for your engine" },
    { name: "Brake Systems", slug: "brake-systems", description: "High-quality brake components for optimal safety" },
    { name: "Lighting", slug: "lighting", description: "Headlights, taillights, and interior lighting solutions" },
    { name: "Suspension", slug: "suspension", description: "Suspension parts for a smooth ride" },
    { name: "Body Parts", slug: "body-parts", description: "Exterior body components and panels" },
    { name: "Accessories", slug: "accessories", description: "Enhance your vehicle with our range of accessories" },
    { name: "Electrical", slug: "electrical", description: "Electrical components and systems" },
    { name: "Oils & Fluids", slug: "oils-fluids", description: "Essential fluids for your vehicle maintenance" },
  ]

  for (const category of categories) {
    const { error } = await supabase.from("categories").upsert(
      {
        name: category.name,
        slug: category.slug,
        description: category.description,
      },
      { onConflict: "slug" },
    )

    if (error) {
      console.error(`Error inserting category ${category.name}:`, error)
    } else {
      console.log(`Category ${category.name} inserted or updated`)
    }
  }

  // Seed brands
  const brands = [
    {
      name: "Toyota",
      slug: "toyota",
      description: "Japanese multinational automotive manufacturer",
      website: "https://www.toyota.com",
      country_of_origin: "Japan",
      year_established: 1937,
    },
    {
      name: "Honda",
      slug: "honda",
      description: "Japanese public multinational conglomerate manufacturer",
      website: "https://www.honda.com",
      country_of_origin: "Japan",
      year_established: 1948,
    },
    {
      name: "Bosch",
      slug: "bosch",
      description: "German multinational engineering and technology company",
      website: "https://www.bosch.com",
      country_of_origin: "Germany",
      year_established: 1886,
    },
    {
      name: "NGK",
      slug: "ngk",
      description: "Japanese manufacturer of spark plugs and automotive components",
      website: "https://www.ngk.com",
      country_of_origin: "Japan",
      year_established: 1936,
    },
    {
      name: "Denso",
      slug: "denso",
      description: "Japanese automotive components manufacturer",
      website: "https://www.denso.com",
      country_of_origin: "Japan",
      year_established: 1949,
    },
    {
      name: "Brembo",
      slug: "brembo",
      description: "Italian manufacturer of automotive brake systems",
      website: "https://www.brembo.com",
      country_of_origin: "Italy",
      year_established: 1961,
    },
  ]

  for (const brand of brands) {
    const { error } = await supabase.from("brands").upsert(brand, { onConflict: "slug" })

    if (error) {
      console.error(`Error inserting brand ${brand.name}:`, error)
    } else {
      console.log(`Brand ${brand.name} inserted or updated`)
    }
  }

  // Get category IDs
  const { data: categoryData } = await supabase.from("categories").select("id, slug")

  const categoryMap =
    categoryData?.reduce(
      (acc, cat) => {
        acc[cat.slug] = cat.id
        return acc
      },
      {} as Record<string, number>,
    ) || {}

  // Get brand IDs
  const { data: brandData } = await supabase.from("brands").select("id, slug")

  const brandMap =
    brandData?.reduce(
      (acc, brand) => {
        acc[brand.slug] = brand.id
        return acc
      },
      {} as Record<string, number>,
    ) || {}

  // Seed products
  const products = [
    {
      name: "Premium Brake Pads - Toyota Corolla",
      sku: "BP-TOY-15-22",
      description:
        "High-performance ceramic brake pads designed specifically for Toyota Corolla models from 2015 to 2022. These premium brake pads offer excellent stopping power, minimal noise, and reduced brake dust.",
      price: 4500,
      cost: 3200,
      discount: 10,
      category_id: categoryMap["brake-systems"],
      brand_id: brandMap["brembo"],
      stock: 15,
      weight: 1.2,
      dimensions: { length: 136, width: 109, height: 15 },
      features:
        "Ceramic compound for quiet braking and less dust\nChamfered and slotted for noise reduction\nIncludes hardware kit for complete installation\nMeets or exceeds OEM specifications\nHeat-resistant for consistent performance",
      specifications: "Material: Ceramic\nPosition: Front\nThickness: 15mm\nWidth: 109mm\nLength: 136mm\nWeight: 1.2kg",
      status: "Active",
      meta_title: "Premium Brake Pads for Toyota Corolla (2015-2022) | AutoSpares Kenya",
      meta_description:
        "High-performance ceramic brake pads for Toyota Corolla and Auris. Excellent stopping power, minimal noise, and reduced brake dust. Free delivery in Nairobi.",
      is_featured: true,
      compatible_makes: ["Toyota"],
      compatible_models: { Toyota: ["Corolla", "Auris"] },
    },
    {
      name: "NGK Spark Plugs - Set of 4",
      sku: "SP-NGK-4-STD",
      description:
        "Genuine NGK spark plugs designed for optimal engine performance and fuel efficiency. This set of 4 standard spark plugs is compatible with a wide range of vehicle makes and models.",
      price: 2800,
      cost: 1900,
      discount: 0,
      category_id: categoryMap["engine-parts"],
      brand_id: brandMap["ngk"],
      stock: 30,
      weight: 0.4,
      dimensions: { length: 80, width: 80, height: 40 },
      features:
        "Genuine NGK quality\nImproved fuel efficiency\nBetter throttle response\nReliable engine starting\nOptimal engine performance",
      specifications: "Type: Standard\nQuantity: 4 pieces\nThread Size: 14mm\nReach: 19mm\nHex Size: 16mm",
      status: "Active",
      meta_title: "NGK Spark Plugs Set of 4 | AutoSpares Kenya",
      meta_description:
        "Genuine NGK spark plugs for improved engine performance and fuel efficiency. Compatible with multiple vehicle makes and models. Free delivery in Nairobi.",
      is_featured: true,
      compatible_makes: ["Toyota", "Honda", "Nissan", "Subaru"],
      compatible_models: {
        Toyota: ["Corolla", "Camry", "RAV4"],
        Honda: ["Civic", "Accord", "CR-V"],
        Nissan: ["Altima", "Sentra", "X-Trail"],
        Subaru: ["Impreza", "Forester", "Outback"],
      },
    },
    {
      name: 'Bosch Wiper Blades - 24" Pair',
      sku: "WB-BOSCH-24",
      description:
        "Premium Bosch wiper blades for crystal clear visibility in all weather conditions. This 24-inch pair features durable construction and easy installation for most vehicle models.",
      price: 1800,
      cost: 1200,
      discount: 5,
      category_id: categoryMap["accessories"],
      brand_id: brandMap["bosch"],
      stock: 25,
      weight: 0.5,
      dimensions: { length: 610, width: 30, height: 20 },
      features:
        "Premium rubber edge for smooth, clean wipes\nAerodynamic design reduces wind lift\nEasy installation with universal adapter\nDurable construction for long life\nQuiet operation in all weather conditions",
      specifications:
        "Length: 24 inches (610mm)\nQuantity: Pair (2 pieces)\nType: Beam style\nFitment: Universal with adapters included",
      status: "Active",
      meta_title: 'Bosch Wiper Blades 24" Pair | AutoSpares Kenya',
      meta_description:
        "Premium Bosch wiper blades for clear visibility in all weather conditions. Easy installation with universal adapters. Free delivery in Nairobi.",
      is_featured: false,
      compatible_makes: ["Toyota", "Honda", "Nissan", "Subaru", "Mitsubishi", "Mazda", "BMW", "Mercedes"],
      compatible_models: null,
    },
  ]

  for (const product of products) {
    const { data, error } = await supabase.from("products").upsert(product, { onConflict: "sku", returning: "minimal" })

    if (error) {
      console.error(`Error inserting product ${product.name}:`, error)
    } else {
      console.log(`Product ${product.name} inserted or updated`)
    }
  }

  // Seed product images
  const { data: productData } = await supabase.from("products").select("id, sku")

  const productMap =
    productData?.reduce(
      (acc, product) => {
        acc[product.sku] = product.id
        return acc
      },
      {} as Record<string, number>,
    ) || {}

  const productImages = [
    {
      product_id: productMap["BP-TOY-15-22"],
      url: "https://images.unsplash.com/photo-1486754735734-325b5831c3ad?q=80&w=800&h=800&auto=format&fit=crop",
      is_primary: true,
      alt_text: "Premium Brake Pads for Toyota Corolla",
    },
    {
      product_id: productMap["SP-NGK-4-STD"],
      url: "https://images.unsplash.com/photo-1635784063388-1ff0bf6a8076?q=80&w=800&h=800&auto=format&fit=crop",
      is_primary: true,
      alt_text: "NGK Spark Plugs Set of 4",
    },
    {
      product_id: productMap["WB-BOSCH-24"],
      url: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=800&h=800&auto=format&fit=crop",
      is_primary: true,
      alt_text: 'Bosch Wiper Blades 24" Pair',
    },
  ]

  for (const image of productImages) {
    const { error } = await supabase.from("product_images").upsert(image, { onConflict: "product_id,url" })

    if (error) {
      console.error(`Error inserting product image for product ID ${image.product_id}:`, error)
    } else {
      console.log(`Product image for product ID ${image.product_id} inserted or updated`)
    }
  }

  // Seed customers
  const customers = [
    {
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      phone: "+254712345678",
    },
    {
      first_name: "Jane",
      last_name: "Smith",
      email: "jane.smith@example.com",
      phone: "+254723456789",
    },
    {
      first_name: "Michael",
      last_name: "Johnson",
      email: "michael.johnson@example.com",
      phone: "+254734567890",
    },
  ]

  for (const customer of customers) {
    const { data, error } = await supabase
      .from("customers")
      .upsert(customer, { onConflict: "email", returning: "minimal" })

    if (error) {
      console.error(`Error inserting customer ${customer.email}:`, error)
    } else {
      console.log(`Customer ${customer.email} inserted or updated`)
    }
  }

  // Get customer IDs
  const { data: customerData } = await supabase.from("customers").select("id, email")

  const customerMap =
    customerData?.reduce(
      (acc, customer) => {
        acc[customer.email] = customer.id
        return acc
      },
      {} as Record<string, number>,
    ) || {}

  // Seed addresses
  const addresses = [
    {
      customer_id: customerMap["john.doe@example.com"],
      address_line: "123 Moi Avenue, Apartment 4B",
      county: "Nairobi",
      town: "Nairobi CBD",
      postal_code: "00100",
      is_default: true,
    },
    {
      customer_id: customerMap["jane.smith@example.com"],
      address_line: "456 Kenyatta Avenue, House 7",
      county: "Mombasa",
      town: "Nyali",
      postal_code: "80100",
      is_default: true,
    },
    {
      customer_id: customerMap["michael.johnson@example.com"],
      address_line: "789 Oginga Odinga Street, Suite 12",
      county: "Kisumu",
      town: "Milimani",
      postal_code: "40100",
      is_default: true,
    },
  ]

  for (const address of addresses) {
    const { error } = await supabase
      .from("addresses")
      .upsert(address, { onConflict: "customer_id,address_line", returning: "minimal" })

    if (error) {
      console.error(`Error inserting address for customer ID ${address.customer_id}:`, error)
    } else {
      console.log(`Address for customer ID ${address.customer_id} inserted or updated`)
    }
  }

  // Get address IDs
  const { data: addressData } = await supabase.from("addresses").select("id, customer_id")

  const addressMap =
    addressData?.reduce(
      (acc, address) => {
        if (!acc[address.customer_id]) {
          acc[address.customer_id] = []
        }
        acc[address.customer_id].push(address.id)
        return acc
      },
      {} as Record<number, number[]>,
    ) || {}

  // Seed orders
  const orders = [
    {
      customer_id: customerMap["john.doe@example.com"],
      order_number: "ORD-2023-001",
      status: "Delivered",
      total_amount: 4500,
      shipping_address_id: addressMap[customerMap["john.doe@example.com"]][0],
      billing_address_id: addressMap[customerMap["john.doe@example.com"]][0],
      payment_method: "M-Pesa",
      payment_status: "Paid",
      shipping_method: "Standard Delivery",
      shipping_cost: 350,
      tax_amount: 720,
      discount_amount: 0,
      delivery_company: "Sendy",
      tracking_number: "SND12345678",
      delivery_person: "David Kamau",
      estimated_delivery_date: "2023-12-15",
    },
    {
      customer_id: customerMap["jane.smith@example.com"],
      order_number: "ORD-2023-002",
      status: "Processing",
      total_amount: 2800,
      shipping_address_id: addressMap[customerMap["jane.smith@example.com"]][0],
      billing_address_id: addressMap[customerMap["jane.smith@example.com"]][0],
      payment_method: "Credit Card",
      payment_status: "Paid",
      shipping_method: "Express Delivery",
      shipping_cost: 500,
      tax_amount: 448,
      discount_amount: 0,
      delivery_company: "DHL",
      tracking_number: "DHL98765432",
      estimated_delivery_date: "2023-12-20",
    },
    {
      customer_id: customerMap["michael.johnson@example.com"],
      order_number: "ORD-2023-003",
      status: "Pending",
      total_amount: 1800,
      shipping_address_id: addressMap[customerMap["michael.johnson@example.com"]][0],
      billing_address_id: addressMap[customerMap["michael.johnson@example.com"]][0],
      payment_method: "Bank Transfer",
      payment_status: "Pending",
      shipping_method: "Standard Delivery",
      shipping_cost: 350,
      tax_amount: 288,
      discount_amount: 90,
    },
  ]

  for (const order of orders) {
    const { data, error } = await supabase
      .from("orders")
      .upsert(order, { onConflict: "order_number", returning: "minimal" })

    if (error) {
      console.error(`Error inserting order ${order.order_number}:`, error)
    } else {
      console.log(`Order ${order.order_number} inserted or updated`)
    }
  }

  // Get order IDs
  const { data: orderData } = await supabase.from("orders").select("id, order_number")

  const orderMap =
    orderData?.reduce(
      (acc, order) => {
        acc[order.order_number] = order.id
        return acc
      },
      {} as Record<string, number>,
    ) || {}

  // Seed order items
  const orderItems = [
    {
      order_id: orderMap["ORD-2023-001"],
      product_id: productMap["BP-TOY-15-22"],
      quantity: 1,
      unit_price: 4500,
      total_price: 4500,
    },
    {
      order_id: orderMap["ORD-2023-002"],
      product_id: productMap["SP-NGK-4-STD"],
      quantity: 1,
      unit_price: 2800,
      total_price: 2800,
    },
    {
      order_id: orderMap["ORD-2023-003"],
      product_id: productMap["WB-BOSCH-24"],
      quantity: 1,
      unit_price: 1800,
      total_price: 1800,
    },
  ]

  for (const item of orderItems) {
    const { error } = await supabase
      .from("order_items")
      .upsert(item, { onConflict: "order_id,product_id", returning: "minimal" })

    if (error) {
      console.error(`Error inserting order item for order ID ${item.order_id}, product ID ${item.product_id}:`, error)
    } else {
      console.log(`Order item for order ID ${item.order_id}, product ID ${item.product_id} inserted or updated`)
    }
  }

  console.log("Database seeding complete!")
}

seedDatabase().catch(console.error)

