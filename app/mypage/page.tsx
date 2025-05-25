"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { BookOpen, User, Settings, LogOut, Edit, Star, Award, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useAuthRedirect } from '@/hooks/use-auth-redirect'
import { useRouter } from 'next/navigation'

export default function MyPage() {

  const router = useRouter()
  useAuthRedirect() // 로그인 안 되어 있으면 /login으로 보내버림

  const handleLogout = () => {
    localStorage.removeItem('token')
    alert('로그아웃 되었습니다.')
    router.push('/login')
  }



  const [isEditing, setIsEditing] = useState(false)
  const [userInfo, setUserInfo] = useState({
    name: "김학생",
    email: "student@example.com",
    phone: "010-1234-5678",
    bio: "열정적인 개발자가 되기 위해 공부하고 있습니다.",
  })

  const myCourses = [
    {
      id: 1,
      title: "React 완전정복",
      instructor: "김개발",
      progress: 75,
      totalLessons: 24,
      completedLessons: 18,
      rating: 4.8,
      enrollDate: "2024-01-01",
      status: "진행중",
    },
    {
      id: 2,
      title: "Next.js 마스터클래스",
      instructor: "박프론트",
      progress: 45,
      totalLessons: 30,
      completedLessons: 14,
      rating: 4.9,
      enrollDate: "2024-01-10",
      status: "진행중",
    },
    {
      id: 3,
      title: "TypeScript 기초부터 실전까지",
      instructor: "이타입",
      progress: 100,
      totalLessons: 20,
      completedLessons: 20,
      rating: 4.7,
      enrollDate: "2023-12-15",
      status: "완료",
    },
  ]

  const achievements = [
    {
      id: 1,
      title: "첫 강의 완주",
      description: "첫 번째 강의를 완주했습니다",
      icon: "🎯",
      date: "2024-01-15",
    },
    {
      id: 2,
      title: "연속 학습 7일",
      description: "7일 연속으로 학습했습니다",
      icon: "🔥",
      date: "2024-01-20",
    },
    {
      id: 3,
      title: "우수 수강생",
      description: "평균 평점 4.5 이상을 기록했습니다",
      icon: "⭐",
      date: "2024-01-22",
    },
  ]

  const learningStats = {
    totalCourses: 3,
    completedCourses: 1,
    totalHours: 47,
    averageRating: 4.8,
    streak: 12,
  }

  const handleSaveProfile = () => {
    setIsEditing(false)
    // In real app, save to backend
  }

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
              <Link href="/courses" className="text-gray-600 hover:text-purple-900">
                강의목록
              </Link>
              <Link href="/schedule" className="text-gray-600 hover:text-purple-900">
                시간표
              </Link>
              <Link href="/todo" className="text-gray-600 hover:text-purple-900">
                투두리스트
              </Link>
              <Link href="/mypage" className="text-purple-700 hover:text-purple-900 font-medium">
                마이페이지
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                  로그인
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="border-purple-300 text-purple-700 hover:bg-purple-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  로그아웃
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-purple-600 hover:bg-purple-700">회원가입</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-purple-900 mb-4">마이페이지</h1>
          <p className="text-gray-600 text-lg">내 학습 현황과 정보를 관리하세요</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="border-purple-200">
              <CardHeader className="text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-purple-100 text-purple-700 text-2xl">{userInfo.name[0]}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-purple-900">{userInfo.name}</CardTitle>
                <CardDescription>{userInfo.email}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold text-purple-900">{learningStats.totalCourses}</p>
                        <p className="text-gray-600">수강 강의</p>
                      </div>
                      <div>
                        <p className="font-semibold text-purple-900">{learningStats.completedCourses}</p>
                        <p className="text-gray-600">완료 강의</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">학습 시간</span>
                      <span className="font-medium text-purple-900">{learningStats.totalHours}시간</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">연속 학습</span>
                      <span className="font-medium text-purple-900">{learningStats.streak}일</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">평균 평점</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-medium text-purple-900">{learningStats.averageRating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6 border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-900 flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>이번 주 학습</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">학습 시간</span>
                    <span className="font-semibold text-purple-900">8시간</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">완료한 강의</span>
                    <span className="font-semibold text-purple-900">5개</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">목표 달성률</span>
                    <span className="font-semibold text-green-600">80%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="courses" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-purple-50">
                <TabsTrigger
                  value="courses"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                >
                  내 강의
                </TabsTrigger>
                <TabsTrigger
                  value="achievements"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                >
                  성취
                </TabsTrigger>
                <TabsTrigger
                  value="profile"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                >
                  프로필
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                >
                  설정
                </TabsTrigger>
              </TabsList>

              <TabsContent value="courses" className="mt-6">
                <div className="space-y-6">
                  {myCourses.map((course) => (
                    <Card key={course.id} className="border-purple-200">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-lg font-semibold text-purple-900">{course.title}</h3>
                              <Badge
                                variant={course.status === "완료" ? "default" : "secondary"}
                                className={
                                  course.status === "완료" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                                }
                              >
                                {course.status}
                              </Badge>
                            </div>
                            <p className="text-gray-600 mb-2">{course.instructor}</p>
                            <p className="text-sm text-gray-500">수강 시작: {course.enrollDate}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-1 mb-2">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium">{course.rating}</span>
                            </div>
                            <Link href={`/courses/${course.id}`}>
                              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                                강의 보기
                              </Button>
                            </Link>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">진행률</span>
                            <span className="font-medium text-purple-900">
                              {course.completedLessons}/{course.totalLessons} ({course.progress}%)
                            </span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="achievements" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {achievements.map((achievement) => (
                    <Card key={achievement.id} className="border-purple-200">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="text-4xl">{achievement.icon}</div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-purple-900 mb-1">{achievement.title}</h3>
                            <p className="text-gray-600 text-sm mb-2">{achievement.description}</p>
                            <p className="text-xs text-gray-500">{achievement.date}</p>
                          </div>
                          <Award className="h-5 w-5 text-yellow-500" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="profile" className="mt-6">
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-purple-900">프로필 정보</CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(!isEditing)}
                        className="border-purple-300 text-purple-700 hover:bg-purple-50"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        {isEditing ? "취소" : "편집"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">이름</Label>
                        <Input
                          id="name"
                          value={userInfo.name}
                          onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                          disabled={!isEditing}
                          className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">이메일</Label>
                        <Input
                          id="email"
                          type="email"
                          value={userInfo.email}
                          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                          disabled={!isEditing}
                          className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">전화번호</Label>
                      <Input
                        id="phone"
                        value={userInfo.phone}
                        onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                        disabled={!isEditing}
                        className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="bio">자기소개</Label>
                      <textarea
                        id="bio"
                        value={userInfo.bio}
                        onChange={(e) => setUserInfo({ ...userInfo, bio: e.target.value })}
                        disabled={!isEditing}
                        className="w-full p-2 border border-purple-200 rounded-md focus:border-purple-500 focus:ring-purple-500 disabled:bg-gray-50"
                        rows={3}
                      />
                    </div>

                    {isEditing && (
                      <div className="flex space-x-2">
                        <Button onClick={handleSaveProfile} className="bg-purple-600 hover:bg-purple-700">
                          저장
                        </Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          취소
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="mt-6">
                <div className="space-y-6">
                  <Card className="border-purple-200">
                    <CardHeader>
                      <CardTitle className="text-purple-900">알림 설정</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">이메일 알림</p>
                          <p className="text-sm text-gray-600">새로운 강의 및 공지사항</p>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">푸시 알림</p>
                          <p className="text-sm text-gray-600">강의 시작 알림</p>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">마케팅 알림</p>
                          <p className="text-sm text-gray-600">할인 및 이벤트 정보</p>
                        </div>
                        <input type="checkbox" className="rounded" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-200">
                    <CardHeader>
                      <CardTitle className="text-purple-900">계정 관리</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button
                        variant="outline"
                        className="w-full justify-start border-purple-300 text-purple-700 hover:bg-purple-50"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        비밀번호 변경
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start border-red-300 text-red-700 hover:bg-red-50"
                      >
                        <User className="h-4 w-4 mr-2" />
                        회원 탈퇴
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
