// src/test/mockResponses.ts

/* ============================================================================
   Common API Responses
============================================================================ */

export const successResponse = {
  success: true,
  message: 'Request completed successfully',
};

export const errorResponse = {
  success: false,
  message: 'Internal Server Error',
};

export const validationErrorResponse = {
  success: false,
  message: 'Validation Failed',
  errors: {
    organization_name: ['Organization Name is required'],
    analysis_type: ['Analysis Type is required'],
  },
};

export const unauthorizedResponse = {
  success: false,
  message: 'Unauthorized',
};

export const forbiddenResponse = {
  success: false,
  message: 'Forbidden',
};

export const notFoundResponse = {
  success: false,
  message: 'Resource not found',
};

export const timeoutResponse = {
  success: false,
  message: 'Request Timeout',
};

/* ============================================================================
   Platform Analysis Response
============================================================================ */

export const platformAnalysisResponse = {
  success: true,

  data: {
    executive_summary: {
      overall_score: 94,
      overall_status: 'Healthy',

      summary:
        'Healthcare platform is healthy with good infrastructure and performance.',

      recommendations: [
        'Enable auto scaling',
        'Optimize database indexes',
        'Review cache expiration policy',
      ],
    },

    health_status: {
      cpu_usage: 41,
      memory_usage: 58,
      disk_usage: 52,
      api_latency: 184,
      database_status: 'Healthy',
    },

    metadata: {
      request_id: 'REQ-20260804001',
      generated_at: '2026-08-04T10:30:00Z',
      execution_time_ms: 1843,
      model: 'GPT-5.5',
      version: '1.0.0',
    },

    agents: [
      {
        id: 1,
        name: 'Infrastructure Agent',
        status: 'Completed',
        confidence: 96,
      },
      {
        id: 2,
        name: 'Performance Agent',
        status: 'Completed',
        confidence: 94,
      },
      {
        id: 3,
        name: 'Security Agent',
        status: 'Completed',
        confidence: 92,
      },
    ],

    agent_analysis: [
      {
        agent: 'Infrastructure',
        findings: [
          'CPU utilization is normal',
          'Memory consumption is healthy',
          'Disk utilization within limits',
        ],
      },
      {
        agent: 'Performance',
        findings: [
          'API response time acceptable',
          'Database query execution healthy',
        ],
      },
    ],

    human_review: {
      required: false,
      reviewer: '',
      comments: '',
    },
  },
};

/* ============================================================================
   Health Endpoint
============================================================================ */

export const healthResponse = {
  status: 'UP',

  services: {
    api: 'UP',
    database: 'UP',
    cache: 'UP',
    storage: 'UP',
  },

  uptime: 123456,

  timestamp: '2026-08-04T10:30:00Z',
};

/* ============================================================================
   Agents Endpoint
============================================================================ */

export const agentsResponse = {
  total_agents: 3,
  agents: [
    {
      id: 1,
      name: "Infrastructure Agent",
      description: "Infrastructure Analysis",
      status: "Completed",
      confidence: 96,
    },
    {
      id: 2,
      name: "Performance Agent",
      description: "Performance Analysis",
      status: "Completed",
      confidence: 94,
    },
    {
      id: 3,
      name: "Security Agent",
      description: "Security Analysis",
      status: "Completed",
      confidence: 92,
    },
  ],
};

/* ============================================================================
   Agent Details
============================================================================ */

export const agentInfoResponse = {
  application: "Enterprise Healthcare Agent Platform",
  version: "1.0.0",
  framework: "React + FastAPI",
  multi_agent_framework: "AutoGen",

  architecture: "Microservices",

  agents: [
    "Infrastructure Agent",
    "Performance Agent",
    "Security Agent"
  ],

  skills: [
    "Infrastructure Analysis",
    "Performance Analysis",
    "Security Analysis"
  ]
};




/* ============================================================================
   Empty Responses
============================================================================ */

export const emptyPlatformAnalysisResponse = {
  success: true,

  data: {
    executive_summary: {},

    health_status: {},

    metadata: {},

    agents: [],

    agent_analysis: [],

    human_review: {},
  },
};

/* ============================================================================
   Loading
============================================================================ */

export const loadingResponse = new Promise(() => {});

/* ============================================================================
   HTTP Status Examples
============================================================================ */

export const status200 = {
  status: 200,
  data: platformAnalysisResponse,
};

export const status400 = {
  status: 400,
  data: validationErrorResponse,
};

export const status401 = {
  status: 401,
  data: unauthorizedResponse,
};

export const status403 = {
  status: 403,
  data: forbiddenResponse,
};

export const status404 = {
  status: 404,
  data: notFoundResponse,
};

export const status500 = {
  status: 500,
  data: errorResponse,
};

/* ============================================================================
   Export Default
============================================================================ */

export default {
  successResponse,
  errorResponse,
  validationErrorResponse,
  unauthorizedResponse,
  forbiddenResponse,
  notFoundResponse,
  timeoutResponse,
  platformAnalysisResponse,
  emptyPlatformAnalysisResponse,
  healthResponse,
  agentsResponse,
  agentInfoResponse,
  loadingResponse,
  status200,
  status400,
  status401,
  status403,
  status404,
  status500,
};