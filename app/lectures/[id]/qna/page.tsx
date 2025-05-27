'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import LectureQnABoard from '@/components/LectureQnABoard'

export default function LectureQnAPage() {
  const { id } = useParams()
  const lectureId = Number(id)

  if (isNaN(lectureId)) return <p>잘못된 강의 ID입니다.</p>

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-purple-800">📘 강의 질문 게시판</h1>
        <Link href={`/lectures/${lectureId}`}>
          <Button variant="outline">← 강의로 돌아가기</Button>
        </Link>
      </div>

      <LectureQnABoard lectureId={lectureId} />
    </div>
  )
}
