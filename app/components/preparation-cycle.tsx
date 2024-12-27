"use client"

import { CheckCircle2Icon } from "lucide-react"

const steps = [
  { name: "Research", description: "Research fellowships and requirements" },
  { name: "Documents", description: "Prepare application documents" },
  { name: "References", description: "Contact potential references" },
  { name: "Review", description: "Review and polish application" },
  { name: "Submit", description: "Submit application" }
]

export function PreparationCycle() {
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold">Preparation Steps</h2>
      <div className="grid gap-4">
        {steps.map((step, index) => (
          <div key={step.name} className="flex items-start space-x-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center">
              <CheckCircle2Icon className="h-5 w-5 text-gray-400" />
            </div>
            <div>
              <div className="font-medium">{step.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {step.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 