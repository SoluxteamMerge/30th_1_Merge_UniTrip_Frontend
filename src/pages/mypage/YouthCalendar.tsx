import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import defaultProfile from "../../assets/header/default-profile.svg";
import writeIcon from "../../assets/write-icon.svg";
import beforeArrow from "../../assets/arrow/before_arrow.svg";
import nextArrow from "../../assets/arrow/next_arrow.svg";

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
    justifyContent: "space-between"  // ← 버튼 오른쪽 정렬
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
    [key: string]: { title: string; color: string; memo?: string }[];
  }>({});

  //const [editingIndex, setEditingIndex] = useState<number>(0); // 0 또는 1
  const [editingEntry, setEditingEntry] = useState<{
    title: string;
    memo?: string;
    color: string;
  } | null>(null); // ← 메모 클릭 시 불러올 일정

  const [endDate, setEndDate] = useState<number | null>(null);
  const [endMonth, setEndMonth] = useState<number | null>(null); 
  const [endYear, setEndYear] = useState<number | null>(null);



  //const [viewingMemo, setViewingMemo] = useState<{ title: string; memo: string; color: string } | null>(null);

  //const [isEditing, setIsEditing] = useState(false);
  //const [editingMemo, setEditingMemo] = useState("");


  useEffect(() => {
    const stored = localStorage.getItem("youthCalendarSchedules");
    if (stored) {
      setSavedSchedules(JSON.parse(stored));
    }
  }, []);

  {/*메모 저장-2개까지만 추가*/}
  const handleSave = () => {
      if (!selectedDate || !scheduleTitle) return;

      const start = new Date(currentYear, currentMonth, selectedDate);
      const end = new Date(
        endYear !== null ? endYear : currentYear,
        endMonth !== null ? endMonth - 1 : currentMonth,
        endDate || selectedDate
      );

      const updated = { ...savedSchedules };

      let current = new Date(start);
     while (current <= end) {
        const y = current.getFullYear();
        //const m = current.getMonth() + 1; // 0-indexed → 1부터 시작
        //const d = current.getDate();
        const m = String(current.getMonth() + 1).padStart(2, "0");
        const d = String(current.getDate()).padStart(2, "0");
        const key = `${y}-${m}-${d}`;

        const existing = updated[key] || [];

        if (!editingEntry && existing.length >= 2) {
          alert("일정은 날짜당 최대 2개까지 추가할 수 있습니다.");
          return;
        }

        if (editingEntry) {
          updated[key] = existing.map((e) =>
            e.title === editingEntry.title && e.color === editingEntry.color
              ? { title: scheduleTitle, memo, color: selectedColor }
              : e
          );
        } else {
          updated[key] = [...existing, { title: scheduleTitle, color: selectedColor, memo }];
        }

        current.setDate(current.getDate() + 1); // 다음 날짜로 이동
      }

      setSavedSchedules(updated);
      localStorage.setItem("youthCalendarSchedules", JSON.stringify(updated));
      setIsModalOpen(false);
      setScheduleTitle("");
      setMemo("");
      setEditingEntry(null);
      setEndMonth(null); // 선택 해제
      setEndYear(null);  // 선택 해제
    };


    {/*메모 삭제*/}
   const handleDelete = () => {
    if (!editingEntry) return;

    const updated = { ...savedSchedules };
    for (const key in updated) {
      updated[key] = updated[key].filter(
        (entry) =>
          entry.title !== editingEntry.title || entry.color !== editingEntry.color
      );
      if (updated[key].length === 0) {
        delete updated[key];
      }
  }

  setSavedSchedules(updated);
  localStorage.setItem("youthCalendarSchedules", JSON.stringify(updated));
  setIsModalOpen(false);
  setScheduleTitle("");
  setMemo("");
  setEditingEntry(null);
};


  {/*메모 조회*/}
  const openEditModal = (day: number, entry: { title: string; color: string; memo?: string }) => {
    setSelectedDate(day);
    setScheduleTitle(entry.title);
    setSelectedColor(entry.color);
    setMemo(entry.memo ?? "");
    setIsMemoSelected(true); //메모가 있는 셀 클릭 → 삭제 버튼 빨간색
    setIsModalOpen(true);
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
              onClick={(e) => {
                e.stopPropagation(); // 날짜 클릭 방지, 여기 클릭 시 기존 메모 편집
                setSelectedDate(day);
                setScheduleTitle(entry.title);
                setMemo(entry.memo || "");
                setSelectedColor(entry.color);
                setEditingEntry(entry);
                setIsMemoSelected(true);
                setIsModalOpen(true);
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
                <div
                style={{
                    width: 220,
                    background: "#fff",
                    borderRadius: 15,
                    padding: "32px 24px",
                    boxShadow: "0 1px 6px #0001;",
                    marginRight: 32,
                    textAlign: "center",
                    marginTop: 48
                }}>

                    {/* 프로필 컨테이너 */}
                    <img
                      src={defaultProfile}
                      alt="기본 프로필"
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        objectFit: "cover",
                        margin: "0 auto 12px",
                        display: "block"
                      }}
                    />
                    <p style={{ fontWeight: "bold", marginBottom: 24, color: "#0B0B61" }}>{username}</p>
                    
                    {/* 사이드바 메뉴 */}
                    <ul style={{ listStyle: "none", padding: 0, textAlign: "left", fontSize: 14, color: "#888" }}>
                      <li style={{ marginBottom: 12 }}>
                          <Link to="/recorded-youth" style={{ color: "#888", textDecoration: "none" }}>
                          · 내가 만든 청춘
                          </Link>
                      </li>
                      <li style={{ marginBottom: 12 }}>
                          <Link to="/recorded-youth/scrapped-youth" style={{ color: "#888", textDecoration: "none" }}>
                          · 스크랩한 청춘
                          </Link>
                      </li>
                      <li 
                      style={{ 
                        marginBottom: 12,
                        fontWeight: 700,
                        color: "#333",
                        backgroundColor: "#e0e0e0",
                        padding: "4px 12px",
                        borderRadius: 5,
                        }}
                        >• 청춘 일정
                        </li>
                    </ul>
                </div>

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