import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import defaultProfile from '../assets/header/default-profile.svg';
import { fetchUserInfo } from '../api/mypage/userApi';

const MyPageSidebar: React.FC = () => {
  const [username, setUsername] = useState("로딩 중...");
  const [profileUrl, setProfileUrl] = useState(defaultProfile);

  const location = useLocation(); // 현재 경로 확인

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const data = await fetchUserInfo(); 
        setUsername(data.username);
        setProfileUrl(data.profileImageUrl || defaultProfile);
      } catch (error) {
        console.error("유저 정보 불러오기 실패:", error);
      }
    };

    getUserInfo();
  }, []);

  return (
    <div
      style={{
        width: 220,
        background: "#FBFBFB",
        borderRadius: 15,
        padding: "32px 24px",
        boxShadow: "0 1px 6px #0001",
        marginRight: 32,
        textAlign: "center",
        marginTop: 48
      }}
    >
      <img
        src={profileUrl}
        alt="프로필"
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

      <ul style={{ listStyle: "none", padding: 0, textAlign: "left", fontSize: 14, color: "#888" }}>
        <li
          style={{
            marginBottom: 12,
            fontWeight: location.pathname === "/recorded-youth" ? 700 : 400,
            color: location.pathname === "/recorded-youth" ? "#333" : "#888",
            backgroundColor: location.pathname === "/recorded-youth" ? "#e0e0e0" : "transparent",
            padding: "4px 12px",
            borderRadius: 5
          }}
        >
          <Link to="/recorded-youth" style={{ textDecoration: "none", color: "inherit" }}>
            • 내가 만든 청춘
          </Link>
        </li>
        <li
          style={{
            marginBottom: 12,
            fontWeight: location.pathname === "/recorded-youth/scrapped-youth" ? 700 : 400,
            color: location.pathname === "/recorded-youth/scrapped-youth" ? "#333" : "#888",
            backgroundColor: location.pathname === "/recorded-youth/scrapped-youth" ? "#e0e0e0" : "transparent",
            padding: "4px 12px",
            borderRadius: 5
          }}
        >
          <Link to="/recorded-youth/scrapped-youth" style={{ textDecoration: "none", color: "inherit" }}>
            · 스크랩한 청춘
          </Link>
        </li>
        <li
          style={{
            marginBottom: 12,
            fontWeight: location.pathname === "/recorded-youth/youth-calendar" ? 700 : 400,
            color: location.pathname === "/recorded-youth/youth-calendar" ? "#333" : "#888",
            backgroundColor: location.pathname === "/recorded-youth/youth-calendar" ? "#e0e0e0" : "transparent",
            padding: "4px 12px",
            borderRadius: 5
          }}
        >
          <Link to="/recorded-youth/youth-calendar" style={{ textDecoration: "none", color: "inherit" }}>
            · 청춘 일정
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MyPageSidebar;
