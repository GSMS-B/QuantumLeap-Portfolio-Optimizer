# QuantumLeap Installation Guide

## System Requirements

- **Python**: 3.8 or higher (3.9+ recommended)
- **Memory**: 4GB RAM minimum (8GB recommended)
- **Storage**: 1GB free space
- **OS**: Windows 10+, macOS 10.14+, or Linux

## Installation Options

### Option 1: Full Installation (Recommended)
```bash
# Install all features including AI integration and testing tools
pip install -r requirements.txt
```

### Option 2: Minimal Installation
```bash
# Install only core functionality
pip install -r requirements-minimal.txt
```

### Option 3: Development Installation
```bash
# Install with development and testing tools
pip install -r requirements.txt
pip install -r requirements-dev.txt  # If available
```

## Step-by-Step Setup

### 1. Create Virtual Environment
```bash
# Create virtual environment
python -m venv quantumleap-env

# Activate virtual environment
# On Windows:
quantumleap-env\Scripts\activate
# On macOS/Linux:
source quantumleap-env/bin/activate
```

### 2. Install Dependencies
```bash
# Update pip first
python -m pip install --upgrade pip

# Install QuantumLeap requirements
pip install -r requirements.txt
```

### 3. Verify Installation
```bash
# Test quantum computing stack
python -c "import qiskit; print('Qiskit version:', qiskit.__version__)"

# Test web framework
python -c "import flask; print('Flask version:', flask.__version__)"

# Test scientific computing
python -c "import numpy, pandas, scipy; print('NumPy, Pandas, SciPy imported successfully')"
```

### 4. Run Application
```bash
# Start the backend server
python app.py

# Open browser and navigate to:
# http://localhost:5000 for API
# Open index.html in browser for frontend
```

## Troubleshooting Common Issues

### Issue: "ModuleNotFoundError: No module named 'qiskit'"
**Solution:**
```bash
pip install qiskit qiskit-aer
```

### Issue: "Error installing ta-lib"
**Solution (Windows):**
```bash
# Download TA-Lib from https://www.lfd.uci.edu/~gohlke/pythonlibs/#ta-lib
# Then install the wheel file:
pip install TA_Lib-0.4.28-cp39-cp39-win_amd64.whl
```

**Solution (macOS):**
```bash
brew install ta-lib
pip install ta-lib
```

**Solution (Linux):**
```bash
sudo apt-get install libta-lib0-dev
pip install ta-lib
```

### Issue: "Port 5000 already in use"
**Solution:**
```bash
# Find and kill process using port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID [PID_NUMBER] /F

# macOS/Linux:
lsof -ti:5000 | xargs kill -9
```

### Issue: "Google AI API key not found"
**Solution:**
1. Create a `.env` file in the project root
2. Add your Google AI API key:
```
GOOGLE_AI_API_KEY=your_api_key_here
```

## Performance Optimization

### For Better Quantum Simulation Performance:
```bash
# Install Intel MKL (if available)
pip install mkl

# Use optimized NumPy build
pip install numpy --upgrade --force-reinstall
```

### For Faster Web Server:
```bash
# Use Gunicorn for production
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## Docker Installation (Alternative)

```dockerfile
# Create Dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 5000

CMD ["python", "app.py"]
```

```bash
# Build and run Docker container
docker build -t quantumleap .
docker run -p 5000:5000 quantumleap
```

## Next Steps

After successful installation:

1. **Read the README.md** for complete feature overview
2. **Check QUANTUMLEAP_SETUP_GUIDE.md** for detailed usage instructions
3. **Run test_simple_qaoa.py** to verify quantum optimization works
4. **Open optimizer.html** to start using the application

## Support

If you encounter issues not covered here:
- Check the main README.md for troubleshooting
- Look at existing GitHub issues
- Create a new issue with your error details and system information