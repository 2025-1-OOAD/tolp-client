"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/Header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, CheckCircle, Clock, Download, MessageSquare, Play, Star, Users, Video } from "lucide-react"
import Link from "next/link"

type Lecture = {
  id: number
  name: string
  syllabus: string
  durationDays: number
  instructorName: string
  createdAt: string
}

export default function CourseDetailPage() {
  const { id } = useParams()
  const [lecture, setLecture] = useState<Lecture | null>(null)
  const [isEnrolled, setIsEnrolled] = useState(false)

  useEffect(() => {
    const fetchLecture = async () => {
      try {
        const res = await fetch("/api/lectures")
        if (!res.ok) throw new Error("강의 목록 불러오기 실패")
        const data: Lecture[] = await res.json()
        const selectedLecture = data.find((lecture) => lecture.id.toString() === id)
        setLecture(selectedLecture ?? null)
      } catch (e) {
        console.error(e)
      }
    }

    fetchLecture()
  }, [id])

  if (!lecture) return <div className="p-8 text-gray-500">강의 정보를 불러오는 중입니다...</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Link href="/courses" className="text-purple-600 hover:text-purple-800 text-sm mb-4 inline-block">
              ← 강의목록으로 돌아가기
            </Link>

            <h1 className="text-4xl font-bold text-purple-900 mb-4">{lecture.name}</h1>
            <p className="text-lg text-gray-600 mb-6">{lecture.syllabus}</p>

            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center space-x-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-purple-100 text-purple-700">
                    {lecture.instructorName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-purple-900">{lecture.instructorName}</p>
                  <p className="text-sm text-gray-500">전문 강사</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{lecture.durationDays}일</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-8 border-purple-200">
              <CardHeader>
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center mb-4">
                  <Play className="h-16 w-16 text-purple-600" />
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-900 mb-2">₩89,000</p>
                  <p className="text-sm text-gray-600">평생 소장</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isEnrolled ? (
                  <Button onClick={() => setIsEnrolled(true)} className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-3">
                    수강신청하기
                  </Button>
                ) : (
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-lg py-3">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    수강 중
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
