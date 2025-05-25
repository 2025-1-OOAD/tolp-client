'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Header() {
  const { isLoggedIn } = useAuth()

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

          {isLoggedIn && (
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
              <Link href="/logout">
                <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                  로그아웃
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
