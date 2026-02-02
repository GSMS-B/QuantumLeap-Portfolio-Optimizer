import qiskit
import sys

print(f"Python: {sys.version}")
print(f"Qiskit: {qiskit.__version__}")

try:
    import qiskit_ibm_runtime
    print(f"Qiskit IBM Runtime: {qiskit_ibm_runtime.__version__}")
except Exception as e:
    print(f"Qiskit IBM Runtime Error: {e}")

try:
    import qiskit_aer
    print(f"Qiskit Aer: {qiskit_aer.__version__}")
except Exception as e:
    print(f"Qiskit Aer Error: {e}")

try:
    from qiskit.providers.backend import BackendV1
    print("BackendV1 found")
except ImportError:
    print("BackendV1 NOT found")
