"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Plus, Trash2 } from "lucide-react"
import { useRouter } from 'next/navigation'
import Header from "@/components/Header"

interface LectureInfo {
  id: number;
  title: string;
  durationDays: number;
}

interface Lecture {
  userId: number;
  lectureId: number;
  customTime: string; // 예: "화 10:00-11:30"
}

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", "13:00",
  "14:00", "15:00", "16:00", "17:00", "18:00",
];
const daysOfWeek = ["월", "화", "수", "목", "금", "토", "일"];

export default function SchedulePage() {
  const router = useRouter();
  const [userId] = useState<number>(1); // 추후 JWT에서 추출
  const [lectureList, setLectureList] = useState<LectureInfo[]>([]);
  const [lectures, setLectures] = useState<Lecture[]>([]);

  // dummy data
  // const [lectureList, setLectureList] = useState<LectureInfo[]>([
  //   { id: 101, title: "운영체제", durationDays: 30 },
  //   { id: 102, title: "객체지향분석및설계", durationDays: 40 },
  //   { id: 103, title: "데이터베이스", durationDays: 10 },
  // ]);
  // const [lectures, setLectures] = useState<Lecture[]>([{
  //   userId: 1,
  //   lectureId: 101,
  //   customTime: "월 11:00-12:30"
  // }]);
  const [selectedLectureId, setSelectedLectureId] = useState<number>(0);
  const [selectedDay, setSelectedDay] = useState<string>("")
  const [startTime, setStartTime] = useState<string>("")
  const [endTime, setEndTime] = useState<string>("")

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('로그인이 필요합니다.');
      router.push('/login');
    }
  }, []);

  useEffect(() => {
    // 수강 중인 강의 목록 불러오기
    fetch("http://localhost:8080/api/enrollments/myLectures", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("수강 강의 목록 조회 실패");
        return res.json(); 
      })
      .then((data) => {
      const formatted: LectureInfo[] = data.map((e: any) => ({
        id: e.id, // 수강 신청 ID가 아닌 강의 ID여야 한다면 e.lectureId로 바꾸기
        title: e.lectureName,
        durationDays: Math.ceil(
          (new Date(e.accessDeadline).getTime() - new Date(e.enrollmentDate).getTime()) / (1000 * 60 * 60 * 24)
        ),
      }))
      setLectureList(formatted)
    })
    .catch((err) => {
      console.error("강의 목록 불러오기 실패:", err)
    });
  }, []);

  const handleAddLecture = async () => {
  if (!selectedLectureId || !selectedDay || !startTime || !endTime) return;

  const alreadyExists = lectures.some(
    (lec) => lec.lectureId === selectedLectureId
  );
  if (alreadyExists) {
    alert("이미 시간표에 추가된 강의입니다.");
    return;
  }

  const customTime = `${selectedDay} ${startTime}-${endTime}`;
  const newLecture: Lecture = {
    userId,
    lectureId: selectedLectureId,
    customTime,
  };

  try {
    const token = localStorage.getItem("token");
    await fetch("http://localhost:8080/api/timetable/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newLecture),
    });

    setLectures([...lectures, newLecture]); // 로컬 상태에도 반영
    setSelectedLectureId(0);
    setSelectedDay("");
    setStartTime("");
    setEndTime("");
  } catch (err) {
    console.error("시간표 추가 실패:", err);
    alert("시간표 저장 중 오류가 발생했습니다.");
  }
};

useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) return;

  fetch(`http://localhost:8080/api/timetable/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      setLectures(data.lectures || []); // API 응답 형식에 따라 다를 수 있음
    })
    .catch((err) => {
      console.error("시간표 불러오기 실패:", err);
    });
}, []);



  const handleDeleteLecture = async (lectureId: number) => {
  try {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:8080/api/timetable/${userId}/lecture/${lectureId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setLectures(lectures.filter((lec) => lec.lectureId !== lectureId));
  } catch (err) {
    console.error("시간표에서 강의 삭제 실패:", err);
    alert("삭제 중 오류가 발생했습니다.");
  }
};


  const renderBlocks = () => {
    return lectures.map((lec) => {
      const match = lec.customTime.match(/([월화수목금])\s(\d{2}:\d{2})-(\d{2}:\d{2})/);
      if (!match) return null;
      const [, day, start, end] = match;
      const dayIndex = daysOfWeek.findIndex((d) => d === day);
      const startMin = parseInt(start.split(":")[0]) * 60 + parseInt(start.split(":")[1]);
      const endMin = parseInt(end.split(":")[0]) * 60 + parseInt(end.split(":")[1]);
      const baseMin = 9 * 60;
      const top = ((startMin - baseMin) / 60) * 60;
      const height = ((endMin - startMin) / 60) * 60;
      const info = lectureList.find((i) => i.id === lec.lectureId);

      return (
        <div
          key={lec.lectureId}
          className="absolute text-white text-xs p-2 rounded shadow bg-purple-500"
          style={{
            top: `${top}px`,
            left: `${(dayIndex + 1) * 12.5}%`,
            width: "12.5%",
            height: `${height}px`,
            zIndex: 10,
          }}
          onClick={() => handleDeleteLecture(lec.lectureId)}
        >
          {info?.title}<br />남은 기간: {info?.durationDays}일
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <Header />
      <div className="max-w-5xl mx-auto px-6 mt-10">

        {/* 시간표 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-purple-900 flex items-center space-x-2">
              <Clock className="h-5 w-5" /> <span>주간 시간표</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="grid grid-cols-8 border-b border-purple-100">
              <div className="p-4 bg-purple-50 font-medium text-purple-900 text-center">시간</div>
              {daysOfWeek.map((day) => (
                <div key={day} className="p-4 bg-purple-50 font-medium text-purple-900 text-center">
                  {day}
                </div>
              ))}
            </div>
            <div className="relative">
              {timeSlots.map((time) => (
                <div key={time} className="grid grid-cols-8 border-b border-purple-100 h-[60px]">
                  <div className="p-2 bg-gray-50 text-sm text-center border-r border-purple-100">{time}</div>
                  {daysOfWeek.map((day) => (
                    <div key={`${time}-${day}`} className="border-r border-purple-100 relative" />
                  ))}
                </div>
              ))}
              {renderBlocks()}
            </div>
          </CardContent>
        </Card>

        {/* 추가 폼 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>강의 시간 등록</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>강의 선택</Label>
              <Select value={selectedLectureId.toString()} onValueChange={(val) => setSelectedLectureId(Number(val))}>
                <SelectTrigger>
                  <SelectValue placeholder="강의를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {lectureList.map((lec) => (
                    <SelectItem key={lec.id} value={lec.id.toString()}>{lec.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>요일</Label>
              <Select value={selectedDay} onValueChange={setSelectedDay}>
                <SelectTrigger>
                  <SelectValue placeholder="요일 선택" />
                </SelectTrigger>
                <SelectContent>
                  {daysOfWeek.map((day) => (
                    <SelectItem key={day} value={day}>{day}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>시작 시간</Label>
                <Select value={startTime} onValueChange={setStartTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="시작 시간 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>종료 시간</Label>
                <Select value={endTime} onValueChange={setEndTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="종료 시간 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleAddLecture}>시간표에 추가</Button>
          </CardContent>
        </Card>

        

        
      </div>
    </div>
  );
}