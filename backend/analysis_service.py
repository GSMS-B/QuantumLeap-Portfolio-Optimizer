import os
import logging
from typing import Iterable, List, Optional

try:
    from google import genai  # type: ignore[import]
    from google.genai import types  # type: ignore[import]
except ImportError:  # pragma: no cover - the new SDK might not be installed yet
    genai = None
    types = None

import requests

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def create_detailed_analysis_prompt(portfolios: list) -> str:
    """
    Creates a detailed, role-playing prompt for the Google Gemini AI
    to analyze and compare investment portfolios.

    Args:
        portfolios (list): A list of portfolio dictionaries.

    Returns:
        str: The formatted prompt string.
    """
    prompt_header = (
        "You are QuantumLeap's portfolio strategist. Deliver a concise briefing on the 10 candidate portfolios using the exact layout below.\n"
        "No greetings, no objectives, no assumptions—jump straight into the facts.\n"
        "Headings must appear exactly as written, each followed by bullet points that start with '-'.\n"
        "Every comparison must cite portfolio numbers and quantify return, volatility, cost, and Sharpe trade-offs.\n"
        "Highlight cheaper or lower-volatility options whenever they achieve similar returns.\n"
        "Call out concentration or diversification issues explicitly.\n"
        "Do not include tables or any additional commentary outside this structure.\n\n"
        "### Overview\n"
        "- Two bullets summarizing the state of all portfolios (keep under 25 words each).\n"
        "### Comparative Insights\n"
        "- Three to five bullets quantifying head-to-head comparisons across return, volatility, cost, and Sharpe.\n"
        "### Risk Flags\n"
        "- Two to four bullets naming specific portfolios with concentration, diversification, or cost concerns.\n"
        "### Rebalance Ideas\n"
        "- Two to three bullets suggesting reallocations within the given assets to improve risk-adjusted value.\n"
        "### Final Recommendation\n"
        "- Rank the top three portfolios in one bullet each, stating the key metric advantages.\n\n"
        "--- BEGIN PORTFOLIO DATA ---\n\n"
    )

    portfolio_details = []
    for i, p in enumerate(portfolios):
        assets = p.get('assets', [])
        weights = p.get('weights', [])
        
        # Handle both list and dict formats for weights
        if isinstance(weights, list) and len(assets) == len(weights):
            allocations = ', '.join([f"{ticker}: {(weight * 100):.2f}%" for ticker, weight in zip(assets, weights)])
        elif isinstance(weights, dict):
            allocations = ', '.join([f"{ticker}: {(weight * 100):.2f}%" for ticker, weight in weights.items()])
        else:
            allocations = "N/A"

        detail = (
            f"**Portfolio {i+1}**\n"
            f"- **Assets & Allocations:** {allocations}\n"
            f"- **Expected Annual Return:** {p.get('return', 0) * 100:.2f}%\n"
            f"- **Annual Volatility (Risk):** {p.get('risk', 0) * 100:.2f}%\n"
            f"- **Sharpe Ratio:** {p.get('sharpe', 0):.2f}\n"
            f"- **Estimated Cost:** {p.get('cost', 0):,.2f}\n"
            f"- **Selection Probability:** {p.get('probability', 0):.4f}\n"
            f"- **QUBO Objective:** {p.get('qubo_value', 0):,.4f}\n"
        )
        portfolio_details.append(detail)
    
    prompt_footer = "\n--- END PORTFOLIO DATA ---"
    
    return prompt_header + "\n".join(portfolio_details) + prompt_footer

def get_google_ai_analysis(portfolio_data: dict) -> str:
    """
    Generates a real-time AI-powered analysis of portfolio data using the Google Generative AI SDK.

    Args:
        portfolio_data (dict): The portfolio data to be analyzed.

    Returns:
        str: The generated analysis text from Google AI, or an error/fallback message.
    """
    api_key = os.getenv("GOOGLE_API_KEY") or os.getenv("GOOGLE_QUANTUMLEAP") or os.getenv("GEMINI_API_KEY")
    if not api_key:
        logger.error("Google API key not found. Set GOOGLE_API_KEY, GOOGLE_QUANTUMLEAP, or GEMINI_API_KEY.")
        return "AI analysis unavailable: API key not configured on the server."

    # Extract the list of portfolios
    portfolios = portfolio_data.get('portfolio_data', {}).get('top_portfolios', [])
    if not portfolios:
        portfolios = portfolio_data.get('top_portfolios', [])
    if not portfolios:
        logger.warning("[get_google_ai_analysis] No portfolios found in the input data.")
        return "No portfolio data was provided for analysis."

    prompt = create_detailed_analysis_prompt(portfolios)
    logger.info("[get_google_ai_analysis] Generated detailed prompt for Gemini.")
    logger.info("[get_google_ai_analysis] Prompt payload being sent to Gemini:\n%s", prompt)

    model_candidates = _build_model_priority_list()

    if genai is None:
        logger.error("[get_google_ai_analysis] google-genai SDK is not installed; falling back to REST/static analysis.")
        rest_text = _generate_via_rest(prompt, api_key, model_candidates)
        if rest_text:
            return rest_text
        return get_static_analysis(portfolio_data)

    client = genai.Client(api_key=api_key)

    generation_config = None
    if types is not None:
        generation_config = types.GenerateContentConfig(
            temperature=0.7,
            top_p=0.95,
            max_output_tokens=1536,
        )

    for model_name in model_candidates:
        try:
            logger.info("[get_google_ai_analysis] Attempting Gemini SDK call with model='%s'", model_name)
            if types is not None:
                contents = [types.Content(role="user", parts=[types.Part.from_text(prompt)])]
            else:
                contents = prompt

            response = client.models.generate_content(
                model=model_name,
                contents=contents,
                config=generation_config,
            )
            logger.info("[get_google_ai_analysis] SDK call succeeded for model='%s'", model_name)
            logger.info('[get_google_ai_analysis] Usage metadata: %s', getattr(response, 'usage_metadata', None))

            if response and getattr(response, "text", None):
                return response.text

            logger.warning(
                "[get_google_ai_analysis] SDK model '%s' returned empty text. Continuing to next option.",
                model_name,
            )
        except Exception as sdk_error:
            error_text = str(sdk_error)
            logger.warning(
                "[get_google_ai_analysis] SDK call failed for model='%s': %s",
                model_name,
                error_text,
                exc_info=True,
            )
            if "404" not in error_text and "NOT_FOUND" not in error_text:
                break

    rest_text = _generate_via_rest(prompt, api_key, model_candidates)
    if rest_text:
        return rest_text

    logger.warning("[get_google_ai_analysis] All AI generation attempts failed; returning static analysis.")
    return get_static_analysis(portfolio_data)


