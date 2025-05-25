'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import axios from 'axios' 

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/users/login', { email, password })
      localStorage.setItem('token', res.data.token)
      // ✅ 콘솔에 토큰 출력
      console.log('로그인 성공! 받은 토큰:', res.data)
      console.log('localStorage에서 읽은 토큰:', localStorage.getItem('token'))
      alert('로그인 성공!')
      router.push('/mypage')
    } catch (err) {
      alert('로그인 실패. 다시 시도해주세요.')
      console.error('로그인 에러:', err)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token') // 클라이언트에서 토큰 삭제
    alert('로그아웃 되었습니다.')
    router.push('/login')
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white">
      <Card className="w-full max-w-md border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-900 text-2xl">로그인</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
          />
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
          />
          <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={handleLogin}>
            로그인
          </Button>
          <p className="text-sm text-center text-gray-600">
            아직 계정이 없으신가요?{' '}
            <Link href="/signup" className="text-purple-600 hover:underline">
              회원가입
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
