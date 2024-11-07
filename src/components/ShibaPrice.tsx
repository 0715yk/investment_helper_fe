"use client";

import { useEffect, useState } from "react";

const ShibaPrice = () => {
  const [price, setPrice] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(true);

  useEffect(() => {
    let ws: WebSocket | null = null;
    let isComponentMounted = true; // 컴포넌트 마운트 상태 추적

    const connectWebSocket = () => {
      if (!isComponentMounted) return; // 컴포넌트가 언마운트되었다면 연결하지 않음

      setIsConnecting(true);
      setError(null);

      try {
        ws = new WebSocket("ws://localhost:8000/api/ws/shiba-price");

        ws.onopen = () => {
          if (!isComponentMounted) return;
          console.log("WebSocket connection established");
          setIsConnecting(false);
          setError(null);
        };

        ws.onmessage = (event) => {
          if (!isComponentMounted) return;
          try {
            const data = JSON.parse(event.data);

            setPrice(data.price);
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
            console.log(
              "WebSocket connection lost, attempting to reconnect..."
            );
            setTimeout(connectWebSocket, 3000);
          } else {
            console.log("WebSocket connection closed cleanly");
          }
        };
      } catch (error) {
        if (!isComponentMounted) return;
        console.error("Failed to create WebSocket connection:", error);
        setError("연결을 생성할 수 없습니다");
      }
    };

    connectWebSocket();

    // Cleanup function
    return () => {
      isComponentMounted = false; // 컴포넌트가 언마운트됨을 표시
      if (ws) {
        ws.close(1000, "Component unmounted"); // 1000은 정상 종료 코드
      }
    };
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Shiba Inu Price</h1>
      {isConnecting ? (
        <p>연결 중...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <p className="text-lg">
          {price !== null ? `₩${price.toString()}` : "Loading..."}
        </p>
      )}
    </div>
  );
};

export default ShibaPrice;
