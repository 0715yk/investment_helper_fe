// components/Header.tsx
"use client"; // This directive tells Next.js this is a client component

import Image from "next/image";
import React from "react";
import HamburgerMenu from "./HamburgerMenu"; // 햄버거 메뉴 컴포넌트 import

interface HeaderProps {
  // krwBalance: string | null;
  onLogout: () => void; // 로그아웃 콜백 함수
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header className="border-b border-b-[#FFFFFF] sticky top-0 w-full p-4 flex justify-between items-center bg-[#013597] text-white z-50">
      {/* 좌측 BraveBIT 로고 */}
      <div className="relative w-24 h-14 md:w-32 md:h-16 max-w-[128px] max-h-[64px]">
        <Image
          src="/logo.svg"
          alt="BraveBIT Logo"
          fill // 부모 요소 크기에 맞추기
          priority // LCP 요소로 최우선 로드 설정
          className="object-contain"
        />
      </div>

      {/* 우측 KRW 잔액, 로그아웃 버튼 및 햄버거 메뉴 */}
      <div className="flex items-center space-x-4">
        {/* KRW 잔액 및 로그아웃 버튼 */}
        <button
          onClick={onLogout}
          className="px-4 py-2 md:px-6 bg-[#ff4d4f] text-white font-bold rounded hover:bg-[#e04445] transition-colors text-sm md:text-base whitespace-nowrap"
        >
          로그아웃
        </button>

        {/* 햄버거 메뉴 */}
        <HamburgerMenu />
      </div>
    </header>
  );
};

export default Header;
