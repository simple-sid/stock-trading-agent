// App.jsx - Stock Trading Platform with RL Agent Predictions
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './App.css';
import { History as HistoryIcon, Sun, Moon, Settings, TrendingUp, Bell, ArrowUpRight, ArrowDownRight, LayoutDashboard, LineChart as LineChartIcon, Brain, Briefcase, Newspaper, Settings as SettingsIcon, Menu as MenuIcon } from 'lucide-react';
import Markets from './pages/Markets';
import History from './pages/History';
import Predictions from './pages/Predictions';

function App() {
  // Theme state
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  
  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
  }, [isDarkTheme]);
  
  // Theme toggle handler
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };
  
  // collapsible sidebar
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  // state to track active page
  const [activePage, setActivePage] = useState('dashboard');

  const handleNavigation = (page) => {
    setActivePage(page);
  };

  // Portfolio data
  const [balance, setBalance] = useState(24638.92);
  const [portfolioChange, setPortfolioChange] = useState(+2.4);
  
  // Sample stock data with predictions
  const [stocks, setStocks] = useState([
    {
      id: 'AAPL',
      name: 'Apple Inc.',
      shares: 15,
      currentPrice: 187.32,
      purchasePrice: 178.50,
      change: +4.94,
      prediction: 'buy',
      confidence: 76,
      chart: [
        { day: '01', price: 180.50 },
        { day: '02', price: 182.30 },
        { day: '03', price: 181.40 },
        { day: '04', price: 183.20 },
        { day: '05', price: 185.70 },
        { day: '06', price: 184.80 },
        { day: '07', price: 186.30 },
        { day: '08', price: 187.32 }
      ]
    },
    {
      id: 'MSFT',
      name: 'Microsoft Corp.',
      shares: 10, 
      currentPrice: 403.78,
      purchasePrice: 410.20,
      change: -1.56,
      prediction: 'hold',
      confidence: 64,
      chart: [
        { day: '01', price: 410.20 },
        { day: '02', price: 408.50 },
        { day: '03', price: 405.60 },
        { day: '04', price: 404.20 },
        { day: '05', price: 402.90 },
        { day: '06', price: 401.75 },
        { day: '07', price: 402.80 },
        { day: '08', price: 403.78 }
      ]
    },
    {
      id: 'TSLA',
      name: 'Tesla Inc.',
      shares: 8,
      currentPrice: 248.42,
      purchasePrice: 228.70,
      change: +8.62,
      prediction: 'buy',
      confidence: 83,
      chart: [
        { day: '01', price: 228.70 },
        { day: '02', price: 232.40 },
        { day: '03', price: 236.80 },
        { day: '04', price: 240.10 },
        { day: '05', price: 243.50 },
        { day: '06', price: 245.20 },
        { day: '07', price: 247.90 },
        { day: '08', price: 248.42 }
      ]
    },
    {
      id: 'AMZN',
      name: 'Amazon.com Inc.',
      shares: 12,
      currentPrice: 173.51,
      purchasePrice: 178.90,
      change: -3.01,
      prediction: 'sell',
      confidence: 71,
      chart: [
        { day: '01', price: 178.90 },
        { day: '02', price: 177.60 },
        { day: '03', price: 176.20 },
        { day: '04', price: 175.40 },
        { day: '05', price: 174.90 },
        { day: '06', price: 173.80 },
        { day: '07', price: 173.40 },
        { day: '08', price: 173.51 }
      ]
    },
    {
      id: 'NVDA',
      name: 'NVIDIA Corporation',
      shares: 20,
      currentPrice: 892.61,
      purchasePrice: 780.50,
      change: +14.36,
      prediction: 'buy',
      confidence: 89,
      chart: [
        { day: '01', price: 780.50 },
        { day: '02', price: 795.80 },
        { day: '03', price: 810.25 },
        { day: '04', price: 825.70 },
        { day: '05', price: 840.10 },
        { day: '06', price: 855.40 },
        { day: '07', price: 878.90 },
        { day: '08', price: 892.61 }
      ]
    }
  ]);

  // Recent transactions
  const recentTransactions = [
    {
      id: 'TX789345',
      type: 'buy',
      symbol: 'AAPL',
      shares: 5,
      price: 187.32,
      total: 936.60,
      date: '2023-06-18',
      time: '14:32:45',
      status: 'Completed'
    },
    {
      id: 'TX789344',
      type: 'sell',
      symbol: 'NFLX',
      shares: 3,
      price: 612.75,
      total: 1838.25,
      date: '2023-06-17',
      time: '10:15:22',
      status: 'Completed'
    },
    {
      id: 'TX789343',
      type: 'buy',
      symbol: 'NVDA',
      shares: 10,
      price: 780.50,
      total: 7805.00,
      date: '2023-06-15',
      time: '09:45:12',
      status: 'Completed'
    },
    {
      id: 'TX789342',
      type: 'buy',
      symbol: 'TSLA',
      shares: 8,
      price: 228.70,
      total: 1829.60,
      date: '2023-06-10',
      time: '11:22:54',
      status: 'Completed'
    },
    {
      id: 'TX789341',
      type: 'sell',
      symbol: 'GOOGL',
      shares: 4,
      price: 138.45,
      total: 553.80,
      date: '2023-06-05',
      time: '15:47:09',
      status: 'Completed'
    },
    {
      id: 'TX789340',
      type: 'buy',
      symbol: 'MSFT',
      shares: 10,
      price: 410.20,
      total: 4102.00,
      date: '2023-06-01',
      time: '10:05:33',
      status: 'Completed'
    },
    {
      id: 'TX789339',
      type: 'buy',
      symbol: 'AMZN',
      shares: 12,
      price: 178.90,
      total: 2146.80,
      date: '2023-05-28',
      time: '13:30:21',
      status: 'Completed'
    }
  ];

  // Portfolio performance data for main chart
  const portfolioData = [
    { day: '01', value: 23800 },
    { day: '02', value: 23950 },
    { day: '03', value: 24100 },
    { day: '04', value: 24050 },
    { day: '05', value: 24220 },
    { day: '06', value: 24180 },
    { day: '07', value: 24350 },
    { day: '08', value: 24400 },
    { day: '09', value: 24320 },
    { day: '10', value: 24280 },
    { day: '11', value: 24350 },
    { day: '12', value: 24420 },
    { day: '13', value: 24380 },
    { day: '14', value: 24450 },
    { day: '15', value: 24520 },
    { day: '16', value: 24480 },
    { day: '17', value: 24550 },
    { day: '18', value: 24638 }
  ];

  // RL Agent metrics
  const agentMetrics = {
    accuracy: 76,
    successRate: 68,
    tradesWon: 17,
    tradesLost: 8
  };

  // Calculate total profit/loss
  const getTotalProfitLoss = () => {
    return stocks.reduce((total, stock) => {
      return total + ((stock.currentPrice - stock.purchasePrice) * stock.shares);
    }, 0);
  };

  return (
    <div className="stock-app">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="menu-toggle" onClick={toggleSidebar}>
            <MenuIcon size={22} />
          </div>
          {!isSidebarCollapsed && <div className="logo">STOCKSENSE AI</div>}
        </div>
        
        {!isSidebarCollapsed && (
          <div className="search-container">
            <input type="text" placeholder="Search stocks" className="search-input" />
          </div>
        )}
        
        <nav className="sidebar-nav">
          <div 
            className={`nav-item ${activePage === 'dashboard' ? 'active' : ''}`}
            onClick={() => handleNavigation('dashboard')}
          >
            <span className="nav-icon"><LayoutDashboard size={22} /></span>
            {!isSidebarCollapsed ? 
              <span className="nav-text">Dashboard</span> : 
              <span className="nav-tooltip">Dashboard</span>
            }
          </div>
          <div 
            className={`nav-item ${activePage === 'markets' ? 'active' : ''}`}
            onClick={() => handleNavigation('markets')}
          >
            <span className="nav-icon"><LineChartIcon size={22} /></span>
            {!isSidebarCollapsed ? 
              <span className="nav-text">Markets</span> : 
              <span className="nav-tooltip">Markets</span>
            }
          </div>
          <div 
            className={`nav-item ${activePage === 'predictions' ? 'active' : ''}`}
            onClick={() => handleNavigation('predictions')}
          >
            <span className="nav-icon"><Brain size={22} /></span>
            {!isSidebarCollapsed ? 
              <span className="nav-text">AI Predictions</span> : 
              <span className="nav-tooltip">AI Predictions</span>
            }
          </div>
          <div 
            className={`nav-item ${activePage === 'news' ? 'active' : ''}`}
            onClick={() => handleNavigation('news')}
          >
            <span className="nav-icon"><Newspaper size={22} /></span>
            {!isSidebarCollapsed ? 
              <span className="nav-text">News</span> : 
              <span className="nav-tooltip">News</span>
            }
          </div>
          <div 
            className={`nav-item ${activePage === 'history' ? 'active' : ''}`}
            onClick={() => handleNavigation('history')}
          >
            <span className="nav-icon"><HistoryIcon size={22} /></span>
            {!isSidebarCollapsed ? 
              <span className="nav-text">History</span> : 
              <span className="nav-tooltip">History</span>
            }
          </div>
          <div 
            className={`nav-item ${activePage === 'settings' ? 'active' : ''}`}
            onClick={() => handleNavigation('settings')}
          >
            <span className="nav-icon"><SettingsIcon size={22} /></span>
            {!isSidebarCollapsed ? 
              <span className="nav-text">Settings</span> : 
              <span className="nav-tooltip">Settings</span>
            }
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="main-header">
          <div className="page-title">
            {activePage === 'dashboard' && 'Portfolio Dashboard'}
            {activePage === 'markets' && 'Markets'}
            {activePage === 'predictions' && 'AI Predictions'}
            {activePage === 'news' && 'News'}
            {activePage === 'settings' && 'Settings'}
          </div>
          <div className="header-icons">
            <Bell className="header-icon" size={22} />
            <Settings className="header-icon" size={22} />
            {isDarkTheme ? (
              <Sun className="header-icon theme-toggle" size={22} onClick={toggleTheme} />
            ) : (
              <Moon className="header-icon theme-toggle" size={22} onClick={toggleTheme} />
            )}
          </div>
        </div>

        {/* Conditional rendering of content based on active page */}
        {activePage === 'dashboard' && (
          <div className="dashboard-content">
            {/* Your existing dashboard content */}
            <div className="top-row">
              {/* Portfolio Balance */}
              <div className="dashboard-card balance-card">
                <div className="card-label">Portfolio Value</div>
                <div className="balance-amount">${balance.toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
                <div className={`balance-change ${portfolioChange >= 0 ? 'positive' : 'negative'}`}>
                  {portfolioChange >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  {Math.abs(portfolioChange)}% today
                </div>
                
                {/* Add portfolio stats */}
                <div className="portfolio-stats">
                  <div className="portfolio-stat">
                    <span className="stat-label">Total Stocks</span>
                    <span className="stat-value">{stocks.length}</span>
                  </div>
                  <div className="portfolio-stat">
                    <span className="stat-label">Unrealized P/L</span>
                    <span className={`stat-value ${getTotalProfitLoss() >= 0 ? 'positive' : 'negative'}`}>
                      ${getTotalProfitLoss().toFixed(2)}
                    </span>
                  </div>
                  <div className="portfolio-stat">
                    <span className="stat-label">Cash Available</span>
                    <span className="stat-value">$4,156.78</span>
                  </div>
                </div>
              </div>

              {/* Main Chart */}
              <div className="chart-section">
                <div className="chart-header">
                  <div className="chart-title">Portfolio Performance</div>
                  <div className="chart-period">
                    <span className="period-option active">1D</span>
                    <span className="period-option">1W</span>
                    <span className="period-option">1M</span>
                    <span className="period-option">3M</span>
                    <span className="period-option">1Y</span>
                    <span className="period-option">All</span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={275}>
                  <LineChart data={portfolioData} margin={{ top: 5, right: 20, bottom: 5, left: -10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                    <XAxis dataKey="day" stroke="var(--chart-tick)" tick={{ fill: 'var(--chart-tick)', fontSize: 12 }} />
                    <YAxis stroke="var(--chart-tick)" tick={{ fill: 'var(--chart-tick)', fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--tooltip-bg)', border: 'none' }}
                      itemStyle={{ color: 'var(--text-primary)' }}
                      formatter={(value) => [`$${value}`, 'Value']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3b82f6" 
                      strokeWidth={2} 
                      dot={false} 
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* RL Agent Performance */}
              <div className="export-container">
                <div className="agent-status">
                  <div className="agent-header">RL Agent Status</div>
                  <div className="agent-status-indicator active">Active & Learning</div>
                </div>
                
                {/* Performance Metrics */}
                <div className="performance-metrics">
                  <div className="metric-card">
                    <div className="metric-header">
                      <span>Prediction Accuracy</span>
                    </div>
                    <div className="metric-data">
                      <div className="metric-label">Last 30 days</div>
                      <div className="metric-value">{agentMetrics.accuracy}%</div>
                    </div>
                    <div className="metric-progress">
                      <div className="progress-bar" style={{ width: `${agentMetrics.accuracy}%` }}></div>
                    </div>
                  </div>
                  
                  <div className="metric-card">
                    <div className="metric-header">
                      <span>Trade Success Rate</span>
                    </div>
                    <div className="metric-data">
                      <div className="metric-label">Trades: {agentMetrics.tradesWon}/{agentMetrics.tradesWon + agentMetrics.tradesLost}</div>
                      <div className="metric-value">{agentMetrics.successRate}%</div>
                    </div>
                    <div className="metric-progress">
                      <div className="progress-bar" style={{ width: `${agentMetrics.successRate}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stocks Row */}
            <div className="stocks-container">
              <div className="section-header">
                <h2>Your Stocks</h2>
                <button className="add-button">+ Add Stock</button>
              </div>
              <div className="stocks-grid">
                {stocks.map(stock => (
                  <div key={stock.id} className="stock-card dashboard-card">
                    <div className="stock-header">
                      <div className="stock-title">
                        <div className="stock-symbol">{stock.id}</div>
                        <div className="stock-name">{stock.name}</div>
                      </div>
                      <div className={`stock-change ${stock.change >= 0 ? 'positive' : 'negative'}`}>
                        {stock.change >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                        {Math.abs(stock.change)}%
                      </div>
                    </div>
                    
                    <div className="stock-chart">
                      <ResponsiveContainer width="100%" height={60}>
                        <LineChart data={stock.chart} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                          <Line 
                            type="monotone" 
                            dataKey="price" 
                            stroke={stock.change >= 0 ? "#10b981" : "#ef4444"} 
                            strokeWidth={2} 
                            dot={false} 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="stock-details">
                      <div className="stock-detail">
                        <span className="detail-label">Price</span>
                        <span className="detail-value">${stock.currentPrice}</span>
                      </div>
                      <div className="stock-detail">
                        <span className="detail-label">Shares</span>
                        <span className="detail-value">{stock.shares}</span>
                      </div>
                      <div className="stock-detail">
                        <span className="detail-label">Value</span>
                        <span className="detail-value">${(stock.shares * stock.currentPrice).toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="stock-prediction">
                      <div className={`prediction-badge ${stock.prediction}`}>
                        <TrendingUp size={14} />
                        AI Recommends: {stock.prediction.toUpperCase()} ({stock.confidence}% confidence)
                      </div>
                      <div className="action-buttons">
                        <button className="action-button buy">Buy</button>
                        <button className="action-button sell">Sell</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transactions Table */}
            <div className="transactions-section">
              <div className="section-header">
                <h2>Recent Transactions</h2>
                <button className="view-all-button" onClick={() => handleNavigation('history')}>View All</button>
              </div>
              <div className="transactions-table-container">
                <table className="transactions-table">
                  <thead>
                    <tr>
                      <th>Transaction ID</th>
                      <th>Type</th>
                      <th>Stock</th>
                      <th>Shares</th>
                      <th>Price</th>
                      <th>Total</th>
                      <th>Date & Time</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.slice(0, 3).map((transaction) => (
                      <tr key={transaction.id}>
                        <td>{transaction.id}</td>
                        <td>
                          <span className={`transaction-type ${transaction.type}`}>
                            {transaction.type === 'buy' ? 'BUY' : 'SELL'}
                          </span>
                        </td>
                        <td>{transaction.symbol}</td>
                        <td>{transaction.shares}</td>
                        <td>${transaction.price}</td>
                        <td>${transaction.total.toFixed(2)}</td>
                        <td>{transaction.date} {transaction.time}</td>
                        <td>
                          <span className="transaction-status">{transaction.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activePage === 'markets' && <Markets />}
        {activePage === 'history' && <History transactions={recentTransactions} stocks={stocks} />}
        {activePage === 'predictions' && <Predictions stocks={stocks} />}
        
      </main>
    </div>
  );
}

export default App;