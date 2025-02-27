import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, Zap, Info, BarChart3 } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import './Predictions.css';

function Predictions({ stocks }) {
  const [timeframe, setTimeframe] = useState('1w');
  
  // Sample AI prediction metrics
  const predictionMetrics = {
    totalPredictions: 142,
    accuracy: 76,
    avgReturn: 8.3,
    lastUpdated: 'Today, 3:45 PM',
    topPerforming: {
      symbol: 'NVDA',
      return: 14.36,
      confidence: 89
    }
  };
  
  // Sample prediction data with historical performance
  const predictionHistory = [
    { date: 'Jan', accuracy: 72 },
    { date: 'Feb', accuracy: 68 },
    { date: 'Mar', accuracy: 74 },
    { date: 'Apr', accuracy: 71 },
    { date: 'May', accuracy: 76 },
    { date: 'Jun', accuracy: 79 }
  ];
  
  // Sample price target predictions
  const priceTargets = [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      currentPrice: 187.32,
      oneWeekTarget: 192.50,
      oneMonthTarget: 198.75,
      threeMonthTarget: 210.40,
      confidence: 76,
      trend: 'up',
      recommendation: 'buy'
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corp.',
      currentPrice: 403.78,
      oneWeekTarget: 408.20,
      oneMonthTarget: 415.50,
      threeMonthTarget: 428.90,
      confidence: 64,
      trend: 'up',
      recommendation: 'hold'
    },
    {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      currentPrice: 248.42,
      oneWeekTarget: 256.80,
      oneMonthTarget: 270.35,
      threeMonthTarget: 290.25,
      confidence: 83,
      trend: 'up',
      recommendation: 'buy'
    },
    {
      symbol: 'AMZN',
      name: 'Amazon.com Inc.',
      currentPrice: 173.51,
      oneWeekTarget: 170.25,
      oneMonthTarget: 168.40,
      threeMonthTarget: 160.75,
      confidence: 71,
      trend: 'down',
      recommendation: 'sell'
    },
    {
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      currentPrice: 892.61,
      oneWeekTarget: 915.30,
      oneMonthTarget: 940.75,
      threeMonthTarget: 975.80,
      confidence: 89,
      trend: 'up',
      recommendation: 'buy'
    }
  ];

  // Sample upcoming earnings predictions
  const earningsPredictions = [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      date: '2023-07-28',
      expectedEPS: 1.42,
      previousEPS: 1.36,
      priceImpact: 'moderate-positive'
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corp.',
      date: '2023-07-25',
      expectedEPS: 2.68,
      previousEPS: 2.73,
      priceImpact: 'slight-negative'
    },
    {
      symbol: 'AMZN',
      name: 'Amazon.com Inc.',
      date: '2023-07-30',
      expectedEPS: 0.58,
      previousEPS: 0.52,
      priceImpact: 'strong-positive'
    }
  ];

  return (
    <div className="predictions-page">
      <div className="predictions-header">
        <h1>AI Stock Predictions</h1>
        <div className="predictions-updated">
          Last updated: {predictionMetrics.lastUpdated}
        </div>
      </div>
      
      {/* Overview Metrics */}
      <div className="predictions-metrics">
        <div className="metric-card">
          <div className="metric-icon">
            <Zap size={24} />
          </div>
          <div className="metric-content">
            <div className="metric-value">{predictionMetrics.accuracy}%</div>
            <div className="metric-label">Prediction Accuracy</div>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">
            <BarChart3 size={24} />
          </div>
          <div className="metric-content">
            <div className="metric-value">{predictionMetrics.avgReturn}%</div>
            <div className="metric-label">Average Return</div>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">
            <TrendingUp size={24} />
          </div>
          <div className="metric-content">
            <div className="metric-value">{predictionMetrics.topPerforming.symbol}</div>
            <div className="metric-label">Top Performing Prediction</div>
            <div className="metric-subtext">+{predictionMetrics.topPerforming.return}% return</div>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">
            <Info size={24} />
          </div>
          <div className="metric-content">
            <div className="metric-value">{predictionMetrics.totalPredictions}</div>
            <div className="metric-label">Total Predictions</div>
          </div>
        </div>
      </div>
      
      {/* Accuracy Chart */}
      <div className="predictions-accuracy-card">
        <div className="card-header">
          <h2>Prediction Accuracy Over Time</h2>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={predictionHistory} margin={{ top: 5, right: 30, bottom: 5, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
            <XAxis dataKey="date" stroke="var(--chart-tick)" />
            <YAxis stroke="var(--chart-tick)" domain={[60, 80]} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'var(--tooltip-bg)', border: 'none' }}
              formatter={(value) => [`${value}%`, 'Accuracy']}
            />
            <Line 
              type="monotone" 
              dataKey="accuracy" 
              stroke="#8b5cf6" 
              strokeWidth={2} 
              dot={{ r: 4 }} 
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {/* Price Target Predictions */}
      <div className="predictions-targets-section">
        <div className="section-header">
          <h2>Price Target Predictions</h2>
          <div className="timeframe-selector">
            <button 
              className={`timeframe-button ${timeframe === '1w' ? 'active' : ''}`}
              onClick={() => setTimeframe('1w')}
            >
              1 Week
            </button>
            <button 
              className={`timeframe-button ${timeframe === '1m' ? 'active' : ''}`}
              onClick={() => setTimeframe('1m')}
            >
              1 Month
            </button>
            <button 
              className={`timeframe-button ${timeframe === '3m' ? 'active' : ''}`}
              onClick={() => setTimeframe('3m')}
            >
              3 Months
            </button>
          </div>
        </div>
        
        <div className="predictions-targets-table">
          <table className="targets-table">
            <thead>
              <tr>
                <th>Stock</th>
                <th>Current Price</th>
                <th>Target Price</th>
                <th>Potential</th>
                <th>Confidence</th>
                <th>Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {priceTargets.map(stock => {
                // Get target price based on selected timeframe
                const targetPrice = timeframe === '1w' ? stock.oneWeekTarget : 
                                   timeframe === '1m' ? stock.oneMonthTarget : 
                                   stock.threeMonthTarget;
                
                // Calculate potential percentage change
                const potential = ((targetPrice - stock.currentPrice) / stock.currentPrice) * 100;
                const isPotentialPositive = potential >= 0;
                
                return (
                  <tr key={stock.symbol}>
                    <td className="stock-info">
                      <div className="stock-symbol">{stock.symbol}</div>
                      <div className="stock-name">{stock.name}</div>
                    </td>
                    <td>${stock.currentPrice}</td>
                    <td>${targetPrice}</td>
                    <td className={isPotentialPositive ? 'positive' : 'negative'}>
                      {isPotentialPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                      {Math.abs(potential).toFixed(2)}%
                    </td>
                    <td>
                      <div className="confidence-bar-container">
                        <div 
                          className="confidence-bar" 
                          style={{ width: `${stock.confidence}%` }}
                        ></div>
                        <span className="confidence-text">{stock.confidence}%</span>
                      </div>
                    </td>
                    <td>
                      <div className={`recommendation-badge ${stock.recommendation}`}>
                        {stock.recommendation === 'buy' ? <TrendingUp size={14} /> : 
                         stock.recommendation === 'sell' ? <TrendingDown size={14} /> : 
                         <TrendingUp size={14} />}
                        {stock.recommendation.toUpperCase()}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Earnings Predictions */}
      <div className="earnings-predictions-section">
        <div className="section-header">
          <h2>Upcoming Earnings Predictions</h2>
        </div>
        
        <div className="earnings-cards">
          {earningsPredictions.map(earning => {
            const date = new Date(earning.date);
            const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            const isPredictionPositive = earning.expectedEPS >= earning.previousEPS;
            
            return (
              <div key={earning.symbol} className="earning-prediction-card">
                <div className="earning-header">
                  <div>
                    <div className="earning-symbol">{earning.symbol}</div>
                    <div className="earning-name">{earning.name}</div>
                  </div>
                  <div className="earning-date">{formattedDate}</div>
                </div>
                
                <div className="earning-metrics">
                  <div className="earning-metric">
                    <span className="earning-label">Expected EPS</span>
                    <span className={`earning-value ${isPredictionPositive ? 'positive' : 'negative'}`}>
                      ${earning.expectedEPS}
                    </span>
                  </div>
                  
                  <div className="earning-metric">
                    <span className="earning-label">Previous EPS</span>
                    <span className="earning-value">${earning.previousEPS}</span>
                  </div>
                  
                  <div className="earning-change">
                    {isPredictionPositive ? 
                      <span className="positive">
                        <ArrowUpRight size={14} />
                        +{((earning.expectedEPS - earning.previousEPS) / earning.previousEPS * 100).toFixed(1)}%
                      </span> :
                      <span className="negative">
                        <ArrowDownRight size={14} />
                        {((earning.expectedEPS - earning.previousEPS) / earning.previousEPS * 100).toFixed(1)}%
                      </span>
                    }
                  </div>
                </div>
                
                <div className="earning-impact">
                  <div className="impact-label">Expected Price Impact</div>
                  <div className={`impact-badge ${earning.priceImpact}`}>
                    {earning.priceImpact.includes('positive') ? 
                      <TrendingUp size={14} /> : 
                      <TrendingDown size={14} />
                    }
                    {earning.priceImpact.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="disclaimer">
        <p>
          <strong>Disclaimer:</strong> AI predictions are based on historical market data and algorithmic analysis. 
          These predictions are not financial advice and should not be the sole basis for investment decisions. 
          Past performance is not indicative of future results.
        </p>
      </div>
    </div>
  );
}

export default Predictions;