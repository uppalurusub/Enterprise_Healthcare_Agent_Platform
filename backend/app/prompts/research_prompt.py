"""
prompts/research_prompt.py

Research Agent Prompt Builder

Responsibilities
----------------
1. Define the Research Agent system prompt
2. Build dynamic prompts
3. Log prompt generation using Loguru
"""

from typing import Optional

from app.utils.logger import logger


class ResearchPrompt:
    """Prompt builder for the Healthcare Research AutoGen Agent."""

    SYSTEM_PROMPT = """
You are an Enterprise Healthcare Research AI Agent with over 20 years of
experience in clinical research, evidence-based medicine, biomedical
informatics, epidemiology, and medical literature review.

Your expertise includes:

• Evidence-Based Medicine (EBM)
• Clinical Trials
• Systematic Reviews
• Meta-Analysis
• Clinical Practice Guidelines
• Comparative Effectiveness Research
• Translational Medicine
• Population Health Research
• Healthcare Analytics
• Medical Literature Review
• Precision Medicine
• Public Health Research

Your responsibilities include:

• Review current medical evidence.
• Summarize relevant clinical studies.
• Identify evidence gaps.
• Recommend clinical guidelines.
• Identify ongoing clinical trials.
• Assess quality of evidence.
• Compare treatment approaches.
• Identify emerging therapies.
• Provide research-backed recommendations.
• Highlight limitations and uncertainties.

Always prioritize evidence-based recommendations.

Do not fabricate research findings, publications,
clinical trials, or medical guidelines.

If sufficient evidence is unavailable,
clearly identify knowledge gaps and assumptions.

Return your response using the required output format.
"""

    @classmethod
    def build_prompt(
        cls,
        patient_case: str,
        objective: str,
        additional_context: Optional[str] = None,
    ) -> str:
        """
        Build Research Agent prompt.

        Args:
            patient_case: Clinical case
            objective: Business objective
            additional_context: Optional context

        Returns:
            Complete research prompt
        """

        logger.info("Building Research Agent prompt.")

        prompt = f"""
PATIENT CASE
------------
{patient_case}

OBJECTIVE
---------
{objective}
"""

        if additional_context:
            logger.debug("Additional research context detected.")

            prompt += f"""

ADDITIONAL CONTEXT
------------------
{additional_context}
"""

        prompt += """

Please perform a comprehensive evidence-based research analysis.

Evaluate the following:

1. Patient Summary
2. Relevant Clinical Guidelines
3. Current Evidence
4. Landmark Clinical Trials
5. Recent Research Findings
6. Comparative Treatment Analysis
7. Quality of Evidence
8. Emerging Therapies
9. Knowledge Gaps
10. Research Recommendations
11. Future Research Opportunities
12. Executive Research Summary

Where applicable, include:

• Level of Evidence
• Strength of Recommendation
• Guideline References
• Clinical Trial Phase
• Research Limitations
• Confidence Level

Clearly distinguish between established evidence
and emerging research.

Return your response using the required structure.
"""

        logger.success("Research Agent prompt generated successfully.")

        return prompt.strip()

    @classmethod
    def get_system_prompt(cls) -> str:
        """
        Return Research Agent system prompt.
        """

        logger.debug("Returning Research Agent system prompt.")

        return cls.SYSTEM_PROMPT