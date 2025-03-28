import { Check, X } from "lucide-react"

type CarCompatibilityProps = {
  make: string
  model: string
  year: string
  isCompatible: boolean
}

export function CarCompatibility({ make, model, year, isCompatible }: CarCompatibilityProps) {
  return (
    <div className="flex items-center justify-between p-3 border rounded-md mb-2">
      <div className="flex items-center">
        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">{make.charAt(0)}</div>
        <div>
          <p className="font-medium">
            {make} {model}
          </p>
          <p className="text-sm text-gray-500">{year}</p>
        </div>
      </div>
      <div>
        {isCompatible ? (
          <div className="flex items-center text-green-600">
            <Check className="h-5 w-5 mr-1" />
            <span>Compatible</span>
          </div>
        ) : (
          <div className="flex items-center text-red-500">
            <X className="h-5 w-5 mr-1" />
            <span>Not Compatible</span>
          </div>
        )}
      </div>
    </div>
  )
}

