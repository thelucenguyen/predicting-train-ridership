# 📈 Ridership Prediction App

An interactive web application that demonstrates time series passenger count prediction using non-linear additive models. Originally developed for Capitol Corridor Joint Powers Authority by Lucille E. Nguyen, this implementation translates the statistical methodology into modern web technologies.

## 🚀 Live Demo

Deploy this app to Vercel for instant access to the interactive ridership prediction guide.

## 📊 Overview

This application provides a step-by-step interactive guide for:

1. **Understanding Time Series Data** - Learn about temporal dependencies and structural breaks
2. **Granger Causality Testing** - Determine which historical periods can predict future ridership
3. **Optimal Lag Selection** - Use statistical criteria (AIC, BIC, HQ) to choose model parameters
4. **Prophet Forecasting** - Implement Facebook's Prophet algorithm for non-linear predictions
5. **Results Interpretation** - Apply forecasts to transportation planning and operations

## 🎯 Key Features

- **Interactive Visualizations** - Dynamic charts showing COVID-19's impact on ridership
- **Statistical Computing** - Browser-based implementation of Granger tests and lag selection
- **Prophet Implementation** - Simplified version of Facebook's forecasting algorithm
- **Code Examples** - R and JavaScript implementations side-by-side
- **Export Functionality** - Download predictions as CSV files
- **Educational Content** - Comprehensive explanations of statistical concepts

## 🛠 Technology Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Composable charting library
- **Lucide React** - Beautiful SVG icons
- **Vercel** - Deployment and hosting platform

## 📱 Installation & Development

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Setup
```bash
# Clone the repository
git clone <repository-url>
cd ridership-prediction-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to view the application.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with zero configuration

```bash
# Or deploy directly with Vercel CLI
npm install -g vercel
vercel
```

### Build for Production

```bash
npm run build
npm run start
```

## 📚 Methodology

### Statistical Foundation

The application implements several key statistical concepts:

**Granger Causality Testing**
- Tests whether one time series can predict another
- Uses F-statistics and p-values for hypothesis testing
- Warns against interpreting results as true causation

**Lag Selection Criteria**
- Akaike Information Criterion (AIC)
- Schwarz/Bayesian Information Criterion (BIC) 
- Hannan-Quinn Information Criterion (HQ)
- Final Prediction Error (FPE)

**Prophet Forecasting**
- Non-linear trend modeling
- Automatic seasonality detection
- Uncertainty quantification with confidence intervals
- Robust handling of missing data and outliers

### COVID-19 Impact Analysis

The application specifically addresses the unique challenges of post-pandemic ridership forecasting:

- **Structural Breaks** - How COVID-19 created permanent changes in travel patterns
- **Stochastic Shocks** - Understanding unprecedented disruptions to time series
- **Recovery Modeling** - Capturing gradual return to service while acknowledging new baseline

## 🎓 Educational Use

This application is designed for:

- **Transportation Planners** - Learn practical forecasting methods
- **Data Scientists** - Understand time series analysis in transportation context
- **Students** - Interactive statistics and machine learning concepts
- **Researchers** - Explore post-pandemic mobility patterns

## 📊 Data Sources & Examples

The application includes:

- **Simulated Capitol Corridor Data** - Weekly ridership 2019-2023
- **COVID-19 Impact Visualization** - Dramatic ridership drops and recovery
- **Interactive Parameter Selection** - Experiment with different model settings
- **Forecast Scenarios** - Generate predictions with uncertainty bounds

## 🔧 Customization

### Adding Your Own Data

1. Modify `lib/statistics.ts` to import your ridership data
2. Update the `generateSampleRidershipData()` function
3. Adjust seasonal patterns and trend components as needed

### Extending Statistical Methods

1. Implement additional information criteria
2. Add more sophisticated Prophet parameters
3. Include external regressors (holidays, events, weather)

## ⚠️ Important Disclaimers

### Statistical Limitations

- **Granger "Causality"** - Tests prediction utility, not true causation
- **Model Assumptions** - Prophet assumes additive seasonality and trend
- **Uncertainty Bounds** - Based on historical patterns, may not capture unprecedented events

### Practical Applications

- Results should be validated with domain expertise
- Consider external factors (economic conditions, policy changes, infrastructure)
- Update models regularly as new data becomes available
- Use multiple forecasting methods for robust predictions

## 📖 References

### Original Research
- Nguyen, L.E. (2023). "Predicting Time Series Passenger Counts Using Non-Linear Additive Models (in R)"
- Capitol Corridor Joint Powers Authority Climate Corps Project

### Statistical Methods
- Box, G.E.P. & Jenkins, G.M. (1970). "Time Series Analysis: Forecasting and Control"
- Granger, C.W.J. (1969). "Investigating Causal Relations by Econometric Models"
- Taylor, S.J. & Letham, B. (2018). "Forecasting at Scale" (Facebook Prophet)

### Implementation Resources
- Facebook Prophet Documentation
- R lmtest Package for Granger Testing
- R vars Package for VAR Model Selection

## 🤝 Contributing

Contributions are welcome! Please feel free to:

- Report bugs and suggest improvements
- Add new statistical methods or visualizations
- Improve documentation and educational content
- Share real-world transportation datasets (with appropriate permissions)

## 📄 License

MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

- **Lucille E. Nguyen** - Original research and R implementation
- **Capitol Corridor Joint Powers Authority** - Real-world application context
- **Facebook Research** - Prophet forecasting algorithm
- **Transportation Research Community** - Statistical methodologies

---

Built with ❤️ for the transportation planning community. This tool aims to make sophisticated forecasting methods accessible to practitioners working to improve public transit systems.

## 📞 Support

For questions about the statistical methodology, refer to the original research paper. For technical issues with the web application, please open an issue in the repository.
