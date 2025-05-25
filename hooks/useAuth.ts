'use client'

import { useEffect, useState } from 'react'

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setIsLoggedIn(false)
      return
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const now = Math.floor(Date.now() / 1000)
      if (payload.exp && payload.exp > now) {
        setIsLoggedIn(true)
      } else {
        // 만료된 토큰이면 삭제
        localStorage.removeItem('token')
        setIsLoggedIn(false)
      }
    } catch (e) {
      setIsLoggedIn(false)
    }
  }, [])

  return { isLoggedIn }
}

