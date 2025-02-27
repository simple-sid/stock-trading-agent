import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Filter, Search, ChevronDown } from 'lucide-react';
import './History.css';

function History({ transactions, stocks }) {
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Get current price for a stock symbol
  const getCurrentPrice = (symbol) => {
    const stock = stocks.find(stock => stock.id === symbol);
    return stock ? stock.currentPrice : 0;
  };

  // Calculate percentage change between purchase price and current price
  const calculateChange = (purchase, current) => {
    const change = ((current - purchase) / purchase) * 100;
    return change.toFixed(2);
  };

  // Filter transactions based on type and search term
  const filteredTransactions = transactions.filter(transaction => {
    const matchesType = filterType === 'all' || transaction.type === filterType;
    const matchesSearch = transaction.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    } else if (sortBy === 'symbol') {
      return sortOrder === 'asc' 
        ? a.symbol.localeCompare(b.symbol) 
        : b.symbol.localeCompare(a.symbol);
    } else if (sortBy === 'amount') {
      return sortOrder === 'asc' ? a.total - b.total : b.total - a.total;
    }
    return 0;
  });

  // Toggle sort order
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  return (
    <div className="history-page">
      <div className="history-header">
        <h1>Transaction History</h1>
        <div className="history-controls">
          <div className="filter-control">
            <Filter size={18} />
            <select 
              className="filter-dropdown" 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Transactions</option>
              <option value="buy">Buy Orders</option>
              <option value="sell">Sell Orders</option>
            </select>
          </div>
          <div className="search-control">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search by symbol or ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </div>

      <div className="history-content">
        <div className="transactions-table-container">
          <table className="transactions-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('date')} className="sortable-header">
                  Date & Time 
                  <ChevronDown 
                    size={16} 
                    className={`sort-icon ${sortBy === 'date' ? 'active' : ''} ${sortOrder === 'asc' ? 'asc' : ''}`} 
                  />
                </th>
                <th>Transaction ID</th>
                <th onClick={() => handleSort('type')} className="sortable-header">
                  Type
                  <ChevronDown 
                    size={16} 
                    className={`sort-icon ${sortBy === 'type' ? 'active' : ''} ${sortOrder === 'asc' ? 'asc' : ''}`} 
                  />
                </th>
                <th onClick={() => handleSort('symbol')} className="sortable-header">
                  Stock
                  <ChevronDown 
                    size={16} 
                    className={`sort-icon ${sortBy === 'symbol' ? 'active' : ''} ${sortOrder === 'asc' ? 'asc' : ''}`} 
                  />
                </th>
                <th>Shares</th>
                <th>Purchase Price</th>
                <th>Current Price</th>
                <th>Change</th>
                <th onClick={() => handleSort('amount')} className="sortable-header">
                  Total
                  <ChevronDown 
                    size={16} 
                    className={`sort-icon ${sortBy === 'amount' ? 'active' : ''} ${sortOrder === 'asc' ? 'asc' : ''}`} 
                  />
                </th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions.length > 0 ? (
                sortedTransactions.map((transaction) => {
                  const currentPrice = getCurrentPrice(transaction.symbol);
                  const change = calculateChange(transaction.price, currentPrice);
                  const isPositive = parseFloat(change) >= 0;

                  return (
                    <tr key={transaction.id}>
                      <td>{transaction.date} {transaction.time}</td>
                      <td>{transaction.id}</td>
                      <td>
                        <span className={`transaction-type ${transaction.type}`}>
                          {transaction.type === 'buy' ? 'BUY' : 'SELL'}
                        </span>
                      </td>
                      <td>{transaction.symbol}</td>
                      <td>{transaction.shares}</td>
                      <td>${transaction.price}</td>
                      <td>${currentPrice}</td>
                      <td className={isPositive ? 'positive' : 'negative'}>
                        {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        {Math.abs(change)}%
                      </td>
                      <td>${transaction.total.toFixed(2)}</td>
                      <td>
                        <span className="transaction-status">{transaction.status}</span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="10" className="no-results">
                    No transactions found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default History;