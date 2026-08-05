"""
prompts/finance_prompt.py

Financial Agent Prompt Builder

Responsibilities
----------------
1. Define the Financial Agent system prompt
2. Build user prompts dynamically
3. Log prompt generation using Loguru
"""

from typing import Optional

from app.utils.logger import logger


class FinancePrompt:
    """Prompt builder for the Financial AutoGen Agent."""

    SYSTEM_PROMPT = """
You are an expert Healthcare Financial AI Agent with over 20 years of
experience in healthcare finance, hospital administration, revenue cycle
management, insurance reimbursement, value-based care, and healthcare economics.

Your responsibilities include:

• Estimate treatment costs.
• Analyze hospitalization costs.
• Evaluate insurance coverage.
• Estimate patient out-of-pocket expenses.
• Recommend cost optimization strategies.
• Assess resource utilization.
• Analyze operational efficiency.
• Estimate ROI of treatment plans.
• Evaluate financial risks.
• Identify reimbursement opportunities.
• Recommend revenue cycle improvements.
• Support value-based healthcare initiatives.

Your response MUST be organized into the following sections:

1. Financial Summary
2. Estimated Treatment Cost
3. Hospital Resource Utilization
4. Insurance Coverage Assessment
5. Patient Cost Estimate
6. Revenue Cycle Impact
7. Cost Optimization Opportunities
8. Financial Risk Assessment
9. ROI Analysis
10. Executive Financial Recommendations

Provide realistic estimates.

If financial information is unavailable,
clearly state assumptions used in your analysis.

Do not fabricate financial data.
"""

    @classmethod
    def build_prompt(
        cls,
        patient_case: str,
        objective: str,
        additional_context: Optional[str] = None,
    ) -> str:
        """
        Build the Financial Agent prompt.

        Args:
            patient_case: Clinical scenario
            objective: User objective
            additional_context: Optional supporting information

        Returns:
            Complete financial prompt
        """

        logger.info("Building Financial Agent prompt.")

        prompt = f"""
PATIENT CASE
------------
{patient_case}

OBJECTIVE
---------
{objective}
"""

        if additional_context:
            logger.debug("Additional financial context detected.")

            prompt += f"""

ADDITIONAL CONTEXT
------------------
{additional_context}
"""

        prompt += """

Please analyze the healthcare financial implications of this patient case.

Consider:

• Expected treatment cost
• Diagnostic expenses
• Medication expenses
• Specialist consultation costs
• Hospitalization cost
• Insurance reimbursement
• Financial risks
• Resource utilization
• Cost optimization strategies

Return your response using the required output format.
"""

        logger.success("Financial Agent prompt generated successfully.")

        return prompt.strip()

    @classmethod
    def get_system_prompt(cls) -> str:
        """
        Return the Financial Agent system prompt.
        """

        logger.debug("Returning Financial Agent system prompt.")

        return cls.SYSTEM_PROMPT