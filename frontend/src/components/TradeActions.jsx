import { useState } from "react";

const TradeActions = ({ selectedStock, onTrade }) => {
  const [quantity, setQuantity] = useState(1);

  if (!selectedStock) return <p className="text-muted">Select a stock to trade.</p>;

  return (
    <div className="trade-actions">
      <h2 className="trade-title">Trade {selectedStock.symbol}</h2>
      <div className="trade-controls">
        <input
          type="number"
          value={quantity}
          min="1"
          onChange={(e) => setQuantity(e.target.value)}
          className="input-quantity"
        />
        <button onClick={() => onTrade(selectedStock, "buy", quantity)} className="trade-button buy-button">
          Buy
        </button>
        <button onClick={() => onTrade(selectedStock, "sell", quantity)} className="trade-button sell-button">
          Sell
        </button>
      </div>
    </div>
  );
};

export default TradeActions;