// components/BollingerChart.tsx
import { MouseEvent, useEffect, useState } from "react";
import Image from "next/image";
import { API_URL } from "@/const";

interface ChartData {
  coin: string;
  chart: string;
  chart_type: string;
}

interface BollingerChartProps {
  coinName: string;
  isOpen: boolean;
  onClose: (ev: MouseEvent) => void;
}

const BollingerChart: React.FC<BollingerChartProps> = ({
  coinName,
  isOpen,
  onClose,
}) => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChart = async () => {
      if (!isOpen) return;

      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `${API_URL}/bollinger_chart?coin_name=${coinName}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch chart data");
        }

        const data: ChartData = await response.json();
        setChartData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchChart();
  }, [coinName, isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      onClick={(ev: MouseEvent) => {
        ev.stopPropagation();
      }}
    >
      {/* 딤처리 배경 */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* 차트 컨테이너 */}
      <div className="relative z-10 w-full h-full max-w-4xl mx-auto p-4 flex items-center justify-center">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="text-black fixed top-5 right-5 z-20 p-2 rounded-full bg-white hover:bg-gray-100"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* 컨텐츠 */}
        <div className="w-full bg-white rounded-lg shadow-xl overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center h-[600px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
            </div>
          ) : error ? (
            <div className="text-red-500 text-center p-4">Error: {error}</div>
          ) : !chartData ? (
            <div className="text-gray-500 text-center p-4">
              No chart data available
            </div>
          ) : (
            <div className="relative w-full h-[600px]">
              <Image
                src={`data:image/png;base64,${chartData.chart}`}
                alt={`${coinName} Bollinger Bands Chart`}
                fill
                className="object-contain"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BollingerChart;
