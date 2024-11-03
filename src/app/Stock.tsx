// Example function to call the stocks API
async function fetchFilteredStocks(perThreshold: number, divThreshold: number) {
    const response = await fetch(`http://localhost:8000/api/stocks?per_threshold=${perThreshold}&div_threshold=${divThreshold}`, {
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error('Failed to fetch stocks');
    }

    const data = await response.json();
    return data.value; // This will contain the filtered stocks list
}

// Usage example in a React component
import React, { useEffect, useState } from 'react';

const StockComponent: React.FC = () => {
    const [stocks, setStocks] = useState<any[]>([]);

    useEffect(() => {
        fetchFilteredStocks(15, 2)
            .then(setStocks)
            .catch((error) => console.error('Error fetching stocks:', error));
    }, []);

    return (
        <div>
            <h1>Filtered Stocks</h1>
            <ul>
                {stocks.map((stock) => (
                    <li key={stock.symbol}>{stock.name} (Symbol: {stock.symbol}) - PER: {stock.PER}, DIV: {stock.DIV}</li>
                ))}
            </ul>
        </div>
    );
};

export default StockComponent;
