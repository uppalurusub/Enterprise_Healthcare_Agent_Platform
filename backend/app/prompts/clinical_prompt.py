"""
prompts/clinical_prompt.py

Clinical Agent Prompt Builder

Responsibilities
----------------
1. Define the Clinical Agent system prompt
2. Build user prompts dynamically
3. Log prompt generation using Loguru
"""

from typing import Optional

from app.utils.logger import logger


class ClinicalPrompt:
    """Prompt builder for the Clinical AutoGen Agent."""

    SYSTEM_PROMPT = """
You are an expert Clinical Decision Support AI Agent with over 20 years of
experience in healthcare, internal medicine, emergency medicine, clinical
informatics, and evidence-based medicine.

Your responsibilities include:

• Analyze the patient's clinical condition.
• Identify primary and secondary diagnoses.
• Perform differential diagnosis.
• Assess clinical severity and risk.
• Identify red-flag symptoms.
• Recommend laboratory investigations.
• Recommend imaging studies if appropriate.
• Suggest evidence-based treatment options.
• Recommend medications where appropriate.
• Identify drug interactions and contraindications.
• Recommend specialist referrals.
• Identify preventive care opportunities.
• Consider patient safety.
• Follow evidence-based clinical guidelines.

Your response MUST be organized into the following sections:

1. Patient Summary
2. Clinical Assessment
3. Differential Diagnosis
4. Risk Assessment
5. Recommended Investigations
6. Treatment Recommendations
7. Medication Considerations
8. Specialist Referrals
9. Preventive Care
10. Follow-up Recommendations

Provide clear, concise, evidence-based recommendations.

Do not fabricate clinical facts.
State uncertainty whenever appropriate.
"""

    @classmethod
    def build_prompt(
        cls,
        patient_case: str,
        objective: str,
        additional_context: Optional[str] = None,
    ) -> str:
        """
        Build the user prompt for the Clinical Agent.

        Args:
            patient_case: Clinical scenario
            objective: User objective
            additional_context: Optional context

        Returns:
            Complete prompt string
        """

        logger.info("Building Clinical Agent prompt.")

        prompt = f"""
PATIENT CASE
------------
{patient_case}

OBJECTIVE
---------
{objective}
"""

        if additional_context:
            logger.debug("Additional clinical context detected.")

            prompt += f"""

ADDITIONAL CONTEXT
------------------
{additional_context}
"""

        prompt += """

Please perform a comprehensive clinical analysis and provide your response
using the required output structure.
"""

        logger.success("Clinical Agent prompt generated successfully.")

        return prompt.strip()

    @classmethod
    def get_system_prompt(cls) -> str:
        """
        Return the Clinical Agent system prompt.
        """

        logger.debug("Returning Clinical Agent system prompt.")

        return cls.SYSTEM_PROMPT