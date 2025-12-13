'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface EducationContextType {
  openEducation: Set<string>
  setOpenEducation: React.Dispatch<React.SetStateAction<Set<string>>>
}

const EducationContext = createContext<EducationContextType | undefined>(undefined)

export function EducationProvider({ children }: { children: ReactNode }) {
  const [openEducation, setOpenEducation] = useState<Set<string>>(new Set())

  return (
    <EducationContext.Provider value={{ openEducation, setOpenEducation }}>
      {children}
    </EducationContext.Provider>
  )
}

export function useEducation() {
  const context = useContext(EducationContext)
  if (context === undefined) {
    throw new Error('useEducation must be used within an EducationProvider')
  }
  return context
}

