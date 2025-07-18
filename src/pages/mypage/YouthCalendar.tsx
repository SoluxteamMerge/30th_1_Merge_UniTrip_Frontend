import React, { useState } from "react";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import defaultProfile from "../../assets/header/default-profile.svg";
import writeIcon from "../../assets/write-icon.svg";



const YouthCalendar: React.FC = () => {
    const navigate = useNavigate(); 
  
  const username = "김눈송";
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed (0 = Jan)
  const date = today.getDate();

  const firstDay = new Date(year, month, 1).getDay(); // 0 (Sun) ~ 6 (Sat)
  const totalDays = new Date(year, month + 1, 0).getDate(); // 이번 달 총 일 수

  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const pageBgStyle = { background: "#e8f0f2", minHeight: "100vh" };
  const containerStyle = { maxWidth: 1200, margin: "0 auto", padding: "40px 0" };
  const titleBoxStyle = {
    fontWeight: 700,
    fontSize: 22,
    color: "#0b0b61",
    display: "flex",
    alignItems: "center",
    marginBottom: 16
  };
  const titleIconStyle = { fontSize: 20, marginRight: 8 };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  //달력 생성
  const generateCalendar = (): React.ReactNode[] => {
    const cells: React.ReactNode[] = [];

    // 빈 셀 먼저 채우기
    for (let i = 0; i < firstDay; i++) {
      cells.push(
      <td 
      key={`empty-${i}`}
      style={{
        border: "1px solid #ddd",        
        padding: "8px 0",  // 높이 균일하게
        textAlign: "center",                
        //backgroundColor: "#f9f9f9",         // 연한 배경색 
      }}
      ></td>
    );
    }

    //실제 날짜 채우기 
    for (let day = 1; day <= totalDays; day++) {
      const weekday = (firstDay + day - 1) % 7;
      const isSunday = weekday === 0;
      const isSaturday = weekday === 6;
      const isToday = day === date;

      cells.push(
        <td
          key={day}
          onClick={() => {
                setSelectedDate(day);
                setIsModalOpen(true);
            }}
          style={{
            cursor: "pointer", 
            color: isToday ? "#333" : isSunday ? "#e53935" : isSaturday ? "#3d3d81" : "#333",
            //backgroundColor: isToday ? "#0b0b61" : "transparent",
            backgroundColor: "transparent",
            //borderRadius: isToday ? "50%" : "none",
            borderRadius: "none",
            textAlign: "center",
            padding: "8px 0",
            //fontWeight: isToday ? "bold" : "normal", //오늘 날짜만 선 굵게 표시
            border: "1px solid #ddd" 
          }}
        >
          {day}
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
            style={{
            border: "1px solid #ddd",
            padding: "8px 0",
            textAlign: "center",
            //backgroundColor: "#f9f9f9",
            }}
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
                    borderRadius: 12,
                    padding: "32px 24px",
                    boxShadow: "0 0 8px rgba(0,0,0,0.05)",
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
                        <span style={titleIconStyle}>▶</span>기록한 청춘
                    </div>
                    
                    <div
                        style={{
                        flex: 1,
                        background: "#fff",
                        borderRadius: 12,
                        padding: "32px 48px",
                        boxShadow: "0 0 8px rgba(0,0,0,0.05)",
                        minHeight: "calc(100vh - 320px)" //요소 최소 높이 = 화면 전체 높이 - 320px
                        }}
                    >

                        <h2 style={{ fontSize: 20, marginBottom: 24 }}>
                        청춘 일정 - {month + 1}월
                        </h2>

                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
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
        onClick={() => navigate("/review-write")}  // 이 줄 추가!
        style={{
          position: "fixed",
          right: 60,
          bottom: 60,
          width: 100,
          height: 100,
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

        <p style={{ fontSize: 14, color: "#666" }}>
            {month + 1}월 {selectedDate}일
        </p>

        <input
            type="text"
            placeholder="일정 제목을 입력해주세요..."
            style={{
            width: "100%",
            padding: "10px",
            marginTop: 12,
            marginBottom: 16,
            borderRadius: 6,
            border: "1px solid #ccc"
            }}
        />

        <p style={{ fontSize: 14, marginBottom: 8 }}>메모</p>
        <textarea
            rows={3}
            placeholder="내용을 입력하세요"
            style={{
            width: "100%",
            padding: "10px",
            borderRadius: 6,
            border: "1px solid #ccc",
            resize: "none"
            }}
        />

        {/* 색상 선택 */}
        <div style={{ margin: "16px 0", display: "flex", gap: 8 }}>
            {["#f44336", "#ff9800", "#ffeb3b", "#4caf50", "#03a9f4", "#3f51b5", "#9c27b0", "#ccc"].map((color, index) => (
            <div key={index}
                style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: color,
                cursor: "pointer"
                }}
            ></div>
            ))}
        </div>

        <button
            onClick={() => setIsModalOpen(false)}
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
        </div>
    </div>
    )}

    </div>
  );
};

export default YouthCalendar;
