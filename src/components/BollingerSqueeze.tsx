import { API_URL } from "@/const";
import { MouseEvent, useEffect, useState } from "react";
import BollingerChart from "./BollingerChart";

type Coin = {
  market: string;
  korean_name: string;
  english_name: string;
};

type SqueezeResponse = {
  signal: string | null;
  error?: string;
};

const BollingerSqueezeChecker: React.FC = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openGraph, setOpenGraph] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [squeezeStatus, setSqueezeStatus] = useState<{
    [key: string]: string | null;
  }>({});

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(`${API_URL}/get_all_market_codes`);
        const data = await response.json();
        setCoins(data.market_codes);
      } catch (error) {
        console.error("Failed to fetch coins:", error);
      }
    };
    fetchCoins();
  }, []);

  const checkSqueezeStatus = async (coinName: string) => {
    setSqueezeStatus((prevStatus) => ({ ...prevStatus, [coinName]: null }));

    try {
      const response = await fetch(
        `${API_URL}/check_bollinger_breakout?coin_name=${coinName}`
      );
      const data: SqueezeResponse = await response.json();

      setSqueezeStatus((prevStatus) => ({
        ...prevStatus,
        [coinName]: data.signal,
      }));

      setTimeout(() => {
        setSqueezeStatus((prevStatus) => ({ ...prevStatus, [coinName]: null }));
      }, 3000);
    } catch (error) {
      console.error("Failed to fetch squeeze status:", error);
    } finally {
    }
  };

  const onClose = (ev: MouseEvent) => {
    ev.stopPropagation();
    setIsOpen(false);
  };

  // 검색어에 따른 필터링된 코인 목록
  const filteredCoins = coins.filter(
    (coin) =>
      coin.korean_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.english_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pb-20 h-full">
      {/* 하단 검색창 공간 확보 */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {filteredCoins.map((coin) => (
          <button
            key={coin.market}
            onClick={(ev: MouseEvent) => {
              ev.stopPropagation();
              checkSqueezeStatus(coin.market);
            }}
            className={`p-3 border border-gray-200 rounded-lg transition-colors duration-300 ${
              squeezeStatus[coin.market] === "BUY"
                ? "bg-emerald-500"
                : squeezeStatus[coin.market] === "SELL"
                ? "bg-red-600"
                : squeezeStatus[coin.market] === "STAY"
                ? "bg-yellow-400"
                : "bg-white"
            }`}
          >
            <h3 className="text-black">{coin.korean_name}</h3>
            <p className="text-black">{coin.english_name}</p>
            <p className="text-black">{coin.market}</p>
            <button
              className="px-5 py-1.5 bg-green-500 text-white rounded-lg hover:bg-blue-600"
              onClick={(ev) => {
                ev.stopPropagation();
                setOpenGraph(coin.market);
                setIsOpen(true);
              }}
            >
              graph
            </button>
            {openGraph === coin.market && (
              <BollingerChart
                coinName={coin.market}
                onClose={onClose}
                isOpen={isOpen}
              />
            )}
          </button>
        ))}
      </div>
      {/* 검색창 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-md mx-auto flex gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="코인 이름 검색..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => setSearchTerm("")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            초기화
          </button>
        </div>
      </div>
    </div>
  );
};

export default BollingerSqueezeChecker;
