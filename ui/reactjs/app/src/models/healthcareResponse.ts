export interface AgentResponse {
  agent_name: string;
  summary: string;
  execution_time_seconds: number;
}

export interface HumanReview {
  required: boolean;
  status: string;
  reviewer_comments?: string;
}

export interface HealthcareResponse {
  status: string;
  message: string;
  metadata: {
    request_id: string;
    session_id?: string;
    generated_at?: string;
    total_execution_time_seconds?: number;
  };
  clinical_analysis: AgentResponse;
  financial_analysis: AgentResponse;
  research_summary: AgentResponse;
  compliance_review: AgentResponse;
  executive_summary: AgentResponse;
  human_review: HumanReview;
}