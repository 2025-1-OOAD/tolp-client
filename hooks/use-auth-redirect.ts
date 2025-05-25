// hooks/use-auth-redirect.ts
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios' 

export function useAuthRedirect() {
  const router = useRouter()

  // 예: app/mypage/page.tsx 안 useEffect 등에서
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token')
      if (!token) return

      const res = await axios.get('http://localhost:8080/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      console.log(res.data) // ✅ 유저 정보
    }

    fetchUser()
  }, [])

}
