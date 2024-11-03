// pages/index.tsx
"use client"; // This directive tells Next.js this is a client component

import { useEffect, useState } from "react";
import Header from "./components/Header";
import Login from "./components/Login";
import AccountInfo from "./components/AccountInfo";
import { API_URL } from "./const";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [krwBalance, setKrwBalance] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  const setKrwBalanceFunction = (value: string) => {
    setKrwBalance(value);
  };

  // 로그인 성공 핸들러
  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // 로그인 상태 변경
    setIsLoading(false); // 로딩 완료
  };

  // 로그아웃 핸들러
  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
      setIsLoggedIn(false);
      setKrwBalance(null); // 잔액 초기화
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  // 페이지 로드 시 로그인 상태 확인
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/status`, {
          credentials: "include",
        });
        if (response.ok) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.log("Not authenticated", error);
      } finally {
        setIsLoading(false); // 로딩 완료
      }
    };
    checkAuthStatus();
  }, []);

  return (
    <div>
      {isLoading ? ( // 로딩 중일 때 스피너 표시
        <div className="flex items-center justify-center h-screen">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : !isLoggedIn ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          <Header krwBalance={krwBalance} onLogout={handleLogout} />
          <AccountInfo
            krwBalance={krwBalance}
            setKrwBalance={setKrwBalanceFunction}
          />
        </>
      )}
    </div>
  );
}
