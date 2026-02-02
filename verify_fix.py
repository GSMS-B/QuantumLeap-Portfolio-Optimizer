import sys
import traceback

print(f"Python executable: {sys.executable}")

try:
    print("Attempting to import qiskit...")
    import qiskit
    print(f"Qiskit version: {qiskit.__version__}")
except ImportError:
    print("Failed to import qiskit")
    traceback.print_exc()

try:
    print("Attempting to import qiskit_ibm_runtime...")
    import qiskit_ibm_runtime
    from qiskit_ibm_runtime import QiskitRuntimeService, SamplerV2
    print(f"Qiskit IBM Runtime version: {qiskit_ibm_runtime.__version__}")
    print("SamplerV2 imported successfully")
except ImportError:
    print("Failed to import qiskit_ibm_runtime or SamplerV2")
    traceback.print_exc()

try:
    from qiskit.providers.backend import BackendV1
    print("BackendV1 found (Unexpected if using strictly new stack, but checking for presence)")
except ImportError:
    print("BackendV1 NOT found (Expected for Qiskit 1.x)")

print("Verification complete.")
