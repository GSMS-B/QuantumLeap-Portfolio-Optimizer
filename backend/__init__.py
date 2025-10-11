"""
QuantumLeap Portfolio Optimizer Backend

A quantum-inspired portfolio optimization system using QAOA (Quantum Approximate Optimization Algorithm).
"""

__version__ = '1.0.0'
__author__ = 'QuantumLeap Team'

# Import main components for easier access
from data_manager import DataManager
from optimizer import PortfolioOptimizer
from visualization import VisualizationDataGenerator

__all__ = [
    'DataManager',
    'PortfolioOptimizer',
    'VisualizationDataGenerator',
]
