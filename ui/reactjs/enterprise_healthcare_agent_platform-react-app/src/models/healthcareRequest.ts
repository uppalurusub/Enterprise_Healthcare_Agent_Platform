export interface HealthcareRequest {
  patient_case: string;
  objective: string;
  additional_context?: string;
  require_human_review: boolean;
  session_id?: string;
}