# 🚀 QuantumLeap Portfolio Optimizer

[![Python 3.11+](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/downloads/)
[![Qiskit 1.0+](https://img.shields.io/badge/Qiskit-1.0+-purple.svg)](https://qiskit.org/)
[![Flask 2.3+](https://img.shields.io/badge/Flask-2.3+-green.svg)](https://flask.palletsprojects.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Deploy](https://img.shields.io/badge/Deploy-Render-brightgreen.svg)](https://render.com)

> **A quantum-powered portfolio optimization platform that revolutionizes investment strategies using QAOA (Quantum Approximate Optimization Algorithm) and AI-driven market analysis.**

**🎯 Built for the modern investor:** Combines cutting-edge quantum computing with Google Gemini AI to deliver superior portfolio optimization for the Indian stock market and beyond.



---

## 🌟 **What Makes QuantumLeap Special?**

### 🔬 **Quantum Computing Integration**
- **QAOA Algorithm**: Harnesses quantum superposition to explore millions of portfolio combinations simultaneously
- **IBM Quantum Access**: Real quantum hardware integration with cloud-based quantum processors  
- **Hybrid Optimization**: Combines classical risk management with quantum solution exploration
- **Quantum Advantage**: Solves NP-hard portfolio problems exponentially faster than classical methods

### 🤖 **AI-Powered Market Analysis**
- **Google Gemini Integration**: Real-time AI analysis of portfolio performance and market trends
- **Intelligent Insights**: Natural language explanations of optimization results
- **Risk Assessment**: AI-driven risk profiling and recommendation engine
- **Market Sentiment**: Advanced analysis of market conditions and portfolio positioning

### 📊 **Professional Portfolio Management**
- **Multi-Objective Optimization**: Maximize Sharpe Ratio, minimize variance, or maximize returns
- **Advanced Risk Models**: Modern Portfolio Theory with quantum enhancements
- **Real Stock Data**: 100+ Indian NSE-listed companies with live data
- **Backtesting Engine**: Historical performance validation and scenario analysis

### 🎨 **Modern Web Interface**
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Updates**: Live optimization progress with interactive visualizations
- **Glass Morphism UI**: Modern, professional interface design
- **Interactive Charts**: Efficient frontier plots, correlation matrices, and performance metrics

---

## 🚀 **Quick Start**

### **🌐 Try It Live (Recommended)**
- **QuantumLeap**: [Deployed on Render](https://quantumleap-optimizer.onrender.com/)
- **Setup Time**: 5 minutes with our deployment guide

### **💻 Run Locally**

1. **Clone the Repository**
```bash
git clone https://github.com/GANASYAM-10/QuantumLeap-Portfolio-Optimizer.git
cd QuantumLeap-Portfolio-Optimizer-3
```

2. **Backend Setup** (One Simple Command!)
```bash
cd backend
pip install -r requirements.txt  # Installs ALL features - quantum computing, AI, web server
cp .env.example .env
# Edit .env with your API keys (see configuration section)
python app.py
```

3. **Frontend Setup**
```bash
cd frontend
# Open index.html in browser or use live server
```

4. **Access the Platform**
- Open `http://localhost:8000` in your browser
- Start optimizing portfolios with quantum power!

---

## 🔧 **Configuration**

### **Required API Keys**

#### **Google Gemini API** (for AI analysis)
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add to environment: `GOOGLE_API_KEY=your_api_key_here`

#### **IBM Quantum API** (for quantum computing)
1. Sign up at [IBM Quantum](https://quantum-computing.ibm.com/)
2. Get your API token from Account → API Token
3. Add to environment: `IBM_QUANTUM_API_KEY=your_api_key_here`

### **Environment Variables**
```bash
# Required for AI Analysis
GOOGLE_API_KEY=your_google_gemini_api_key

# Required for Quantum Computing  
IBM_QUANTUM_API_KEY=your_ibm_quantum_api_key

# Production Settings
FLASK_ENV=production
FLASK_DEBUG=False
PORT=8000
```

---

## 🏗️ **Project Architecture**

### **📁 Clean Folder Structure**
```
QuantumLeap-Portfolio-Optimizer/
├── 📚 Documentation & Guides (Root)
├── 🐍 backend/          # Python Flask API  
│   ├── app.py          # Main application server
│   ├── optimizer.py    # QAOA implementation
│   ├── analysis_service.py  # AI integration
│   ├── data_manager.py # Stock data processing
│   ├── requirements.txt # ONE file - all dependencies
│   ├── data/          # Stock market data
│   └── tests/         # All test files organized here
└── 🌐 frontend/        # Web interface
    ├── index.html     # Main application
    ├── script.js      # Application logic
    └── style.css      # Modern styling
```

### **🔄 How It Works**
1. **Data Input**: Select stocks, set constraints, choose optimization goals
2. **Quantum Processing**: QAOA algorithm explores solution space using quantum principles
3. **AI Analysis**: Google Gemini provides intelligent insights and recommendations
4. **Results**: Interactive visualizations show optimal portfolios and risk metrics
5. **Backtesting**: Historical validation ensures robust investment strategies

---

## 🚀 **Deployment**

### **☁️ Cloud Deployment (Recommended)**

#### **Backend → Render**
1. Connect GitHub repository
2. **Root Directory**: `backend`
3. **Build Command**: `pip install -r requirements.txt`
4. **Start Command**: `gunicorn app:app --bind 0.0.0.0:$PORT`
5. Add environment variables (API keys)

#### **Frontend → Vercel**
1. Connect GitHub repository  
2. **Root Directory**: `frontend`
3. **Build Command**: (none - static files)
4. **Output Directory**: `./`

### **🐳 Docker Deployment**
```bash
# Backend
docker build -t quantumleap-backend ./backend
docker run -p 8000:8000 --env-file .env quantumleap-backend

# Frontend  
docker build -t quantumleap-frontend ./frontend
docker run -p 3000:80 quantumleap-frontend
```

---

## 🛠️ **Tech Stack**

### **🔬 Quantum Computing**
- **Qiskit 1.0+**: IBM's quantum computing framework
- **QAOA**: Quantum Approximate Optimization Algorithm
- **IBM Quantum**: Real quantum hardware access

### **🤖 Artificial Intelligence**
- **Google Gemini**: Large language model for analysis
- **NumPy/SciPy**: Scientific computing
- **Pandas**: Data manipulation and analysis

### **🌐 Web Technologies**
- **Backend**: Python Flask, Gunicorn, CORS support
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Glass morphism, responsive design
- **Charts**: Plotly.js for interactive visualizations

### **☁️ Infrastructure**
- **Deployment**: Render (backend) + Vercel (frontend)
- **Environment**: Python 3.11+, modern browsers
- **Security**: Environment-based API key management

---

## 📊 **Features Deep Dive**

### **🎯 Optimization Algorithms**
- **Mean-Variance Optimization**: Classical Markowitz portfolio theory
- **QAOA Enhancement**: Quantum algorithm for improved solution exploration  
- **Multi-Objective**: Risk-return optimization with customizable parameters
- **Constraint Handling**: Budget limits, sector allocation, minimum positions

### **📈 Market Data Integration**
- **Indian Stock Market**: NSE-listed companies with real historical data
- **Data Processing**: Automated return calculation, correlation analysis
- **Risk Metrics**: Sharpe ratio, volatility, maximum drawdown
- **Performance Tracking**: Backtesting with multiple timeframes

### **🎨 User Experience**
- **Intuitive Interface**: Drag-and-drop portfolio construction
- **Real-time Feedback**: Live optimization progress and results
- **Mobile Responsive**: Works on all devices and screen sizes
- **Professional Reporting**: Downloadable analysis reports

---

## 🧪 **Testing & Development**

### **Run Tests**
```bash
cd backend
python -m pytest tests/
```

### **Development Mode**
```bash
# Backend with hot reload
cd backend
FLASK_DEBUG=True python app.py

# Frontend with live server
cd frontend
# Use VS Code Live Server or similar
```

### **API Testing**
```bash
# Test optimization endpoint
curl -X POST http://localhost:8000/api/optimize \
  -H "Content-Type: application/json" \
  -d '{"stocks": ["RELIANCE", "TCS", "INFY"], "budget": 100000}'
```

---

## 🤝 **Contributing**

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** with proper documentation
4. **Run tests**: Ensure all tests pass
5. **Submit a pull request** with detailed description

### **Development Guidelines**
- Follow PEP 8 for Python code
- Use semantic commit messages
- Add tests for new features
- Update documentation accordingly

---

## 📜 **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🆘 **Support & Documentation**

### **📚 Additional Resources**
- **[Deployment Guide](DEPLOYMENT_GUIDE.md)**: Detailed deployment instructions
- **[Project Structure](PROJECT_STRUCTURE.md)**: Architecture overview
- **[API Documentation](backend/api_response_schema.py)**: Backend API reference

### **🐛 Issues & Support**
- **Bug Reports**: [GitHub Issues](https://github.com/GANASYAM-10/QuantumLeap-Portfolio-Optimizer/issues)
- **Feature Requests**: [Discussions](https://github.com/GANASYAM-10/QuantumLeap-Portfolio-Optimizer/discussions)
- **Documentation**: Check existing guides or create an issue

### **🌟 Acknowledgments**
- **IBM Quantum** for quantum computing infrastructure
- **Google AI** for Gemini language model integration  
- **Qiskit Community** for quantum algorithm implementations
- **Flask & Python Community** for web framework support

---

**⚡ Ready to revolutionize your investment strategy with quantum computing? [Get started now!](#-quick-start)**

---

<div align="center">

**Made with ❤️ and ⚛️ by the QuantumLeap Team**

[![GitHub](https://img.shields.io/github/stars/GANASYAM-10/QuantumLeap-Portfolio-Optimizer?style=social)](https://github.com/GANASYAM-10/QuantumLeap-Portfolio-Optimizer)
[![Twitter Follow](https://img.shields.io/twitter/follow/quantumleap?style=social)](https://twitter.com/quantumleap)

</div>
