'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function useRoleRedirect(allowedRoles: string[]) {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    try {
      const payload = JSON.parse(
        atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))
      )

      const role = payload?.role
      if (!allowedRoles.includes(role)) {
        alert('접근 권한이 없습니다.')
        router.push('/')
      }
    } catch (e) {
      router.push('/login')
    }
  }, [router, allowedRoles])
}
