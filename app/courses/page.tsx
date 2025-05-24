"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Clock, Search, Star, Users, Video } from "lucide-react"
import Link from "next/link"

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")

  const courses = [
    {
      id: 1,
      title: "React 완전정복",
      instructor: "김개발",
      rating: 4.8,
      students: 1234,
      duration: "12시간",
      level: "중급",
      category: "프론트엔드",
      price: "₩89,000",
      description: "React의 기초부터 고급 개념까지 완벽하게 마스터하세요",
    },
    {
      id: 2,
      title: "Next.js 마스터클래스",
      instructor: "박프론트",
      rating: 4.9,
      students: 856,
      duration: "15시간",
      level: "고급",
      category: "프론트엔드",
      price: "₩120,000",
      description: "Next.js로 풀스택 웹 애플리케이션을 구축하는 방법을 배우세요",
    },
    {
      id: 3,
      title: "TypeScript 기초부터 실전까지",
      instructor: "이타입",
      rating: 4.7,
      students: 2341,
      duration: "10시간",
      level: "초급",
      category: "프로그래밍",
      price: "₩75,000",
      description: "TypeScript의 기본 문법부터 실전 프로젝트까지",
    },
    {
      id: 4,
      title: "Node.js 백엔드 개발",
      instructor: "최백엔드",
      rating: 4.6,
      students: 987,
      duration: "18시간",
      level: "중급",
      category: "백엔드",
      price: "₩95,000",
      description: "Node.js와 Express로 RESTful API를 구축하세요",
    },
    {
      id: 5,
      title: "Python 데이터 분석",
      instructor: "정데이터",
      rating: 4.8,
      students: 1567,
      duration: "14시간",
      level: "초급",
      category: "데이터사이언스",
      price: "₩85,000",
      description: "Python을 활용한 데이터 분석과 시각화를 배우세요",
    },
    {
      id: 6,
      title: "AWS 클라우드 아키텍처",
      instructor: "김클라우드",
      rating: 4.9,
      students: 743,
      duration: "20시간",
      level: "고급",
      category: "클라우드",
      price: "₩150,000",
      description: "AWS를 활용한 확장 가능한 클라우드 아키텍처 설계",
    },
  ]

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel

    return matchesSearch && matchesCategory && matchesLevel
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-purple-600" />
                <h1 className="text-2xl font-bold text-purple-900">EduPlatform</h1>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-purple-900">
                홈
              </Link>
              <Link href="/courses" className="text-purple-700 hover:text-purple-900 font-medium">
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
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                로그인
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">회원가입</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-purple-900 mb-4">강의 목록</h1>
          <p className="text-gray-600 text-lg">다양한 분야의 전문 강의를 만나보세요</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-purple-100 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="강의명 또는 강사명으로 검색"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="border-purple-200 focus:border-purple-500 focus:ring-purple-500">
                <SelectValue placeholder="카테고리" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 카테고리</SelectItem>
                <SelectItem value="프론트엔드">프론트엔드</SelectItem>
                <SelectItem value="백엔드">백엔드</SelectItem>
                <SelectItem value="프로그래밍">프로그래밍</SelectItem>
                <SelectItem value="데이터사이언스">데이터사이언스</SelectItem>
                <SelectItem value="클라우드">클라우드</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="border-purple-200 focus:border-purple-500 focus:ring-purple-500">
                <SelectValue placeholder="난이도" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 난이도</SelectItem>
                <SelectItem value="초급">초급</SelectItem>
                <SelectItem value="중급">중급</SelectItem>
                <SelectItem value="고급">고급</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            총 <span className="font-semibold text-purple-900">{filteredCourses.length}</span>개의 강의가 있습니다
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow border-purple-100">
              <div className="aspect-video bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                <Video className="h-12 w-12 text-purple-600" />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex space-x-2">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                      {course.category}
                    </Badge>
                    <Badge variant="outline" className="border-purple-300 text-purple-700">
                      {course.level}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-lg text-purple-900">{course.title}</CardTitle>
                <CardDescription className="text-gray-600">{course.instructor}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-purple-900">{course.price}</span>
                  <Link href={`/courses/${course.id}`}>
                    <Button className="bg-purple-600 hover:bg-purple-700">상세보기</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-purple-900 mb-2">검색 결과가 없습니다</h3>
            <p className="text-gray-600">다른 검색어나 필터를 시도해보세요</p>
          </div>
        )}
      </div>
    </div>
  )
}
