'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, AlertTriangle, Brain, Code, Database, BarChart3, FileText, Play, Download } from 'lucide-react';

// Sample ridership data representing the COVID-19 impact
const sampleRidershipData = [
  { week: '2019-W01', year2019: 35000, year2020: 34500, year2021: 8500, year2022: 15000, year2023: 18500 },
  { week: '2019-W05', year2019: 36200, year2020: 35800, year2021: 8800, year2022: 15800, year2023: 19200 },
  { week: '2019-W10', year2019: 37500, year2020: 32000, year2021: 9200, year2022: 16500, year2023: 20100 },
  { week: '2019-W15', year2019: 38000, year2020: 15000, year2021: 10500, year2022: 18000, year2023: 21500 },
  { week: '2019-W20', year2019: 38500, year2020: 8500, year2021: 12000, year2022: 19500, year2023: 22800 },
  { week: '2019-W25', year2019: 37800, year2020: 6200, year2021: 13500, year2022: 20800, year2023: 23500 },
  { week: '2019-W30', year2019: 36500, year2020: 7800, year2021: 15200, year2022: 21500, year2023: 24200 },
  { week: '2019-W35', year2019: 37200, year2020: 9500, year2021: 16800, year2022: 22100, year2023: 24800 },
  { week: '2019-W40', year2019: 38800, year2020: 11200, year2021: 18500, year2022: 23200, year2023: 25500 },
  { week: '2019-W45', year2019: 39200, year2020: 12800, year2021: 19800, year2022: 23800, year2023: 26200 },
  { week: '2019-W50', year2019: 35800, year2020: 14200, year2021: 20500, year2022: 24200, year2023: 26800 },
  { week: '2019-W52', year2019: 32500, year2020: 15800, year2021: 21200, year2022: 24800, year2023: 27500 }
];

// Simulated Granger test results
const grangerResults = [
  { test: '2020 → 2021', pValue: 0.7789, significant: false, interpretation: 'Cannot predict 2021 from 2020' },
  { test: '2019 → 2021', pValue: 0.0073, significant: true, interpretation: 'Can predict 2021 from 2019' },
  { test: '2021 → 2022', pValue: 0.0156, significant: true, interpretation: 'Can predict 2022 from 2021' },
  { test: '2022 → 2023', pValue: 0.0089, significant: true, interpretation: 'Can predict 2023 from 2022' }
];

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'r', title }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden my-4">
      {title && (
        <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <span className="text-gray-300 text-sm font-medium">{title}</span>
            <button
              onClick={copyToClipboard}
              className="text-gray-400 hover:text-white text-sm"
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>
        </div>
      )}
      <pre className="p-4 overflow-x-auto">
        <code className="text-green-400 text-sm font-mono">
          {code}
        </code>
      </pre>
    </div>
  );
};

interface StepCardProps {
  number: number;
  title: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}

const StepCard: React.FC<StepCardProps> = ({ number, title, children, icon }) => {
  return (
    <div className="step-card">
      <div className="flex items-center mb-4">
        <div className="flex items-center justify-center w-10 h-10 bg-transit-blue text-white rounded-full mr-3">
          {number}
        </div>
        <div className="flex items-center">
          {icon}
          <h2 className="text-xl font-semibold ml-2">{title}</h2>
        </div>
      </div>
      {children}
    </div>
  );
};

const InteractiveGrangerTest = () => {
  const [selectedTest, setSelectedTest] = useState(0);
  
  return (
    <div className="interactive-demo">
      <h3 className="text-lg font-semibold mb-4">🧪 Interactive Granger Causality Testing</h3>
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
                    ? 'bg-transit-blue text-white border-transit-blue' 
                    : 'bg-white border-gray-300 hover:border-transit-blue'
                }`}
              >
                {result.test}
              </button>
            ))}
          </div>
        </div>
        
        <div className="statistical-result">
          <h4 className="font-medium text-blue-900 mb-2">
            Test Result: {grangerResults[selectedTest].test}
          </h4>
          <div className="space-y-2">
            <p><strong>P-value:</strong> {grangerResults[selectedTest].pValue}</p>
            <p><strong>Significant:</strong> 
              <span className={`ml-2 px-2 py-1 rounded text-xs ${
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
  );
};

