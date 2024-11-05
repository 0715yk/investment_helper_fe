// pages/index.tsx
"use client"; // This directive tells Next.js this is a client component

import { useEffect, useState } from "react";
import Header from "./components/Header";
import Login from "./components/Login";
// import AccountInfo from "./components/AccountInfo";
import { API_URL } from "./const";
// import ShibaPrice from "./components/ShibaPrice";
import PortfolioDisplay from "./components/PortfolioDisplay";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //   const [krwBalance, setKrwBalance] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  //   const setKrwBalanceFunction = (value: string) => {
  //     setKrwBalance(value);
  //   };

  // 로그인 성공 핸들러
  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // 로그인 상태 변경
    setIsLoading(false); // 로딩 완료
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    localStorage.removeItem("token"); // 토큰 삭제
    setIsLoggedIn(false);
    // setKrwBalance(null); // 잔액 초기화
  };

  // 페이지 로드 시 로그인 상태 확인
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false); // 토큰이 없으면 로딩 완료
        return;
      }

      try {
        const response = await fetch(`${API_URL}/auth/status`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem("token"); // 토큰이 유효하지 않으면 삭제
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
          <Header onLogout={handleLogout} />
          {/* <AccountInfo
            krwBalance={krwBalance}
            setKrwBalance={setKrwBalanceFunction}
          /> */}
          <PortfolioDisplay />
          {/* <ShibaPrice /> */}
        </>
      )}
    </div>
  );
}
