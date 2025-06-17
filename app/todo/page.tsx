"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from "@/components/Header"
import axios from "axios"
import { useRouter } from 'next/navigation'

interface Todo {
  id: number;
  content: string;
  completed: boolean;
}

const BASE_URL = "http://localhost:8080"

export default function TodoPage() {
  const router = useRouter()

  const [newTodo, setNewTodo] = useState("")
  const [todosPending, setTodosPending] = useState<Todo[]>([])
  const [todosCompleted, setTodosCompleted] = useState<Todo[]>([])

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      alert("로그인이 필요합니다.")
      router.push("/login")
      return
    }
    fetchTodos(token)
  }, [])

  const fetchTodos = async (token: string) => {
    try {
      const res1 = await axios.get(`${BASE_URL}/api/todo/my`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const res2 = await axios.get(`${BASE_URL}/api/todo/my/completed`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTodosPending(res1.data)
      setTodosCompleted(res2.data)
    } catch (err) {
      console.error('할일 목록 불러오기 실패', err)
    }
  }

  const addTodo = async () => {
    if (!newTodo.trim()) return

    const token = localStorage.getItem('token')
    const payload = { content: newTodo }

    try {
      await axios.post(`${BASE_URL}/api/todo`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      })
      await fetchTodos(token!)
      setNewTodo("")
    } catch (err) {
      console.error('할 일 추가 실패', err)
    }
  }

  const completeTodo = async (id: number) => {
    const token = localStorage.getItem('token')
    try {
      await axios.post(`${BASE_URL}/api/todo/${id}/complete`, null, {
        headers: { Authorization: `Bearer ${token}` }
      })
      await fetchTodos(token!)
    } catch (err) {
      console.error('완료 처리 실패', err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-purple-900 mb-4">투두리스트</h1>

        <Card className="mb-6 border-purple-200">
          <CardHeader><CardTitle>새 할 일 추가</CardTitle></CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input
                placeholder="할 일을 입력하세요..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTodo()}
              />
              <Button onClick={addTodo} className="bg-purple-600 hover:bg-purple-700">추가</Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-purple-50 mb-6">
            <TabsTrigger value="pending" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              진행 중
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              완료됨
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <div className="space-y-4">
              {todosPending.map((todo) => (
                <Card key={todo.id} className="border-purple-200">
                  <CardContent className="p-6 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <Checkbox checked={todo.completed} onCheckedChange={() => completeTodo(todo.id)} />
                      <h3 className="font-medium text-purple-900">{todo.content}</h3>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {todosPending.length === 0 && (
                <p className="text-center text-gray-500 py-10">진행 중인 할 일이 없습니다.</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="space-y-4">
              {todosCompleted.map((todo) => (
                <Card key={todo.id} className="border-purple-200 opacity-60">
                  <CardContent className="p-6 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <Checkbox checked={todo.completed} onCheckedChange={() => completeTodo(todo.id)} />
                      <h3 className="font-medium text-purple-900 line-through">{todo.content}</h3>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {todosCompleted.length === 0 && (
                <p className="text-center text-gray-500 py-10">완료된 할 일이 없습니다.</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
