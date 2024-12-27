import { CheckCircle, Circle } from "'lucide-react'"

const steps = [
  { name: "'Brainstorming'", completed: true },
  { name: "'Research'", completed: true },
  { name: "'Drafting'", completed: false },
  { name: "'Editing'", completed: false },
  { name: "'Final Review'", completed: false },
  { name: "'Submission'", completed: false },
]

export function PreparationCycle() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Preparation Cycle</h2>
      <ol className="relative border-l border-gray-700">
        {steps.map((step, index) => (
          <li key={step.name} className="mb-10 ml-6">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-white rounded-full -left-3 ring-8 ring-white dark:bg-zinc-950 dark:ring-zinc-950">
              {step.completed ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <Circle className="w-4 h-4 text-gray-500" />
              )}
            </span>
            <h3 className="font-medium leading-tight">{step.name}</h3>
            {index < steps.length - 1 && (
              <p className="text-sm">Complete this step before moving to {steps[index + 1].name}</p>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

