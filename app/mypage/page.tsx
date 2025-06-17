"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  useAuthRedirect()

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
      .get(`http://localhost:8080/api/users/user-info`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        setUserInfo(res.data)
        const lectureApi =
          res.data.role === 'INSTRUCTOR'
            ? 'http://localhost:8080/api/lectures/my'
            : 'http://localhost:8080/api/enrollments/myLectures'

        return axios.get(lectureApi, {
          headers: { Authorization: `Bearer ${token}` }
        })
      })
      .then((res) => setMyCourses(res.data))
      .catch((err) => {
        console.error("유저 정보 또는 강의 정보 조회 실패", err)
        router.push("/login")
      })
  }, [])

  if (!userInfo) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-purple-900 mb-4">마이페이지</h1>
          <p className="text-gray-600 text-lg">내 정보를 확인하세요</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 프로필 카드 */}
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

          {/* 강의/프로필 */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="courses" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-purple-50">
                <TabsTrigger value="courses" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">내 강의</TabsTrigger>
                <TabsTrigger value="profile" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">프로필</TabsTrigger>
              </TabsList>

              <TabsContent value="courses" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {myCourses.map((course) => {
                    const isInstructor = userInfo.role === 'INSTRUCTOR'
                    const lectureId = isInstructor ? course.id : course.lectureId
                    const courseTitle = isInstructor ? course.name ?? "강의명 없음" : course.lectureName ?? "강의명 없음"

                    let remainingDays = null
                    if (!isInstructor && course.accessDeadline) {
                      const today = new Date()
                      const deadline = new Date(course.accessDeadline)
                      remainingDays = Math.max(0, Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)))
                    }

                    return (
                      <Link href={`/lectures/${lectureId}`} key={lectureId}>
                        <Card className="border-purple-200 hover:shadow-md transition cursor-pointer">
                          <CardContent className="p-6">
                            <div className="flex flex-col items-center text-center">
                              <Avatar className="h-16 w-16 mb-4">
                                <AvatarImage src="/placeholder.svg" />
                                <AvatarFallback className="bg-purple-100 text-purple-700 text-xl">{courseTitle[0]}</AvatarFallback>
                              </Avatar>
                              <p className="text-lg font-semibold text-purple-900">{courseTitle}</p>

                              {isInstructor && course.createdAt && (
                                <p className="text-xs text-gray-400 mt-1">개설일: {new Date(course.createdAt).toLocaleDateString()}</p>
                              )}

                              {!isInstructor && remainingDays !== null && (
                                <p className="text-xs text-gray-400 mt-1">남은 수강 기간: {remainingDays}일</p>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    )
                  })}
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
                        <Input id="name" value={userInfo.name} disabled className="border-purple-200 focus:border-purple-500 focus:ring-purple-500" />
                      </div>
                      <div>
                        <Label htmlFor="email">이메일</Label>
                        <Input id="email" type="email" value={userInfo.email} disabled className="border-purple-200 focus:border-purple-500 focus:ring-purple-500" />
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
