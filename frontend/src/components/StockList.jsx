const StockList = ({ stocks, onSelect }) => {
  return (
    <table className="table">
      <thead className="table-header">
        <tr className="table-row">
          <th className="table-head">Symbol</th>
          <th className="table-head">Price</th>
          <th className="table-head">Change</th>
          <th className="table-head">Action</th>
        </tr>
      </thead>
      <tbody className="table-body">
        {stocks.map((stock) => (
          <tr key={stock.symbol} className="table-row">
            <td className="table-cell">{stock.symbol}</td>
            <td className="table-cell">${stock.price.toFixed(2)}</td>
            <td className={`table-cell ${stock.change >= 0 ? "text-green" : "text-red"}`}>
              {stock.change.toFixed(2)}%
            </td>
            <td className="table-cell">
              <button className="trade-button" onClick={() => onSelect(stock)}>Trade</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StockList;