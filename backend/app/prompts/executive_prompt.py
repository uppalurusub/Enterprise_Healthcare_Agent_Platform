"""
prompts/executive_prompt.py

Executive Agent Prompt Builder

Responsibilities
----------------
1. Define the Executive Agent system prompt
2. Build executive prompts dynamically
3. Log prompt generation using Loguru

Author : Enterprise Healthcare Agent Platform
"""

from typing import Optional

from app.utils.logger import logger


class ExecutivePrompt:
    """Prompt builder for the Executive AutoGen Agent."""

    SYSTEM_PROMPT = """
You are an Executive Healthcare AI Agent with over 20 years of experience
in hospital leadership, healthcare strategy, digital transformation,
clinical governance, operational excellence, and executive decision support.

You act as the Chief Medical Officer (CMO), Chief Executive Officer (CEO),
Chief Operating Officer (COO), Chief Financial Officer (CFO),
Chief Information Officer (CIO), and Chief Compliance Officer (CCO).

Your role is NOT to perform detailed clinical reasoning.

Instead, synthesize findings from the following specialized agents:

• Clinical Agent
• Financial Agent
• Research Agent
• Compliance Agent

Your responsibilities include:

• Summarize key findings.
• Identify strategic priorities.
• Highlight major business risks.
• Evaluate operational impact.
• Assess financial implications.
• Evaluate regulatory compliance.
• Recommend executive actions.
• Prioritize initiatives.
• Recommend implementation roadmap.
• Identify KPIs.
• Support executive decision making.

Always provide concise,
business-oriented,
executive-level recommendations.

Never contradict specialist agent outputs.

If specialist opinions conflict,
identify the disagreement,
describe associated risks,
and recommend additional review.

Return your response using the required structure.
"""

    @classmethod
    def build_prompt(
        cls,
        clinical_analysis: str,
        financial_analysis: str,
        research_summary: str,
        compliance_review: str,
        objective: str,
        additional_context: Optional[str] = None,
    ) -> str:
        """
        Build Executive Agent prompt.

        Args:
            clinical_analysis: Clinical Agent output
            financial_analysis: Financial Agent output
            research_summary: Research Agent output
            compliance_review: Compliance Agent output
            objective: User objective
            additional_context: Optional context

        Returns:
            Executive prompt
        """

        logger.info("Building Executive Agent prompt.")

        prompt = f"""
BUSINESS OBJECTIVE
------------------
{objective}

====================================================

CLINICAL AGENT ANALYSIS
-----------------------
{clinical_analysis}

====================================================

FINANCIAL AGENT ANALYSIS
------------------------
{financial_analysis}

====================================================

RESEARCH AGENT ANALYSIS
-----------------------
{research_summary}

====================================================

COMPLIANCE AGENT ANALYSIS
-------------------------
{compliance_review}
"""

        if additional_context:
            logger.debug("Additional executive context detected.")

            prompt += f"""

====================================================

ADDITIONAL CONTEXT
------------------
{additional_context}
"""

        prompt += """

====================================================

Please prepare an Executive Decision Report.

Include the following sections:

1. Executive Summary

2. Overall Situation Assessment

3. Strategic Business Impact

4. Clinical Impact

5. Financial Impact

6. Regulatory & Compliance Impact

7. Operational Impact

8. Risk Assessment

9. Priority Recommendations

10. Immediate Actions (0–30 Days)

11. Mid-Term Actions (30–90 Days)

12. Long-Term Strategy

13. Success Metrics (KPIs)

14. Implementation Roadmap

15. Executive Decision

Present the report in a concise,
board-ready format suitable for
hospital executives and healthcare leadership.

Clearly identify:

• Critical Risks
• Strategic Opportunities
• Executive Priorities
• Recommended Decisions
• Expected Business Outcomes
"""

        logger.success("Executive Agent prompt generated successfully.")

        return prompt.strip()

    @classmethod
    def get_system_prompt(cls) -> str:
        """
        Return Executive Agent system prompt.

        Returns:
            Executive system prompt
        """

        logger.debug("Returning Executive Agent system prompt.")

        return cls.SYSTEM_PROMPT