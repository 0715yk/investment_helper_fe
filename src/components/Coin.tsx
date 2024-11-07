// Example function to call the coins API
async function fetchFilteredCoins() {
  const response = await fetch(`${API_URL}/coins`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch coins");
  }

  const data = await response.json();
  return data.value; // This will contain the filtered coins list
}

import { API_URL } from "@/const";
// Usage example in a React component
import React, { useEffect, useState } from "react";

const CoinComponent: React.FC = () => {
  const [coins, setCoins] = useState<any[]>([]);

  useEffect(() => {
    fetchFilteredCoins()
      .then(setCoins)
      .catch((error) => console.error("Error fetching coins:", error));
  }, []);

  return (
    <div>
      <h1>Filtered Coins</h1>
      <ul>
        {coins.map((coin) => (
          <li key={coin.symbol}>
            {coin.symbol} - Current Price: {coin.current_price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoinComponent;
