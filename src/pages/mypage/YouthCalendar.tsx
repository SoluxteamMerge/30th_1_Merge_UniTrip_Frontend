import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import defaultProfile from "../../assets/header/default-profile.svg";
import writeIcon from "../../assets/write-icon.svg";
import beforeArrow from "../../assets/arrow/before_arrow.svg";
import nextArrow from "../../assets/arrow/next_arrow.svg";

import AlertModal from "../../components/AlertModal/AlertModal.tsx";
import "../../components/AlertModal/AlertModal.css";
import MyPageSidebar from "../../components/MyPageSidebar";

import { createSchedule } from "../../api/schedule/scheduleApi";
import { patchSchedule } from '../../api/schedule/patchSchedule';
import { deleteSchedule } from "../../api/schedule/deleteSchedule";
import { getScheduleList } from "../../api/schedule/getScheduleList";
import { getScheduleDetail } from "../../api/schedule/getScheduleDetail";

const YouthCalendar: React.FC = () => {
  const navigate = useNavigate(); 
  const username = "김눈송";
  const today = new Date();
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const pageBgStyle = { background: "#e8f0f2", minHeight: "100vh" };
  const containerStyle = { maxWidth: 1400, margin: "0 auto", padding: "60px 0" };
  const titleBoxStyle = {
    fontWeight: 700,
    fontSize: 22,
    color: "#0b0b61",
    display: "flex",
    alignItems: "center",
    marginBottom: 16,
    justifyContent: "space-between" 
  };
  const titleIconStyle = { fontSize: 20, marginRight: 8 };
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const [isMemoSelected, setIsMemoSelected] = useState(false); // 메모 클릭 상태

  const [scheduleTitle, setScheduleTitle] = useState("");
  const [memo, setMemo] = useState("");
  const [selectedColor, setSelectedColor] = useState("#8bcece"); // 기본색
  const [savedSchedules, setSavedSchedules] = useState<{
    [key: string]: { scheduleId: number; title: string; color: string; memo?: string }[];
  }>({});
  const [showAlert, setShowAlert] = useState(false); //모달창띄우기 
  const [alertMessage, setAlertMessage] = useState("");

  const [editingScheduleId, setEditingScheduleId] = useState<number | null>(null); //수정 모드 


  //const [editingIndex, setEditingIndex] = useState<number>(0); // 0 또는 1
  const [editingEntry, setEditingEntry] = useState<{
    title: string;
    memo?: string;
    color: string;
  } | null>(null); // ← 메모 클릭 시 불러올 일정

  const [endDate, setEndDate] = useState<number | null>(null);
  const [endMonth, setEndMonth] = useState<number | null>(null); 
  const [endYear, setEndYear] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("youthCalendarSchedules");
    if (stored) {
      setSavedSchedules(JSON.parse(stored));
    }
  }, []); 

  // 서버에서 일정 목록 불러오는 useEffect 추가
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await getScheduleList(0, 100); // page, size
        const fetched = response.data.content;

        const parsed: {
          [key: string]: { scheduleId: number; title: string; color: string; memo?: string }[];
        } = {};

        fetched.forEach((item: any) => {
          const { scheduleId, title, startDate, endDate } = item;

          const start = new Date(startDate);
          const end = new Date(endDate);

          for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
            if (!parsed[key]) parsed[key] = [];

            if (parsed[key].length < 2) {// 최대 2개 제한 여기서도 적용

              parsed[key].push({
                scheduleId,
                title,
                color: "#8bcece", // 기본 색상
              });
            }
          }
        });

        setSavedSchedules(parsed);
        localStorage.setItem("youthCalendarSchedules", JSON.stringify(parsed));
      } catch (error) {
        console.error("일정 목록 불러오기 실패:", error);
      }
    };

    fetchSchedules();
  }, []);

  {/*메모 local storage 에 저장-2개까지만 추가*/}
  const handleSave = async () => {
      if (!selectedDate || !scheduleTitle) return;

      const start = new Date(currentYear, currentMonth, selectedDate); //시작일
      const end = new Date( //종료일 
        endYear !== null ? endYear : currentYear,
        endMonth !== null ? endMonth - 1 : currentMonth,
        endDate || selectedDate
      );

      const startDate = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(selectedDate).padStart(2, "0")}`;
      const endDateStr = `${endYear || currentYear}-${String((endMonth || currentMonth + 1)).padStart(2, "0")}-${String(endDate || selectedDate).padStart(2, "0")}`;

      const token = localStorage.getItem("accessToken");
      if (!token) {
        setAlertMessage("로그인이 필요합니다.");
        setShowAlert(true);
        return;
      }

      
      try {
        if (editingScheduleId) {
          // 일정 수정
          const response = await patchSchedule(editingScheduleId, {
            title: scheduleTitle,
            description: memo,
            startDate: startDate,
            endDate: endDateStr,
            travelType: "기타",
            companions: "",
            isPublic: true,
          }, token);

          console.log("일정 수정 성공:", response);

          const key = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(selectedDate).padStart(2, "0")}`;
          const updatedEntry = {
            scheduleId: editingScheduleId,
            title: scheduleTitle,
            color: selectedColor,
            memo,
          };

          const updatedSchedules = { ...savedSchedules };
          updatedSchedules[key] = (savedSchedules[key] || []).map((entry) =>
            entry.scheduleId === editingScheduleId ? updatedEntry : entry
          );
          setSavedSchedules(updatedSchedules);
          localStorage.setItem("youthCalendarSchedules", JSON.stringify(updatedSchedules));
        } else {

          console.log("✅ 전송할 일정 생성 데이터:", {
            title: scheduleTitle,
            description: memo,
            travelType: "기타",
            startDate: startDate,
            endDate: endDateStr,
            companions: "",
            isPublic: true,
          });
          
          //일정 생성
          const response = await createSchedule({
            title: scheduleTitle,
            description: memo,
            travelType: "기타", // 추후 선택 항목으로
            startDate: startDate,
            endDate: endDateStr,
            companions: "", // 추후 확장
            isPublic: true,
          }, token);

          // 서버에서 받은 일정 정보를 프론트 상태에 반영
          const y = currentYear;
          const m = String(currentMonth + 1).padStart(2, "0");
          const d = String(selectedDate).padStart(2, "0");
          const key = `${y}-${m}-${d}`;

          const newEntry = {
            scheduleId: response.data.scheduleId, //응답에서 받은 ID
            title: scheduleTitle,
            color: selectedColor,
            memo
          };

          const existing = savedSchedules[key] || [];
          if (existing.length >= 2) {
            setAlertMessage("일정은 날짜당 최대 2개까지 추가할 수 있습니다.");
            setShowAlert(true);
            return;
          }

          const updated = {
            ...savedSchedules,
            [key]: [...existing, newEntry]
          };
          setSavedSchedules(updated);
          localStorage.setItem("youthCalendarSchedules", JSON.stringify(updated));

        console.log("일정 생성 성공:", response);
        }

        //모달창 닫고 입력 필드 초기화
        setIsModalOpen(false);
        setScheduleTitle("");
        setMemo("");
        setEditingEntry(null);
        setEndMonth(null);
        setEndYear(null);
        setEditingScheduleId(null);

        // TODO 목록 새로고침 등 후처리 필요 시 추가
      } catch (error: any) {
        console.error("일정 생성 실패:", error);
        setAlertMessage(error?.response?.data?.message || "일정 생성에 실패했습니다.");
        setShowAlert(true);
      }


      
    };


    {/*메모 삭제*/}
   const handleDelete = async() => {
    if (!editingEntry || !editingScheduleId) return;

   const token = localStorage.getItem("accessToken");
    if (!token) {
      setAlertMessage("로그인이 필요합니다.");
      setShowAlert(true);
      return;
    }

    try {
      // 1. 서버에서 삭제 요청
      await deleteSchedule(editingScheduleId, token);
      console.log("일정 삭제 성공");

      // 2. 로컬 상태에서도 삭제
      const updated = { ...savedSchedules };
      for (const key in updated) {
        updated[key] = updated[key].filter(
          (entry) => entry.scheduleId !== editingScheduleId
        );
        if (updated[key].length === 0) {
          delete updated[key];
        }
      }

      setSavedSchedules(updated);
      localStorage.setItem("youthCalendarSchedules", JSON.stringify(updated));

      // 3. UI 상태 초기화
      setIsModalOpen(false);
      setScheduleTitle("");
      setMemo("");
      setEditingEntry(null);
      setEditingScheduleId(null);
      setIsMemoSelected(false);
    } catch (error: any) {
      console.error("일정 삭제 실패:", error);
      setAlertMessage(error?.response?.data?.message || "일정 삭제에 실패했습니다.");
      setShowAlert(true);
    }
  };




  //달력 생성
  const generateCalendar = (): React.ReactNode[] => {
    const cells: React.ReactNode[] = [];
    const baseCellStyle = {
      width: `${100 / 7}%`,// 열 너비를 1/7로 고정
      height: 90,
      border: "1px solid #ddd",
      verticalAlign: "top",   //위쪽 정렬 (세로)
      padding: 10,
    };

      const firstDay = new Date(currentYear, currentMonth, 1).getDay(); // 0 (Sun) ~ 6 (Sat)
      const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate(); // 이번 달 총 일 수

    // 빈 셀 먼저 채우기
    for (let i = 0; i < firstDay; i++) {
      cells.push(<td key={`empty-${i}`} style={baseCellStyle}></td>);
    }

    //실제 날짜 채우기 
    for (let day = 1; day <= totalDays; day++) {
      
      const weekday = (firstDay + day - 1) % 7;
      const isSunday = weekday === 0;
      const isSaturday = weekday === 6;
      const isToday =
          day === today.getDate() &&
          currentMonth === today.getMonth() &&
          currentYear === today.getFullYear();

      //const key = `${currentYear}-${currentMonth + 1}-${day}`;
      //const entryList = savedSchedules[key] || [];
      const key = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const entryList = savedSchedules[key] || [];
      

      cells.push(
        <td
          key={day}
          style={{
          ...baseCellStyle,
          cursor: "pointer",
          color: isSunday ? "#e53935" : isSaturday ? "#3d3d81" : "#333",
          fontWeight: isToday ? "bold" : "normal",
          }}
        >
          {/* 날짜 숫자 클릭: 새 일정 추가 */}
          <div
            style={{ textAlign: "left", padding: 4,}}
            onClick={(e) => {
              e.stopPropagation(); // 여기 클릭 시 팝업
              setSelectedDate(day);
              setScheduleTitle("");
              setMemo("");
              setSelectedColor("#8bcece");
              setEditingEntry(null);
              setIsMemoSelected(false);
              setEndMonth(null); 
              setIsModalOpen(true);
            }}
          >
            <span
              style={{ //오늘 날짜 아래 밑줄 추가 
                borderBottom: isToday
                  ? `2px solid ${isSunday ? "#e53935" : isSaturday ? "#0b0b61" : "#000"}`
                  : "none",
                paddingBottom: 1,
              }}
            >
              {day}
            </span>
          </div>

          {/* 일정 2개까지만 표시 + 클릭 시 해당 메모 내용 불러오기 */}
          {entryList.slice(0, 2).map((entry, i) => (
            <div
              key={i}
              onClick={async (e) => {
                e.stopPropagation();
                setSelectedDate(day);

                try {
                  const response = await getScheduleDetail(entry.scheduleId);
                  const detail = response.data;

                  setScheduleTitle(detail.title);
                  setMemo(detail.description || "");
                  setSelectedColor(entry.color); // 일정 박스에 저장된 색
                  setEditingEntry(entry);
                  setEditingScheduleId(entry.scheduleId);
                  setIsMemoSelected(true);
                  setIsModalOpen(true);
                  setEndDate(new Date(detail.endDate).getDate());
                  setEndMonth(new Date(detail.endDate).getMonth() + 1);
                  setEndYear(new Date(detail.endDate).getFullYear());

                } catch (error: any) {
                  console.error("일정 상세 조회 실패:", error);
                  setAlertMessage(
                    error?.response?.data?.message || "일정 상세 조회에 실패했습니다."
                  );
                  setShowAlert(true);
                }
              }}
              style={{
                marginTop: 6,
                backgroundColor: entry.color,
                borderRadius: 8,
                padding: "4px 8px",
                color: "white",
                fontSize: 12,
                textAlign: "center",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                cursor: "pointer",
              }}
            >
              {entry.title}
            </div>
          ))}
        </td>
      );
    }

    // 부족한 셀 추가해서 35칸(7x5) 맞추기
    const totalCells = firstDay + totalDays;
    const remaining = 35 - totalCells;

    for (let i = 0; i < remaining; i++) {
        cells.push(
        <td
            key={`empty-after-${i}`}
            style={baseCellStyle}
        ></td>
        );
    }

    // 줄로 나누기
    const rows: React.ReactNode[] = [];
    for (let i = 0; i < cells.length; i += 7) {
      rows.push(<tr key={`row-${i}`}>{cells.slice(i, i + 7)}</tr>);
    }

    return rows;
  }; //달력 생성 끝

  //이전 달
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };
  
  //다음 달
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };
  

  return (
    <div style={pageBgStyle}>
      <Header isLoggedIn={true} username={username} profileUrl="" />

        <div style={containerStyle}>

            <div style={{ display: "flex", alignItems: "flex-start" }}>
                {/* 사이드바 */}
                <MyPageSidebar />  {/* 이 한 줄로 사이드바 대체 */}

                {/* 캘린더 콘텐츠 */}
                <div style={{ flex: 1 }}>

                    <div style={titleBoxStyle}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <span style={titleIconStyle}>▶</span>기록한 청춘
                        </div>
                    </div>
                    
                    <div  style={{
                        flex: 1,
                        background: "#fff",
                        borderRadius: 15,
                        padding: "32px 40px",
                        boxShadow: "0 1px 6px #0001;",
                        //minHeight: "580px"
                        }}
                    >

                      <div style={{
                          display: "flex",
                          justifyContent: "space-between",   // 텍스트와 버튼을 좌우 정렬
                          alignItems: "center",
                          marginBottom: 24
                        }}
                      >

                        <h2 style={{ fontSize: 18, marginBottom: 24, display: "flex", alignItems: "center", color: "#0b0b61" }}>
                          청춘 일정 - {currentYear}년 {currentMonth + 1}월
                        </h2>

                        <div>
                          <button onClick={handlePrevMonth} style={{ marginRight: 15, background: "none", border: "none", cursor: "pointer" }}>
                            <img src={beforeArrow} alt="이전 달" style={{ width: 30, height: 30 }} />
                          </button>
                          <button onClick={handleNextMonth} style={{ background: "none", border: "none", cursor: "pointer" }}>
                            <img src={nextArrow} alt="다음 달" style={{ width: 30, height: 30 }} />
                          </button>
                        </div>
                      </div>

                        <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
                            <thead>
                                <tr>
                                {days.map((day, i) => (
                                    <th
                                    key={day}
                                    style={{
                                        padding: "8px 0",
                                        color: i === 0 ? "#e53935" : i === 6 ? "#0b0b61" : "#333",
                                        fontWeight: 600,
                                    }}
                                    >
                                    {day}
                                    </th>
                                ))}
                                </tr>
                            </thead>
                            <tbody>
                                {generateCalendar()}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
      </div>

      {/* Floating 버튼 */}
      <button
        onClick={() => navigate("/review-write")}  
        style={{
          position: "fixed",
          right: 60,
          bottom: 60,
          width: 120,
          height: 120,
          borderRadius: "50%",
          border: "none", 
    
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          padding: 0,
          background: "transparent", 
          overflow: "hidden"  // 이미지 삐져나가지 않게
        }}
        aria-label="게시글 작성"
      >
        <img
          src={writeIcon}
          alt="글쓰기 아이콘"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",  // 이미지가 버튼 원형에 꽉 차게
            borderRadius: "50%",  // 이미지도 원형으로
            display: "block",
          }}
        />
      </button>
      {/* Floating 버튼 끝 */}

      {/* Alert 모달 표시 */}
      {showAlert && (
        <AlertModal
          message={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}

      {/* 일정 입력 팝업 */}
      {isModalOpen && (
      <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.3)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 999
      }}>
          <div style={{
          backgroundColor: "#fff",
          borderRadius: 16,
          padding: 32,
          width: 400,
          boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
          position: "relative"
          }}>

            {/* 닫기 버튼 */}
            <button onClick={() => setIsModalOpen(false)} style={{
                position: "absolute", top: 12, right: 12,
                background: "none", border: "none", fontSize: 20, cursor: "pointer"
            }}>✕</button>

            <h3 style={{ marginBottom: 16 }}>일정 추가</h3>

            <p style={{ fontSize: 14, color: "#666", marginBottom: 4 }}>
              {currentYear}년 {currentMonth + 1}월 {selectedDate}일 ~

              <select
                value={endYear || currentYear}
                onChange={(e) => setEndYear(Number(e.target.value))}
                style={{ margin: "0 4px" }}
              >
                {[currentYear, currentYear + 1].map((year) => (
                  <option key={year} value={year}>{year}년</option>
                ))}
              </select>

              <select
                value={endMonth || currentMonth + 1}
                onChange={(e) => setEndMonth(Number(e.target.value))}
                style={{ margin: "0 4px" }}
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i} value={i + 1}>{i + 1}월</option>
                ))}
              </select>

              <input
                type="number"
                min={1}
                max={31}
                value={endDate || ""}
                onChange={(e) => setEndDate(Number(e.target.value))}
                style={{ width: 50, margin: "0 4px", textAlign: "center" }}
              />
              일
            </p>

            {/* 일정 제목 입력 */}
            <input
                type="text"
                placeholder="일정 제목을 입력해주세요..."
                value={scheduleTitle}
                onChange={(e) => setScheduleTitle(e.target.value)}
                className="pill-input"
                style={{
                width: "100%",
                padding: "8px 16px",   
                marginTop: 12,
                marginBottom: 16,
                backgroundColor: "#e0e0e0",    
                border: "none",                 // 테두리 없음
                borderRadius: 999,              //양 끝 둥글게 (pill)
                fontSize: 14,
                color: "#000",               // 글자색 검정
                outline: "none"             // 포커스시 기본 테두리 제거 (선택 사항)
                }}
            />
            <style>{`
              .pill-input::placeholder {
                color: #000;
              }
            `}</style>

            {/* 메모 입력 */}
            <p style={{ fontSize: 14, marginBottom: 2 }}>메모</p>
            <input
                type="text"  
                value={memo}
                onChange={(e) => setMemo(e.target.value)}              
                style={{
                width: "100%",
                border: "none",
                borderBottom: "1px solid #aaa",  
                padding: "2px 0",                
                fontSize: 14,
                outline: "none",                
                backgroundColor: "transparent",  
                color: "#000"
                }}
            />

            {/* 색상 선택 */}
            <div style={{ margin: "16px 0", display: "flex", gap: 19 }}>
                {["#dc4141", "#ffb95d", "#f9e678", "#98ef91", "#8bcece", "#959fe2", "#0b0b61", "#9462b5", "#bbbbbb"].map((color, index) => (
                <div key={index}
                    onClick={() => setSelectedColor(color)}
                    style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    backgroundColor: color,
                    cursor: "pointer",
                    border: selectedColor === color ? "2px solid #000" : "none"
                    }}
                ></div>
                ))}
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
              <button
                onClick={handleSave}
                style={{
                  width: "100%",
                  backgroundColor: "#0b0b61",
                  color: "#fff",
                  border: "none",
                  padding: "12px 0",
                  borderRadius: 8,
                  fontWeight: 600,
                  marginTop: 8
                }}
              >
                저장
              </button>

              <button
                  onClick={handleDelete}
                  style={{
                    width: "120px",
                    backgroundColor: isMemoSelected ? "#d9534f" : "#aaaaaa", // ← 조건부 색상
                    color: "#fff",
                    border: "none",
                    padding: "12px 0",
                    borderRadius: 8, 
                    fontWeight: 600,
                    marginTop: 8
                  }}
                >
                  삭제
              </button>
          </div>
          </div>
      </div>
      )}
  </div>
  );
};

export default YouthCalendar;