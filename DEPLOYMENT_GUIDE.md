# 🚀 QuantumLeap Portfolio Optimizer - Deployment Guide

## 📋 **Issues That Were Fixed**

### ❌ **Previous Problems:**
1. **Git merge conflicts** in `app.py` with `<<<<<<< HEAD` markers
2. **Relative import issues** when files were separated into backend/frontend folders
3. **Hardcoded API keys** (security risk)
4. **Missing deployment configuration** files
5. **Flask running in debug mode** for production
6. **Hardcoded ports** instead of environment variables

### ✅ **What We Fixed:**
1. ✓ Resolved merge conflicts in import statements
2. ✓ Updated all relative imports to work with new folder structure
3. ✓ Moved API keys to environment variables
4. ✓ Created proper deployment files (`Procfile`, `runtime.txt`)
5. ✓ Configured Flask for production deployment
6. ✓ Added graceful error handling for missing API keys

---

## 🔧 **Required API Keys**

You need these API keys for full functionality:

### 1. **Google Gemini API Key** (for AI portfolio analysis)
- Go to: https://makersuite.google.com/app/apikey
- Create a new API key
- Copy the key for environment variables

### 2. **IBM Quantum API Key** (for quantum optimization)
- Go to: https://quantum-computing.ibm.com/
- Sign up/Login to IBM Quantum
- Go to Account → API Token
- Copy your API token

---

## 🎯 **Render Deployment (Backend)**

### **Step 1: Prepare Repository**
```bash
# Make sure you're in the backend directory
cd backend

# Verify these files exist:
# ✓ Procfile
# ✓ runtime.txt  
# ✓ requirements.txt
# ✓ .env.example
```

### **Step 2: Deploy on Render**
1. **Connect Repository:**
   - Go to [Render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - **Root Directory:** `backend` (IMPORTANT!)

2. **Build Settings:**
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn app:app --bind 0.0.0.0:$PORT`

3. **Environment Variables** (Critical!):
   ```
   GOOGLE_API_KEY=your_actual_google_api_key_here
   IBM_QUANTUM_API_KEY=your_actual_ibm_quantum_api_key_here
   FLASK_ENV=production
   FLASK_DEBUG=False
   ```

### **Step 3: Advanced Settings**
- **Instance Type:** Free tier is fine for testing
- **Auto-Deploy:** Enable for automatic deployments
- **Health Check Path:** `/` (optional)

---

## 🌐 **Vercel Deployment (Frontend)**

### **Step 1: Deploy Frontend**
1. **Connect Repository:**
   - Go to [Vercel.com](https://vercel.com)
   - Import your GitHub repository
   - **Root Directory:** `frontend` (IMPORTANT!)

2. **Build Settings:**
   - **Framework Preset:** Other
   - **Build Command:** Leave empty (static files)
   - **Output Directory:** `./`
   - **Install Command:** Leave empty

3. **Environment Variables:**
   ```
   VITE_BACKEND_URL=https://your-render-app-name.onrender.com
   ```

---

## 🔍 **Common Deployment Issues & Solutions**

### **Issue 1: "Import Error" or "Module Not Found"**
**Solution:** Make sure Root Directory is set correctly:
- Render: `backend` 
- Vercel: `frontend`

### **Issue 2: "API Key Not Found" Errors**
**Solution:** Check environment variables are set exactly as shown above

### **Issue 3: "Port Already in Use" or Connection Issues**
**Solution:** Render automatically assigns ports - don't hardcode port 8000

### **Issue 4: CORS Errors Between Frontend/Backend**
**Solution:** Update your frontend JavaScript to use the correct backend URL:
```javascript
const BACKEND_URL = 'https://your-render-app-name.onrender.com';
// Replace localhost URLs with BACKEND_URL
```

### **Issue 5: Build Fails on Render**
**Solution:** Check if all requirements are properly listed in requirements.txt

---

## 🧪 **Testing Your Deployment**

### **Backend Test:**
1. Go to your Render URL: `https://your-app-name.onrender.com`
2. You should see the frontend served from Flask
3. Test API endpoint: `https://your-app-name.onrender.com/api/optimize`

### **Frontend Test:**
1. Go to your Vercel URL
2. Try optimizing a portfolio
3. Check browser console for any CORS errors

---

## 📝 **Local Development Setup**

If you want to run locally after deployment:

```bash
# Backend
cd backend
cp .env.example .env
# Edit .env with your actual API keys
pip install -r requirements.txt
python app.py

# Frontend  
cd frontend
# Open index.html in browser or use live server
```

---

## 🆘 **Still Having Issues?**

1. **Check Render Logs:** Go to your Render dashboard → Logs
2. **Check Browser Console:** F12 → Console tab for frontend errors
3. **Verify API Keys:** Make sure they're valid and have necessary permissions
4. **Check CORS:** Ensure backend URL is correctly set in frontend

---

## 📊 **What Each Service Does:**

- **Render (Backend):** Hosts your Python Flask API that handles:
  - Portfolio optimization calculations  
  - Quantum computing algorithms
  - AI-powered analysis
  - Data processing

- **Vercel (Frontend):** Hosts your HTML/CSS/JavaScript that provides:
  - User interface
  - Portfolio input forms
  - Results visualization
  - Interactive charts

The frontend makes API calls to the backend to get calculations and analysis results.