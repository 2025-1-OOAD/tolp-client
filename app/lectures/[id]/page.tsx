"use client"

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { useAuth } from '@/hooks/useAuth'
import Header from '@/components/Header'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface Lecture {
  id: number
  name: string
  syllabus: string
  durationDays: number
  instructorName: string
  createdAt: string
}

interface Video {
  id: number
  title: string
  videoUrl: string
  postedAt: string
}

export default function LectureDetailPage() {
  const { id } = useParams()
  const { isLoggedIn } = useAuth()
  const [role, setRole] = useState<string | null>(null)
  const [lecture, setLecture] = useState<Lecture | null>(null)
  const [videos, setVideos] = useState<Video[]>([])
  const [newVideo, setNewVideo] = useState({ title: '', videoUrl: '' })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        setRole(payload.role || null)
      } catch (e) {
        console.error('토큰 파싱 실패:', e)
        setRole(null)
      }
    }
  }, [])

  useEffect(() => {
    const fetchLecture = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/lectures/${id}`)
        setLecture(res.data)
      } catch (err) {
        console.error('강의 정보 불러오기 실패:', err)
      }
    }

    const fetchVideos = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/lecture-videos/lecture/${id}`)
        setVideos(res.data)
      } catch (err) {
        console.error('강의 영상 목록 불러오기 실패:', err)
      }
    }

    if (id) {
      fetchLecture()
      fetchVideos()
    }
  }, [id])

  const handleVideoUpload = async () => {
    if (!newVideo.title || !newVideo.videoUrl) return alert('제목과 URL을 입력하세요.')
    try {
      const token = localStorage.getItem('token')
      await axios.post(
        'http://localhost:8080/api/lecture-videos',
        { ...newVideo, lectureId: Number(id) },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      alert('영상이 업로드되었습니다.')
      setNewVideo({ title: '', videoUrl: '' })
      const res = await axios.get(`http://localhost:8080/api/lecture-videos/lecture/${id}`)
      setVideos(res.data)
    } catch (err) {
      console.error('영상 업로드 실패:', err)
      alert('업로드 실패')
    }
  }

  if (!lecture) return <p className="p-8">로딩 중...</p>

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="mb-6 border-purple-300">
          <CardHeader>
            <CardTitle className="text-2xl text-purple-800">{lecture.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-2">강의 설명: {lecture.syllabus}</p>
            <p className="text-gray-500">강사: {lecture.instructorName}</p>
            <p className="text-gray-500">수강 기간: {lecture.durationDays}일</p>
          </CardContent>
        </Card>

        {role === 'INSTRUCTOR' && (
          <Card className="mb-8 border-purple-300">
            <CardHeader>
              <CardTitle className="text-lg">영상 업로드</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Input
                placeholder="영상 제목"
                value={newVideo.title}
                onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
              />
              <Input
                placeholder="YouTube embed 링크 혹은 비디오 URL"
                value={newVideo.videoUrl}
                onChange={(e) => setNewVideo({ ...newVideo, videoUrl: e.target.value })}
              />
              <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleVideoUpload}>
                업로드
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-purple-800">강의 영상 목록</h2>
          {videos.map((video) => (
            <Card key={video.id} className="border border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-900">{video.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <iframe
                  src={video.videoUrl}
                  title={video.title}
                  width="100%"
                  height="315"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}