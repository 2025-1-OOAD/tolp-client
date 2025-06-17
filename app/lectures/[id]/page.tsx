"use client"

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { useAuth } from '@/hooks/useAuth'
import Header from '@/components/Header'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Trash } from 'lucide-react'

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
  const [instructorName, setInstructorName] = useState<string | null>(null)
  const [lecture, setLecture] = useState<Lecture | null>(null)
  const [videos, setVideos] = useState<Video[]>([])
  const [newVideo, setNewVideo] = useState({ title: '', videoUrl: '' })
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [isInstructorOfLecture, setIsInstructorOfLecture] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        setRole(payload.role || null)
        setInstructorName(payload.sub || null)
      } catch (e) {
        console.error('토큰 파싱 실패:', e)
        setRole(null)
        setInstructorName(null)
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

  useEffect(() => {
    const checkEnrollment = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get(`http://localhost:8080/api/enrollments/myLectures`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const enrolledLectures = res.data
        setIsEnrolled(enrolledLectures.some((e: any) => e.lectureName === lecture?.name))
      } catch (err) {
        console.error('수강 여부 확인 실패:', err)
      }
    }

    if (lecture) checkEnrollment()
  }, [lecture])

  useEffect(() => {
    if (lecture && instructorName) {
      setIsInstructorOfLecture(lecture.instructorName === instructorName)
    }
  }, [lecture, instructorName])

  const handleEnroll = async () => {
    try {
      const token = localStorage.getItem('token')
      await axios.post(
        'http://localhost:8080/api/enrollments',
        { lectureId: lecture?.id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      alert('수강신청이 완료되었습니다.')
      setIsEnrolled(true)
    } catch (err) {
      console.error('수강신청 실패:', err)
      alert('수강신청 실패')
    }
  }

  const handleVideoUpload = async () => {
    if (!newVideo.title || !newVideo.videoUrl) return alert('제목과 URL을 입력하세요.')
    try {
      const token = localStorage.getItem('token')
      await axios.post(
        `http://localhost:8080/api/lecture-videos`,
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

  const handleDeleteVideo = async (videoId: number) => {
    if (!confirm('정말로 이 영상을 삭제하시겠습니까?')) return;

    try {
      const token = localStorage.getItem('token')
      await axios.delete(`http://localhost:8080/api/lecture-videos/${videoId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('영상이 삭제되었습니다.');
      const res = await axios.get(`http://localhost:8080/api/lecture-videos/lecture/${id}`);
      setVideos(res.data);
    } catch (err) {
      console.error('영상 삭제 실패:', err);
      alert('삭제 실패');
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

            <div className="mt-4">
              <Link href={`/lectures/${id}/qna`}>
                <Button className="bg-purple-600 hover:bg-purple-700">질문 게시판</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {!isEnrolled && role === 'STUDENT' && (
          <Button onClick={handleEnroll} className="bg-blue-500 hover:bg-blue-600 text-white mb-6">
            수강신청하기
          </Button>
        )}

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
  <div className="flex justify-between items-center w-full">
    <CardTitle className="text-purple-900">{video.title}</CardTitle>
    {isInstructorOfLecture && (
      <Button variant="outline" size="icon" onClick={() => handleDeleteVideo(video.id)}>
        <Trash className="w-4 h-4 text-red-600" />
      </Button>
    )}
  </div>
</CardHeader>


              <CardContent>
                {(isEnrolled || isInstructorOfLecture ) ? (
                  <iframe
                    src={video.videoUrl}
                    title={video.title}
                    width="100%"
                    height="315"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <p className="text-red-500">※ 이 영상은 수강신청 후 열람 가능합니다.</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
