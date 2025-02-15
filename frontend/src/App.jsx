import { useState } from "react";
import Portfolio from "./components/Portfolio";
import StockList from "./components/StockList";
import TradeActions from "./components/TradeActions";
import AgentStatus from "./components/AgentStatus";
import "./styles/App.css";

const sampleStocks = [
  { symbol: "AAPL", price: 150.25, change: 1.2 },
  { symbol: "GOOGL", price: 2800.75, change: -0.5 },
  { symbol: "AMZN", price: 3450.00, change: 2.1 },
  { symbol: "MSFT", price: 299.35, change: 1.8 },
];

export default function App() {
  const [portfolio, setPortfolio] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [bankBalance, setBankBalance] = useState(10000); // Initial bank balance
  const [agentStatus, setAgentStatus] = useState("idle"); // Initial agent status

  const handleTrade = (stock, action, quantity) => {
    const parsedQuantity = parseInt(quantity, 10);
    const value = stock.price * parsedQuantity;

    setPortfolio((prevPortfolio) => {
      const existingStock = prevPortfolio.find((s) => s.symbol === stock.symbol);

      if (existingStock) {
        return prevPortfolio.map((s) =>
          s.symbol === stock.symbol
            ? { ...s, quantity: action === "buy" ? s.quantity + parsedQuantity : Math.max(0, s.quantity - parsedQuantity), value }
            : s
        );
      } else {
        return action === "buy" ? [...prevPortfolio, { symbol: stock.symbol, quantity: parsedQuantity, value }] : prevPortfolio;
      }
    });

    // Update bank balance
    setBankBalance((prevBalance) => action === "buy" ? prevBalance - value : prevBalance + value);
  };

  return (
    <>
      <header className="header">
        <h1 className="header-title">Stock Trading Platform</h1>
        <nav className="header-nav">
          <a href="#home" className="header-link">Home</a>
          <a href="#invest" className="header-link">Invest</a>
          <a href="#profile" className="header-link">Profile</a>
        </nav>
      </header>
      <h1 className="title">Stock Trading Agent</h1>
      <AgentStatus status={agentStatus} />
      <div className="grid">
        <Portfolio portfolio={portfolio} bankBalance={bankBalance} />
        <TradeActions selectedStock={selectedStock} onTrade={handleTrade} />
      </div>
      <div className="stock-list">
        <StockList stocks={sampleStocks} onSelect={setSelectedStock} />
      </div>
    </>
  );
}