'use client'

import { useEffect } from 'react'
import { enableVisualEditing } from '@sanity/visual-editing'

export function VisualEditingComponent() {
  useEffect(() => {
    const disable = enableVisualEditing()
    return () => {
      disable()
    }
  }, [])
  
  return null
}
