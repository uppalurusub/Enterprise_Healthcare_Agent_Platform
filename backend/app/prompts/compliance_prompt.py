"""
prompts/compliance_prompt.py

Compliance Agent Prompt Builder

Responsibilities
----------------
1. Define the Compliance Agent system prompt
2. Build dynamic prompts
3. Log prompt generation using Loguru
"""

from typing import Optional

from app.utils.logger import logger


class CompliancePrompt:
    """Prompt builder for the Healthcare Compliance AutoGen Agent."""

    SYSTEM_PROMPT = """
You are an Enterprise Healthcare Compliance AI Agent with over 20 years of
experience in healthcare regulations, compliance auditing, clinical governance,
risk management, and healthcare information security.

Your expertise includes:

• HIPAA Compliance
• HITECH Act
• FDA Regulations
• Good Clinical Practice (GCP)
• Good Manufacturing Practice (GMP)
• Clinical Trial Compliance
• CMS Regulations
• Joint Commission Standards
• HL7/FHIR Standards
• ICD-10 / CPT Coding Compliance
• Medical Documentation Standards
• Healthcare Risk Management
• Healthcare Data Privacy
• Healthcare Cybersecurity
• Regulatory Audits

Your responsibilities include:

• Review regulatory compliance.
• Identify compliance violations.
• Evaluate patient privacy risks.
• Validate documentation quality.
• Review clinical guideline adherence.
• Assess legal and regulatory risks.
• Recommend corrective actions.
• Recommend compliance best practices.
• Identify audit observations.
• Assess operational compliance.

Always produce evidence-based recommendations.

Never fabricate regulations or legal requirements.

If regulations are uncertain, clearly state assumptions.
Return the analysis using the required output format.
"""

    @classmethod
    def build_prompt(
        cls,
        patient_case: str,
        objective: str,
        additional_context: Optional[str] = None,
    ) -> str:
        """
        Build Compliance Agent prompt.

        Args:
            patient_case: Clinical scenario
            objective: Business objective
            additional_context: Optional context

        Returns:
            Prompt string
        """

        logger.info("Building Compliance Agent prompt.")

        prompt = f"""
PATIENT CASE
------------
{patient_case}

OBJECTIVE
---------
{objective}
"""

        if additional_context:
            logger.debug("Additional compliance context detected.")

            prompt += f"""

ADDITIONAL CONTEXT
------------------
{additional_context}
"""

        prompt += """

Please perform a comprehensive healthcare compliance review.

Evaluate the following areas:

1. HIPAA Compliance
2. HITECH Compliance
3. FDA Regulatory Considerations
4. CMS Compliance
5. Clinical Guideline Adherence
6. Patient Privacy Assessment
7. Security & PHI Protection
8. Documentation Compliance
9. Coding & Billing Compliance
10. Operational Compliance
11. Risk Assessment
12. Recommended Corrective Actions

Provide practical recommendations.

Clearly identify:

• Compliance Risks
• Regulatory Violations
• Severity Level
• Recommended Mitigation
• Compliance Score (0-100)

Return your response using the required structure.
"""

        logger.success("Compliance Agent prompt generated successfully.")

        return prompt.strip()

    @classmethod
    def get_system_prompt(cls) -> str:
        """
        Return Compliance Agent system prompt.
        """

        logger.debug("Returning Compliance Agent system prompt.")

        return cls.SYSTEM_PROMPT