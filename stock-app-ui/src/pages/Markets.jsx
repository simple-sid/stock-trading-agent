import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, Star, Filter, Search } from 'lucide-react';
import './Markets.css';

function Markets() {
  const [activeIndex, setActiveIndex] = useState(0);
  const marketSections = ["Global Indices", "Sectors", "Top Movers"];
  
  // Sample market indices data
  const marketIndices = [
    {
      id: 'S&P500',
      name: 'S&P 500',
      value: '5,042.34',
      change: +1.28,
      data: [
        { time: '09:30', value: 5020 },
        { time: '10:30', value: 5025 },
        { time: '11:30', value: 5018 },
        { time: '12:30', value: 5030 },
        { time: '13:30', value: 5035 },
        { time: '14:30', value: 5042 }
      ]
    },
    {
      id: 'NASDAQ',
      name: 'NASDAQ Composite',
      value: '16,085.33',
      change: +1.54,
      data: [
        { time: '09:30', value: 15950 },
        { time: '10:30', value: 15980 },
        { time: '11:30', value: 16010 },
        { time: '12:30', value: 16045 },
        { time: '13:30', value: 16060 },
        { time: '14:30', value: 16085 }
      ]
    },
    {
      id: 'DOW',
      name: 'Dow Jones Industrial Avg',
      value: '38,973.12',
      change: +0.86,
      data: [
        { time: '09:30', value: 38700 },
        { time: '10:30', value: 38750 },
        { time: '11:30', value: 38820 },
        { time: '12:30', value: 38900 },
        { time: '13:30', value: 38930 },
        { time: '14:30', value: 38973 }
      ]
    }
  ];

  // Sample sectors data
  const sectorPerformance = [
    { 
      name: 'Technology', 
      value: +2.8, 
      ytd: +15.4,
      marketCap: '12.4T', 
      topStock: 'NVDA',
      topPerformer: { symbol: 'NVDA', name: 'NVIDIA Corp', change: +4.2 },
      worstPerformer: { symbol: 'INTC', name: 'Intel Corp', change: -1.8 }
    },
    { 
      name: 'Healthcare', 
      value: +1.4, 
      ytd: +5.2,
      marketCap: '6.8T', 
      topStock: 'LLY',
      topPerformer: { symbol: 'LLY', name: 'Eli Lilly & Co', change: +3.6 },
      worstPerformer: { symbol: 'JNJ', name: 'Johnson & Johnson', change: -0.5 }
    },
    { 
      name: 'Financials', 
      value: +0.7, 
      ytd: +8.7,
      marketCap: '8.1T', 
      topStock: 'JPM',
      topPerformer: { symbol: 'GS', name: 'Goldman Sachs', change: +2.3 },
      worstPerformer: { symbol: 'WFC', name: 'Wells Fargo', change: -0.3 }
    },
    { 
      name: 'Consumer Disc.', 
      value: +0.3, 
      ytd: +6.9,
      marketCap: '5.3T', 
      topStock: 'AMZN',
      topPerformer: { symbol: 'AMZN', name: 'Amazon.com Inc', change: +2.1 },
      worstPerformer: { symbol: 'MCD', name: 'McDonald\'s Corp', change: -0.7 }
    },
    { 
      name: 'Communications', 
      value: +0.2, 
      ytd: +10.5,
      marketCap: '5.9T', 
      topStock: 'GOOGL',
      topPerformer: { symbol: 'META', name: 'Meta Platforms', change: +1.8 },
      worstPerformer: { symbol: 'TMUS', name: 'T-Mobile US', change: -0.4 }
    },
    { 
      name: 'Energy', 
      value: -1.2, 
      ytd: -2.8,
      marketCap: '3.4T', 
      topStock: 'XOM',
      topPerformer: { symbol: 'SLB', name: 'Schlumberger', change: +0.7 },
      worstPerformer: { symbol: 'CVX', name: 'Chevron Corp', change: -2.5 }
    }
  ];

  const sectorComparisonData = sectorPerformance.map(sector => ({
    name: sector.name,
    today: sector.value,
    ytd: sector.ytd
  }));

  // Top movers data
  const topMovers = [
    { symbol: 'MARA', name: 'Marathon Digital', change: +12.4, price: 18.75 },
    { symbol: 'SMCI', name: 'Super Micro Computer', change: +9.8, price: 895.43 },
    { symbol: 'RIVN', name: 'Rivian Automotive', change: +8.3, price: 12.92 },
    { symbol: 'CVX', name: 'Chevron Corp', change: -5.2, price: 152.36 },
    { symbol: 'SQ', name: 'Block Inc', change: -4.7, price: 68.24 }
  ];

  // Expanded top movers data for dedicated tab
  const expandedTopMovers = [
    ...topMovers,
    { symbol: 'TSLA', name: 'Tesla Inc', change: +6.2, price: 198.73 },
    { symbol: 'AMD', name: 'Advanced Micro Devices', change: +4.8, price: 178.62 },
    { symbol: 'PLTR', name: 'Palantir Technologies', change: +4.5, price: 25.91 },
    { symbol: 'COIN', name: 'Coinbase Global', change: +3.9, price: 178.15 },
    { symbol: 'ABNB', name: 'Airbnb Inc', change: -3.8, price: 156.32 },
    { symbol: 'SPOT', name: 'Spotify Technology', change: -3.6, price: 293.46 },
    { symbol: 'LUV', name: 'Southwest Airlines', change: -3.5, price: 28.91 },
    { symbol: 'PYPL', name: 'PayPal Holdings', change: -3.3, price: 62.18 }
  ];

  // Dow Jones components for heat map
  const dowComponents = [
    { symbol: 'AAPL', name: 'Apple Inc.', change: +1.8, price: 178.72 },
    { symbol: 'MSFT', name: 'Microsoft Corp', change: +2.1, price: 415.28 },
    { symbol: 'V', name: 'Visa Inc', change: +0.7, price: 275.96 },
    { symbol: 'HD', name: 'Home Depot', change: +0.3, price: 371.35 },
    { symbol: 'UNH', name: 'UnitedHealth Group', change: +1.1, price: 527.90 },
    { symbol: 'JNJ', name: 'Johnson & Johnson', change: -0.4, price: 155.78 },
    { symbol: 'PG', name: 'Procter & Gamble', change: -0.2, price: 161.40 },
    { symbol: 'WMT', name: 'Walmart Inc', change: +0.5, price: 58.68 },
    { symbol: 'JPM', name: 'JPMorgan Chase', change: +1.2, price: 183.97 },
    { symbol: 'DIS', name: 'Walt Disney Co', change: -1.8, price: 112.24 },
    { symbol: 'MCD', name: 'McDonald\'s Corp', change: -0.7, price: 292.45 },
    { symbol: 'AMGN', name: 'Amgen Inc', change: +2.4, price: 278.36 }
  ];

  const renderTabContent = () => {
    switch(activeIndex) {
      case 0: // Global Indices
        return (
          <>
            <div className="market-indices-grid">
              {marketIndices.map(index => (
                <div key={index.id} className="market-index-card">
                  <div className="index-header">
                    <div>
                      <div className="index-name">{index.name}</div>
                      <div className="index-value">{index.value}</div>
                    </div>
                    <div className={`index-change ${index.change >= 0 ? 'positive' : 'negative'}`}>
                      {index.change >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                      {Math.abs(index.change)}%
                    </div>
                  </div>
                  <div className="index-chart">
                    <ResponsiveContainer width="100%" height={120}>
                      <AreaChart data={index.data} margin={{ top: 5, right: 0, bottom: 5, left: 0 }}>
                        <defs>
                          <linearGradient id={`gradient-${index.id}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={index.change >= 0 ? "#10b981" : "#ef4444"} stopOpacity={0.3}/>
                            <stop offset="95%" stopColor={index.change >= 0 ? "#10b981" : "#ef4444"} stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Tooltip
                          contentStyle={{ backgroundColor: 'var(--tooltip-bg)', border: 'none' }}
                          formatter={(value) => [`${value}`, 'Value']}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke={index.change >= 0 ? "#10b981" : "#ef4444"} 
                          fill={`url(#gradient-${index.id})`}
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ))}
            </div>

            {/* Dow Jones Heat Map - Only shown in Global Indices tab */}
            <div className="market-card dow-heat-map">
              <div className="market-card-header">
                <h3>Dow Jones Heat Map</h3>
                <span className="time-period">Today</span>
              </div>
              <div className="dow-components-grid">
                {dowComponents.map(stock => (
                  <div 
                    key={stock.symbol} 
                    className={`heat-map-item ${stock.change >= 2 ? 'strong-positive' : 
                      stock.change >= 0.5 ? 'positive' : 
                      stock.change > -0.5 ? 'neutral' :
                      stock.change > -2 ? 'negative' : 'strong-negative'}`}
                  >
                    <div className="heat-map-symbol">{stock.symbol}</div>
                    <div className="heat-map-change">{stock.change > 0 ? '+' : ''}{stock.change}%</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
        
      case 1: // Sectors
        return (
          <div className="sectors-content">
            {/* Sector Performance Chart */}
            <div className="market-card sector-comparison-card">
              <div className="market-card-header">
                <h3>Sector Performance Comparison</h3>
                <span className="time-period">Daily vs YTD</span>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={sectorComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'var(--tooltip-bg)', border: 'none' }}
                    formatter={(value) => [`${value}%`]}
                  />
                  <Bar dataKey="today" name="Today" fill="#3b82f6" />
                  <Bar dataKey="ytd" name="YTD" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            {/* Detailed Sectors Grid */}
            <div className="sectors-detail-grid">
              {sectorPerformance.map(sector => (
                <div key={sector.name} className="sector-detail-card market-card">
                  <div className="sector-detail-header">
                    <div className="sector-title">{sector.name}</div>
                    <div className={`sector-change ${sector.value >= 0 ? 'positive' : 'negative'}`}>
                      {sector.value >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                      {sector.value > 0 ? '+' : ''}{sector.value}%
                    </div>
                  </div>
                  
                  <div className="sector-stats">
                    <div className="sector-stat">
                      <span className="stat-label">YTD</span>
                      <span className={`stat-value ${sector.ytd >= 0 ? 'positive' : 'negative'}`}>
                        {sector.ytd > 0 ? '+' : ''}{sector.ytd}%
                      </span>
                    </div>
                    <div className="sector-stat">
                      <span className="stat-label">Market Cap</span>
                      <span className="stat-value">${sector.marketCap}</span>
                    </div>
                    <div className="sector-stat">
                      <span className="stat-label">Largest Stock</span>
                      <span className="stat-value">{sector.topStock}</span>
                    </div>
                  </div>
                  
                  <div className="sector-performers">
                    <div className="performer top-performer">
                      <div className="performer-header">Top Performer</div>
                      <div className="performer-details">
                        <span>{sector.topPerformer.symbol}</span>
                        <span className="positive">+{sector.topPerformer.change}%</span>
                      </div>
                    </div>
                    <div className="performer worst-performer">
                      <div className="performer-header">Worst Performer</div>
                      <div className="performer-details">
                        <span>{sector.worstPerformer.symbol}</span>
                        <span className="negative">{sector.worstPerformer.change}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 2: // Top Movers
        return (
          <div className="top-movers-content">
            <div className="top-movers-categories">
              <div className="top-movers-section">
                <div className="market-card top-gainers-card">
                  <div className="market-card-header">
                    <h2>Top Gainers</h2>
                    <span className="time-period">Today</span>
                  </div>
                  <div className="movers-list">
                    {expandedTopMovers.filter(stock => stock.change > 0)
                      .sort((a, b) => b.change - a.change)
                      .map(stock => (
                        <div key={stock.symbol} className="mover-item">
                          <div className="mover-info">
                            <div className="mover-symbol">{stock.symbol}</div>
                            <div className="mover-name">{stock.name}</div>
                          </div>
                          <div className="mover-price">${stock.price}</div>
                          <div className="mover-change positive">
                            <TrendingUp size={14} />
                            +{stock.change}%
                          </div>
                          <button className="watch-button">
                            <Star size={16} />
                          </button>
                        </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="top-movers-section">
                <div className="market-card top-losers-card">
                  <div className="market-card-header">
                    <h2>Top Losers</h2>
                    <span className="time-period">Today</span>
                  </div>
                  <div className="movers-list">
                    {expandedTopMovers.filter(stock => stock.change < 0)
                      .sort((a, b) => a.change - b.change)
                      .map(stock => (
                        <div key={stock.symbol} className="mover-item">
                          <div className="mover-info">
                            <div className="mover-symbol">{stock.symbol}</div>
                            <div className="mover-name">{stock.name}</div>
                          </div>
                          <div className="mover-price">${stock.price}</div>
                          <div className="mover-change negative">
                            <TrendingDown size={14} />
                            {stock.change}%
                          </div>
                          <button className="watch-button">
                            <Star size={16} />
                          </button>
                        </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="market-card unusual-volume-card">
              <div className="market-card-header">
                <h3>Unusual Volume</h3>
                <span className="time-period">Today</span>
              </div>
              <div className="placeholder-message">Unusual volume data available soon</div>
            </div> */}
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="markets-page">
      <div className="markets-header">
        <h1>Markets</h1>
      </div>
      
      <div className="markets-tabs">
        {marketSections.map((section, index) => (
          <div 
            key={section} 
            className={`markets-tab ${index === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            {section}
          </div>
        ))}
      </div>
      
      {renderTabContent()}
    </div>
  );
}

export default Markets;