'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import axios from 'axios'

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('STUDENT')
  

  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:8080/api/users/signup', { name, email, password, role })
      alert('회원가입 성공! 로그인 해주세요.')
      router.push('/login')
    } catch (err) {
      alert('회원가입 실패. 입력값을 확인해주세요.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white">
      <Card className="w-full max-w-md border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-900 text-2xl">회원가입</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
          />
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

          <select
            className="w-full border border-purple-200 rounded-md p-2"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="STUDENT">학생</option>
            <option value="INSTRUCTOR">강사</option>
          </select>


          <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={handleSignup}>
            회원가입
          </Button>
          <p className="text-sm text-center text-gray-600">
            이미 계정이 있으신가요?{' '}
            <Link href="/login" className="text-purple-600 hover:underline">
              로그인
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
