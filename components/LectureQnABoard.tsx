'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface QnA {
  id: number
  content: string
  writerName: string
  createdAt: string
  parentId: number | null
  isDeleted: boolean
}

interface Props {
  lectureId: number
}

export default function LectureQnABoard({ lectureId }: Props) {
  const [qnas, setQnAs] = useState<QnA[]>([])
  const [question, setQuestion] = useState('')
  const [replyTargetId, setReplyTargetId] = useState<number | null>(null)
  const [replyContent, setReplyContent] = useState('')

  useEffect(() => {
    fetchQnAs()
  }, [lectureId])

  const fetchQnAs = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/qna/lecture/${lectureId}`)
      setQnAs(res.data)
    } catch (err) {
      console.error('QnA fetch error:', err)
    }
  }

  const handlePost = async () => {
    const token = localStorage.getItem('token')
    if (!question.trim()) return alert('내용을 입력하세요.')
    try {
      await axios.post(
        `http://localhost:8080/api/qna`,
        { content: question, lectureId },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setQuestion('')
      fetchQnAs()
    } catch (err) {
      console.error('QnA post error:', err)
    }
  }

  const handleReplyPost = async (parentId: number) => {
    const token = localStorage.getItem('token')
    if (!replyContent.trim()) return alert('답글 내용을 입력하세요.')
    try {
      await axios.post(
        `http://localhost:8080/api/qna`,
        { content: replyContent, lectureId, parentId },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setReplyContent('')
      setReplyTargetId(null)
      fetchQnAs()
    } catch (err) {
      console.error('답글 등록 실패:', err)
    }
  }

  const parentQnAs = qnas.filter(q => q.parentId === null)
  const getReplies = (id: number) => qnas.filter(q => q.parentId === id)

  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold mb-4">질문 게시판</h2>

      <div className="space-y-2 mb-6">
        <Input
          placeholder="질문을 입력하세요"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <Button onClick={handlePost}>등록</Button>
      </div>

      <div className="space-y-4">
        {parentQnAs.map(qna => (
          <div key={qna.id} className="p-4 border rounded bg-white">
            <p className="font-semibold">{qna.writerName}</p>
            <p>{qna.content}</p>
            <p className="text-sm text-gray-400">{new Date(qna.createdAt).toLocaleString()}</p>

            <Button
              size="sm"
              variant="outline"
              className="mt-2"
              onClick={() => setReplyTargetId(replyTargetId === qna.id ? null : qna.id)}
            >
              답글 달기
            </Button>

            {/* 답글 입력창 */}
            {replyTargetId === qna.id && (
              <div className="mt-2 pl-4 space-y-2">
                <Input
                  placeholder="답글을 입력하세요"
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                />
                <Button size="sm" onClick={() => handleReplyPost(qna.id)}>답글 등록</Button>
              </div>
            )}

            {/* 대댓글 */}
            {getReplies(qna.id).length > 0 && (
              <div className="mt-2 pl-4 border-l-2 border-gray-200 space-y-2">
                {getReplies(qna.id).map(reply => (
                  <div key={reply.id} className="text-sm">
                    <strong>{reply.writerName}</strong>: {reply.content}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
