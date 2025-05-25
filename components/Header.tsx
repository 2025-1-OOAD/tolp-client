'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { getUserRole } from '@/hooks/getUserRole'
import { useEffect, useState } from 'react'

function getUserRoleFromToken() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  if (!token) {
    console.log('[Token] 토큰 없음')
    return null

  }  

  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join('')
    )
    const parsed = JSON.parse(jsonPayload)
    console.log('[Token] payload: ', parsed)
    return parsed.role
  } catch (e) {
    console.error('[Token] 디코딩 실패: ', e)
    return null
  }
}

export default function Header() {
  const { isLoggedIn } = useAuth()
  const router = useRouter()
  const [role, setRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const r = getUserRoleFromToken()
    console.log('[Header] 추출된 role: ', r)
    setRole(r)
    setLoading(false)
  }, [])

  console.log('[Header] 렌더링 상태: isLoggedIn =', isLoggedIn, ', role =', role, ', loading =', loading)


  const handleLogout = () => {
    localStorage.removeItem('token')
    alert('로그아웃 되었습니다.')
    router.push('/login')
  }

  return (
    <header className="bg-white shadow-sm border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-purple-600" />
              <h1 className="text-2xl font-bold text-purple-900">EduPlatform</h1>
            </Link>
          </div>

          {!loading && isLoggedIn && (
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-purple-900">
                홈
              </Link>
              <Link href="/courses" className="text-gray-600 hover:text-purple-900">
                강의목록
              </Link>
              <Link href="/schedule" className="text-gray-600 hover:text-purple-900">
                시간표
              </Link>
              <Link href="/todo" className="text-gray-600 hover:text-purple-900">
                투두리스트
              </Link>
              <Link href="/mypage" className="text-gray-600 hover:text-purple-900">
                마이페이지
              </Link>

              {/* 👇 INSTRUCTOR 전용 메뉴 */}
              {role === 'INSTRUCTOR' && (
                <Link href="/create-lecture" className="text-purple-700 font-semibold hover:underline">
                  강의 개설
                </Link>
              )}
            </nav>
          )}

          <div className="flex items-center space-x-4">
            {!isLoggedIn && (
              <>
                <Link href="/login">
                  <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                    로그인
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    회원가입
                  </Button>
                </Link>
              </>
            )}
            {isLoggedIn && (
            
            <Button 
                variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50"
                onClick={handleLogout}
            >
                로그아웃
            </Button>
              
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
