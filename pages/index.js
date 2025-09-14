import { useState } from 'react'
import Head from 'next/head'

const sampleData = [
  { week: 'W01', year2019: 35000, year2020: 34500, year2021: 8500, year2022: 15000, year2023: 18500 },
  { week: 'W05', year2019: 36200, year2020: 35800, year2021: 8800, year2022: 15800, year2023: 19200 },
  { week: 'W10', year2019: 37500, year2020: 32000, year2021: 9200, year2022: 16500, year2023: 20100 },
  { week: 'W15', year2019: 38000, year2020: 15000, year2021: 10500, year2022: 18000, year2023: 21500 },
  { week: 'W20', year2019: 38500, year2020: 8500, year2021: 12000, year2022: 19500, year2023: 22800 }
]

export default function Home() {
  const [showData, setShowData] = useState(false)

  return (
    <>
      <Head>
        <title>Ridership Prediction with Non-Linear Models</title>
        <meta name="description" content="Interactive guide for predicting time series passenger counts" />
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

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Sample Ridership Data</h2>
              <button
                onClick={() => setShowData(!showData)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {showData ? 'Hide' : 'Show'} Data
              </button>
            </div>
            
            {showData && (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Week</th>
                      <th className="text-left py-2">2019</th>
                      <th className="text-left py-2">2020</th>
                      <th className="text-left py-2">2021</th>
                      <th className="text-left py-2">2022</th>
                      <th className="text-left py-2">2023</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleData.map((row, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="py-2">{row.week}</td>
                        <td className="py-2">{row.year2019.toLocaleString()}</td>
                        <td className="py-2 text-red-600">{row.year2020.toLocaleString()}</td>
                        <td className="py-2 text-orange-600">{row.year2021.toLocaleString()}</td>
                        <td className="py-2 text-yellow-600">{row.year2022.toLocaleString()}</td>
                        <td className="py-2 text-green-600">{row.year2023.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
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
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full mr-3">
                  1
                </div>
                <h2 className="text-xl font-semibold">Understanding Time Series Data</h2>
              </div>
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
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full mr-3">
                  2
                </div>
                <h2 className="text-xl font-semibold">Granger Causality Testing</h2>
              </div>
              <p className="text-gray-700 mb-4">
                Before building predictive models, we must determine which historical periods can reliably predict future periods. 
                Despite its name, Granger causality doesn't establish true causation—it only tests predictive utility.
              </p>
              
              <div className="bg-gray-900 rounded-lg p-4">
                <pre className="text-green-400 text-sm font-mono">
{`# Loading lmtest and running grangertest()
install.packages('lmtest')
library(lmtest)

grangertest([Timeseries 1], [Timeseries 2], order = [# lags])

# Example: Testing if 2020 can predict 2021
grangertest(CCJPA_2020, CCJPA_2021, order = 3)`}
                </pre>
              </div>
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