def _generate_via_rest(prompt: str, api_key: str, model_names: Iterable[str]) -> Optional[str]:
    """Call Gemini REST endpoints as a fallback path."""

    payload = {
        "contents": [
            {
                "parts": [
                    {"text": prompt}
                ]
            }
        ],
        "generationConfig": {
            "temperature": 0.7,
            "topP": 0.95,
            "maxOutputTokens": 1536
        }
    }

    headers = {"Content-Type": "application/json"}

    for model_name in model_names:
        model_path = model_name if model_name.startswith("models/") else f"models/{model_name}"
        endpoints = [
            f"https://generativelanguage.googleapis.com/v1beta/{model_path}:generateContent",
            f"https://generativelanguage.googleapis.com/v1/{model_path}:generateContent",
        ]

        for url in endpoints:
            try:
                logger.info("[_generate_via_rest] Attempting REST call: model='%s', url='%s'", model_name, url)
                response = requests.post(url, headers=headers, params={"key": api_key}, json=payload, timeout=45)
                if response.status_code == 200:
                    data = response.json()
                    text = _extract_text_from_response(data)
                    if text:
                        logger.info("[_generate_via_rest] Generated analysis via REST endpoint for model='%s'", model_name)
                        return text
                    logger.warning("[_generate_via_rest] REST response missing text content for model='%s': %s", model_name, data)
                else:
                    logger.warning("[_generate_via_rest] REST endpoint error for model='%s': %s -> %s", model_name, response.status_code, response.text)
            except Exception:
                logger.exception("[_generate_via_rest] Unexpected error while calling url='%s'", url)

    logger.error("[_generate_via_rest] Unable to generate content from REST endpoints.")
    return None


def _extract_text_from_response(result: dict) -> Optional[str]:
    """Extract the textual response from a Gemini REST response payload."""

    candidates = result.get("candidates") or []
    for candidate in candidates:
        content = candidate.get("content", {})
        parts = content.get("parts", [])
        for part in parts:
            text = part.get("text")
            if text:
                return text
    return None

def get_static_analysis(portfolio_data: dict) -> str:
    """
    Generates a simple, static summary of the portfolios.
    This is used as a fallback if the AI analysis fails.
    """
    logger.info("[get_static_analysis] Falling back to static analysis.")
    
    portfolios = portfolio_data.get('portfolio_data', {}).get('top_portfolios', [])
    if not portfolios:
        portfolios = portfolio_data.get('top_portfolios', [])
    if not portfolios:
        return "Error: Could not extract portfolio data for static analysis."

    summary_parts = ["**AI Analysis Failed - Displaying Static Summary**\n"]
    for i, p in enumerate(portfolios):
        summary = (
            f"**Portfolio {i+1}**:\n"
            f"- Return: {p.get('return', 0) * 100:.2f}%\n"
            f"- Risk: {p.get('risk', 0) * 100:.2f}%\n"
            f"- Sharpe Ratio: {p.get('sharpe', 0):.2f}\n"
            f"- Cost: {p.get('cost', 0):,.2f}\n"
            f"- Allocation Snapshot: {p.get('assets', [])}\n"
        )
        summary_parts.append(summary)
    
    return "\n".join(summary_parts)


def _build_model_priority_list() -> List[str]:
    """Return an ordered list of Gemini model names to attempt."""

    env_model = os.getenv("GOOGLE_MODEL_NAME")
    candidates = []

    if env_model:
        candidates.append(env_model.strip())

    candidates.extend(
        [
            "gemini-2.5-flash",
            "gemini-2.5-pro",
            "gemini-2.5-flash-lite",
            "gemini-2.0-flash",
            "gemini-2.0-flash-lite",
            "gemini-1.5-flash-latest",
            "gemini-1.5-flash",
            "gemini-1.5-pro-latest",
            "gemini-1.0-pro",
            "gemini-pro",
        ]
    )

    ordered_unique: List[str] = []
    for name in candidates:
        if name and name not in ordered_unique:
            ordered_unique.append(name)

    return ordered_unique

# This function is the main entry point called by the Flask app.
def get_best_analysis(portfolio_data: dict) -> str:
    """
    Tries to get analysis from Google AI, falling back to a static summary on failure.
    """
    logger.info("[get_best_analysis] Attempting to generate portfolio analysis.")
    return get_google_ai_analysis(portfolio_data)