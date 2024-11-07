"use client";

import { useEffect, useState } from "react";
import { WS_URL } from "../const";

interface AssetBalance {
  currency: string;
  balance: number;
  avg_buy_price: number;
  current_price: number | null;
  profit_loss: number | null;
  profit_loss_rate: number | null;
}

interface Portfolio {
  total_asset: number;
  total_profit_loss: number;
  total_profit_loss_rate: number;
  balances: AssetBalance[];
}

const PortfolioDisplay = () => {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  useEffect(() => {
    let ws: WebSocket | null = null;
    let isComponentMounted = true;

    const connectWebSocket = () => {
      if (!isComponentMounted) return;

      setIsConnecting(true);
      setError(null);

      try {
        ws = new WebSocket(`${WS_URL}/ws/portfolio`);

        ws.onopen = () => {
          if (!isComponentMounted) return;
          setIsConnecting(false);
        };

        ws.onmessage = (event) => {
          if (!isComponentMounted) return;
          try {
            const data = JSON.parse(event.data);
            setPortfolio(data);
          } catch (e) {
            console.error("Failed to parse message:", e);
          }
        };

        ws.onerror = () => {
          if (!isComponentMounted) return;
          setError("연결 중 오류가 발생했습니다");
        };

        ws.onclose = (event) => {
          if (!isComponentMounted) return;
          if (!event.wasClean) {
            setTimeout(connectWebSocket, 3000);
          }
        };
      } catch (error) {
        if (!isComponentMounted) return;
        console.error(error);
        setError("연결을 생성할 수 없습니다");
      }
    };

    connectWebSocket();

    return () => {
      isComponentMounted = false;
      if (ws) {
        ws.close(1000, "Component unmounted");
      }
    };
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (isConnecting || !portfolio) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-upbit-blue min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-[#013597]">내 포트폴리오</h1>

      <div className="mb-8 bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <h2 className="text-2xl font-bold mb-4 text-[#013597]">전체 현황</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-black font-medium">총 자산</span>
            <span className="text-xl font-bold text-[#013597]">
              ₩
              {portfolio.total_asset.toLocaleString("ko-KR", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-black font-medium">총 손익</span>
            <div className="flex items-center gap-2">
              <span
                className={`text-xl font-bold ${
                  portfolio.total_profit_loss >= 0
                    ? "text-[#00b460]"
                    : "text-[#f33f4d]"
                }`}
              >
                ₩
                {portfolio.total_profit_loss.toLocaleString("ko-KR", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </span>
              <span
                className={`font-bold ${
                  portfolio.total_profit_loss >= 0
                    ? "text-[#00b460]"
                    : "text-[#f33f4d]"
                }`}
              >
                ({portfolio.total_profit_loss_rate.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-[#013597]">보유 자산</h2>
        <div className="grid gap-4">
          {portfolio.balances.map((asset) => (
            <div
              key={asset.currency}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-[#013597]">
                  {asset.currency}
                </h3>
                {asset.profit_loss != null && (
                  <p
                    className={`font-bold ${
                      asset.profit_loss >= 0
                        ? "text-[#00b460]"
                        : "text-[#f33f4d]"
                    }`}
                  >
                    {asset.profit_loss_rate?.toFixed(2)}%
                  </p>
                )}
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-black">보유수량</span>
                  <span className="font-bold text-black">
                    {Number(asset.balance).toLocaleString("ko-KR", {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black">평균매수가</span>
                  <span className="font-bold text-black">
                    ₩
                    {asset.avg_buy_price.toLocaleString("ko-KR", {
                      minimumFractionDigits: 5,
                      maximumFractionDigits: 5,
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black">현재가</span>
                  <span className="font-bold text-black">
                    ₩
                    {asset.current_price?.toLocaleString("ko-KR", {
                      minimumFractionDigits: 5,
                      maximumFractionDigits: 5,
                    }) ?? "로딩 중"}
                  </span>
                </div>
                {asset.profit_loss != null && (
                  <div className="flex justify-between pt-2 border-t border-gray-100">
                    <span className="text-black">손익</span>
                    <span
                      className={`font-bold ${
                        asset.profit_loss >= 0
                          ? "text-[#00b460]"
                          : "text-[#f33f4d]"
                      }`}
                    >
                      ₩
                      {asset.profit_loss.toLocaleString("ko-KR", {
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioDisplay;
