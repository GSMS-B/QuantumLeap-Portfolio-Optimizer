import sys
import traceback

print("Testing imports step by step...")

print("\n1. Testing qiskit_aer...")
try:
    from qiskit_aer import Aer
    print("✓ qiskit_aer imported")
except Exception as e:
    print(f"✗ qiskit_aer failed: {e}")

print("\n2. Testing qiskit_algorithms...")
try:
    from qiskit_algorithms.optimizers import COBYLA
    print("✓ qiskit_algorithms imported")
except Exception as e:
    print(f"✗ qiskit_algorithms failed: {e}")

print("\n3. Testing qiskit.circuit.library...")
try:
    from qiskit.circuit.library import QAOAAnsatz
    print("✓ QAOAAnsatz imported")
except Exception as e:
    print(f"✗ QAOAAnsatz failed: {e}")

print("\n4. Testing simple_qaoa_optimizer...")
try:
    from simple_qaoa_optimizer import SimpleQAOAOptimizer
    print("✓ SimpleQAOAOptimizer imported")
except Exception as e:
    print(f"✗ SimpleQAOAOptimizer failed:")
    traceback.print_exc()

print("\n5. Testing optimizer...")
try:
    from optimizer import PortfolioOptimizer
    print("✓ PortfolioOptimizer imported successfully!")
except Exception as e:
    print(f"✗ Failed to import PortfolioOptimizer:")
    traceback.print_exc()
