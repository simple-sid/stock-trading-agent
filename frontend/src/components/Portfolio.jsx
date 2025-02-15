const Portfolio = ({ portfolio, bankBalance }) => {
  return (
    <div className="portfolio-card">
      <div className="card-header">
        <h2 className="card-title">Your Portfolio</h2>
      </div>
      <div className="card-content">
        <div className="portfolio-balance">
          <span>Bank Balance: </span>
          <span className="portfolio-value">${bankBalance.toFixed(2)}</span>
        </div>
        <div className="portfolio-content">
          {portfolio.map((stock) => (
            <div key={stock.symbol} className="portfolio-item">
              <span>{stock.symbol} - {stock.quantity} shares</span>
              <span className="portfolio-value">${stock.value.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;