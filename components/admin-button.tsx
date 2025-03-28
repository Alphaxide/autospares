"use client"

import { useState } from "react"
import Link from "next/link"
import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AdminButton() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link href="/admin">
        <Button
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg bg-brand-blue hover:bg-brand-blue/90 text-white transition-all duration-300"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Settings className="h-5 w-5" />
          <span className="sr-only">Admin Area</span>
        </Button>
      </Link>

      {isHovered && (
        <div className="absolute bottom-full right-0 mb-2 bg-brand-blue text-white text-sm py-1 px-3 rounded-md pointer-events-none">
          Admin Area
        </div>
      )}
    </div>
  )
}

