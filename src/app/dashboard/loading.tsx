import { Loader2 } from "lucide-react"

export default function Loading() {

  return (
    <div className="flex items-center justify-center h-full gap-2">
      <Loader2 className="animate-spin inline-flex" />
      <span className="inline-flex">Loading...</span>
    </div>
  )
}