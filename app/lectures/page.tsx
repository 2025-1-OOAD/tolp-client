"use client"

import { useEffect, useState } from "react"
import Header from "@/components/Header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Play } from "lucide-react"
import Link from "next/link"

type Lecture = {
  id: number
  name: string
  syllabus: string
  durationDays: number
  instructorName: string
  createdAt: string
}

export default function LectureListPage() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-purple-900 mb-6">전체 강의 목록</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lectures.map((lecture) => (
            <Card key={lecture.id} className="border-purple-200 hover:shadow-lg transition">
              <CardHeader>
                <div className="aspect-video bg-purple-100 rounded-md flex items-center justify-center mb-4">
                  <Play className="h-10 w-10 text-purple-600" />
                </div>
                <CardTitle className="text-xl text-purple-900 mb-1">{lecture.name}</CardTitle>
                <p className="text-sm text-gray-500 mb-2">{lecture.syllabus}</p>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-purple-100 text-purple-700">
                        {lecture.instructorName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span>{lecture.instructorName}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{lecture.durationDays}일</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Link href={`/lectures/${lecture.id}`}>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">자세히 보기</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
