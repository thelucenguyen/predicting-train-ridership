import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ridership Prediction with Non-Linear Models',
  description: 'Interactive guide for predicting time series passenger counts using modern statistical methods',
  keywords: ['time series', 'prediction', 'ridership', 'transportation', 'machine learning', 'prophet'],
  authors: [{ name: 'Lucille E. Nguyen' }, { name: 'Modern Web Implementation' }],
  openGraph: {
    title: 'Ridership Prediction Guide',
    description: 'Learn to forecast transit ridership using statistical modeling',
    type: 'website',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <h1 className="text-xl font-bold text-transit-blue">
                    📈 Ridership Prediction
                  </h1>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Non-Linear Additive Models
                </span>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
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
      </body>
    </html>
  )
}
