# QuantumLeap - Quantum-Inspired Portfolio Optimization Platform

[![Python 3.8+](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![Qiskit](https://img.shields.io/badge/Qiskit-0.44+-purple.svg)](https://qiskit.org/)
[![Flask](https://img.shields.io/badge/Flask-2.3+-green.svg)](https://flask.palletsprojects.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A cutting-edge **quantum-inspired portfolio optimization platform** that leverages the **Quantum Approximate Optimization Algorithm (QAOA)** to solve complex portfolio optimization problems. Built specifically for the **Indian stock market**, QuantumLeap combines quantum computing principles with classical financial theory to deliver superior investment strategies.

![QuantumLeap Dashboard](portfolio_optimization_results.png)

## 🚀 Key Features

### 🔬 **Quantum-Inspired Optimization**
- **QAOA Implementation**: Uses quantum circuits to explore vast solution spaces
- **Dual Backend Support**: Qiskit Aer Simulator + IBM Quantum Hardware
- **Hybrid Classical-Quantum**: 6-step optimization process combining both approaches
- **QUBO Formulation**: Converts portfolio problems to quantum-native format

### 📊 **Advanced Portfolio Management**
- **Multi-Objective Optimization**: Max Sharpe Ratio, Min Variance, Max Return
- **13 Configurable Parameters**: Complete control over optimization strategy
- **Smart Constraint Handling**: Budget limits, correlation thresholds, minimum assets
- **Risk Management**: Customizable risk-free rates and penalty functions

### 🎯 **Interactive Visualizations**
- **Efficient Frontier Analysis**: Risk-return visualization with tangency portfolios
- **Correlation Heatmaps**: Asset relationship analysis
- **Historical Backtesting**: Performance validation over historical data
- **Real-time Progress Tracking**: Step-by-step optimization monitoring

### 🤖 **AI-Powered Analysis**
- **Google AI Integration**: Intelligent portfolio insights and recommendations
- **Automated Report Generation**: Comprehensive analysis reports
- **Natural Language Explanations**: AI-powered portfolio interpretations

### 💼 **Enterprise-Ready Architecture**
- **Flask REST API**: Scalable backend with async job processing
- **Responsive Web Interface**: Works on desktop, tablet, and mobile
- **Indian Stock Market Data**: 100+ NSE-listed companies
- **Production-Ready**: Gunicorn, Redis, Celery support

## 🏗️ Project Architecture

### Backend Components (`/backend/`)
- **`optimizer.py`**: Core QAOA implementation with 6-step optimization process
- **`data_manager.py`**: Stock data processing and financial metrics calculation  
- **`visualization.py`**: Interactive chart generation (Plotly.js integration)
- **`sample_data.py`**: NSE stock data management and validation
- **`api_response_schema.py`**: Structured API response formatting

### Frontend Components
- **`index.html`**: Landing page with technology overview and navigation
- **`optimizer.html`**: Interactive optimization dashboard and control panel
- **`script.js`**: 3400+ lines of advanced JavaScript with real-time updates
- **`style.css`**: Modern responsive design with glass morphism effects

### Core Modules
- **`app.py`**: Flask API server with CORS support and error handling
- **`analysis_service.py`**: Google AI integration for portfolio analysis
- **`simple_qaoa_optimizer.py`**: Standalone QAOA implementation
- **`run_backend.py`**: Production server launcher

## 📋 Requirements & Dependencies

### Python (3.8+)
```bash
# Quantum Computing Stack
qiskit==0.44.1
qiskit-aer==0.12.2
qiskit-ibm-runtime==0.15.0

# Web Framework & API
flask==2.3.3
flask-cors==4.0.0
gunicorn==21.2.0

# Scientific Computing
numpy==1.24.3
pandas==2.0.3
scipy==1.11.2
matplotlib==3.7.2
plotly==5.16.1

# Background Processing
celery==5.3.1
redis==4.6.0
python-dotenv==1.0.0
```

### System Requirements
- **Memory**: 4GB RAM minimum (8GB recommended for quantum circuits)
- **Storage**: 500MB for stock data and dependencies
- **Browser**: Modern browser with JavaScript ES6+ support

## 🚀 Quick Start Guide

### 1. **Clone & Setup**
```bash
# Clone the repository
git clone https://github.com/GANASYAM-10/QuantumLeap-Portfolio-Optimizer.git


# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 2. **Launch Backend Server**
```bash
# Start the Flask development server
python app.py

# Or use production server
python run_backend.py
```

### 3. **Access the Application**
- **Frontend**: Open `index.html` in your browser
- **API Health Check**: http://localhost:5000/health
- **Available Stocks**: http://localhost:5000/stocks

### 4. **Run Portfolio Optimization**
1. Navigate to the **Optimizer** page
2. **Select stocks** from the Indian market (e.g., TCS, INFY, HDFCBANK)
3. **Configure parameters** using the intuitive control panel
4. **Click "Run Quantum Optimization"** and watch real-time progress
5. **Explore results** with interactive visualizations

## 🔬 How It Works

### 6-Step Optimization Process

1. **Classical Pre-computation**: Calculate returns, volatility, and covariance matrices
2. **Candidate Generation**: Generate all possible portfolio combinations (2^n)
3. **Constraint Filtering**: Apply hard constraints (budget, correlations, minimum assets)
4. **Quantum Optimization**: Use QAOA to find optimal solutions in filtered space
5. **Post-processing**: Calculate precise financial metrics and rank portfolios
6. **Visualization**: Generate interactive charts and analysis reports

### QAOA Implementation Details

**The `SimpleQAOAOptimizer` class provides:**
- **QUBO to Hamiltonian conversion** with automatic coefficient scaling
- **Parameterized quantum circuits** with configurable depth (p=1 to p=5)
- **Backend flexibility**: Aer Simulator or real IBM Quantum hardware
- **Result extraction** with probability distributions and optimal solutions

**The `PortfolioOptimizer` integrates QAOA with financial theory:**
- **Multi-objective support**: Sharpe ratio, variance minimization, return maximization
- **Smart penalty functions** for constraint enforcement
- **Fallback algorithms** when quantum optimization fails
- **Risk-adjusted performance metrics** (Sharpe ratio, Sortino ratio, etc.)

## 🎛️ Control Panel Parameters

| Parameter | Description | Range | Impact |
|-----------|-------------|-------|--------|
| **Budget** | Investment amount (₹) | 10,000 - 10,00,000 | Portfolio size |
| **Risk Aversion** | Risk tolerance level | 0.1 - 10.0 | Risk-return balance |
| **Min Assets** | Minimum stocks required | 2 - 10 | Diversification |
| **Max Assets** | Maximum stocks allowed | 3 - 15 | Concentration |
| **Correlation Threshold** | Max asset correlation | 0.1 - 1.0 | Diversification quality |
| **QAOA Layers** | Quantum circuit depth | 1 - 5 | Optimization quality |
| **QAOA Shots** | Circuit executions | 512 - 8192 | Statistical precision |
| **Risk-Free Rate** | Benchmark return (%) | 3.0 - 8.0 | Sharpe ratio calculation |

## 📈 Visualization Dashboard

### **Interactive Charts Include:**
- **🎯 Efficient Frontier**: Risk-return scatter with optimal portfolios
- **🔥 Correlation Heatmap**: Asset relationship visualization  
- **📊 Cost Distribution**: Budget allocation analysis
- **📈 Historical Backtest**: Performance over time
- **⚡ Quantum vs Classical**: Algorithm comparison
- **🎪 Brute Force Analysis**: Complete solution space exploration

### **Key Metrics Displayed:**
- **Expected Return**: Annualized portfolio return
- **Risk (Volatility)**: Standard deviation of returns  
- **Sharpe Ratio**: Risk-adjusted return measure
- **Maximum Drawdown**: Worst-case scenario analysis
- **Beta**: Market correlation coefficient
- **Alpha**: Excess return over market

## 🧪 Testing & Validation

### **Unit Tests**
```bash
# Test QAOA optimizer
python test_simple_qaoa.py

# Test portfolio integration  
python test_integration.py

# Test IBM Quantum hardware
python test_ibm_integration.py

# Test complete backend
python backend/test_backend.py
```

### **Integration Tests Available:**
- **✅ Aer Simulator Integration**: Local quantum simulation testing
- **✅ IBM Quantum Hardware**: Real quantum computer validation
- **✅ API Endpoint Testing**: Complete backend workflow verification
- **✅ Frontend-Backend Communication**: End-to-end testing
- **✅ Data Pipeline Validation**: Stock data processing verification

## 🏆 Advanced Features

### **Google AI Integration**
- **Portfolio Analysis**: AI-powered insights and recommendations
- **Natural Language Reports**: Human-readable portfolio explanations
- **Risk Assessment**: AI-driven risk factor identification
- **Market Context**: Current market condition analysis

### **Quantum Computing Capabilities**
- **Real Hardware Support**: Connect to IBM Quantum computers
- **Circuit Optimization**: Automatic gate count minimization  
- **Error Mitigation**: Built-in quantum error handling
- **Scalability**: Handles 2-20 asset portfolios efficiently

### **Financial Engineering**
- **Modern Portfolio Theory**: Efficient frontier calculation
- **Capital Asset Pricing Model**: Beta and alpha calculations
- **Value at Risk (VaR)**: Downside risk quantification
- **Monte Carlo Simulation**: Scenario analysis and stress testing

## 📁 Project Structure

```
QuantumLeap_V1/
├── 🏠 Frontend
│   ├── index.html                 # Landing page with technology overview
│   ├── optimizer.html             # Interactive optimization dashboard  
│   ├── style.css                  # Modern responsive styling (2000+ lines)
│   └── script.js                  # Advanced JavaScript logic (3400+ lines)
│
├── ⚙️ Backend API
│   ├── app.py                     # Flask server with REST endpoints
│   ├── run_backend.py            # Production server launcher
│   └── analysis_service.py       # Google AI integration service
│
├── 🧮 Quantum Optimization
│   ├── simple_qaoa_optimizer.py   # Standalone QAOA implementation
│   ├── qaoa_portfolio_optimizer.py # Portfolio-specific QAOA wrapper
│   └── portfolio_optimization_example.py # Usage examples
│
├── 📊 Backend Modules (/backend/)
│   ├── optimizer.py              # Core 6-step optimization process
│   ├── data_manager.py           # Stock data processing & validation
│   ├── visualization.py          # Interactive chart generation  
│   ├── sample_data.py            # NSE stock data management
│   ├── api_response_schema.py    # Structured API responses
│   └── data/                     # 100+ Indian stock CSV files
│       ├── TCS.csv
│       ├── INFY.csv
│       ├── HDFCBANK.csv
│       └── ... (97+ more stocks)
│
├── 🧪 Testing Suite
│   ├── test_simple_qaoa.py       # Unit tests for QAOA optimizer
│   ├── test_integration.py       # Aer simulator integration tests
│   ├── test_ibm_integration.py   # IBM Quantum hardware tests
│   ├── test_optimization.py      # Portfolio optimization tests
│   └── backend/test_backend.py   # Complete backend workflow tests
│
├── 📋 Documentation
│   ├── README.md                 # This comprehensive guide
│   ├── QUANTUMLEAP_SETUP_GUIDE.md # Detailed setup instructions
│   ├── Project_explanation.md    # Technical deep-dive  
│   ├── qaoa_integration_guide.md # QAOA implementation guide
│   └── IBM_QUANTUM_SETUP.md     # IBM Quantum configuration
│
└── 🔧 Configuration
    ├── requirements.txt          # Python dependencies
    ├── .gitignore               # Git exclusion rules
    └── quantumleap_detailed_prompt.json # Project specifications
```

## 🎯 Use Cases

### **For Individual Investors**
- **Retirement Planning**: Long-term wealth accumulation strategies
- **Risk Management**: Balanced portfolios based on risk tolerance  
- **Diversification**: Optimal asset allocation across sectors
- **Tax Optimization**: Capital gains and dividend tax planning

### **For Financial Professionals**
- **Client Portfolio Management**: Customized investment strategies
- **Risk Assessment**: Quantitative risk measurement and mitigation
- **Performance Attribution**: Understanding return sources
- **Regulatory Compliance**: Meeting fiduciary responsibilities

### **For Researchers & Academics**
- **Quantum Finance Research**: Exploring quantum advantage in finance
- **Algorithm Benchmarking**: Classical vs quantum comparison studies
- **Educational Tool**: Teaching modern portfolio theory concepts
- **Publication Data**: Reproducible research results

## 🚀 Deployment Options

### **Development Setup**
```bash
# Quick local development
python app.py
# Access: http://localhost:5000
```

### **Production Deployment**
```bash
# Using Gunicorn + Redis
pip install gunicorn redis
python run_backend.py
# Handles multiple concurrent users
```

### **Cloud Deployment**
- **Heroku**: One-click deployment with Procfile
- **AWS EC2**: Scalable cloud hosting
- **Google Cloud**: Integration with Google AI services
- **Docker**: Containerized deployment option

## 🔮 Future Roadmap

### **Version 2.0 (Planned)**
- [ ] **Options & Derivatives**: Complex financial instruments support
- [ ] **Multi-Currency**: Global market expansion beyond INR
- [ ] **Machine Learning**: Predictive models for return forecasting
- [ ] **Real-Time Data**: Live market data integration via APIs

### **Version 3.0 (Research)**
- [ ] **Variational Quantum Eigensolver (VQE)**: Alternative quantum algorithms
- [ ] **Quantum Machine Learning**: Hybrid ML-quantum approaches
- [ ] **Fault-Tolerant Quantum**: Next-generation quantum hardware support
- [ ] **Blockchain Integration**: DeFi and cryptocurrency portfolio support

## 🤝 Contributing

We welcome contributions from the quantum computing and finance communities!

### **How to Contribute**
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)  
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### **Areas for Contribution**
- 🐛 **Bug Fixes**: Improve stability and reliability
- 📈 **New Algorithms**: Additional optimization methods
- 🎨 **UI/UX**: Enhanced user interface design  
- 📊 **Visualizations**: New chart types and analytics
- 🧪 **Testing**: Expanded test coverage and validation
- 📚 **Documentation**: Tutorials and example improvements

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **IBM Quantum Team**: For Qiskit framework and quantum computing access
- **Google AI**: For Gemini integration and analysis capabilities  
- **NSE India**: For stock market data and financial metrics
- **Plotly.js**: For interactive visualization framework
- **Flask Community**: For robust web framework support

## 📞 Support & Contact

- **🐛 Issues**: [GitHub Issues](https://github.com/yourusername/QuantumLeap_V1/issues)
- **💡 Feature Requests**: [GitHub Discussions](https://github.com/yourusername/QuantumLeap_V1/discussions)
- **📧 Email**: support@quantumleap-portfolio.com
- **🌐 Website**: [quantumleap-portfolio.com](https://quantumleap-portfolio.com)

---

**⚡ QuantumLeap - Where Quantum Computing Meets Modern Finance ⚡**

*"The future of portfolio optimization is quantum, and the future is now."*
