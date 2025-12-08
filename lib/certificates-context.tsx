'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface CertificatesContextType {
  openCertificates: Set<string>
  setOpenCertificates: React.Dispatch<React.SetStateAction<Set<string>>>
}

const CertificatesContext = createContext<CertificatesContextType | undefined>(undefined)

export function CertificatesProvider({ children }: { children: ReactNode }) {
  const [openCertificates, setOpenCertificates] = useState<Set<string>>(new Set())

  return (
    <CertificatesContext.Provider value={{ openCertificates, setOpenCertificates }}>
      {children}
    </CertificatesContext.Provider>
  )
}

export function useCertificates() {
  const context = useContext(CertificatesContext)
  if (context === undefined) {
    throw new Error('useCertificates must be used within a CertificatesProvider')
  }
  return context
}

