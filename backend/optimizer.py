import numpy as np
import logging
import os
from typing import Dict, List, Tuple, Optional, Any
import uuid
from datetime import datetime
import random
import itertools

# Qiskit imports
from qiskit_aer import Aer
from qiskit_algorithms.optimizers import COBYLA
from qiskit.circuit.library import QAOAAnsatz
from qiskit.quantum_info import SparsePauliOp

# Import our SimpleQAOAOptimizer
from backend.simple_qaoa_optimizer import SimpleQAOAOptimizer
from qiskit_ibm_runtime import QiskitRuntimeService, Session, SamplerV2

logger = logging.getLogger(__name__)

from dotenv import load_dotenv
load_dotenv()


class PortfolioOptimizer:
    """Portfolio optimization using QAOA and classical methods - COMPLETELY REWRITTEN"""
    
    def __init__(self):
        """Initialize the portfolio optimizer"""
        self.jobs = {}  # Store async job information
        logger.info("Portfolio optimizer initialized - REWRITTEN VERSION")
    
    def optimize(self, 
                tickers: List[str],
                expected_returns: np.ndarray,
                covariance_matrix: np.ndarray,
                prices: np.ndarray,
                budget: float = 100000.0,
                optimization_objective: str = 'Max Sharpe Ratio',
                risk_free_rate: float = 0.07,
                risk_aversion: float = 0.5,
                return_weight: float = 1.0,
                budget_penalty: float = 1.0,
                min_assets: int = 2,
                min_assets_penalty: float = 1.0,
                correlation_threshold: float = 0.8,
                reps: int = 3,
                shots: int = 1024,
                backend_name: str = 'Aer Simulator',
                progress_callback=None) -> Dict[str, Any]:
        """
        COMPLETELY REWRITTEN: 6-Step Architectural Blueprint Implementation
        
        Step 1: Classical Pre-computation
        Step 2: Classical Candidate Generation  
        Step 3: Classical Hard Constraint Filtering
        Step 4: Quantum Optimization on Valid Candidates
        Step 5: Handle No-Solution Case
        Step 6: Classical Post-processing & Ranking
        """
        try:
            # CRITICAL: Force progress callback to be called for every step
            def report_progress(step, message, progress):
                if progress_callback:
                    progress_callback(step, message, progress)
                logger.info(f"Step {step}: {message} ({progress}%)")
            
            # Validate inputs
            n_assets = len(tickers)
            if n_assets == 0:
                raise ValueError("No assets provided")
            if n_assets != len(expected_returns) or n_assets != len(prices):
                raise ValueError("Mismatch in dimensions of inputs")
            if covariance_matrix.shape != (n_assets, n_assets):
                raise ValueError(f"Covariance matrix should be {n_assets}x{n_assets}")
            
            # CRITICAL: Log all parameters to prove they are being used
            logger.info(f"=== REWRITTEN OPTIMIZER PARAMETER VERIFICATION ===")
            logger.info(f"Tickers: {tickers}")
            logger.info(f"Budget: {budget}")
            logger.info(f"Risk Aversion: {risk_aversion}")
            logger.info(f"Return Weight: {return_weight}")
            logger.info(f"Min Assets: {min_assets}")
            logger.info(f"Min Assets Penalty: {min_assets_penalty}")
            logger.info(f"Budget Penalty: {budget_penalty}")
            logger.info(f"Correlation Threshold: {correlation_threshold}")
            logger.info(f"Backend: {backend_name}")
            logger.info(f"QAOA Layers: {reps}")
            logger.info(f"QAOA Shots: {shots}")
            logger.info(f"=== END REWRITTEN OPTIMIZER PARAMETER VERIFICATION ===")
            
            # ========================================
            # STEP 1: CLASSICAL PRE-COMPUTATION
            # ========================================
            report_progress(1, "Step 1/6: Classical pre-computation (returns, covariance, correlation)", 17)
            
            # The expected_returns, covariance_matrix, and prices are already provided
            # But we need to compute the correlation matrix
            correlation_matrix = self._compute_correlation_matrix(covariance_matrix)
            
            logger.info(f"Computed correlation matrix with shape: {correlation_matrix.shape}")
            
            # ========================================
            # STEP 2: CLASSICAL CANDIDATE GENERATION
            # ========================================
            report_progress(2, "Step 2/6: Generating all possible portfolio combinations", 33)
            
            # Generate ALL possible 2^N - 1 portfolio combinations
            all_portfolios = self._generate_all_portfolio_combinations(n_assets)
            logger.info(f"Generated {len(all_portfolios)} total portfolio combinations")
            
            # ========================================
            # STEP 3: CLASSICAL HARD CONSTRAINT FILTERING
            # ========================================
            report_progress(3, "Step 3/6: Applying hard constraints (min_assets, correlation_threshold)", 50)
            
            valid_portfolios = self._apply_hard_constraints(
                all_portfolios=all_portfolios,
                correlation_matrix=correlation_matrix,
                min_assets=min_assets,
                correlation_threshold=correlation_threshold
            )
            
            logger.info(f"After hard constraint filtering: {len(valid_portfolios)} valid portfolios")
            
            # ========================================
            # STEP 5: HANDLE NO-SOLUTION CASE
            # ========================================
            if len(valid_portfolios) == 0:
                error_msg = ("No valid portfolios could be found. Your hard constraints "
                           "(e.g., Minimum Assets, Correlation Threshold) are too strict "
                           "for the selected stocks. Please relax your constraints and try again.")
                logger.error(error_msg)
                return {
                    'error': error_msg,
                    'top_portfolios': [],
                    'qaoa_portfolios': [],
                    'classical_portfolios': [],
                    'all_evaluated_portfolios': []
                }
            
            # ========================================
            # STEP 4: QUANTUM OPTIMIZATION ON VALID CANDIDATES
            # ========================================
            report_progress(4, f"Step 4/6: Quantum optimization on {len(valid_portfolios)} valid candidates", 67)
            
            # Build QUBO model using the provided formulas
            qubo_matrix = self._build_qubo_model(
                expected_returns=expected_returns,
                covariance_matrix=covariance_matrix,
                prices=prices,
                budget=budget,
                risk_aversion=risk_aversion,
                return_weight=return_weight,
                budget_penalty=budget_penalty
            )
            
            # Run QAOA on valid portfolios
            if backend_name == 'Aer Simulator':
                qaoa_results = self._run_aer_simulator_on_valid_portfolios(
                    valid_portfolios=valid_portfolios,
                    qubo_matrix=qubo_matrix,
                    reps=reps,
                    shots=shots
                )
            elif backend_name == 'IBM Quantum Hardware':
                qaoa_results = self._run_ibm_quantum_hardware_on_valid_portfolios(
                    valid_portfolios=valid_portfolios,
                    qubo_matrix=qubo_matrix,
                    reps=reps,
                    shots=shots
                )
            else:
                raise ValueError(f"Unknown backend: {backend_name}")
            
            # ========================================
            # STEP 6: CLASSICAL POST-PROCESSING & RANKING
            # ========================================
            report_progress(5, "Step 5/6: Post-processing and ranking portfolios", 83)
            
            # Evaluate all portfolios with precise financial metrics
            evaluated_portfolios = self._evaluate_portfolios_precise(
                portfolios=qaoa_results['portfolios'],
                tickers=tickers,
                expected_returns=expected_returns,
                covariance_matrix=covariance_matrix,
                prices=prices,
                budget=budget,
                risk_free_rate=risk_free_rate,
                qubo_matrix=qubo_matrix
            )
            
            # Sort by Sharpe ratio (descending) and get top 10
            evaluated_portfolios.sort(key=lambda x: x['sharpe'], reverse=True)
            top_portfolios = evaluated_portfolios[:10]
            
            report_progress(6, "Step 6/6: Final results prepared", 100)
            
            # Prepare final result
            result = {
                'top_portfolios': top_portfolios,
                'qaoa_portfolios': qaoa_results['portfolios'],
                'classical_portfolios': [],  # Not used in this architecture
                'all_evaluated_portfolios': evaluated_portfolios,
                'valid_portfolios_count': len(valid_portfolios),
                'total_combinations': len(all_portfolios)
            }
            
            logger.info(f"Optimization completed successfully. Found {len(top_portfolios)} top portfolios.")
            return result
        
        except Exception as e:
            logger.error(f"Error in rewritten portfolio optimization: {str(e)}")
            raise
    
    def _compute_correlation_matrix(self, covariance_matrix: np.ndarray) -> np.ndarray:
        """Compute correlation matrix from covariance matrix"""
        try:
            # Extract variances (diagonal elements)
            variances = np.diag(covariance_matrix)
            
            # Avoid division by zero
            std_devs = np.sqrt(np.maximum(variances, 1e-10))
            
            # Compute correlation matrix: Corr(i,j) = Cov(i,j) / (std_i * std_j)
            correlation_matrix = covariance_matrix / np.outer(std_devs, std_devs)
            
            # Ensure diagonal is exactly 1.0
            np.fill_diagonal(correlation_matrix, 1.0)
            
            return correlation_matrix
        except Exception as e:
            logger.error(f"Error computing correlation matrix: {str(e)}")
            raise
    
    def _generate_all_portfolio_combinations(self, n_assets: int) -> List[List[int]]:
        """Generate all possible 2^N - 1 portfolio combinations"""
        try:
            all_combinations = []
            
            # Generate all non-empty subsets of {0, 1, 2, ..., n_assets-1}
            for r in range(1, n_assets + 1):  # r from 1 to n_assets
                for combo in itertools.combinations(range(n_assets), r):
                    all_combinations.append(list(combo))
            
            logger.info(f"Generated {len(all_combinations)} portfolio combinations")
            return all_combinations
            
        except Exception as e:
            logger.error(f"Error generating portfolio combinations: {str(e)}")
            raise
    
    def _apply_hard_constraints(self, 
                               all_portfolios: List[List[int]], 
                               correlation_matrix: np.ndarray,
                               min_assets: int,
                               correlation_threshold: float) -> List[List[int]]:
        """Apply hard constraints: min_assets and correlation_threshold"""
        try:
            valid_portfolios = []
            
            for portfolio in all_portfolios:
                # Check min_assets constraint
                if len(portfolio) < min_assets:
                    continue
                
                # Check correlation_threshold constraint
                if self._check_correlation_constraint(portfolio, correlation_matrix, correlation_threshold):
                    valid_portfolios.append(portfolio)
            
            logger.info(f"Hard constraints applied: {len(valid_portfolios)}/{len(all_portfolios)} portfolios passed")
            return valid_portfolios
            
        except Exception as e:
            logger.error(f"Error applying hard constraints: {str(e)}")
            raise
    
    def _check_correlation_constraint(self, 
                                    portfolio: List[int], 
                                    correlation_matrix: np.ndarray, 
                                    correlation_threshold: float) -> bool:
        """Check if portfolio passes correlation threshold constraint"""
        try:
            # Check all pairs of stocks in the portfolio
            for i in range(len(portfolio)):
                for j in range(i + 1, len(portfolio)):
                    stock_i = portfolio[i]
                    stock_j = portfolio[j]
                    correlation = abs(correlation_matrix[stock_i, stock_j])
                    
                    if correlation > correlation_threshold:
                        return False  # Portfolio fails correlation constraint
            
            return True  # Portfolio passes all correlation checks
            
        except Exception as e:
            logger.error(f"Error checking correlation constraint: {str(e)}")
            return False
    
    def _build_qubo_model(self,
                         expected_returns: np.ndarray,
                         covariance_matrix: np.ndarray,
                         prices: np.ndarray,
                         budget: float,
                         risk_aversion: float,
                         return_weight: float,
                         budget_penalty: float) -> np.ndarray:
        """
        Build QUBO model using the provided formulas:
        H_QUBO = H_Risk + H_Return + H_Budget
        
        H_Risk = λ * x^T * Σ * x
        H_Return = -α * μ^T * x  
        H_Budget = A * (P^T * x - B)^2
        """
        try:
            n_assets = len(expected_returns)
            
            # Initialize QUBO matrix
            Q = np.zeros((n_assets, n_assets))
            
            logger.info(f"Building QUBO model with parameters:")
            logger.info(f"  Risk Aversion (λ): {risk_aversion}")
            logger.info(f"  Return Weight (α): {return_weight}")
            logger.info(f"  Budget Penalty (A): {budget_penalty}")
            logger.info(f"  Budget (B): {budget}")
            
            # H_Risk = λ * x^T * Σ * x
            Q += risk_aversion * covariance_matrix
            
            # H_Return = -α * μ^T * x (linear terms on diagonal)
            for i in range(n_assets):
                Q[i, i] -= return_weight * expected_returns[i]
            
            # H_Budget = A * (P^T * x - B)^2
            # Expand: A * (P^T * x)^2 - 2 * A * B * P^T * x + A * B^2
            # Quadratic terms: A * P_i * P_j
            for i in range(n_assets):
                for j in range(n_assets):
                    Q[i, j] += budget_penalty * prices[i] * prices[j]
                
                # Linear terms: -2 * A * B * P_i
                Q[i, i] -= 2 * budget_penalty * budget * prices[i]
            
            logger.info(f"QUBO model built with shape {Q.shape}")
            return Q
            
        except Exception as e:
            logger.error(f"Error building QUBO model: {str(e)}")
            raise
    
    def _run_aer_simulator_on_valid_portfolios(self,
                                              valid_portfolios: List[List[int]],
                                              qubo_matrix: np.ndarray,
                                              reps: int = 3,
                                              shots: int = 1000) -> Dict[str, Any]:
        """Run QAOA optimization on valid portfolios using Aer Simulator with SimpleQAOAOptimizer"""
        try:
            import time

            start_time = time.time()

            logger.info(f"Starting QAOA optimization on {len(valid_portfolios)} valid portfolios using SimpleQAOAOptimizer")
            
            # Initialize our SimpleQAOAOptimizer and run QAOA once on the full QUBO
            qaoa_optimizer = SimpleQAOAOptimizer(reps=reps, shots=shots)

            try:
                # Convert full QUBO matrix to dictionary format expected by SimpleQAOAOptimizer
                n_assets = qubo_matrix.shape[0]
                qubo_dict = {}
                for i in range(n_assets):
                    for j in range(n_assets):
                        if qubo_matrix[i, j] != 0:
                            qubo_dict[(i, j)] = float(qubo_matrix[i, j])

                # Solve the full QUBO problem once
                logger.info("Running QAOA once on the full QUBO for all valid portfolios")
                result = qaoa_optimizer.solve_problem(qubo_dict)

                # Result may contain counts or a single best solution; try to extract both
                portfolios = []

                # If counts are available, iterate over measured bitstrings (sorted by frequency)
                counts = result.get('counts') or {}
                if counts:
                    # Sort bitstrings by descending count
                    sorted_bitstrings = sorted(counts.items(), key=lambda x: x[1], reverse=True)
                    for bitstring, count in sorted_bitstrings:
                        # Convert bitstring to solution vector (reverse to match ordering used elsewhere)
                        solution = [int(bit) for bit in bitstring[::-1]]
                        selected_indices = [i for i, bit in enumerate(solution) if bit == 1]
                        if selected_indices in valid_portfolios:
                            portfolios.append({
                                'selection': solution,
                                'selected_indices': selected_indices,
                                'probability': count / float(sum(counts.values()))
                            })

                # Fallback: if no counts, check for single best solution
                if not portfolios and 'solution' in result:
                    best_solution = result['solution']
                    selected_indices = [i for i, bit in enumerate(best_solution) if bit == 1]
                    if selected_indices in valid_portfolios:
                        portfolios.append({
                            'selection': best_solution,
                            'selected_indices': selected_indices,
                            'probability': result.get('probability', 1.0)
                        })

                logger.info(f"QAOA completed; found {len(portfolios)} valid portfolios from single run")
                logger.info(f"Total QAOA execution time: {time.time() - start_time:.2f} seconds")
                return {'portfolios': portfolios}

            except Exception as e:
                logger.error(f"Error solving full QUBO with SimpleQAOAOptimizer: {str(e)}")
                # Fallback to greedy algorithm on valid portfolios
                logger.info("Falling back to greedy algorithm on valid portfolios")
                return self._greedy_optimization_on_valid_portfolios(valid_portfolios, qubo_matrix, shots)
        
        except Exception as e:
            logger.error(f"Error in SimpleQAOA optimization: {str(e)}")
            # Fallback to greedy algorithm on valid portfolios
            logger.info("Falling back to greedy algorithm on valid portfolios")
            return self._greedy_optimization_on_valid_portfolios(valid_portfolios, qubo_matrix, shots)
    
    def _run_ibm_quantum_hardware_on_valid_portfolios(
        self,
        valid_portfolios,
        qubo_matrix,
        reps=3,
        shots=1000
    ):
        """
        Run QAOA on IBM Quantum HARDWARE (Open Plan – Direct Job Execution).
        Logs Job IDs, per-job execution time, and total execution time.
        """

        import time
        import numpy as np
        from qiskit import QuantumCircuit, transpile
        from qiskit_ibm_runtime import QiskitRuntimeService
        from scipy.optimize import minimize
        from qiskit_ibm_runtime import Sampler

        start_total_time = time.time()

        try:
            logger.info(f"Starting IBM Quantum QAOA on {len(valid_portfolios)} portfolios")

            # 🔐 API key (Open plan)
            api_key = os.getenv("IBM_QUANTUM_API_KEY")

            if not api_key:
                raise EnvironmentError(
                    "IBM_QUANTUM_API_KEY not found. Please set it as an environment variable."
                )
            
            service = QiskitRuntimeService(
                channel="ibm_cloud",
                token=api_key
            )

            # 🎯 Select real hardware
            n_assets = qubo_matrix.shape[0]
            backend = service.least_busy(
                min_num_qubits=n_assets,
                simulator=False,
                operational=True
            )

            logger.info(f"Selected IBM Quantum backend: {backend.name}")

            # ✅ OPEN PLAN: Sampler WITHOUT session
            # sampler = Sampler(backend=backend)

            sampler = Sampler(mode=backend)


            # -----------------------------
            # QAOA Circuit Builder
            # -----------------------------
            def create_qaoa_circuit(n, beta, gamma, Q):
                qc = QuantumCircuit(n, n)
                qc.h(range(n))

                for i in range(n):
                    if abs(Q[i, i]) > 1e-9:
                        qc.rz(2 * gamma * Q[i, i], i)

                for i in range(n):
                    for j in range(i + 1, n):
                        if abs(Q[i, j]) > 1e-9:
                            qc.cx(i, j)
                            qc.rz(2 * gamma * Q[i, j], j)
                            qc.cx(i, j)

                for i in range(n):
                    qc.rx(2 * beta, i)

                qc.measure(range(n), range(n))
                return qc

            # -----------------------------
            # Objective function
            # -----------------------------
            def evaluate_qaoa(params):
                beta, gamma = params
                qc = create_qaoa_circuit(n_assets, beta, gamma, qubo_matrix)
                tqc = transpile(qc, backend, optimization_level=1)

                job_start = time.time()
                job = sampler.run([(tqc, None, shots)])
                result = job.result()
                job_end = time.time()

                logger.info(
                    f"Job ID: {job.job_id()} | "
                    f"Execution time: {job_end - job_start:.2f} sec"
                )

                # counts = result[0].data.meas.get_counts()
                counts = result[0].data.c.get_counts()

                expectation = 0.0
                total = sum(counts.values())
                for bitstring, count in counts.items():
                    x = np.array(list(map(int, bitstring)))
                    energy = x @ qubo_matrix @ x
                    expectation += energy * (count / total)

                return expectation

            # -----------------------------
            # Classical optimization
            # -----------------------------
            initial_params = [np.pi / 4, np.pi / 4]

            opt_result = minimize(
                evaluate_qaoa,
                initial_params,
                method="COBYLA",
                options={"maxiter": reps}
            )

            logger.info(
                f"Optimal parameters: β={opt_result.x[0]:.4f}, γ={opt_result.x[1]:.4f}"
            )

            # -----------------------------
            # Final job
            # -----------------------------
            beta_opt, gamma_opt = opt_result.x
            final_circuit = create_qaoa_circuit(n_assets, beta_opt, gamma_opt, qubo_matrix)
            final_tqc = transpile(final_circuit, backend, optimization_level=1)

            final_start = time.time()
            # final_job = sampler.run([final_tqc], shots=shots)
            final_job = sampler.run([(final_tqc, None, shots)])
            final_result = final_job.result()
            final_end = time.time()

            logger.info(
                f"Final Job ID: {final_job.job_id()} | "
                f"Execution time: {final_end - final_start:.2f} sec"
            )

            # final_counts = final_result[0].data.meas.get_counts()
            final_counts = final_result[0].data.c.get_counts()

            portfolios = []
            total_shots = sum(final_counts.values())

            for bitstring, count in final_counts.items():
                selection = np.array(list(map(int, bitstring[::-1])))
                selected = [i for i, b in enumerate(selection) if b == 1]

                if selected in valid_portfolios:
                    portfolios.append({
                        "selection": selection.tolist(),
                        "selected_indices": selected,
                        "probability": count / total_shots
                    })

            total_time = time.time() - start_total_time
            logger.info(f"TOTAL EXECUTION TIME: {total_time:.2f} sec")

            return {
                "backend": backend.name,
                "job_id": final_job.job_id(),
                "execution_time_sec": total_time,
                "portfolios": portfolios
            }

        except Exception as e:
            logger.error(f"IBM Quantum execution failed: {str(e)}")
            logger.info("Falling back to Aer simulator")

            return self._run_aer_simulator_on_valid_portfolios(
                valid_portfolios,
                qubo_matrix,
                reps,
                shots
            )

    
    def _greedy_optimization_on_valid_portfolios(self,
                                               valid_portfolios: List[List[int]],
                                               qubo_matrix: np.ndarray,
                                               shots: int = 100) -> Dict[str, Any]:
        """Greedy optimization algorithm on valid portfolios as fallback"""
        try:
            portfolios = []
            
            # Sort valid portfolios by QUBO value (lower is better)
            portfolio_qubo_values = []
            for portfolio in valid_portfolios:
                # Create binary selection vector
                selection = np.zeros(qubo_matrix.shape[0], dtype=int)
                for idx in portfolio:
                    selection[idx] = 1
                
                # Calculate QUBO value
                qubo_value = selection.T @ qubo_matrix @ selection
                portfolio_qubo_values.append((portfolio, qubo_value))
            
            # Sort by QUBO value (ascending)
            portfolio_qubo_values.sort(key=lambda x: x[1])
            
            # Take top portfolios
            top_count = min(shots, len(portfolio_qubo_values))
            for i in range(top_count):
                portfolio, qubo_value = portfolio_qubo_values[i]
                
                # Create binary selection vector
                selection = np.zeros(qubo_matrix.shape[0], dtype=int)
                for idx in portfolio:
                    selection[idx] = 1
                
                portfolios.append({
                    'selection': selection.tolist(),
                    'selected_indices': portfolio,
                    'probability': 1.0 / top_count
                })
            
            logger.info(f"Greedy optimization completed with {len(portfolios)} portfolios")
            return {'portfolios': portfolios}
        
        except Exception as e:
            logger.error(f"Error in greedy optimization: {str(e)}")
            return {'portfolios': []}
    
    def _qubo_to_ising(self, qubo_matrix: np.ndarray) -> SparsePauliOp:
        """Convert QUBO matrix to Ising Hamiltonian using SparsePauliOp"""
        try:
            n = qubo_matrix.shape[0]
            
            # Initialize lists to store Pauli strings and coefficients
            pauli_strings = []
            coefficients = []
            
            # Convert QUBO to Ising
            # Constant term
            constant = 0.0
            
            for i in range(n):
                for j in range(n):
                    if i == j:  # Diagonal terms
                        # Convert x_i to (1 + Z_i) / 2
                        # Constant term (I⊗I⊗...⊗I)
                        constant += qubo_matrix[i, j] / 2
                        
                        # Z_i term
                        z_string = ['I'] * n
                        z_string[i] = 'Z'
                        pauli_strings.append(''.join(z_string))
                        coefficients.append(qubo_matrix[i, j] / 2)
                        
                    elif i < j:  # Off-diagonal terms
                        # Convert x_i * x_j to (1 + Z_i) * (1 + Z_j) / 4
                        # Constant term (I⊗I⊗...⊗I)
                        constant += qubo_matrix[i, j] / 4
                        
                        # Z_i term
                        z_i_string = ['I'] * n
                        z_i_string[i] = 'Z'
                        pauli_strings.append(''.join(z_i_string))
                        coefficients.append(qubo_matrix[i, j] / 4)
                        
                        # Z_j term
                        z_j_string = ['I'] * n
                        z_j_string[j] = 'Z'
                        pauli_strings.append(''.join(z_j_string))
                        coefficients.append(qubo_matrix[i, j] / 4)
                        
                        # Z_i⊗Z_j term
                        z_ij_string = ['I'] * n
                        z_ij_string[i] = 'Z'
                        z_ij_string[j] = 'Z'
                        pauli_strings.append(''.join(z_ij_string))
                        coefficients.append(qubo_matrix[i, j] / 4)
            
            # Add constant term if non-zero
            if abs(constant) > 1e-10:
                pauli_strings.append('I' * n)
                coefficients.append(constant)
            
            # Create SparsePauliOp
            hamiltonian = SparsePauliOp(pauli_strings, coefficients)
            
            return hamiltonian
        
        except Exception as e:
            logger.error(f"Error converting QUBO to Ising: {str(e)}")
            raise
    
    def _evaluate_portfolios_precise(self,
                                   portfolios: List[Dict[str, Any]],
                                   tickers: List[str],
                                   expected_returns: np.ndarray,
                                   covariance_matrix: np.ndarray,
                                   prices: np.ndarray,
                                   budget: float,
                                   risk_free_rate: float,
                                   qubo_matrix: np.ndarray) -> List[Dict[str, Any]]:
        """Evaluate portfolios with precise financial metrics"""
        try:
            evaluated_portfolios = []
            
            for portfolio in portfolios:
                if 'selected_indices' in portfolio:
                    # Use selected_indices if available (from new architecture)
                    selected_indices = portfolio['selected_indices']
                    selection = np.zeros(len(tickers), dtype=int)
                    for idx in selected_indices:
                        selection[idx] = 1
                else:
                    # Fallback to selection array
                    selection = np.array(portfolio['selection'])
                
                # Skip empty portfolios
                if np.sum(selection) == 0:
                    continue
                
                # Calculate portfolio metrics
                selected_assets = [tickers[i] for i in range(len(tickers)) if selection[i] == 1]
                selected_prices = prices * selection
                total_cost = np.sum(selected_prices)
                
                # Calculate weights (normalize to sum to 1.0 for 100% allocation)
                weights = selected_prices / total_cost if total_cost > 0 else np.zeros_like(selected_prices)
                
                # Ensure weights sum to 1.0 (100% allocation)
                if np.sum(weights) > 0:
                    weights = weights / np.sum(weights)
                
                # Redistribute remaining allocation if weights don't sum to 1.0
                # This addresses the issue where portfolio allocations don't sum to 100%
                weights_sum = np.sum(weights)
                if weights_sum > 0 and weights_sum < 1.0:
                    # Calculate remaining allocation
                    remaining_allocation = 1.0 - weights_sum
                    
                    # Get indices of assets with weights > 0
                    nonzero_indices = np.where(weights > 0)[0]
                    
                    if len(nonzero_indices) > 0:
                        # Sort assets by expected return
                        sorted_indices = sorted(nonzero_indices, key=lambda i: expected_returns[i], reverse=True)
                        
                        # Distribute 60% of remaining allocation to high-return assets
                        high_return_count = max(1, len(sorted_indices) // 3)  # At least one asset
                        for i in range(high_return_count):
                            weights[sorted_indices[i]] += (remaining_allocation * 0.6) / high_return_count
                        
                        # Distribute 40% of remaining allocation to lower-return assets
                        low_return_indices = sorted_indices[high_return_count:]
                        if len(low_return_indices) > 0:
                            for i in low_return_indices:
                                weights[i] += (remaining_allocation * 0.4) / len(low_return_indices)
                        else:
                            # If no lower-return assets, add to high-return assets
                            for i in range(high_return_count):
                                weights[sorted_indices[i]] += (remaining_allocation * 0.4) / high_return_count
                
                # Calculate expected return
                portfolio_return = np.sum(expected_returns * weights)
                
                # Calculate risk (standard deviation)
                portfolio_risk = np.sqrt(weights.T @ covariance_matrix @ weights)
                
                # Calculate Sharpe ratio
                if portfolio_risk < 1e-8:
                    sharpe_ratio = 0.0 if portfolio_return <= risk_free_rate else 1000.0
                else:
                    sharpe_ratio = (portfolio_return - risk_free_rate) / portfolio_risk
                
                # Calculate QUBO value
                qubo_value = selection.T @ qubo_matrix @ selection
                
                
                   # Create evaluated portfolio
                evaluated_portfolio = {
                    'assets': selected_assets,
                    'selection': selection.tolist(),
                    'weights': weights.tolist(),
                    'return': float(portfolio_return),
                    'risk': float(portfolio_risk),
                    'sharpe': float(sharpe_ratio),
                    'cost': float(total_cost),
                    'qubo_value': float(qubo_value),
                    'probability': portfolio.get('probability', 0.0)
                }
                
                evaluated_portfolios.append(evaluated_portfolio)
            
            logger.info(f"Evaluated {len(evaluated_portfolios)} portfolios with precise metrics")
            return evaluated_portfolios
        
        except Exception as e:
            logger.error(f"Error evaluating portfolios: {str(e)}")
            raise
    
    def get_job_status(self, job_id: str) -> Dict[str, Any]:
        """Get the status of an asynchronous job"""
        try:
            if job_id not in self.jobs:
                return {
                    'status': 'not_found',
                    'message': f"Job {job_id} not found"
                }
            
            job_info = self.jobs[job_id]
            
            # Check if job is completed
            if job_info['status'] == 'completed':
                return {
                    'status': 'completed',
                    'result': job_info['result'],
                    'completed_at': job_info['completed_at']
                }
            
            # Check if job is running
            if job_info['status'] == 'running':
                return {
                    'status': 'running',
                    'message': f"Job {job_id} is still running",
                    'started_at': job_info['started_at']
                }
            
            # Check if job failed
            if job_info['status'] == 'failed':
                return {
                    'status': 'failed',
                    'message': job_info['error'],
                    'failed_at': job_info['failed_at']
                }
            
            return {
                'status': job_info['status'],
                'message': f"Job {job_id} has status: {job_info['status']}"
            }
        
        except Exception as e:
            logger.error(f"Error getting job status: {str(e)}")
            return {
                'status': 'error',
                'message': f"Error retrieving job status: {str(e)}"
            }