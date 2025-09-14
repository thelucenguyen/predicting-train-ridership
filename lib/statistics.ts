// Statistical utility functions for ridership prediction

export interface TimeSeriesData {
  date: string;
  value: number;
}

export interface GrangerTestResult {
  pValue: number;
  fStatistic: number;
  significant: boolean;
  interpretation: string;
}

export interface ProphetForecast {
  ds: string;
  yhat: number;
  yhat_lower: number;
  yhat_upper: number;
  trend: number;
  seasonal: number;
}

// Simulate Granger causality test
export function simulateGrangerTest(
  series1: number[], 
  series2: number[], 
  lags: number = 3
): GrangerTestResult {
  // Simplified simulation - in real implementation would use proper F-test
  const correlation = calculateCorrelation(series1, series2);
  const fStatistic = Math.abs(correlation) * 10 + Math.random() * 5;
  const pValue = Math.max(0.001, Math.min(0.999, 1 / (fStatistic + Math.random())));
  
  return {
    pValue,
    fStatistic,
    significant: pValue < 0.05,
    interpretation: pValue < 0.05 
      ? "Time series 1 can predict time series 2" 
      : "Time series 1 cannot reliably predict time series 2"
  };
}

// Calculate correlation between two series
function calculateCorrelation(series1: number[], series2: number[]): number {
  const n = Math.min(series1.length, series2.length);
  if (n === 0) return 0;
  
  const mean1 = series1.slice(0, n).reduce((a, b) => a + b, 0) / n;
  const mean2 = series2.slice(0, n).reduce((a, b) => a + b, 0) / n;
  
  let numerator = 0;
  let sum1 = 0;
  let sum2 = 0;
  
  for (let i = 0; i < n; i++) {
    const diff1 = series1[i] - mean1;
    const diff2 = series2[i] - mean2;
    numerator += diff1 * diff2;
    sum1 += diff1 * diff1;
    sum2 += diff2 * diff2;
  }
  
  const denominator = Math.sqrt(sum1 * sum2);
  return denominator === 0 ? 0 : numerator / denominator;
}

// Simplified Prophet-like forecasting
export function simpleProphetForecast(
  historicalData: TimeSeriesData[],
  periodsAhead: number
): ProphetForecast[] {
  if (historicalData.length < 2) {
    throw new Error("Need at least 2 historical data points");
  }

  // Calculate trend
  const values = historicalData.map(d => d.value);
  const trend = calculateLinearTrend(values);
  
  // Calculate seasonal component (simplified weekly pattern)
  const seasonalComponent = calculateSeasonalComponent(values);
  
  // Generate forecasts
  const forecasts: ProphetForecast[] = [];
  const lastDate = new Date(historicalData[historicalData.length - 1].date);
  
  for (let i = 1; i <= periodsAhead; i++) {
    const forecastDate = new Date(lastDate);
    forecastDate.setDate(forecastDate.getDate() + i * 7); // Weekly intervals
    
    const trendValue = trend.slope * i + trend.intercept;
    const seasonal = seasonalComponent[i % seasonalComponent.length];
    const yhat = Math.max(0, trendValue + seasonal);
    
    // Add uncertainty (simplified)
    const uncertainty = yhat * 0.2; // 20% uncertainty
    
    forecasts.push({
      ds: forecastDate.toISOString().split('T')[0],
      yhat,
      yhat_lower: Math.max(0, yhat - uncertainty),
      yhat_upper: yhat + uncertainty,
      trend: trendValue,
      seasonal
    });
  }
  
  return forecasts;
}

// Calculate linear trend
function calculateLinearTrend(values: number[]): { slope: number; intercept: number } {
  const n = values.length;
  const xMean = (n - 1) / 2;
  const yMean = values.reduce((a, b) => a + b, 0) / n;
  
  let numerator = 0;
  let denominator = 0;
  
  for (let i = 0; i < n; i++) {
    const xDiff = i - xMean;
    numerator += xDiff * (values[i] - yMean);
    denominator += xDiff * xDiff;
  }
  
  const slope = denominator === 0 ? 0 : numerator / denominator;
  const intercept = yMean - slope * xMean;
  
  return { slope, intercept };
}

// Calculate seasonal component (simplified)
function calculateSeasonalComponent(values: number[]): number[] {
  // Simple seasonal pattern based on historical averages
  const seasonLength = Math.min(12, values.length); // Max 12 periods
  const seasonal = new Array(seasonLength).fill(0);
  
  for (let i = 0; i < values.length; i++) {
    seasonal[i % seasonLength] += values[i];
  }
  
  // Average seasonal values
  const cycles = Math.ceil(values.length / seasonLength);
  return seasonal.map(sum => sum / cycles - values.reduce((a, b) => a + b, 0) / values.length);
}

// Information criteria for lag selection
export function calculateInformationCriteria(
  residuals: number[],
  numParameters: number
): {
  aic: number;
  bic: number;
  hqic: number;
} {
  const n = residuals.length;
  const rss = residuals.reduce((sum, r) => sum + r * r, 0);
  const logLikelihood = -n/2 * Math.log(2 * Math.PI * rss / n) - n/2;
  
  const aic = -2 * logLikelihood + 2 * numParameters;
  const bic = -2 * logLikelihood + numParameters * Math.log(n);
  const hqic = -2 * logLikelihood + 2 * numParameters * Math.log(Math.log(n));
  
  return { aic, bic, hqic };
}

// Generate sample ridership data with COVID impact
export function generateSampleRidershipData(): TimeSeriesData[] {
  const data: TimeSeriesData[] = [];
  const startDate = new Date('2019-01-01');
  
  for (let week = 0; week < 260; week++) { // 5 years of weekly data
    const date = new Date(startDate);
    date.setDate(date.getDate() + week * 7);
    
    const year = date.getFullYear();
    let baseRidership = 35000;
    
    // Seasonal pattern (higher in summer/fall)
    const dayOfYear = Math.floor((date.getTime() - new Date(year, 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const seasonalFactor = 1 + 0.1 * Math.sin(2 * Math.PI * dayOfYear / 365);
    
    // Year-specific adjustments
    if (year === 2020) {
      if (week > 10) { // COVID impact starts around March
        baseRidership *= week > 15 ? 0.2 : Math.max(0.2, 1 - (week - 10) * 0.16);
      }
    } else if (year === 2021) {
      baseRidership *= 0.4 + 0.3 * (week % 52) / 52; // Gradual recovery
    } else if (year === 2022) {
      baseRidership *= 0.6 + 0.2 * (week % 52) / 52; // Continued recovery
    } else if (year >= 2023) {
      baseRidership *= 0.75; // New baseline
    }
    
    // Add some random variation
    const noise = 1 + (Math.random() - 0.5) * 0.1;
    const value = Math.round(baseRidership * seasonalFactor * noise);
    
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.max(1000, value) // Minimum ridership
    });
  }
  
  return data;
}

// Export data to CSV format
export function exportToCSV(data: any[], filename: string): void {
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => row[header]).join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
