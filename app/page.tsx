"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, Search, Star, Users, Video, Calendar, CheckSquare } from "lucide-react"
import Link from "next/link"
import Header from "@/components/Header"

type Lecture = {
  id: number
  name: string
  syllabus: string
  durationDays: number
  instructorName: string
  createdAt: string
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [lectures, setLectures] = useState<Lecture[]>([])
  
    useEffect(() => {
      const fetchLectures = async () => {
        try {
          const res = await fetch("http://localhost:8080/api/lectures")
          if (!res.ok) throw new Error("강의 목록 불러오기 실패")
          const data: Lecture[] = await res.json()
          setLectures(data)
        } catch (e) {
          console.error(e)
        }
      }
  
      fetchLectures()
    }, [])

  // const featuredCourses = [
  //   {
  //     id: 1,
  //     title: "React 완전정복",
  //     instructor: "김개발",
  //     rating: 4.8,
  //     students: 1234,
  //     duration: "12시간",
  //     thumbnail: "/placeholder.svg?height=200&width=300",
  //     price: "₩89,000",
  //   },
  //   {
  //     id: 2,
  //     title: "Next.js 마스터클래스",
  //     instructor: "박프론트",
  //     rating: 4.9,
  //     students: 856,
  //     duration: "15시간",
  //     thumbnail: "/placeholder.svg?height=200&width=300",
  //     price: "₩120,000",
  //   },
  //   {
  //     id: 3,
  //     title: "TypeScript 기초부터 실전까지",
  //     instructor: "이타입",
  //     rating: 4.7,
  //     students: 2341,
  //     duration: "10시간",
  //     thumbnail: "/placeholder.svg?height=200&width=300",
  //     price: "₩75,000",
  //   },
  // ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* Header */}
      <Header/>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-purple-900 mb-6">당신의 학습 여정을 시작하세요</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            전문가들이 제작한 고품질 강의로 새로운 스킬을 배우고 성장하세요
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="어떤 강의를 찾고 계신가요?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg border-purple-200 focus:border-purple-500 focus:ring-purple-500"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700">
                검색
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Video className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-purple-900">1,000+</h3>
              <p className="text-gray-600">온라인 강의</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-purple-900">50,000+</h3>
              <p className="text-gray-600">수강생</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-purple-900">4.8/5</h3>
              <p className="text-gray-600">평균 만족도</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-purple-900 mb-4">인기 강의</h2>
            <p className="text-gray-600">가장 많은 수강생들이 선택한 강의들을 만나보세요</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lectures.map((lecture) => (
              <Card key={lecture.id} className="overflow-hidden hover:shadow-lg transition-shadow border-purple-100">
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                  <Video className="h-12 w-12 text-purple-600" />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                      인기
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      {/* <span className="text-sm font-medium">{lecture.rating}</span> */}
                    </div>
                  </div>
                  <CardTitle className="text-lg text-purple-900">{lecture.name}</CardTitle>
                  <CardDescription className="text-gray-600">{lecture.instructorName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        {/* <span>{lecture.students.toLocaleString()}</span> */}
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{lecture.durationDays}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    {/* <span className="text-2xl font-bold text-purple-900">{lecture.price}</span> */}
                    <Button className="bg-purple-600 hover:bg-purple-700">자세히 보기</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-16 px-4 bg-purple-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-purple-900 text-center mb-12">빠른 접근</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/courses">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-purple-200">
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">강의 목록</h3>
                  <p className="text-gray-600 text-sm">모든 강의를 둘러보세요</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/schedule">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-purple-200">
                <CardContent className="p-6 text-center">
                  <Calendar className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">시간표</h3>
                  <p className="text-gray-600 text-sm">내 수강 일정을 확인하세요</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/todo">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-purple-200">
                <CardContent className="p-6 text-center">
                  <CheckSquare className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">투두리스트</h3>
                  <p className="text-gray-600 text-sm">과제와 할 일을 관리하세요</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/mypage">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-purple-200">
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">마이페이지</h3>
                  <p className="text-gray-600 text-sm">내 정보를 관리하세요</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <BookOpen className="h-8 w-8" />
            <h3 className="text-2xl font-bold">EduPlatform</h3>
          </div>
          <p className="text-purple-200 mb-6">최고의 온라인 학습 경험을 제공합니다</p>
          <div className="flex justify-center space-x-8 text-sm text-purple-200">
            <Link href="/about" className="hover:text-white">
              회사소개
            </Link>
            <Link href="/contact" className="hover:text-white">
              문의하기
            </Link>
            <Link href="/terms" className="hover:text-white">
              이용약관
            </Link>
            <Link href="/privacy" className="hover:text-white">
              개인정보처리방침
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
