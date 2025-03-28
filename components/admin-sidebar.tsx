"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, ShoppingBag, Package, Tags, Users, BarChart, ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"
import { BrandLogo } from "@/components/brand-logo"

export function AdminSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/admin" && pathname === "/admin") {
      return true
    }
    return pathname !== "/admin" && pathname.startsWith(path)
  }

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Orders",
      href: "/admin/orders",
      icon: ShoppingBag,
    },
    {
      title: "Products",
      href: "/admin/products",
      icon: Package,
    },
    {
      title: "Categories",
      href: "/admin/categories",
      icon: Tags,
    },
    {
      title: "Customers",
      href: "/admin/customers",
      icon: Users,
    },
    {
      title: "Analytics",
      href: "/admin/analytics",
      icon: BarChart,
      disabled: true,
    },
  ]

  return (
    <div className="hidden md:flex h-screen w-64 flex-col border-r bg-white">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/admin" className="flex items-center gap-2 font-semibold">
          <BrandLogo variant="default" size="md" linkDisabled={true} />
          <span className="text-xl font-bold">Admin</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-primary",
                isActive(item.href) ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted",
                item.disabled && "pointer-events-none opacity-60",
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
              {isActive(item.href) && <ChevronRight className="ml-auto h-4 w-4" />}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto border-t p-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:text-primary hover:bg-muted"
        >
          <Home className="h-4 w-4" />
          <span>Back to Store</span>
        </Link>
      </div>
    </div>
  )
}

