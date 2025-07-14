import React from "react";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";

const YouthCalendar: React.FC = () => {
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

  const generateCalendar = (): React.ReactNode[] => {
    const cells: React.ReactNode[] = [];

    // 빈 셀 먼저 채우기
    for (let i = 0; i < firstDay; i++) {
      cells.push(<td key={`empty-${i}`}></td>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const weekday = (firstDay + day - 1) % 7;
      const isSunday = weekday === 0;
      const isSaturday = weekday === 6;
      const isToday = day === date;

      cells.push(
        <td
          key={day}
          style={{
            color: isToday ? "#fff" : isSunday ? "#e53935" : isSaturday ? "#0b0b61" : "#333",
            backgroundColor: isToday ? "#0b0b61" : "transparent",
            borderRadius: isToday ? "50%" : "none",
            textAlign: "center",
            padding: "8px 0",
            fontWeight: isToday ? "bold" : "normal"
          }}
        >
          {day}
        </td>
      );
    }

    // 줄로 나누기
    const rows: React.ReactNode[] = [];
    for (let i = 0; i < cells.length; i += 7) {
      rows.push(<tr key={`row-${i}`}>{cells.slice(i, i + 7)}</tr>);
    }

    return rows;
  };

  return (
    <div style={pageBgStyle}>
      <Header isLoggedIn={true} username={username} profileUrl="" />

        <div style={containerStyle}>

            <div style={{ display: "flex" }}>
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
                    <div
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        background: "#e0e0e0",
                        margin: "0 auto 12px"
                    }}
                    />
                    <p style={{ fontWeight: "bold", marginBottom: 24 }}>{username}</p>
                    
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
                    <li style={{ marginBottom: 12, fontWeight: 700, color: "#333" }}>• 청춘 일정</li>
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
                        boxShadow: "0 0 8px rgba(0,0,0,0.05)"
                        }}
                    >

                        <h2 style={{ fontSize: 20, marginBottom: 24 }}>
                        청춘 일정 - {year}년 {month + 1}월
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
                                    fontWeight: 600
                                }}
                                >
                                {day}
                                </th>
                            ))}
                            </tr>
                        </thead>
                        <tbody>{generateCalendar()}</tbody>
                        </table>

                    </div>
                </div>
            </div>
      </div>

      {/* Floating 버튼 */}
      <button
        style={{
          position: "fixed",
          bottom: 32,
          right: 32,
          background: "#2c3e50",
          color: "#fff",
          width: 56,
          height: 56,
          borderRadius: "50%",
          border: "none",
          fontSize: 28,
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
        }}
      ></button>

    </div>
  );
};

export default YouthCalendar;
