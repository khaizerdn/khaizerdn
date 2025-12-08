'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface ProjectsContextType {
  openProjects: Set<string>
  setOpenProjects: React.Dispatch<React.SetStateAction<Set<string>>>
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined)

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [openProjects, setOpenProjects] = useState<Set<string>>(new Set())

  return (
    <ProjectsContext.Provider value={{ openProjects, setOpenProjects }}>
      {children}
    </ProjectsContext.Provider>
  )
}

export function useProjects() {
  const context = useContext(ProjectsContext)
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectsProvider')
  }
  return context
}

