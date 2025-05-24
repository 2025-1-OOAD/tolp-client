"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Plus, Calendar, Clock, CheckSquare, AlertCircle, FileText } from "lucide-react"
import Link from "next/link"

export default function TodoPage() {
  const [newTodo, setNewTodo] = useState("")
  const [filter, setFilter] = useState("all")

  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "React 과제 - 컴포넌트 설계",
      course: "React 완전정복",
      type: "assignment",
      dueDate: "2024-01-25",
      priority: "high",
      completed: false,
      description: "함수형 컴포넌트를 활용한 Todo 앱 만들기",
    },
    {
      id: 2,
      title: "TypeScript 중간고사",
      course: "TypeScript 기초부터 실전까지",
      type: "exam",
      dueDate: "2024-01-28",
      priority: "high",
      completed: false,
      description: "TypeScript 기본 문법과 타입 시스템 이해도 평가",
    },
    {
      id: 3,
      title: "Next.js 프로젝트 제출",
      course: "Next.js 마스터클래스",
      type: "project",
      dueDate: "2024-02-01",
      priority: "medium",
      completed: false,
      description: "풀스택 웹 애플리케이션 구현 및 배포",
    },
    {
      id: 4,
      title: "Node.js 강의 노트 정리",
      course: "Node.js 백엔드 개발",
      type: "homework",
      dueDate: "2024-01-30",
      priority: "low",
      completed: true,
      description: "Express.js와 MongoDB 연동 방법 정리",
    },
    {
      id: 5,
      title: "Python 데이터 분석 실습",
      course: "Python 데이터 분석",
      type: "assignment",
      dueDate: "2024-02-03",
      priority: "medium",
      completed: false,
      description: "Pandas와 Matplotlib을 활용한 데이터 시각화",
    },
  ])

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo = {
        id: Date.now(),
        title: newTodo,
        course: "일반",
        type: "homework",
        dueDate: new Date().toISOString().split("T")[0],
        priority: "medium",
        completed: false,
        description: "",
      }
      setTodos([...todos, todo])
      setNewTodo("")
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed
    if (filter === "pending") return !todo.completed
    if (filter === "high") return todo.priority === "high"
    return true
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "assignment":
        return <FileText className="h-4 w-4" />
      case "exam":
        return <AlertCircle className="h-4 w-4" />
      case "project":
        return <CheckSquare className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "assignment":
        return "과제"
      case "exam":
        return "시험"
      case "project":
        return "프로젝트"
      case "homework":
        return "숙제"
      default:
        return "기타"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700"
      case "medium":
        return "bg-yellow-100 text-yellow-700"
      case "low":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high":
        return "높음"
      case "medium":
        return "보통"
      case "low":
        return "낮음"
      default:
        return "보통"
    }
  }

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
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
              <Link href="/todo" className="text-purple-700 hover:text-purple-900 font-medium">
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-purple-900 mb-4">투두리스트</h1>
          <p className="text-gray-600 text-lg">과제, 시험, 프로젝트를 체계적으로 관리하세요</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Todo List */}
          <div className="lg:col-span-3">
            {/* Add New Todo */}
            <Card className="mb-6 border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-900 flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>새 할 일 추가</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Input
                    placeholder="할 일을 입력하세요..."
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addTodo()}
                    className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                  />
                  <Button onClick={addTodo} className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Filter and Sort */}
            <div className="mb-6">
              <div className="flex space-x-4">
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-48 border-purple-200 focus:border-purple-500 focus:ring-purple-500">
                    <SelectValue placeholder="필터 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="pending">미완료</SelectItem>
                    <SelectItem value="completed">완료</SelectItem>
                    <SelectItem value="high">높은 우선순위</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Todo List */}
            <div className="space-y-4">
              {filteredTodos.map((todo) => {
                const daysUntilDue = getDaysUntilDue(todo.dueDate)
                const isOverdue = daysUntilDue < 0
                const isDueSoon = daysUntilDue <= 3 && daysUntilDue >= 0

                return (
                  <Card key={todo.id} className={`border-purple-200 ${todo.completed ? "opacity-60" : ""}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Checkbox
                          checked={todo.completed}
                          onCheckedChange={() => toggleTodo(todo.id)}
                          className="mt-1"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <h3
                              className={`text-lg font-medium ${
                                todo.completed ? "line-through text-gray-500" : "text-purple-900"
                              }`}
                            >
                              {todo.title}
                            </h3>
                            <div className="flex space-x-2">
                              <Badge className={getPriorityColor(todo.priority)}>
                                {getPriorityLabel(todo.priority)}
                              </Badge>
                              <Badge variant="outline" className="border-purple-300 text-purple-700">
                                {getTypeIcon(todo.type)}
                                <span className="ml-1">{getTypeLabel(todo.type)}</span>
                              </Badge>
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 mb-2">{todo.course}</p>

                          {todo.description && <p className="text-sm text-gray-700 mb-3">{todo.description}</p>}

                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              <span
                                className={`${
                                  isOverdue
                                    ? "text-red-600 font-medium"
                                    : isDueSoon
                                      ? "text-yellow-600 font-medium"
                                      : "text-gray-600"
                                }`}
                              >
                                {todo.dueDate}
                              </span>
                            </div>

                            {!todo.completed && (
                              <div
                                className={`flex items-center space-x-1 ${
                                  isOverdue ? "text-red-600" : isDueSoon ? "text-yellow-600" : "text-gray-600"
                                }`}
                              >
                                <Clock className="h-4 w-4" />
                                <span>
                                  {isOverdue
                                    ? `${Math.abs(daysUntilDue)}일 지남`
                                    : daysUntilDue === 0
                                      ? "오늘 마감"
                                      : `${daysUntilDue}일 남음`}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {filteredTodos.length === 0 && (
              <div className="text-center py-12">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <CheckSquare className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-purple-900 mb-2">할 일이 없습니다</h3>
                <p className="text-gray-600">새로운 할 일을 추가해보세요</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Statistics */}
            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-900">통계</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">전체</span>
                    <span className="font-semibold text-purple-900">{todos.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">완료</span>
                    <span className="font-semibold text-green-600">{todos.filter((t) => t.completed).length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">미완료</span>
                    <span className="font-semibold text-red-600">{todos.filter((t) => !t.completed).length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">높은 우선순위</span>
                    <span className="font-semibold text-orange-600">
                      {todos.filter((t) => t.priority === "high" && !t.completed).length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-900">다가오는 마감일</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todos
                    .filter((todo) => !todo.completed)
                    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                    .slice(0, 5)
                    .map((todo) => {
                      const daysUntilDue = getDaysUntilDue(todo.dueDate)
                      const isOverdue = daysUntilDue < 0
                      const isDueSoon = daysUntilDue <= 3 && daysUntilDue >= 0

                      return (
                        <div key={todo.id} className="flex items-center space-x-3 p-2 hover:bg-purple-50 rounded">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              isOverdue ? "bg-red-400" : isDueSoon ? "bg-yellow-400" : "bg-green-400"
                            }`}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-purple-900 truncate">{todo.title}</p>
                            <p
                              className={`text-xs ${
                                isOverdue ? "text-red-600" : isDueSoon ? "text-yellow-600" : "text-gray-500"
                              }`}
                            >
                              {isOverdue
                                ? `${Math.abs(daysUntilDue)}일 지남`
                                : daysUntilDue === 0
                                  ? "오늘 마감"
                                  : `${daysUntilDue}일 남음`}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-900">빠른 작업</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start border-purple-300 text-purple-700 hover:bg-purple-50"
                  onClick={() => setFilter("pending")}
                >
                  <AlertCircle className="h-4 w-4 mr-2" />
                  미완료 항목 보기
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-purple-300 text-purple-700 hover:bg-purple-50"
                  onClick={() => setFilter("high")}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  우선순위 높은 항목
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-purple-300 text-purple-700 hover:bg-purple-50"
                  onClick={() => setFilter("completed")}
                >
                  <CheckSquare className="h-4 w-4 mr-2" />
                  완료된 항목 보기
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
