// src/pages/coins.tsx

import BollingerSqueezeChecker from "@/components/BollingerSqueeze";
import Header from "@/components/Header";

export default function CoinsPage() {
  // 로그아웃 핸들러
  const handleLogout = () => {
    localStorage.removeItem("token"); // 토큰 삭제

    // setKrwBalance(null); // 잔액 초기화
  };

  return (
    <>
      <Header onLogout={handleLogout} />{" "}
      <div className="bg-upbit-blue text-white p-6 rounded-md overflow-visible flex-column min-h-screen">
        <BollingerSqueezeChecker />
      </div>
    </>
  );
}
