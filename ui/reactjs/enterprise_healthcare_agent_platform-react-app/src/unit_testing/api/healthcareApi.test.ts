// src/api/healthcareApi.test.ts

import { describe, it, expect, beforeEach, vi } from 'vitest';

import axiosClient from '../../api/axios';

import {
  executeHealthcare,
  getHealthStatus,
  getAgents,
  getAgentsInfo,
} from '../../api/healthcareApi';

import {
  platformAnalysisResponse,
  healthResponse,
  agentsResponse,
  agentInfoResponse,
} from '../test/mockResponses';

/* -------------------------------------------------------------------------- */
/*                              Mock Axios                                    */
/* -------------------------------------------------------------------------- */

vi.mock('../../api/axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

const mockedAxios = vi.mocked(axiosClient);

/* -------------------------------------------------------------------------- */

describe('healthcareApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /* ---------------------------------------------------------------------- */
  /* analyzePlatform()                                                      */
  /* ---------------------------------------------------------------------- */

  describe('analyzePlatform()', () => {
    const request = {
      organization_name: 'ABC Hospital',
      analysis_type: 'Platform Assessment',
      include_recommendations: true,
    };

    it('should return platform analysis', async () => {
      mockedAxios.post.mockResolvedValue({
        data: platformAnalysisResponse,
      });

      const result = await executeHealthcare(request);

      expect(mockedAxios.post).toHaveBeenCalledTimes(1);

      expect(result).toEqual(platformAnalysisResponse);
    });

    it('should call correct endpoint', async () => {
      mockedAxios.post.mockResolvedValue({
        data: platformAnalysisResponse,
      });

      await executeHealthcare(request);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        '/agents/enterprise-healthcare-platform',
        request
      );
    });

    it('should throw API error', async () => {
      mockedAxios.post.mockRejectedValue(
        new Error('Server Error')
      );

      await expect(
        executeHealthcare(request)
      ).rejects.toThrow('Server Error');
    });
  });

  /* ---------------------------------------------------------------------- */
  /* getPlatformHealth()                                                    */
  /* ---------------------------------------------------------------------- */

  describe('getPlatformHealth()', () => {
    it('should return platform health', async () => {
      mockedAxios.get.mockResolvedValue({
        data: healthResponse,
      });

      const result = await getHealthStatus();

      expect(result).toEqual(healthResponse);
    });

    it('should call correct endpoint', async () => {
      mockedAxios.get.mockResolvedValue({
        data: healthResponse,
      });

      await getHealthStatus();

      expect(mockedAxios.get).toHaveBeenCalledWith(
        '/agents/health'
      );
    });

    it('should throw error', async () => {
      mockedAxios.get.mockRejectedValue(
        new Error('Health Error')
      );

      await expect(
        getHealthStatus()
      ).rejects.toThrow('Health Error');
    });
  });

  /* ---------------------------------------------------------------------- */
  /* getAgents()                                                            */
  /* ---------------------------------------------------------------------- */

  describe('getAgents()', () => {
    it('should return agents', async () => {
      mockedAxios.get.mockResolvedValue({
        data: agentsResponse,
      });

      const result = await getAgents();

      expect(result).toEqual(agentsResponse);
    });

    it('should call correct endpoint', async () => {
      mockedAxios.get.mockResolvedValue({
        data: agentsResponse,
      });

      await getAgents();

      expect(mockedAxios.get).toHaveBeenCalledWith(
        '/agents/agents'
      );
    });

    it('should throw API error', async () => {
      mockedAxios.get.mockRejectedValue(
        new Error('Agents Error')
      );

      await expect(
        getAgents()
      ).rejects.toThrow('Agents Error');
    });
  });

  /* ---------------------------------------------------------------------- */
  /* getAgentInfo()                                                         */
  /* ---------------------------------------------------------------------- */

  describe('getAgentInfo()', () => {
    it('should return agent info', async () => {
      mockedAxios.get.mockResolvedValue({
        data: agentInfoResponse,
      });

      const result = await getAgentsInfo();

      expect(result).toEqual(agentInfoResponse);
    });

    it('should call correct endpoint', async () => {
      mockedAxios.get.mockResolvedValue({
        data: agentInfoResponse,
      });

      await getAgentsInfo();

      expect(mockedAxios.get).toHaveBeenCalledWith(
        '/agents/info'
      );
    });

    it('should throw API error', async () => {
      mockedAxios.get.mockRejectedValue(
        new Error('Agent Error')
      );

      await expect(
        getAgentsInfo()
      ).rejects.toThrow('Agent Error');
    });
  });

  /* ---------------------------------------------------------------------- */
  /* Generic HTTP Errors                                                    */
  /* ---------------------------------------------------------------------- */

  describe('HTTP Errors', () => {
    it('handles 400', async () => {
      mockedAxios.get.mockRejectedValue({
        response: {
          status: 400,
        },
      });

      await expect(
        getHealthStatus()
      ).rejects.toBeDefined();
    });

    it('handles 401', async () => {
      mockedAxios.get.mockRejectedValue({
        response: {
          status: 401,
        },
      });

      await expect(
        getHealthStatus()
      ).rejects.toBeDefined();
    });

    it('handles 404', async () => {
      mockedAxios.get.mockRejectedValue({
        response: {
          status: 404,
        },
      });

      await expect(
        getHealthStatus()
      ).rejects.toBeDefined();
    });

    it('handles 500', async () => {
      mockedAxios.get.mockRejectedValue({
        response: {
          status: 500,
        },
      });

      await expect(
        getHealthStatus()
      ).rejects.toBeDefined();
    });
  });
});