import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function setupDatabase() {
  console.log("Setting up database schema...")

  // Create products table
  const { error: productsError } = await supabase.rpc("create_table_if_not_exists", {
    table_name: "products",
    definition: `
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      name TEXT NOT NULL,
      sku TEXT NOT NULL UNIQUE,
      description TEXT NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      cost DECIMAL(10, 2),
      discount DECIMAL(5, 2),
      category_id INTEGER NOT NULL,
      brand_id INTEGER,
      stock INTEGER NOT NULL DEFAULT 0,
      weight DECIMAL(8, 2),
      dimensions JSONB,
      features TEXT,
      specifications TEXT,
      status TEXT NOT NULL DEFAULT 'Active',
      meta_title TEXT,
      meta_description TEXT,
      is_featured BOOLEAN DEFAULT FALSE,
      compatible_makes TEXT[],
      compatible_models JSONB
    `,
  })

  if (productsError) {
    console.error("Error creating products table:", productsError)
  } else {
    console.log("Products table created or already exists")
  }

  // Create product_images table
  const { error: imagesError } = await supabase.rpc("create_table_if_not_exists", {
    table_name: "product_images",
    definition: `
      id SERIAL PRIMARY KEY,
      product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      url TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      is_primary BOOLEAN DEFAULT FALSE,
      alt_text TEXT
    `,
  })

  if (imagesError) {
    console.error("Error creating product_images table:", imagesError)
  } else {
    console.log("Product images table created or already exists")
  }

  // Create categories table
  const { error: categoriesError } = await supabase.rpc("create_table_if_not_exists", {
    table_name: "categories",
    definition: `
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      description TEXT,
      parent_id INTEGER REFERENCES categories(id),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      image_url TEXT
    `,
  })

  if (categoriesError) {
    console.error("Error creating categories table:", categoriesError)
  } else {
    console.log("Categories table created or already exists")
  }

  // Create brands table
  const { error: brandsError } = await supabase.rpc("create_table_if_not_exists", {
    table_name: "brands",
    definition: `
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      description TEXT,
      logo_url TEXT,
      website TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      country_of_origin TEXT,
      year_established INTEGER
    `,
  })

  if (brandsError) {
    console.error("Error creating brands table:", brandsError)
  } else {
    console.log("Brands table created or already exists")
  }

  // Create customers table
  const { error: customersError } = await supabase.rpc("create_table_if_not_exists", {
    table_name: "customers",
    definition: `
      id SERIAL PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      phone TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      user_id TEXT
    `,
  })

  if (customersError) {
    console.error("Error creating customers table:", customersError)
  } else {
    console.log("Customers table created or already exists")
  }

  // Create addresses table
  const { error: addressesError } = await supabase.rpc("create_table_if_not_exists", {
    table_name: "addresses",
    definition: `
      id SERIAL PRIMARY KEY,
      customer_id INTEGER NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
      address_line TEXT NOT NULL,
      county TEXT NOT NULL,
      town TEXT NOT NULL,
      postal_code TEXT,
      is_default BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    `,
  })

  if (addressesError) {
    console.error("Error creating addresses table:", addressesError)
  } else {
    console.log("Addresses table created or already exists")
  }

  // Create orders table
  const { error: ordersError } = await supabase.rpc("create_table_if_not_exists", {
    table_name: "orders",
    definition: `
      id SERIAL PRIMARY KEY,
      customer_id INTEGER NOT NULL REFERENCES customers(id),
      order_number TEXT NOT NULL UNIQUE,
      status TEXT NOT NULL,
      total_amount DECIMAL(10, 2) NOT NULL,
      shipping_address_id INTEGER NOT NULL REFERENCES addresses(id),
      billing_address_id INTEGER REFERENCES addresses(id),
      payment_method TEXT NOT NULL,
      payment_status TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      shipping_method TEXT,
      shipping_cost DECIMAL(10, 2),
      tax_amount DECIMAL(10, 2),
      discount_amount DECIMAL(10, 2),
      notes TEXT,
      delivery_company TEXT,
      tracking_number TEXT,
      delivery_person TEXT,
      estimated_delivery_date DATE
    `,
  })

  if (ordersError) {
    console.error("Error creating orders table:", ordersError)
  } else {
    console.log("Orders table created or already exists")
  }

  // Create order_items table
  const { error: orderItemsError } = await supabase.rpc("create_table_if_not_exists", {
    table_name: "order_items",
    definition: `
      id SERIAL PRIMARY KEY,
      order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
      product_id INTEGER NOT NULL REFERENCES products(id),
      quantity INTEGER NOT NULL,
      unit_price DECIMAL(10, 2) NOT NULL,
      total_price DECIMAL(10, 2) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    `,
  })

  if (orderItemsError) {
    console.error("Error creating order_items table:", orderItemsError)
  } else {
    console.log("Order items table created or already exists")
  }

  console.log("Database setup complete!")
}

setupDatabase().catch(console.error)

