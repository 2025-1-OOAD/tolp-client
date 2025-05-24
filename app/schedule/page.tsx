"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { BookOpen, Plus, Trash2, Edit, Clock } from "lucide-react"
import Link from "next/link"

interface Course {
  id: string
  title: string
  instructor: string
  location: string
  color: string
  startTime: string
  endTime: string
  days: string[]
}

export default function SchedulePage() {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "1",
      title: "React 완전정복",
      instructor: "김개발",
      location: "온라인",
      color: "bg-blue-500",
      startTime: "09:00",
      endTime: "10:30",
      days: ["월", "수"],
    },
    {
      id: "2",
      title: "Next.js 마스터클래스",
      instructor: "박프론트",
      location: "온라인",
      color: "bg-green-500",
      startTime: "14:00",
      endTime: "15:30",
      days: ["화", "목"],
    },
    {
      id: "3",
      title: "TypeScript 기초",
      instructor: "이타입",
      location: "온라인",
      color: "bg-purple-500",
      startTime: "19:00",
      endTime: "20:30",
      days: ["금"],
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    title: "",
    instructor: "",
    location: "",
    color: "bg-blue-500",
    startTime: "09:00",
    endTime: "10:00",
    days: [],
  })

  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
  ]

  const daysOfWeek = ["월", "화", "수", "목", "금", "토", "일"]

  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
  ]

  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number)
    return hours * 60 + minutes
  }

  const getTimeSlotHeight = (startTime: string, endTime: string) => {
    const start = timeToMinutes(startTime)
    const end = timeToMinutes(endTime)
    const duration = end - start
    return (duration / 60) * 60 // 1시간 = 60px
  }

  const getTimeSlotTop = (startTime: string) => {
    const start = timeToMinutes(startTime)
    const baseTime = timeToMinutes("09:00")
    const offset = start - baseTime
    return (offset / 60) * 60 // 1시간 = 60px
  }

  const handleAddCourse = () => {
    if (newCourse.title && newCourse.days && newCourse.days.length > 0) {
      const course: Course = {
        id: Date.now().toString(),
        title: newCourse.title!,
        instructor: newCourse.instructor || "",
        location: newCourse.location || "",
        color: newCourse.color!,
        startTime: newCourse.startTime!,
        endTime: newCourse.endTime!,
        days: newCourse.days,
      }
      setCourses([...courses, course])
      setNewCourse({
        title: "",
        instructor: "",
        location: "",
        color: "bg-blue-500",
        startTime: "09:00",
        endTime: "10:00",
        days: [],
      })
      setIsAddDialogOpen(false)
    }
  }

  const handleEditCourse = () => {
    if (editingCourse) {
      setCourses(courses.map((course) => (course.id === editingCourse.id ? editingCourse : course)))
      setEditingCourse(null)
    }
  }

  const handleDeleteCourse = (courseId: string) => {
    setCourses(courses.filter((course) => course.id !== courseId))
  }

  const handleDayToggle = (day: string, isEditing = false) => {
    if (isEditing && editingCourse) {
      const updatedDays = editingCourse.days.includes(day)
        ? editingCourse.days.filter((d) => d !== day)
        : [...editingCourse.days, day]
      setEditingCourse({ ...editingCourse, days: updatedDays })
    } else {
      const updatedDays = newCourse.days?.includes(day)
        ? newCourse.days.filter((d) => d !== day)
        : [...(newCourse.days || []), day]
      setNewCourse({ ...newCourse, days: updatedDays })
    }
  }

  const renderCourseBlock = (course: Course, day: string) => {
    if (!course.days.includes(day)) return null

    const height = getTimeSlotHeight(course.startTime, course.endTime)
    const top = getTimeSlotTop(course.startTime)

    return (
      <div
        key={`${course.id}-${day}`}
        className={`absolute left-1 right-1 ${course.color} text-white text-xs p-2 rounded shadow-sm cursor-pointer hover:opacity-90 transition-opacity`}
        style={{
          top: `${top}px`,
          height: `${height}px`,
          zIndex: 10,
        }}
        onClick={() => setEditingCourse(course)}
      >
        <div className="font-medium truncate">{course.title}</div>
        <div className="truncate opacity-90">{course.instructor}</div>
        <div className="truncate opacity-75">{course.location}</div>
        <div className="text-xs opacity-75">
          {course.startTime} - {course.endTime}
        </div>
      </div>
    )
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
              <Link href="/schedule" className="text-purple-700 hover:text-purple-900 font-medium">
                시간표
              </Link>
              <Link href="/todo" className="text-gray-600 hover:text-purple-900">
                투두리스트
              </Link>
              <Link href="/mypage" className="text-gray-600 hover:text-purple-900">
                마이페이지
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                로그인
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">회원가입</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-purple-900 mb-4">시간표</h1>
            <p className="text-gray-600 text-lg">내 수업 시간을 한눈에 확인하고 관리하세요</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                강의 추가
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>새 강의 추가</DialogTitle>
                <DialogDescription>시간표에 새로운 강의를 추가하세요</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">강의명</Label>
                  <Input
                    id="title"
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                    placeholder="강의명을 입력하세요"
                  />
                </div>
                <div>
                  <Label htmlFor="instructor">강사명</Label>
                  <Input
                    id="instructor"
                    value={newCourse.instructor}
                    onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
                    placeholder="강사명을 입력하세요"
                  />
                </div>
                <div>
                  <Label htmlFor="location">강의실</Label>
                  <Input
                    id="location"
                    value={newCourse.location}
                    onChange={(e) => setNewCourse({ ...newCourse, location: e.target.value })}
                    placeholder="강의실을 입력하세요"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startTime">시작 시간</Label>
                    <Select
                      value={newCourse.startTime}
                      onValueChange={(value) => setNewCourse({ ...newCourse, startTime: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="endTime">종료 시간</Label>
                    <Select
                      value={newCourse.endTime}
                      onValueChange={(value) => setNewCourse({ ...newCourse, endTime: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>요일 선택</Label>
                  <div className="flex space-x-2 mt-2">
                    {daysOfWeek.map((day) => (
                      <div key={day} className="flex items-center space-x-1">
                        <Checkbox
                          id={day}
                          checked={newCourse.days?.includes(day)}
                          onCheckedChange={() => handleDayToggle(day)}
                        />
                        <Label htmlFor={day} className="text-sm">
                          {day}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>색상</Label>
                  <div className="flex space-x-2 mt-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded ${color} ${newCourse.color === color ? "ring-2 ring-purple-500" : ""}`}
                        onClick={() => setNewCourse({ ...newCourse, color })}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleAddCourse} className="flex-1 bg-purple-600 hover:bg-purple-700">
                    추가
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="flex-1">
                    취소
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Timetable */}
        <Card className="border-purple-200 overflow-hidden">
          <CardHeader>
            <CardTitle className="text-purple-900 flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>주간 시간표</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                {/* Header */}
                <div className="grid grid-cols-8 border-b border-purple-100">
                  <div className="p-4 bg-purple-50 font-medium text-purple-900 text-center">시간</div>
                  {daysOfWeek.map((day) => (
                    <div key={day} className="p-4 bg-purple-50 font-medium text-purple-900 text-center">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Time slots */}
                <div className="relative">
                  {timeSlots.map((time, index) => (
                    <div key={time} className="grid grid-cols-8 border-b border-purple-100 h-[60px]">
                      <div className="p-2 bg-gray-50 text-sm text-gray-600 flex items-center justify-center border-r border-purple-100">
                        {time}
                      </div>
                      {daysOfWeek.map((day) => (
                        <div key={`${time}-${day}`} className="relative border-r border-purple-100 hover:bg-purple-25">
                          {/* Course blocks will be positioned absolutely */}
                        </div>
                      ))}
                    </div>
                  ))}

                  {/* Course blocks */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="grid grid-cols-8 h-full">
                      <div className="border-r border-purple-100"></div>
                      {daysOfWeek.map((day, dayIndex) => (
                        <div key={day} className="relative border-r border-purple-100 pointer-events-auto">
                          {courses.map((course) => renderCourseBlock(course, day))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Course List */}
        <Card className="mt-8 border-purple-200">
          <CardHeader>
            <CardTitle className="text-purple-900">등록된 강의</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between p-4 border border-purple-100 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded ${course.color}`}></div>
                    <div>
                      <h3 className="font-medium text-purple-900">{course.title}</h3>
                      <p className="text-sm text-gray-600">
                        {course.instructor} • {course.location} • {course.startTime}-{course.endTime} •{" "}
                        {course.days.join(", ")}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingCourse(course)}
                      className="border-purple-300 text-purple-700 hover:bg-purple-50"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteCourse(course.id)}
                      className="border-red-300 text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Edit Course Dialog */}
        <Dialog open={!!editingCourse} onOpenChange={() => setEditingCourse(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>강의 수정</DialogTitle>
              <DialogDescription>강의 정보를 수정하세요</DialogDescription>
            </DialogHeader>
            {editingCourse && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-title">강의명</Label>
                  <Input
                    id="edit-title"
                    value={editingCourse.title}
                    onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-instructor">강사명</Label>
                  <Input
                    id="edit-instructor"
                    value={editingCourse.instructor}
                    onChange={(e) => setEditingCourse({ ...editingCourse, instructor: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-location">강의실</Label>
                  <Input
                    id="edit-location"
                    value={editingCourse.location}
                    onChange={(e) => setEditingCourse({ ...editingCourse, location: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>시작 시간</Label>
                    <Select
                      value={editingCourse.startTime}
                      onValueChange={(value) => setEditingCourse({ ...editingCourse, startTime: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>종료 시간</Label>
                    <Select
                      value={editingCourse.endTime}
                      onValueChange={(value) => setEditingCourse({ ...editingCourse, endTime: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>요일 선택</Label>
                  <div className="flex space-x-2 mt-2">
                    {daysOfWeek.map((day) => (
                      <div key={day} className="flex items-center space-x-1">
                        <Checkbox
                          id={`edit-${day}`}
                          checked={editingCourse.days.includes(day)}
                          onCheckedChange={() => handleDayToggle(day, true)}
                        />
                        <Label htmlFor={`edit-${day}`} className="text-sm">
                          {day}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>색상</Label>
                  <div className="flex space-x-2 mt-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded ${color} ${editingCourse.color === color ? "ring-2 ring-purple-500" : ""}`}
                        onClick={() => setEditingCourse({ ...editingCourse, color })}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleEditCourse} className="flex-1 bg-purple-600 hover:bg-purple-700">
                    수정
                  </Button>
                  <Button variant="outline" onClick={() => setEditingCourse(null)} className="flex-1">
                    취소
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
