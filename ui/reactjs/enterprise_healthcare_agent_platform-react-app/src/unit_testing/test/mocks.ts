// src/test/mocks.ts

import { vi } from 'vitest';

/* -------------------------------------------------------------------------- */
/*                               Mock Request                                 */
/* -------------------------------------------------------------------------- */

export const mockRequest = {
  organization_name: 'ABC Hospital',
  analysis_type: 'Platform Assessment',
  include_recommendations: true,
};

/* -------------------------------------------------------------------------- */
/*                              Executive Summary                             */
/* -------------------------------------------------------------------------- */

export const mockExecutiveSummary = {
  overall_score: 92,
  overall_status: 'Healthy',
  summary:
    'Healthcare platform is operating within expected thresholds.',
  recommendations: [
    'Increase cache usage',
    'Review API latency',
    'Scale worker nodes',
  ],
};

/* -------------------------------------------------------------------------- */
/*                               Health Status                                */
/* -------------------------------------------------------------------------- */

export const mockHealthStatus = {
  cpu_usage: 42,
  memory_usage: 61,
  disk_usage: 53,
  api_latency: 185,
  database_status: 'Healthy',
};

/* -------------------------------------------------------------------------- */
/*                                 Metadata                                   */
/* -------------------------------------------------------------------------- */

export const mockMetadata = {
  request_id: 'REQ-10001',
  generated_at: '2026-08-04T10:30:00Z',
  execution_time_ms: 2100,
  model: 'GPT-5.5',
  version: '1.0.0',
};

/* -------------------------------------------------------------------------- */
/*                                  Agents                                    */
/* -------------------------------------------------------------------------- */

export const mockAgents = [
  {
    id: 1,
    name: 'Infrastructure Agent',
    status: 'Completed',
    confidence: 96,
  },
  {
    id: 2,
    name: 'Security Agent',
    status: 'Completed',
    confidence: 94,
  },
  {
    id: 3,
    name: 'Performance Agent',
    status: 'Completed',
    confidence: 91,
  },
];

/* -------------------------------------------------------------------------- */
/*                             Agent Analysis                                 */
/* -------------------------------------------------------------------------- */

export const mockAgentAnalysis = [
  {
    agent: 'Infrastructure',
    findings: [
      'CPU healthy',
      'Memory healthy',
      'Disk healthy',
    ],
  },
  {
    agent: 'Performance',
    findings: [
      'Latency acceptable',
      'Database healthy',
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                             Human Review                                   */
/* -------------------------------------------------------------------------- */

export const mockHumanReview = {
  required: false,
  reviewer: '',
  comments: '',
};

/* -------------------------------------------------------------------------- */
/*                              API Response                                  */
/* -------------------------------------------------------------------------- */

export const mockPlatformAnalysisResponse = {
  executive_summary: mockExecutiveSummary,
  health_status: mockHealthStatus,
  metadata: mockMetadata,
  agents: mockAgents,
  agent_analysis: mockAgentAnalysis,
  human_review: mockHumanReview,
};

/* -------------------------------------------------------------------------- */
/*                              Error Response                                */
/* -------------------------------------------------------------------------- */

export const mockErrorResponse = {
  success: false,
  message: 'Internal Server Error',
};

/* -------------------------------------------------------------------------- */
/*                             Loading Response                               */
/* -------------------------------------------------------------------------- */

export const mockLoadingResponse = new Promise(() => {});

/* -------------------------------------------------------------------------- */
/*                              Axios Response                                */
/* -------------------------------------------------------------------------- */

export const mockAxiosResponse = {
  data: mockPlatformAnalysisResponse,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};

/* -------------------------------------------------------------------------- */
/*                               API Mock                                     */
/* -------------------------------------------------------------------------- */

export const healthcareApiMock = {
  analyzePlatform: vi.fn().mockResolvedValue(mockAxiosResponse),

  getPlatformHealth: vi.fn().mockResolvedValue({
    data: mockHealthStatus,
  }),

  getAgents: vi.fn().mockResolvedValue({
    data: mockAgents,
  }),

  getAgentInfo: vi.fn().mockResolvedValue({
    data: mockAgentAnalysis,
  }),
};

/* -------------------------------------------------------------------------- */
/*                             Router Mock                                    */
/* -------------------------------------------------------------------------- */

export const navigateMock = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );

  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

/* -------------------------------------------------------------------------- */
/*                            Notification Mock                               */
/* -------------------------------------------------------------------------- */

export const enqueueSnackbarMock = vi.fn();

vi.mock('notistack', () => ({
  useSnackbar: () => ({
    enqueueSnackbar: enqueueSnackbarMock,
  }),
}));

/* -------------------------------------------------------------------------- */
/*                               Window Mock                                  */
/* -------------------------------------------------------------------------- */

export const mockWindowLocation = () => {
  Object.defineProperty(window, 'location', {
    writable: true,
    value: {
      href: '',
      assign: vi.fn(),
      reload: vi.fn(),
      replace: vi.fn(),
    },
  });
};

/* -------------------------------------------------------------------------- */
/*                            Helper Reset                                    */
/* -------------------------------------------------------------------------- */

export const resetAllMocks = () => {
  vi.clearAllMocks();
};