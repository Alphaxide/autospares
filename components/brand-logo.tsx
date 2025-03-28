import Link from "next/link"

interface BrandLogoProps {
  variant?: "default" | "white"
  size?: "sm" | "md" | "lg"
  showText?: boolean
  linkDisabled?: boolean
}

export function BrandLogo({ variant = "default", size = "md", showText = true, linkDisabled = false }: BrandLogoProps) {
  // Ensure size is one of the valid options
  const validSize = ["sm", "md", "lg"].includes(size) ? size : "md"

  const logoSizes = {
    sm: { width: 32, height: 32, textClass: "text-lg" },
    md: { width: 40, height: 40, textClass: "text-xl" },
    lg: { width: 48, height: 48, textClass: "text-2xl" },
  }

  const { width, height, textClass } = logoSizes[validSize as keyof typeof logoSizes]

  const LogoContent = () => (
    <div className="flex items-center gap-2">
      <div
        className={`relative flex items-center justify-center rounded-md ${variant === "white" ? "bg-white/10" : "bg-brand-blue"} p-1`}
      >
        <div
          className={`font-bold ${validSize === "sm" ? "text-xs" : validSize === "md" ? "text-sm" : "text-base"} ${variant === "white" ? "text-white" : "text-white"}`}
        >
          ASK
        </div>
        <div
          className={`absolute ${validSize === "sm" ? "-top-1 -right-1 w-2 h-2" : validSize === "md" ? "-top-1.5 -right-1.5 w-3 h-3" : "-top-2 -right-2 w-4 h-4"} rounded-full bg-brand-red`}
        ></div>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-bold tracking-tight ${textClass} ${variant === "white" ? "text-white" : "text-brand-blue"}`}
          >
            AutoSpares
          </span>
          <span
            className={`text-xs font-medium -mt-1 ${variant === "white" ? "text-white/80" : "text-brand-lightBlue"}`}
          >
            KENYA
          </span>
        </div>
      )}
    </div>
  )

  // If linkDisabled is true, just return the logo content without wrapping it in a Link
  if (linkDisabled) {
    return <LogoContent />
  }

  // Otherwise, wrap it in a Link as before
  return (
    <Link href="/" className="flex items-center gap-2">
      <LogoContent />
    </Link>
  )
}