const RidershipChart = () => {
  const [showPrediction, setShowPrediction] = useState(false);
  
  // Generate prediction data
  const predictionData = sampleRidershipData.map(point => ({
    ...point,
    predicted2024: point.year2023 * 1.08 + (Math.random() - 0.5) * 2000,
    predictionLower: (point.year2023 * 1.08 + (Math.random() - 0.5) * 2000) * 0.9,
    predictionUpper: (point.year2023 * 1.08 + (Math.random() - 0.5) * 2000) * 1.1
  }));
  
  return (
    <div className="chart-container">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">📊 Capitol Corridor Weekly Ridership</h3>
        <button
          onClick={() => setShowPrediction(!showPrediction)}
          className="bg-transit-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {showPrediction ? 'Hide' : 'Show'} 2024 Prediction
        </button>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={predictionData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="year2019" stroke="#8884d8" strokeWidth={2} name="2019 (Pre-COVID)" />
          <Line type="monotone" dataKey="year2020" stroke="#dc2626" strokeWidth={2} name="2020 (COVID Impact)" />
          <Line type="monotone" dataKey="year2021" stroke="#f97316" strokeWidth={2} name="2021 (Recovery Start)" />
          <Line type="monotone" dataKey="year2022" stroke="#eab308" strokeWidth={2} name="2022 (Recovery)" />
          <Line type="monotone" dataKey="year2023" stroke="#059669" strokeWidth={2} name="2023 (Stabilization)" />
          {showPrediction && (
            <>
              <Line type="monotone" dataKey="predicted2024" stroke="#3b82f6" strokeWidth={3} strokeDasharray="5 5" name="2024 (Predicted)" />
              <Area type="monotone" dataKey="predictionLower" stackId="1" stroke="none" fill="#3b82f6" fillOpacity={0.1} />
              <Area type="monotone" dataKey="predictionUpper" stackId="1" stroke="none" fill="#3b82f6" fillOpacity={0.1} />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
      
      <div className="mt-4 text-sm text-gray-600">
        <p><strong>Key Observations:</strong> The dramatic drop in 2020 demonstrates the "stochastic shock" of COVID-19, 
        while gradual recovery is visible in subsequent years.</p>
      </div>
    </div>
  );
};

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
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
            transportation planning, demand analysis, and economic planning—especially in the post-COVID-19 era.
          </p>
        </div>
      </div>

      {/* COVID Impact Visualization */}
      <div className="mb-12">
        <RidershipChart />
      </div>

      {/* Warning Box */}
      <div className="warning-box mb-12">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 mr-3" />
          <div>
            <h3 className="font-semibold text-amber-800 mb-2">Post-Pandemic Reality</h3>
            <p className="text-amber-700">
              Current weekly ridership data still remains much lower than pre-pandemic levels. 
              Work-from-home patterns and net migration changes have fundamentally altered commuter travel. 
              COVID-19 represented a <em>stochastic shock</em> across the economy, requiring new forecasting approaches.
            </p>
          </div>
        </div>
      </div>

      {/* Step-by-Step Guide */}
      <div className="space-y-8">
        
        {/* Step 1: Understanding Time Series Data */}
        <StepCard number={1} title="Understanding Time Series Data" icon={<BarChart3 className="w-5 h-5" />}>
          <p className="text-gray-700 mb-4">
            Ridership data measured at discrete intervals (weekly) is a perfect example of time series data. 
            However, not all historical data is useful for prediction. The 2020 trend differs substantially 
            from 2021-2022 trends due to the pandemic's massive disruption.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-3">📚 Key Concepts:</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>Stochastic Shock:</strong> Unexpected events that fundamentally change system behavior</li>
              <li>• <strong>Structural Break:</strong> Points where time series behavior changes permanently</li>
              <li>• <strong>Temporal Dependency:</strong> How past values influence future predictions</li>
            </ul>
          </div>
        </StepCard>

        {/* Step 2: Granger Causality Testing */}
        <StepCard number={2} title="Granger Causality Testing" icon={<Brain className="w-5 h-5" />}>
          <p className="text-gray-700 mb-4">
            Before building predictive models, we must determine which historical periods can reliably predict future periods. 
            Despite its name, Granger causality doesn't establish true causation—it only tests predictive utility.
          </p>

          <div className="warning-box">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
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

          <InteractiveGrangerTest />

          <div className="mt-6">
            <h4 className="font-medium mb-3">💻 Implementation in R:</h4>
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
          </div>
        </StepCard>

        {/* Step 3: Optimal Lag Selection */}
        <StepCard number={3} title="Optimal Lag Selection" icon={<Database className="w-5 h-5" />}>
          <p className="text-gray-700 mb-4">
            Determining the appropriate number of lags is crucial. Too few lags miss important patterns, 
            while too many lags can lead to false-positive findings. We use statistical criteria to choose optimal lags.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">🔍 Statistical Criteria:</h4>
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
              <h4 className="font-medium mb-3">📊 Sample VARselect() Output:</h4>
              <pre className="text-xs font-mono bg-white p-3 rounded border">
{`Selection-order criteria:
AIC(n)  HQ(n)   SC(n)   FPE(n)
1       1       1       1

$criteria
      1         2         3         4         5
AIC 1.451248e+01 1.426636e+01 1.420066e+01 1.419173e+01 1.418173e+01
HQ  1.451248e+01 1.426636e+01 1.420066e+01 1.419173e+01 1.418173e+01
SC  1.451248e+01 1.426636e+01 1.420066e+01 1.419173e+01 1.418173e+01
FPE 2.007500e+06 1.538720e+06 1.602136e+06 1.684978e+06 1.744531e+06`}
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

        {/* Step 4: Building the Prophet Model */}
        <StepCard number={4} title="Prophet: Non-Linear Modeling" icon={<TrendingUp className="w-5 h-5" />}>
          <p className="text-gray-700 mb-4">
            While linear regression is simple, it fails to capture seasonal patterns in ridership data. 
            Facebook's Prophet library provides a robust framework for non-linear additive time series forecasting 
            with automatic seasonality detection.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-3">✅ Prophet Advantages:</h4>
              <ul className="text-green-700 text-sm space-y-1">
                <li>• Handles seasonal patterns automatically</li>
                <li>• Robust to missing data and outliers</li>
                <li>• Provides uncertainty intervals</li>
                <li>• Simple parameter tuning</li>
                <li>• Built-in holiday effects</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-3">🔧 Key Features:</h4>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Non-linear trend modeling</li>
                <li>• Multiple seasonality components</li>
                <li>• Automatic changepoint detection</li>
                <li>• 80% confidence intervals by default</li>
                <li>• Easy re-fitting with new data</li>
              </ul>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-medium mb-3">📋 Data Structure Requirements:</h4>
            <div className="bg-gray-900 rounded-lg p-4">
              <pre className="text-green-400 text-sm">
{`# Prophet requires exactly two columns:
# 'ds' - datetime column (when measurement was collected)  
# 'y'  - measurement values (ridership counts)

         ds       y
2018-01-01   32500
2018-01-08   32166
2018-01-15   33729
2018-01-22   31666
2018-01-29   33615
2019-01-07   34563`}
              </pre>
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

          <div className="statistical-result">
            <h4 className="font-medium text-blue-900 mb-3">📈 Forecast Output Columns:</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <ul className="space-y-2 text-sm">
                  <li><strong>ds:</strong> Date</li>
                  <li><strong>yhat:</strong> Predicted value</li>
                </ul>
              </div>
              <div>
                <ul className="space-y-2 text-sm">
                  <li><strong>yhat_lower:</strong> Lower prediction bound (80%)</li>
                  <li><strong>yhat_upper:</strong> Upper prediction bound (80%)</li>
                </ul>
              </div>
            </div>
          </div>
        </StepCard>

        {/* Step 5: Model Interpretation and Applications */}
        <StepCard number={5} title="Results & Applications" icon={<FileText className="w-5 h-5" />}>
          <p className="text-gray-700 mb-4">
            With just a few lines of code, we've generated machine learning predictions with uncertainty bounds. 
            These forecasts have immediate applications in transportation planning and operations research.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-transit-light rounded-lg">
              <TrendingUp className="w-8 h-8 text-transit-blue mx-auto mb-2" />
              <h4 className="font-medium">Service Planning</h4>
              <p className="text-sm text-gray-600">Optimize route frequency and capacity</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Database className="w-8 h-8 text-recovery-green mx-auto mb-2" />
              <h4 className="font-medium">Resource Allocation</h4>
              <p className="text-sm text-gray-600">Budget staff and equipment needs</p>
            </div>
            <div className="text-center p-4 bg-amber-50 rounded-lg">
              <BarChart3 className="w-8 h-8 text-warning-amber mx-auto mb-2" />
              <h4 className="font-medium">Financial Forecasting</h4>
              <p className="text-sm text-gray-600">Predict fare revenue and subsidies</p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-semibold mb-4">🎯 Key Takeaways for Transit Agencies:</h4>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-start">
                <span className="text-transit-blue font-bold mr-3">1.</span>
                <span><strong>Historical Context Matters:</strong> COVID-19 created a structural break—pre-2020 data may not predict post-2020 patterns.</span>
              </div>
              <div className="flex items-start">
                <span className="text-transit-blue font-bold mr-3">2.</span>
                <span><strong>Statistical Validation:</strong> Always use Granger tests to validate which time periods can predict others.</span>
              </div>
              <div className="flex items-start">
                <span className="text-transit-blue font-bold mr-3">3.</span>
                <span><strong>Uncertainty Quantification:</strong> Prophet provides confidence intervals—essential for risk management.</span>
              </div>
              <div className="flex items-start">
                <span className="text-transit-blue font-bold mr-3">4.</span>
                <span><strong>Operational Applications:</strong> Forecasts inform service planning, budgeting, and policy decisions.</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-600 text-white rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">Ready to implement this methodology?</h4>
                <p className="text-blue-100 text-sm mt-1">Download the complete R implementation guide</p>
              </div>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Download Guide
              </button>
            </div>
          </div>
        </StepCard>
      </div>

      {/* Technical Notes Section */}
      <div className="mt-16 bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">📚 Technical References & Further Reading</h2>
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
    </div>
  );
}
