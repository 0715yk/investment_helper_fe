// components/Header.tsx
"use client"; // This directive tells Next.js this is a client component

import Image from "next/image";
import React from "react";

interface HeaderProps {
  krwBalance: string | null;
  onLogout: () => void; // 로그아웃 콜백 함수
}

const Header: React.FC<HeaderProps> = ({ krwBalance, onLogout }) => {
  // 원화 단위로 포맷팅하는 함수
  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(parseFloat(amount));
  };

  return (
    <header className="sticky top-0 w-full p-4 flex justify-between items-center bg-[#013597] text-white z-50">
      {/* 좌측 BraveBIT 로고 */}
      <div className="flex items-center space-x-2">
        <Image
          src="/logo.svg"
          alt="BraveBIT Logo"
          layout="responsive"
          width={100}
          height={40}
          className="w-16 h-auto md:w-24"
        />
      </div>

      {/* 우측 KRW 잔액 및 로그아웃 버튼 */}
      <div className="flex items-center space-x-4">
        {krwBalance ? (
          <p className="text-sm md:text-base font-semibold whitespace-nowrap">
            잔액: {formatCurrency(krwBalance)}
          </p>
        ) : (
          <p className="text-sm md:text-base">Loading...</p>
        )}

        {/* 로그아웃 버튼 */}
        <button
          onClick={onLogout}
          className="px-4 py-2 md:px-6 bg-[#ff4d4f] text-white font-bold rounded hover:bg-[#e04445] transition-colors text-sm md:text-base whitespace-nowrap"
        >
          로그아웃
        </button>
      </div>
    </header>
  );
};

export default Header;
