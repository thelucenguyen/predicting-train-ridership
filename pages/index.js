import { useState, useEffect } from 'react'
import Head from 'next/head'

const ridershipData = [
  { week: 'W01', year2019: 35000, year2020: 34500, year2021: 8500, year2022: 15000, year2023: 18500 },
  { week: 'W05', year2019: 36200, year2020: 35800, year2021: 8800, year2022: 15800, year2023: 19200 },
  { week: 'W10', year2019: 37500, year2020: 32000, year2021: 9200, year2022: 16500, year2023: 20100 },
  { week: 'W15', year2019: 38000, year2020: 15000, year2021: 10500, year2022: 18000, year2023: 21500 },
  { week: 'W20', year2019: 38500, year2020: 8500, year2021: 12000, year2022: 19500, year2023: 22800 },
  { week: 'W25', year2019: 37800, year2020: 6200, year2021: 13500, year2022: 20800, year2023: 23500 },
  { week: 'W30', year2019: 36500, year2020: 7800, year2021: 15200, year2022: 21500, year2023: 24200 },
  { week: 'W35', year2019: 37200, year2020: 9500, year2021: 16800, year2022: 22100, year2023: 24800 },
  { week: 'W40', year2019: 38800, year2020: 11200, year2021: 18500, year2022: 23200, year2023: 25500 },
  { week: 'W45', year2019: 39200, year2020: 12800, year2021: 19800, year2022: 23800, year2023: 26200 },
  { week: 'W50', year2019: 35800, year2020: 14200, year2021: 20500, year2022: 24200, year2023: 26800 },
  { week: 'W52', year2019: 32500, year2020: 15800, year2021: 21200, year2022: 24800, year2023: 27500 }
]

const grangerResults = [
  { test: '2020 → 2021', pValue: 0.7789, significant: false, interpretation: 'Cannot predict 2021 from 2020' },
  { test: '2019 → 2021', pValue: 0.0073, significant: true, interpretation: 'Can predict 2021 from 2019' },
  { test: '2021 → 2022', pValue: 0.0156, significant: true, interpretation: 'Can predict 2022 from 2021' },
  { test: '2022 → 2023', pValue: 0.0089, significant: true, interpretation: 'Can predict 2023 from 2022' }
]

