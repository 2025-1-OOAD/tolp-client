"use client"

import { useState, useEffect } from "react"
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
import Header from "@/components/Header"
import axios from "axios"

export default function MyPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [userInfo, setUserInfo] = useState<any>(null)
  const [myCourses, setMyCourses] = useState<any[]>([])

  const router = useRouter()
  useAuthRedirect() // 로그인 안 되어 있으면 /login으로 보내버림

  const handleLogout = () => {
    localStorage.removeItem('token')
    alert('로그아웃 되었습니다.')
    router.push('/login')
  }


  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    axios
      .get("http://localhost:8080/api/users/user-info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserInfo(res.data)
      })
      .catch((err) => {
        console.error("유저 정보를 가져오지 못 했습니다.", err)
        router.push("/login")
      })

    axios
      .get("http://localhost:8080/api/mylectures", {    // 내 강의 목록 엔드포인트 수정 필요
        headers: {Authorization: `Bearer ${token}` },
      })
      .then((res) => setMyCourses(res.data))
      .catch((err) => console.error("강의 정보를 가져오지 못 했습니다.", err))
  }, [])

  if (!userInfo) return null


  const handleSaveProfile = () => {
    setIsEditing(false)
    // In real app, save to backend
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* Header */}
      <Header/>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-purple-900 mb-4">마이페이지</h1>
          <p className="text-gray-600 text-lg">내 정보를 확인하세요</p>
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
              
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="courses" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-purple-50">
                <TabsTrigger
                  value="courses"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                >
                  내 강의
                </TabsTrigger>
                <TabsTrigger
                  value="profile"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                >
                  프로필
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
                            <Link href={`/courses/${course.id}`}>
                              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                                강의 보기
                              </Button>
                            </Link>
                          </div>
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

                  </CardContent>
                </Card>
              </TabsContent>

            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
