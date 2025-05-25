"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Clock, Star, Users, Video, Play, Download, MessageSquare, CheckCircle } from "lucide-react"
import Link from "next/link"
import Header from "@/components/Header"

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const [isEnrolled, setIsEnrolled] = useState(false)

  // Mock course data - in real app, fetch based on params.id
  const course = {
    id: 1,
    title: "React 완전정복",
    instructor: "김개발",
    rating: 4.8,
    students: 1234,
    duration: "12시간",
    level: "중급",
    category: "프론트엔드",
    price: "₩89,000",
    description:
      "React의 기초부터 고급 개념까지 완벽하게 마스터하세요. 실무에서 바로 활용할 수 있는 실전 프로젝트와 함께 React의 모든 것을 배워보세요.",
    whatYouWillLearn: [
      "React 기본 개념과 JSX 문법",
      "컴포넌트 설계와 상태 관리",
      "React Hooks 완전 정복",
      "Context API와 전역 상태 관리",
      "React Router를 활용한 SPA 구현",
      "성능 최적화 기법",
      "테스팅과 디버깅",
      "실전 프로젝트 구현",
    ],
    curriculum: [
      {
        title: "React 기초",
        lessons: [
          { title: "React 소개와 환경 설정", duration: "15분", completed: false },
          { title: "JSX 문법과 컴포넌트", duration: "20분", completed: false },
          { title: "Props와 State", duration: "25분", completed: false },
        ],
      },
      {
        title: "React Hooks",
        lessons: [
          { title: "useState와 useEffect", duration: "30분", completed: false },
          { title: "useContext와 useReducer", duration: "25분", completed: false },
          { title: "Custom Hooks 만들기", duration: "20분", completed: false },
        ],
      },
      {
        title: "고급 개념",
        lessons: [
          { title: "성능 최적화", duration: "35분", completed: false },
          { title: "React Router", duration: "30분", completed: false },
          { title: "상태 관리 라이브러리", duration: "40분", completed: false },
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        name: "이학생",
        rating: 5,
        comment: "정말 체계적이고 이해하기 쉽게 설명해주셔서 React를 완전히 이해할 수 있었습니다!",
        date: "2024-01-15",
      },
      {
        id: 2,
        name: "박개발자",
        rating: 4,
        comment: "실무에 바로 적용할 수 있는 내용들이 많아서 도움이 되었습니다.",
        date: "2024-01-10",
      },
    ],
  }

  const handleEnroll = () => {
    setIsEnrolled(true)
    // In real app, handle enrollment logic here
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* Header */}
      <Header/>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Course Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="mb-4">
              <Link href="/courses" className="text-purple-600 hover:text-purple-800 text-sm">
                ← 강의목록으로 돌아가기
              </Link>
            </div>

            <div className="flex space-x-2 mb-4">
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                {course.category}
              </Badge>
              <Badge variant="outline" className="border-purple-300 text-purple-700">
                {course.level}
              </Badge>
            </div>

            <h1 className="text-4xl font-bold text-purple-900 mb-4">{course.title}</h1>
            <p className="text-lg text-gray-600 mb-6">{course.description}</p>

            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center space-x-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-purple-100 text-purple-700">김</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-purple-900">{course.instructor}</p>
                  <p className="text-sm text-gray-500">전문 강사</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{course.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{course.students.toLocaleString()}명 수강</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enrollment Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 border-purple-200">
              <CardHeader>
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center mb-4">
                  <Play className="h-16 w-16 text-purple-600" />
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-900 mb-2">{course.price}</p>
                  <p className="text-sm text-gray-600">평생 소장</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isEnrolled ? (
                  <Button onClick={handleEnroll} className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-3">
                    수강신청하기
                  </Button>
                ) : (
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-lg py-3">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    수강 중
                  </Button>
                )}

                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Video className="h-4 w-4 text-purple-600" />
                    <span>온라인 동영상 강의</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Download className="h-4 w-4 text-purple-600" />
                    <span>강의 자료 다운로드</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4 text-purple-600" />
                    <span>Q&A 게시판 이용</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-purple-600" />
                    <span>수료증 발급</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Course Content Tabs */}
        <Tabs defaultValue="curriculum" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-purple-50">
            <TabsTrigger
              value="curriculum"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              커리큘럼
            </TabsTrigger>
            <TabsTrigger value="about" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              강의 소개
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              수강후기
            </TabsTrigger>
          </TabsList>

          <TabsContent value="curriculum" className="mt-6">
            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-900">강의 커리큘럼</CardTitle>
                <CardDescription>
                  총 {course.curriculum.reduce((acc, section) => acc + section.lessons.length, 0)}개 강의 ·{" "}
                  {course.duration}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {course.curriculum.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="border border-purple-100 rounded-lg p-4">
                      <h3 className="font-semibold text-purple-900 mb-3">{section.title}</h3>
                      <div className="space-y-2">
                        {section.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lessonIndex}
                            className="flex items-center justify-between p-2 hover:bg-purple-50 rounded"
                          >
                            <div className="flex items-center space-x-3">
                              <Play className="h-4 w-4 text-purple-600" />
                              <span className="text-sm">{lesson.title}</span>
                            </div>
                            <span className="text-sm text-gray-500">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about" className="mt-6">
            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-900">이 강의에서 배우는 것</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.whatYouWillLearn.map((item, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-900">수강후기</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-semibold">{course.rating}</span>
                  </div>
                  <span className="text-gray-500">({course.students.toLocaleString()}개 후기)</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {course.reviews.map((review) => (
                    <div key={review.id} className="border-b border-purple-100 pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-purple-100 text-purple-700">{review.name[0]}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{review.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
