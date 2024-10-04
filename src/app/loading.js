'use client'

import { useEffect, useState } from 'react'

export default function Loading() {
  const [isFirstLoad, setIsFirstLoad] = useState(true)

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('hasLoaded')
    if (hasLoaded) {
      setIsFirstLoad(false)
    } else {
      sessionStorage.setItem('hasLoaded', 'true')
    }
  }, [])

  if (!isFirstLoad) {
    return null
  }

  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>コンテンツを読み込んでいます...</p>
    </div>
  )
}