// components/Header.tsx
"use client"; // This directive tells Next.js this is a client component

import React from 'react';

interface HeaderProps {
  krwBalance: string | null;
}

const Header: React.FC<HeaderProps> = ({ krwBalance }) => {
  // 원화 단위로 포맷팅하는 함수
  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(parseFloat(amount));
  };

  return (
    <header style={{
      width: '100%',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between', // 좌우로 배치
      alignItems: 'center',
      backgroundColor: '#013597',
      color: '#ffffff'
    }}>
      {/* 좌측 BraveBIT 로고 */}
      <img src="/logo.svg" alt="BraveBIT Logo" style={{ height: '30px' }} />

      {/* 우측 KRW 잔액 */}
      {krwBalance ? (
        <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>
          잔액: {formatCurrency(krwBalance)}
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </header>
  );
};

export default Header;