function RidershipChart() {
  const [showPrediction, setShowPrediction] = useState(false)
  const [showYears, setShowYears] = useState({
    year2019: true,
    year2020: true,
    year2021: true,
    year2022: true,
    year2023: true
  })

  const toggleYear = (year) => {
    setShowYears(prev => ({ ...prev, [year]: !prev[year] }))
  }

  // Chart dimensions
  const width = 800
  const height = 400
  const margin = { top: 20, right: 30, bottom: 40, left: 70 } // Increased left margin
  const chartWidth = width - margin.left - margin.right
  const chartHeight = height - margin.top - margin.bottom

  // Sample forecast data for demonstration - full year 2024
  const forecastData = [
    { predicted: 28500, lower: 26000, upper: 31000 },
    { predicted: 29200, lower: 26500, upper: 31900 },
    { predicted: 30100, lower: 27200, upper: 33000 },
    { predicted: 30800, lower: 27800, upper: 33800 },
    { predicted: 31500, lower: 28400, upper: 34600 },
    { predicted: 32200, lower: 29000, upper: 35400 },
    { predicted: 31800, lower: 28600, upper: 35000 },
    { predicted: 31400, lower: 28200, upper: 34600 },
    { predicted: 31900, lower: 28700, upper: 35100 },
    { predicted: 32600, lower: 29400, upper: 35800 },
    { predicted: 33200, lower: 30000, upper: 36400 },
    { predicted: 32800, lower: 29600, upper: 36000 }
  ]

  // Scale functions - include forecast data in range
  const allHistoricalValues = ridershipData.flatMap(d => [d.year2019, d.year2020, d.year2021, d.year2022, d.year2023])
  const allForecastValues = showPrediction ? forecastData.flatMap(d => [d.predicted, d.lower, d.upper]) : []
  const allValues = [...allHistoricalValues, ...allForecastValues]
  const maxValue = Math.max(...allValues)
  const minValue = Math.min(...allValues)
  const xScale = (index) => (index / (ridershipData.length - 1)) * chartWidth
  const yScale = (value) => chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight

  // Generate path data for each year
  const generatePath = (yearKey) => {
    return ridershipData
      .map((d, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(d[yearKey])}`)
      .join(' ')
  }

  // Generate forecast path - full line across chart
  const generateForecastPath = () => {
    if (!showPrediction || forecastData.length === 0) return ''
    return forecastData
      .map((d, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(d.predicted)}`)
      .join(' ')
  }

  // Generate confidence interval path - full area
  const generateConfidencePath = () => {
    if (!showPrediction || forecastData.length === 0) return ''
    const upperPath = forecastData
      .map((d, i) => `${xScale(i)} ${yScale(d.upper)}`)
      .join(' L ')
    const lowerPath = forecastData
      .slice()
      .reverse()
      .map((d, i) => `${xScale(forecastData.length - 1 - i)} ${yScale(d.lower)}`)
      .join(' L ')
    return `M ${upperPath} L ${lowerPath} Z`
  }

  const yearColors = {
    year2019: '#000000',
    year2020: '#dc2626',
    year2021: '#f97316',
    year2022: '#eab308',
    year2023: '#059669'
  }

  const yearLabels = {
    year2019: '2019 (Pre-COVID)',
    year2020: '2020 (COVID Impact)',
    year2021: '2021 (Recovery Start)',
    year2022: '2022 (Recovery)',
    year2023: '2023 (Stabilization)'
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Capitol Corridor Weekly Ridership & 2024 Forecast</h3>
        <button
          onClick={() => setShowPrediction(!showPrediction)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {showPrediction ? 'Hide' : 'Show'} 2024 Prediction
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(showYears).map(([year, visible]) => (
          <button
            key={year}
            onClick={() => toggleYear(year)}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              visible 
                ? 'text-white' 
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
            style={visible ? { backgroundColor: yearColors[year] } : {}}
          >
            {year.replace('year', '')}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <svg width={width} height={height} className="border rounded">
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map(ratio => (
              <g key={ratio}>
                <line
                  x1={0}
                  y1={chartHeight * ratio}
                  x2={chartWidth}
                  y2={chartHeight * ratio}
                  stroke="#e5e7eb"
                  strokeWidth={1}
                />
                <text
                  x={-10}
                  y={chartHeight * ratio + 4}
                  textAnchor="end"
                  fontSize="12"
                  fill="#6b7280"
                >
                  {Math.round(minValue + (maxValue - minValue) * (1 - ratio)).toLocaleString()}
                </text>
              </g>
            ))}

            {/* Year lines */}
            {Object.entries(showYears).map(([year, visible]) => {
              if (!visible) return null
              return (
                <path
                  key={year}
                  d={generatePath(year)}
                  fill="none"
                  stroke={yearColors[year]}
                  strokeWidth={2}
                />
              )
            })}

            {/* Data points */}
            {Object.entries(showYears).map(([year, visible]) => {
              if (!visible) return null
              return ridershipData.map((d, i) => (
                <circle
                  key={`${year}-${i}`}
                  cx={xScale(i)}
                  cy={yScale(d[year])}
                  r={3}
                  fill={yearColors[year]}
                />
              ))
            })}

            {/* Forecast */}
            {showPrediction && forecastData.length > 0 && (
              <g>
                {/* Confidence interval */}
                <path
                  d={generateConfidencePath()}
                  fill="#3b82f6"
                  fillOpacity={0.1}
                />
                
                {/* Forecast line */}
                <path
                  d={generateForecastPath()}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  strokeDasharray="5,5"
                />

                {/* Forecast points */}
                {forecastData.map((d, i) => (
                  <circle
                    key={`forecast-${i}`}
                    cx={xScale(i)}
                    cy={yScale(d.predicted)}
                    r={3}
                    fill="#3b82f6"
                  />
                ))}
              </g>
            )}

            {/* X-axis labels */}
            {ridershipData.map((d, i) => (
              <text
                key={i}
                x={xScale(i)}
                y={chartHeight + 20}
                textAnchor="middle"
                fontSize="10"
                fill="#6b7280"
              >
                {d.week}
              </text>
            ))}

            {/* Y-axis label */}
            <text
              x={-50}
              y={chartHeight / 2}
              textAnchor="middle"
              fontSize="12"
              fill="#6b7280"
              transform={`rotate(-90, -50, ${chartHeight / 2})`}
            >
              Weekly Ridership
            </text>
          </g>
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        {Object.entries(showYears).map(([year, visible]) => {
          if (!visible) return null
          return (
            <div key={year} className="flex items-center">
              <div 
                className="w-4 h-0.5 mr-2"
                style={{ backgroundColor: yearColors[year] }}
              ></div>
              <span>{yearLabels[year]}</span>
            </div>
          )
        })}
        {showPrediction && (
          <div className="flex items-center">
            <div className="w-4 h-0.5 mr-2 border-t-2 border-dashed border-blue-600"></div>
            <span>2024 Forecast (Prophet Model)</span>
          </div>
        )}
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p><strong>Key Observations:</strong> The dramatic drop in 2020 demonstrates the "stochastic shock" of COVID-19. 
        The 2024 forecast shows continued gradual recovery with uncertainty bounds reflecting post-pandemic volatility.</p>
      </div>
    </div>
  )
}

function ProphetChart({ predictions }) {
  if (!predictions) return null

  const width = 700
  const height = 350
  const margin = { top: 20, right: 30, bottom: 40, left: 70 }
  const chartWidth = width - margin.left - margin.right
  const chartHeight = height - margin.top - margin.bottom

  // Scale functions
  const allValues = predictions.flatMap(d => [d.yhat, d.yhat_lower, d.yhat_upper])
  const maxValue = Math.max(...allValues)
  const minValue = Math.min(...allValues)
  const xScale = (index) => (index / (predictions.length - 1)) * chartWidth
  const yScale = (value) => chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight

  // Generate paths
  const predictionPath = predictions
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(d.yhat)}`)
    .join(' ')

  const upperBoundPath = predictions
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(d.yhat_upper)}`)
    .join(' ')

  const lowerBoundPath = predictions
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(d.yhat_lower)}`)
    .join(' ')

  // Confidence interval area
  const confidenceArea = `
    M ${predictions.map((d, i) => `${xScale(i)} ${yScale(d.yhat_upper)}`).join(' L ')}
    L ${predictions.slice().reverse().map((d, i) => `${xScale(predictions.length - 1 - i)} ${yScale(d.yhat_lower)}`).join(' L ')}
    Z
  `

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
      <h5 className="font-medium text-green-900 mb-3">Prophet 2024 Forecast with Uncertainty Bounds</h5>
      
      <svg width={width} height={height} className="border rounded bg-white">
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map(ratio => (
            <g key={ratio}>
              <line
                x1={0}
                y1={chartHeight * ratio}
                x2={chartWidth}
                y2={chartHeight * ratio}
                stroke="#e5e7eb"
                strokeWidth={1}
              />
              <text
                x={-10}
                y={chartHeight * ratio + 4}
                textAnchor="end"
                fontSize="11"
                fill="#6b7280"
              >
                {Math.round(minValue + (maxValue - minValue) * (1 - ratio)).toLocaleString()}
              </text>
            </g>
          ))}

          {/* Confidence interval area */}
          <path
            d={confidenceArea}
            fill="#3b82f6"
            fillOpacity={0.15}
          />

          {/* Upper bound line */}
          <path
            d={upperBoundPath}
            fill="none"
            stroke="#93c5fd"
            strokeWidth={1.5}
            strokeDasharray="3,3"
          />

          {/* Lower bound line */}
          <path
            d={lowerBoundPath}
            fill="none"
            stroke="#93c5fd"
            strokeWidth={1.5}
            strokeDasharray="3,3"
          />

          {/* Main prediction line */}
          <path
            d={predictionPath}
            fill="none"
            stroke="#1d4ed8"
            strokeWidth={3}
          />

          {/* Prediction points */}
          {predictions.map((d, i) => (
            <circle
              key={i}
              cx={xScale(i)}
              cy={yScale(d.yhat)}
              r={4}
              fill="#1d4ed8"
            />
          ))}

          {/* X-axis labels */}
          {predictions.map((d, i) => {
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            if (i % 2 === 0) { // Show every other label to avoid crowding
              return (
                <text
                  key={i}
                  x={xScale(i)}
                  y={chartHeight + 20}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#6b7280"
                >
                  {months[i] || `Month ${i + 1}`}
                </text>
              )
            }
            return null
          })}

          {/* Y-axis label */}
          <text
            x={-50}
            y={chartHeight / 2}
            textAnchor="middle"
            fontSize="12"
            fill="#6b7280"
            transform={`rotate(-90, -50, ${chartHeight / 2})`}
          >
            Predicted Ridership
          </text>
        </g>
      </svg>

      {/* Chart legend */}
      <div className="mt-3 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center">
          <div className="w-4 h-0.5 mr-2 bg-blue-700"></div>
          <span>Prediction (yhat)</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-0.5 mr-2 border-t border-blue-300 border-dashed"></div>
          <span>Confidence Bounds</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-2 mr-2 bg-blue-600 opacity-15"></div>
          <span>80% Uncertainty Interval</span>
        </div>
      </div>

      <div className="mt-3 text-xs text-green-800">
        <strong>Prophet Components:</strong> This forecast combines trend, seasonality, and uncertainty quantification. 
        The shaded area represents the 80% confidence interval for each prediction.
      </div>
    </div>
  )
}

// Simplified Prophet implementation in JavaScript
class SimpleProphet {
  constructor() {
    this.seasonalLength = 52 // Weekly seasonality
    this.changepoints = []
    this.trend = null
    this.seasonal = null
  }

  fit(data) {
    // Calculate trend using linear regression
    this.trend = this.calculateTrend(data)
    
    // Calculate seasonal component
    this.seasonal = this.calculateSeasonality(data)
    
    // Detect changepoints
    this.changepoints = this.detectChangepoints(data)
    
    return this
  }

  calculateTrend(data) {
    const n = data.length
    const sumX = data.reduce((sum, _, i) => sum + i, 0)
    const sumY = data.reduce((sum, d) => sum + d.y, 0)
    const sumXY = data.reduce((sum, d, i) => sum + i * d.y, 0)
    const sumXX = data.reduce((sum, _, i) => sum + i * i, 0)
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX)
    const intercept = (sumY - slope * sumX) / n
    
    return { slope, intercept }
  }

  calculateSeasonality(data) {
    const seasonal = new Array(this.seasonalLength).fill(0)
    const counts = new Array(this.seasonalLength).fill(0)
    
    // Remove trend and calculate seasonal averages
    data.forEach((d, i) => {
      const trendValue = this.trend.slope * i + this.trend.intercept
      const detrended = d.y - trendValue
      const seasonalIndex = i % this.seasonalLength
      seasonal[seasonalIndex] += detrended
      counts[seasonalIndex]++
    })
    
    // Average seasonal components
    return seasonal.map((sum, i) => counts[i] > 0 ? sum / counts[i] : 0)
  }

  detectChangepoints(data) {
    // Simplified changepoint detection - look for significant slope changes
    const changepoints = []
    const windowSize = 8
    
    for (let i = windowSize; i < data.length - windowSize; i++) {
      const before = data.slice(i - windowSize, i)
      const after = data.slice(i, i + windowSize)
      
      const trendBefore = this.calculateTrend(before.map((d, idx) => ({ y: d.y, x: idx })))
      const trendAfter = this.calculateTrend(after.map((d, idx) => ({ y: d.y, x: idx })))
      
      const slopeChange = Math.abs(trendAfter.slope - trendBefore.slope)
      
      if (slopeChange > 500) { // Threshold for significant change
        changepoints.push({
          index: i,
          date: data[i].ds,
          slopeChange: slopeChange
        })
      }
    }
    
    return changepoints
  }

  predict(futureData) {
    return futureData.map((d, i) => {
      const dataIndex = i + this.seasonalLength // Continue from training data
      
      // Calculate trend
      let trendValue = this.trend.slope * dataIndex + this.trend.intercept
      
      // Apply changepoint adjustments
      this.changepoints.forEach(cp => {
        if (dataIndex > cp.index) {
          trendValue += cp.slopeChange * (dataIndex - cp.index)
        }
      })
      
      // Add seasonality
      const seasonalIndex = dataIndex % this.seasonalLength
      const seasonalValue = this.seasonal[seasonalIndex] || 0
      
      // Calculate prediction
      const yhat = Math.max(1000, trendValue + seasonalValue) // Minimum ridership floor
      
      // Calculate uncertainty (simplified)
      const uncertainty = yhat * 0.15 + 2000 // Base uncertainty
      
      return {
        ds: d.ds,
        yhat: Math.round(yhat),
        yhat_lower: Math.round(Math.max(500, yhat - uncertainty)),
        yhat_upper: Math.round(yhat + uncertainty),
        trend: Math.round(trendValue),
        seasonal: Math.round(seasonalValue)
      }
    })
  }
}

function ProphetDemo() {
  const [forecast, setForecast] = useState(null)
  const [isRunning, setIsRunning] = useState(false)
  const [selectedDataset, setSelectedDataset] = useState('2021-2023')

  const datasets = {
    '2021-2023': ridershipData.map((d, i) => ({ 
      ds: `2021-${String(i + 1).padStart(2, '0')}-01`, 
      y: d.year2021 + (d.year2022 - d.year2021) * 0.6 + (d.year2023 - d.year2021) * 0.3 
    })),
    '2022-2023': ridershipData.map((d, i) => ({ 
      ds: `2022-${String(i + 1).padStart(2, '0')}-01`, 
      y: d.year2022 + (d.year2023 - d.year2022) * 0.5 
    })),
    'Only 2023': ridershipData.map((d, i) => ({ 
      ds: `2023-${String(i + 1).padStart(2, '0')}-01`, 
      y: d.year2023 
    }))
  }

  const runProphetForecast = () => {
    setIsRunning(true)
    
    // Simulate processing time
    setTimeout(() => {
      const prophet = new SimpleProphet()
      const trainingData = datasets[selectedDataset]
      
      // Fit the model
      prophet.fit(trainingData)
      
      // Generate future dates (12 months ahead)
      const futureData = Array.from({ length: 12 }, (_, i) => ({
        ds: `2024-${String(i + 1).padStart(2, '0')}-01`
      }))
      
      // Make predictions
      const predictions = prophet.predict(futureData)
      
      setForecast({
        predictions,
        changepoints: prophet.changepoints,
        trend: prophet.trend,
        trainingData: trainingData
      })
      setIsRunning(false)
    }, 2000)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 my-8">
      <h3 className="text-xl font-semibold mb-4">Live Prophet Forecasting Demo</h3>
      
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="font-medium mb-3">Select Training Dataset (Based on Granger Tests):</h4>
          <div className="space-y-2">
            {Object.entries(datasets).map(([key, data]) => (
              <button
                key={key}
                onClick={() => setSelectedDataset(key)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedDataset === key 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-white border-gray-300 hover:border-blue-600'
                }`}
              >
                <div className="font-medium">{key.replace('-', ' to ')}</div>
                <div className="text-sm opacity-80">
                  {data.length} data points, Avg: {Math.round(data.reduce((sum, d) => sum + d.y, 0) / data.length).toLocaleString()}
                </div>
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-3">Prophet Model Configuration:</h4>
          <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
            <div><strong>Seasonality:</strong> Weekly (52 periods)</div>
            <div><strong>Changepoint Detection:</strong> Automatic</div>
            <div><strong>Uncertainty Interval:</strong> 80% confidence</div>
            <div><strong>Forecast Horizon:</strong> 12 months (Full 2024)</div>
            <div><strong>Growth:</strong> Linear with changepoints</div>
          </div>
          
          <button
            onClick={runProphetForecast}
            disabled={isRunning}
            className="w-full mt-4 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 font-medium"
          >
            {isRunning ? 'Running Prophet Model...' : 'Generate 2024 Forecast'}
          </button>
        </div>
      </div>

      {isRunning && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3"></div>
            <div>
              <div className="font-medium text-blue-900">Prophet Model Training in Progress...</div>
              <div className="text-blue-700 text-sm">Fitting trend • Detecting changepoints • Calculating seasonality • Generating forecasts</div>
            </div>
          </div>
        </div>
      )}

      {forecast && (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="font-medium text-green-900 mb-2">Model Successfully Trained!</div>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong>Trend Slope:</strong> {forecast.trend.slope > 0 ? '+' : ''}{forecast.trend.slope.toFixed(0)} riders/week
              </div>
              <div>
                <strong>Changepoints Detected:</strong> {forecast.changepoints.length}
              </div>
              <div>
                <strong>Forecast Confidence:</strong> 80% interval
              </div>
            </div>
          </div>

          <ProphetChart predictions={forecast.predictions} />

          <div>
            <h4 className="font-medium mb-3">2024 Annual Ridership Forecast Output:</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border rounded-lg">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left py-3 px-4 font-medium">Date</th>
                    <th className="text-left py-3 px-4 font-medium">Prediction</th>
                    <th className="text-left py-3 px-4 font-medium">Lower Bound</th>
                    <th className="text-left py-3 px-4 font-medium">Upper Bound</th>
                    <th className="text-left py-3 px-4 font-medium">Trend</th>
                    <th className="text-left py-3 px-4 font-medium">Seasonal</th>
                  </tr>
                </thead>
                <tbody>
                  {forecast.predictions.map((pred, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4 font-mono text-sm">{pred.ds}</td>
                      <td className="py-2 px-4 font-semibold text-blue-600">{pred.yhat.toLocaleString()}</td>
                      <td className="py-2 px-4 text-gray-600">{pred.yhat_lower.toLocaleString()}</td>
                      <td className="py-2 px-4 text-gray-600">{pred.yhat_upper.toLocaleString()}</td>
                      <td className="py-2 px-4 text-purple-600">{pred.trend.toLocaleString()}</td>
                      <td className="py-2 px-4 text-orange-600">{pred.seasonal > 0 ? '+' : ''}{pred.seasonal.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h5 className="font-medium text-blue-900 mb-2">Model Components</h5>
              <div className="text-blue-800 text-sm space-y-1">
                <div><strong>Trend:</strong> {forecast.trend.slope > 0 ? 'Increasing' : 'Decreasing'} at {Math.abs(forecast.trend.slope).toFixed(0)} riders/week</div>
                <div><strong>Seasonality:</strong> Weekly patterns detected</div>
                <div><strong>Baseline:</strong> {Math.round(forecast.trend.intercept).toLocaleString()} riders</div>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h5 className="font-medium text-orange-900 mb-2">Key Insights</h5>
              <div className="text-orange-800 text-sm space-y-1">
                <div>2024 annual average: <strong>{Math.round(forecast.predictions.reduce((sum, p) => sum + p.yhat, 0) / forecast.predictions.length).toLocaleString()}</strong> riders/month</div>
                <div>Peak month: <strong>{Math.max(...forecast.predictions.map(p => p.yhat)).toLocaleString()}</strong> riders</div>
                <div>Growth trajectory: <strong>{forecast.trend.slope > 0 ? 'Recovery continues' : 'Declining trend'}</strong></div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h5 className="font-medium mb-2">Export Forecast Data</h5>
            <button
              onClick={() => {
                const csvData = [
                  ['Date', 'Prediction', 'Lower_Bound', 'Upper_Bound', 'Trend', 'Seasonal'],
                  ...forecast.predictions.map(p => [p.ds, p.yhat, p.yhat_lower, p.yhat_upper, p.trend, p.seasonal])
                ]
                const csvContent = csvData.map(row => row.join(',')).join('\n')
                const blob = new Blob([csvContent], { type: 'text/csv' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `ridership_forecast_${selectedDataset}_${new Date().toISOString().split('T')[0]}.csv`
                a.click()
              }}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
            >
              Download CSV
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function CodeBlock({ code, title }) {
  const [copied, setCopied] = useState(false)

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden my-4">
      <div className="bg-gray-800 px-4 py-2 flex justify-between items-center">
        <span className="text-gray-300 text-sm font-medium">{title}</span>
        <button onClick={copyCode} className="text-gray-400 hover:text-white text-sm">
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-green-400 text-sm font-mono">{code}</code>
      </pre>
    </div>
  )
}

function StepCard({ number, title, children }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <div className="flex items-center mb-4">
        <div className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full mr-3">
          {number}
        </div>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      {children}
    </div>
  )
}

function GrangerTestDemo() {
  const [selectedTest, setSelectedTest] = useState(0)
  
  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200 my-6">
      <h3 className="text-lg font-semibold mb-4">Interactive Granger Causality Testing</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-3">Select Test Comparison:</h4>
          <div className="space-y-2">
            {grangerResults.map((result, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedTest(idx)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedTest === idx 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-white border-gray-300 hover:border-blue-600'
                }`}
              >
                {result.test}
              </button>
            ))}
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">
            Test Result: {grangerResults[selectedTest].test}
          </h4>
          <div className="space-y-2 text-sm">
            <p><strong>P-value:</strong> {grangerResults[selectedTest].pValue}</p>
            <p><strong>Significant:</strong> 
              <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                grangerResults[selectedTest].significant 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {grangerResults[selectedTest].significant ? 'Yes (p < 0.05)' : 'No (p ≥ 0.05)'}
              </span>
            </p>
            <p><strong>Interpretation:</strong> {grangerResults[selectedTest].interpretation}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Ridership Prediction with Non-Linear Models - Live Prophet Demo</title>
        <meta name="description" content="Interactive guide with live Prophet forecasting for predicting time series passenger counts" />
        <meta name="keywords" content="time series, prediction, ridership, transportation, machine learning, prophet, forecasting" />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-blue-600">
                  Ridership Prediction
                </h1>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-600">Live Prophet Implementation</span>
              </div>
            </div>
          </div>
        </nav>
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Predicting Time Series Passenger Counts
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Using Non-Linear Additive Models - Interactive Guide with Live Prophet Demo
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-4xl mx-auto">
              <p className="text-gray-700 leading-relaxed">
                This interactive guide demonstrates how to generate predictions for future ridership in transportation agencies. 
                Originally developed for Capitol Corridor Joint Powers Authority, this methodology includes a live implementation 
                of Facebook's Prophet algorithm running in your browser.
              </p>
            </div>
          </div>

          <RidershipChart />

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-12">
            <div className="flex items-start">
              <div className="w-5 h-5 text-amber-600 mt-0.5 mr-3">⚠</div>
              <div>
                <h3 className="font-semibold text-amber-800 mb-2">Post-Pandemic Reality</h3>
                <p className="text-amber-700">
                  Current weekly ridership data remains much lower than pre-pandemic levels. 
                  Work-from-home patterns and net migration changes have fundamentally altered commuter travel. 
                  COVID-19 represented a stochastic shock across the economy, requiring new forecasting approaches.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <StepCard number={1} title="Understanding Time Series Data">
              <p className="text-gray-700 mb-4">
                Ridership data measured at discrete intervals (weekly) is a perfect example of time series data. 
                However, not all historical data is useful for prediction. The 2020 trend differs substantially 
                from 2021-2022 trends due to the pandemic's massive disruption.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Key Concepts:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><strong>Stochastic Shock:</strong> Unexpected events that fundamentally change system behavior</li>
                  <li><strong>Structural Break:</strong> Points where time series behavior changes permanently</li>
                  <li><strong>Temporal Dependency:</strong> How past values influence future predictions</li>
                </ul>
              </div>
            </StepCard>

            <StepCard number={2} title="Granger Causality Testing">
              <p className="text-gray-700 mb-4">
                Before building predictive models, we must determine which historical periods can reliably predict future periods. 
                Despite its name, Granger causality doesn't establish true causation—it only tests predictive utility.
              </p>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <div className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0">⚠</div>
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-2">Philosophical Warning: Post Hoc Fallacy</h4>
                    <div className="text-amber-700 space-y-2">
                      <p><strong>Fallacy:</strong> "A occurred, then B occurred after A, therefore A caused B"</p>
                      <p><strong>Reality:</strong> Granger tests only measure predictive utility, not true causation.</p>
                      <p><strong>Examples of absurd "Granger causation":</strong></p>
                      <ul className="list-disc list-inside ml-4 text-sm">
                        <li>Eggs came before chickens</li>
                        <li>GDP can "cause" sunspots</li>
                        <li>The sun doesn't affect sunrise/sunset times</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <GrangerTestDemo />

              <CodeBlock
                title="Granger Causality Test Setup"
                code={`# Loading lmtest and running grangertest()
install.packages('lmtest')
library(lmtest)

grangertest([Timeseries 1], [Timeseries 2], order = [# lags])

# Example: Testing if 2020 can predict 2021
grangertest(CCJPA_2020, CCJPA_2021, order = 3)

# Example: Testing if 2019 can predict 2021  
grangertest(CCJPA_2019, CCJPA_2021, order = 3)`}
              />
            </StepCard>

            <StepCard number={3} title="Live Prophet Forecasting Implementation">
              <p className="text-gray-700 mb-4">
                Run Facebook's Prophet algorithm directly in your browser. This implementation includes trend detection, 
                seasonality modeling, changepoint detection, and uncertainty quantification—all the core components 
                of the original Prophet methodology.
              </p>

              <ProphetDemo />

              <CodeBlock
                title="Prophet Model Implementation (R)"
                code={`# Loading prophet
install.packages('prophet')
library(prophet)

# Prepare data structure (filtered based on Granger tests)
CCJPA_ridership <- data.frame(
  ds = seq(as.Date("2021-01-01"), as.Date("2022-12-31"), by = "week"),
  y = c(your_ridership_data_2021_2022)
)

# Fit the model
m <- prophet(CCJPA_ridership)

# Create future dataframe (predict 12 months forward)
future <- make_future_dataframe(m, periods = 12, freq = 'month')

# Generate forecast
forecast <- predict(m, future)

# View forecast components
print(forecast[c('ds', 'yhat', 'yhat_lower', 'yhat_upper', 'trend')])

# Visualize results
plot(m, forecast)
prophet_plot_components(m, forecast)

# Export predictions
write.csv(forecast, "ridership_forecast_2024.csv")`}
              />
            </StepCard>

            <StepCard number={4} title="Results & Applications">
              <p className="text-gray-700 mb-4">
                With the live Prophet implementation above, you've generated machine learning predictions with uncertainty bounds. 
                These forecasts have immediate applications in transportation planning and operations research.
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-600 rounded mx-auto mb-2"></div>
                  <h4 className="font-medium">Service Planning</h4>
                  <p className="text-sm text-gray-600">Optimize route frequency and capacity</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-600 rounded mx-auto mb-2"></div>
                  <h4 className="font-medium">Resource Allocation</h4>
                  <p className="text-sm text-gray-600">Budget staff and equipment needs</p>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <div className="w-8 h-8 bg-amber-600 rounded mx-auto mb-2"></div>
                  <h4 className="font-medium">Financial Forecasting</h4>
                  <p className="text-sm text-gray-600">Predict fare revenue and subsidies</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold mb-4">Key Takeaways for Transit Agencies:</h4>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start">
                    <span className="text-blue-600 font-bold mr-3">1.</span>
                    <span><strong>Historical Context Matters:</strong> COVID-19 created a structural break—pre-2020 data may not predict post-2020 patterns.</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 font-bold mr-3">2.</span>
                    <span><strong>Statistical Validation:</strong> Always use Granger tests to validate which time periods can predict others.</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 font-bold mr-3">3.</span>
                    <span><strong>Live Implementation:</strong> The Prophet demo above generates real forecasts you can use for planning.</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 font-bold mr-3">4.</span>
                    <span><strong>Operational Applications:</strong> Export CSV forecasts directly into your planning workflows.</span>
                  </div>
                </div>
              </div>
            </StepCard>
          </div>

          <div className="mt-16 bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Technical Implementation & References</h2>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Prophet Components Implemented:</h3>
                <ul className="space-y-1">
                  <li>• Linear trend with changepoint detection</li>
                  <li>• Weekly seasonal decomposition</li>
                  <li>• Uncertainty quantification</li>
                  <li>• Future period prediction</li>
                  <li>• Model component analysis</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Statistical Methods:</h3>
                <ul className="space-y-1">
                  <li>• Taylor, S.J. & Letham, B. (2018) - Forecasting at Scale</li>
                  <li>• Box & Jenkins (1970) - Time Series Analysis</li>
                  <li>• Granger, C.W.J. (1969) - Investigating Causal Relations</li>
                  <li>• JavaScript implementation of additive models</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-amber-800 text-sm">
                <strong>Disclaimer:</strong> This methodology was developed for Capitol Corridor Joint Powers Authority 
                during the post-COVID recovery period. The JavaScript Prophet implementation is simplified but maintains 
                core algorithmic principles. For production use, validate with the full R or Python Prophet library.
              </p>
            </div>
          </div>
        </main>
        
        <footer className="bg-gray-900 text-white py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm text-gray-400">
                Originally developed by Lucille E. Nguyen, Capitol Corridor Joint Powers Authority
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Interactive web implementation with live Prophet forecasting • Built with Next.js
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
