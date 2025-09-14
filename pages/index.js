import { useState } from 'react'
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

const forecastData = [
  { week: 'W04', predicted: 28500, lower: 26000, upper: 31000 },
  { week: 'W08', predicted: 29200, lower: 26500, upper: 31900 },
  { week: 'W12', predicted: 30100, lower: 27200, upper: 33000 },
  { week: 'W16', predicted: 30800, lower: 27800, upper: 33800 },
  { week: 'W20', predicted: 31500, lower: 28400, upper: 34600 },
  { week: 'W24', predicted: 32200, lower: 29000, upper: 35400 },
  { week: 'W28', predicted: 31800, lower: 28600, upper: 35000 },
  { week: 'W32', predicted: 31400, lower: 28200, upper: 34600 },
  { week: 'W36', predicted: 31900, lower: 28700, upper: 35100 },
  { week: 'W40', predicted: 32600, lower: 29400, upper: 35800 },
  { week: 'W44', predicted: 33200, lower: 30000, upper: 36400 },
  { week: 'W48', predicted: 32800, lower: 29600, upper: 36000 },
  { week: 'W52', predicted: 32400, lower: 29200, upper: 35600 }
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
  const margin = { top: 20, right: 30, bottom: 40, left: 60 }
  const chartWidth = width - margin.left - margin.right
  const chartHeight = height - margin.top - margin.bottom

  // Scale functions
  const maxValue = Math.max(...ridershipData.flatMap(d => [d.year2019, d.year2020, d.year2021, d.year2022, d.year2023]))
  const minValue = Math.min(...ridershipData.flatMap(d => [d.year2019, d.year2020, d.year2021, d.year2022, d.year2023]))
  const xScale = (index) => (index / (ridershipData.length - 1)) * chartWidth
  const yScale = (value) => chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight

  // Generate path data for each year
  const generatePath = (yearKey) => {
    return ridershipData
      .map((d, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(d[yearKey])}`)
      .join(' ')
  }

  // Generate forecast path
  const generateForecastPath = () => {
    const startX = chartWidth
    return forecastData
      .map((d, i) => `${i === 0 ? 'M' : 'L'} ${startX + (i / (forecastData.length - 1)) * chartWidth * 0.5} ${yScale(d.predicted)}`)
      .join(' ')
  }

  // Generate confidence interval path
  const generateConfidencePath = () => {
    const startX = chartWidth
    const upperPath = forecastData
      .map((d, i) => `${startX + (i / (forecastData.length - 1)) * chartWidth * 0.5} ${yScale(d.upper)}`)
      .join(' L ')
    const lowerPath = forecastData
      .slice()
      .reverse()
      .map((d, i) => `${startX + ((forecastData.length - 1 - i) / (forecastData.length - 1)) * chartWidth * 0.5} ${yScale(d.lower)}`)
      .join(' L ')
    return `M ${upperPath} L ${lowerPath} Z`
  }

  const yearColors = {
    year2019: '#3b82f6',
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
            {showPrediction && (
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
                    cx={chartWidth + (i / (forecastData.length - 1)) * chartWidth * 0.5}
                    cy={yScale(d.predicted)}
                    r={3}
                    fill="#3b82f6"
                  />
                ))}

                {/* 2024 label */}
                <text
                  x={chartWidth + chartWidth * 0.25}
                  y={20}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#3b82f6"
                  fontWeight="bold"
                >
                  2024 (Predicted)
                </text>
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
              x={-40}
              y={chartHeight / 2}
              textAnchor="middle"
              fontSize="12"
              fill="#6b7280"
              transform={`rotate(-90, -40, ${chartHeight / 2})`}
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
        <title>Ridership Prediction with Non-Linear Models</title>
        <meta name="description" content="Interactive guide for predicting time series passenger counts using modern statistical methods" />
        <meta name="keywords" content="time series, prediction, ridership, transportation, machine learning, prophet" />
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
                <span className="text-sm text-gray-600">Non-Linear Additive Models</span>
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
              Using Non-Linear Additive Models - Interactive Guide
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-4xl mx-auto">
              <p className="text-gray-700 leading-relaxed">
                This interactive guide demonstrates how to generate predictions for future ridership in transportation agencies. 
                Originally developed for Capitol Corridor Joint Powers Authority, this methodology is essential for 
                transportation planning, demand analysis, and economic planning in the post-COVID-19 era.
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

            <StepCard number={3} title="Optimal Lag Selection">
              <p className="text-gray-700 mb-4">
                Determining the appropriate number of lags is crucial. Too few lags miss important patterns, 
                while too many lags can lead to false-positive findings. We use statistical criteria to choose optimal lags.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Statistical Criteria:</h4>
                  <div className="space-y-3">
                    <div className="bg-blue-50 p-3 rounded">
                      <strong>AIC(n)</strong> - Akaike Information Criterion
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <strong>SC(n)</strong> - Schwarz/Bayesian Information Criterion
                    </div>
                    <div className="bg-purple-50 p-3 rounded">
                      <strong>HQ(n)</strong> - Hannan-Quinn Information Criterion
                    </div>
                    <div className="bg-orange-50 p-3 rounded">
                      <strong>FPE(n)</strong> - Final Prediction Error
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">Sample VARselect() Output:</h4>
                  <pre className="text-xs font-mono bg-white p-3 rounded border">
{`Selection-order criteria:
AIC(n)  HQ(n)   SC(n)   FPE(n)
1       1       1       1

$criteria
      1         2         3         4         5
AIC 1.451e+01 1.427e+01 1.420e+01 1.419e+01 1.418e+01
HQ  1.451e+01 1.427e+01 1.420e+01 1.419e+01 1.418e+01
SC  1.451e+01 1.427e+01 1.420e+01 1.419e+01 1.418e+01
FPE 2.008e+06 1.539e+06 1.602e+06 1.685e+06 1.745e+06`}
                  </pre>
                </div>
              </div>

              <CodeBlock
                title="Lag Selection with vars Package"
                code={`# Loading vars and running VARselect()
install.packages('vars')
library(vars)

VARselect([Timeseries], lag.max = [maximum lags])

# Example with ridership data
ridership_data <- cbind(CCJPA_2019, CCJPA_2021, CCJPA_2022)
lag_selection <- VARselect(ridership_data, lag.max = 12)

# View results
lag_selection$selection`}
              />

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <p className="text-blue-800">
                  <strong>Best Practice:</strong> When AIC(n) and SC(n) disagree, practitioners often prefer SC(n) 
                  due to its greater consistency. Choose the higher of the two optimal lag orders for your Granger test.
                </p>
              </div>
            </StepCard>

            <StepCard number={4} title="Prophet: Non-Linear Modeling">
              <p className="text-gray-700 mb-4">
                While linear regression is simple, it fails to capture seasonal patterns in ridership data. 
                Facebook's Prophet library provides a robust framework for non-linear additive time series forecasting 
                with automatic seasonality detection.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-3">Prophet Advantages:</h4>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• Handles seasonal patterns automatically</li>
                    <li>• Robust to missing data and outliers</li>
                    <li>• Provides uncertainty intervals</li>
                    <li>• Simple parameter tuning</li>
                    <li>• Built-in holiday effects</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-3">Key Features:</h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Non-linear trend modeling</li>
                    <li>• Multiple seasonality components</li>
                    <li>• Automatic changepoint detection</li>
                    <li>• 80% confidence intervals by default</li>
                    <li>• Easy re-fitting with new data</li>
                  </ul>
                </div>
              </div>

              <CodeBlock
                title="Prophet Model Implementation"
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

# Create future dataframe (predict 365 days forward)
future <- make_future_dataframe(m, periods = 365)

# Generate forecast
forecast <- predict(m, future)

# Visualize results
plot(m, forecast)

# Export predictions
write.csv(forecast, "ridership_forecast_2024.csv")`}
              />
            </StepCard>

            <StepCard number={5} title="Results & Applications">
              <p className="text-gray-700 mb-4">
                With just a few lines of code, we've generated machine learning predictions with uncertainty bounds. 
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
                    <span><strong>Uncertainty Quantification:</strong> Prophet provides confidence intervals—essential for risk management.</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 font-bold mr-3">4.</span>
                    <span><strong>Operational Applications:</strong> Forecasts inform service planning, budgeting, and policy decisions.</span>
                  </div>
                </div>
              </div>
            </StepCard>
          </div>

          <div className="mt-16 bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Technical References & Further Reading</h2>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Statistical Methods:</h3>
                <ul className="space-y-1">
                  <li>• Box & Jenkins (1970) - Time Series Analysis: Forecasting and Control</li>
                  <li>• Lükepohl (1991) - Introduction to Multiple Time Series Analysis</li>
                  <li>• Burnham & Anderson (2004) - Model Selection with AIC and BIC</li>
                  <li>• Lopez & Weber (2017) - Testing for Granger Causality in Panel Data</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Implementation Resources:</h3>
                <ul className="space-y-1">
                  <li>• Facebook Prophet Documentation</li>
                  <li>• R lmtest Package for Granger Testing</li>
                  <li>• R vars Package for VAR Model Selection</li>
                  <li>• Anthropic Claude for Statistical Computing</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-amber-800 text-sm">
                <strong>Disclaimer:</strong> This methodology was developed for Capitol Corridor Joint Powers Authority 
                during the post-COVID recovery period. Results may vary based on regional conditions, service patterns, 
                and external factors. Always validate predictions with domain expertise and operational knowledge.
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
                Interactive web implementation • Built with Next.js and modern statistical computing
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
