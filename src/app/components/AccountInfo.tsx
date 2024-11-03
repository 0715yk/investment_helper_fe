"use client"; // This directive tells Next.js this is a client component

import { useEffect, useState } from "react";
import { API_URL } from "../const";

interface AccountInfo {
  currency: string;
  balance: string;
  locked: string;
  avg_buy_price: string;
}

interface AccountInfoProps {
  krwBalance: string | null;
  setKrwBalance: (value: string) => void;
}

const AccountInfo: React.FC<AccountInfoProps> = ({
  krwBalance,
  setKrwBalance,
}) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const response = await fetch(`${API_URL}/account-info`);
        if (!response.ok) {
          throw new Error("Failed to fetch account information");
        }
        const data = await response.json();
        const krwAccount = data.data.find(
          (account: AccountInfo) => account.currency === "KRW"
        );

        if (krwAccount) {
          setKrwBalance(krwAccount.balance);
        }
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchAccountInfo();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          maxWidth: "400px",
          width: "100%",
          backgroundColor: "#f5f5f5",
        }}
      >
        <h1 style={{ color: "#2c3e50", marginBottom: "1rem" }}>
          My Upbit Account
        </h1>
        {error ? (
          <p style={{ color: "red" }}>Error: {error}</p>
        ) : krwBalance ? (
          <div>
            <p style={{ fontSize: "1.25rem", color: "#34495e" }}>
              KRW Balance:
            </p>
            <p
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: "#16a085",
              }}
            >
              {krwBalance}
            </p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default AccountInfo;
