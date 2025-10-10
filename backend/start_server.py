#!/usr/bin/env python
"""
Simple server startup script for QuantumLeap Portfolio Optimizer
"""

import sys
import os

print("=" * 60)
print("QuantumLeap Portfolio Optimizer - Backend Server")
print("=" * 60)

# Ensure we're in the correct directory
print(f"Current working directory: {os.getcwd()}")
print(f"Python version: {sys.version}")
print()

# Check if data directory exists
if not os.path.exists('data'):
    print("Creating data directory...")
    os.makedirs('data', exist_ok=True)
    print("✓ Data directory created")
else:
    print("✓ Data directory exists")

print()
print("Loading backend modules...")

try:
    from data_manager import DataManager
    print("✓ DataManager imported")
except ImportError as e:
    print(f"✗ Failed to import DataManager: {e}")
    sys.exit(1)

try:
    from optimizer import PortfolioOptimizer
    print("✓ PortfolioOptimizer imported")
except ImportError as e:
    print(f"✗ Failed to import PortfolioOptimizer: {e}")
    sys.exit(1)

try:
    from visualization import VisualizationDataGenerator
    print("✓ VisualizationDataGenerator imported")
except ImportError as e:
    print(f"✗ Failed to import VisualizationDataGenerator: {e}")
    sys.exit(1)

print()
print("Starting Flask application...")

try:
    from app import app
    print("✓ Flask app loaded successfully")
    print()
    print("=" * 60)
    print("Server starting on http://localhost:8000")
    print("Press CTRL+C to stop the server")
    print("=" * 60)
    print()
    
    app.run(debug=True, host='0.0.0.0', port=8000)
    
except Exception as e:
    print(f"✗ Failed to start server: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
