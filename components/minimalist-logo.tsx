import Link from "next/link"

interface MinimalistLogoProps {
  variant?: "default" | "small" | "text"
  className?: string
}

export function MinimalistLogo({ variant = "default", className = "" }: MinimalistLogoProps) {
  return (
    <Link href="/" className={`inline-flex items-center ${className}`}>
      <div className="relative">
        {variant === "default" && (
          <div className="flex items-center">
            <div className="relative w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center overflow-hidden">
              <div className="absolute w-6 h-6 bg-white rounded-full"></div>
              <div className="absolute w-4 h-4 bg-blue-600 rounded-full"></div>
              <div className="absolute w-1 h-4 bg-red-500 transform rotate-45 translate-x-2"></div>
            </div>
            <span className="ml-2 text-xl font-bold">ASK</span>
          </div>
        )}

        {variant === "small" && (
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center overflow-hidden">
            <div className="absolute w-5 h-5 bg-white rounded-full"></div>
            <div className="absolute w-3 h-3 bg-blue-600 rounded-full"></div>
            <div className="absolute w-0.5 h-3 bg-red-500 transform rotate-45 translate-x-1.5"></div>
          </div>
        )}

        {variant === "text" && (
          <div className="flex items-center">
            <div className="relative w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center overflow-hidden">
              <div className="absolute w-5 h-5 bg-white rounded-full"></div>
              <div className="absolute w-3 h-3 bg-blue-600 rounded-full"></div>
              <div className="absolute w-0.5 h-3 bg-red-500 transform rotate-45 translate-x-1.5"></div>
            </div>
            <span className="ml-2 text-lg font-bold">ASK</span>
          </div>
        )}

        {variant === "text" && (
          <div className="flex items-center">
            <div className="relative w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center overflow-hidden">
              <div className="absolute w-5 h-5 bg-white rounded-full"></div>
              <div className="absolute w-3 h-3 bg-blue-600 rounded-full"></div>
              <div className="absolute w-0.5 h-3 bg-red-500 transform rotate-45 translate-x-1.5"></div>
            </div>
            <span className="ml-2 text-lg font-bold">AutoSpares Kenya</span>
          </div>
        )}
      </div>
    </Link>
  )
}

