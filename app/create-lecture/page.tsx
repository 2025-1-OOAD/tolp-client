'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import Header from '@/components/Header'
import { useRoleRedirect } from '@/hooks/use-role-redirect'


export default function CreateLecturePage() {
  useRoleRedirect(['INSTRUCTOR'])
  const router = useRouter()

  const [lectureData, setLectureData] = useState({
    name: '',
    syllabus: '',
    durationDays: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLectureData({
      ...lectureData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async () => {
    const token = localStorage.getItem('token')
    const instructorId = parseJwt(token)?.userId

    const res = await fetch('http://localhost:8080/api/lectures/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...lectureData,
        durationDays: parseInt(lectureData.durationDays),
        instructorId,
      }),
    })

    if (res.ok) {
      alert('강의가 성공적으로 개설되었습니다.')
      router.push('/mypage')
    } else {
      alert('강의 개설에 실패했습니다.')
    }
  }

  // JWT에서 instructorId 파싱
  const parseJwt = (token: string | null): any => {
    if (!token) return null
    try {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
          .join('')
      )
      return JSON.parse(jsonPayload)
    } catch (e) {
      return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-purple-900 mb-6">강의 개설</h1>

        <div className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-purple-700">강의명</Label>
            <Input
              id="name"
              name="name"
              value={lectureData.name}
              onChange={handleChange}
              placeholder="예: Next.js 완전정복"
              className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <div>
            <Label htmlFor="syllabus" className="text-purple-700">강의 계획</Label>
            <Textarea
              id="syllabus"
              name="syllabus"
              value={lectureData.syllabus}
              onChange={handleChange}
              placeholder="이 강의에서 다룰 내용을 적어주세요"
              className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
              rows={5}
            />
          </div>

          <div>
            <Label htmlFor="durationDays" className="text-purple-700">수강 기간 (일)</Label>
            <Input
              id="durationDays"
              name="durationDays"
              type="number"
              value={lectureData.durationDays}
              onChange={handleChange}
              placeholder="예: 30"
              className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <Button
            className="bg-purple-600 hover:bg-purple-700 text-white w-full"
            onClick={handleSubmit}
          >
            강의 개설하기
          </Button>
        </div>
      </div>
    </div>
  )
}
