"'use client'"

import { useState } from "'react'"
import { Folder, ChevronRight, ChevronDown, File } from "'lucide-react'"

type FolderItem = {
  name: string
  type: "'folder'" | "'file'"
  children?: FolderItem[]
}

const initialFolders: FolderItem[] = [
  {
    name: "'Fellowships'",
    type: "'folder'",
    children: [
      {
        name: "'Rhodes Scholarship'",
        type: "'folder'",
        children: [
          { name: "'Essay Draft'", type: "'file'" },
          { name: "'To-Do List'", type: "'file'" },
        ],
      },
      {
        name: "'Marshall Scholarship'",
        type: "'folder'",
        children: [
          { name: "'Application Notes'", type: "'file'" },
          { name: "'Research Proposal'", type: "'file'" },
        ],
      },
      {
        name: "'Gates-Cambridge Scholarship'",
        type: "'folder'",
        children: [
          { name: "'Personal Statement'", type: "'file'" },
          { name: "'Reference Letters'", type: "'file'" },
        ],
      },
      {
        name: "'Churchill Scholarship'",
        type: "'folder'",
        children: [
          { name: "'Project Outline'", type: "'file'" },
          { name: "'Budget Plan'", type: "'file'" },
        ],
      },
    ],
  },
]

function FolderTree({ items }: { items: FolderItem[] }) {
  const [expandedFolders, setExpandedFolders] = useState<string[]>([])

  const toggleFolder = (folderName: string) => {
    setExpandedFolders((prev) =>
      prev.includes(folderName)
        ? prev.filter((name) => name !== folderName)
        : [...prev, folderName]
    )
  }

  const renderItem = (item: FolderItem, depth = 0) => {
    const isExpanded = expandedFolders.includes(item.name)

    return (
      <div key={item.name} style={{ marginLeft: `${depth * 20}px` }}>
        <div
          className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-zinc-900/10 rounded dark:hover:bg-zinc-50/10"
          onClick={() => item.type === "'folder'" && toggleFolder(item.name)}
        >
          {item.type === "'folder'" ? (
            <>
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              <Folder className="h-4 w-4" />
            </>
          ) : (
            <File className="h-4 w-4" />
          )}
          <span>{item.name}</span>
        </div>
        {item.type === "'folder'" && isExpanded && item.children && (
          <div>
            {item.children.map((child) => renderItem(child, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  return <div className="space-y-1">{items.map((item) => renderItem(item))}</div>
}

export function FolderStructure() {
  return (
    <div className="bg-zinc-100 p-4 rounded-lg dark:bg-zinc-800">
      <h2 className="text-xl font-semibold mb-4">Folder Structure</h2>
      <FolderTree items={initialFolders} />
    </div>
  )
}

