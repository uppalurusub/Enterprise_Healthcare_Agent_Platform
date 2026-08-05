// src/api/axios.test.ts

import { describe, it, expect, beforeEach, vi } from 'vitest';
import MockAdapter from 'axios-mock-adapter';

import axiosClient from '../../api/axios';

describe('Axios Client', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axiosClient);

    localStorage.clear();

    vi.clearAllMocks();
  });

  afterEach(() => {
    mock.restore();
  });

  /* -------------------------------------------------------------------- */
  /* Instance                                                             */
  /* -------------------------------------------------------------------- */

  describe('Axios Instance', () => {
    it('should be defined', () => {
      expect(axiosClient).toBeDefined();
    });

    it('should have defaults', () => {
      expect(axiosClient.defaults).toBeDefined();
    });

    it('should contain headers object', () => {
      expect(axiosClient.defaults.headers).toBeDefined();
    });

    it('should define timeout', () => {
      expect(axiosClient.defaults.timeout).toBeGreaterThan(0);
    });
  });

  /* -------------------------------------------------------------------- */
  /* GET                                                                  */
  /* -------------------------------------------------------------------- */

  describe('GET Requests', () => {
    it('returns successful response', async () => {
      mock.onGet('/health').reply(200, {
        status: 'UP',
      });

      const response = await axiosClient.get('/health');

      expect(response.status).toBe(200);

      expect(response.data.status).toBe('UP');
    });

    it('handles 404', async () => {
      mock.onGet('/missing').reply(404);

      await expect(
        axiosClient.get('/missing')
      ).rejects.toBeDefined();
    });

    it('handles 500', async () => {
      mock.onGet('/server').reply(500);

      await expect(
        axiosClient.get('/server')
      ).rejects.toBeDefined();
    });
  });

  /* -------------------------------------------------------------------- */
  /* POST                                                                 */
  /* -------------------------------------------------------------------- */

  describe('POST Requests', () => {
    it('posts successfully', async () => {
      const payload = {
        name: 'Hospital',
      };

      mock.onPost('/platform/analyze').reply(200, payload);

      const response = await axiosClient.post(
        '/platform/analyze',
        payload
      );

      expect(response.status).toBe(200);

      expect(response.data.name).toBe('Hospital');
    });

    it('handles validation error', async () => {
      mock.onPost('/platform/analyze').reply(400, {
        message: 'Validation Failed',
      });

      await expect(
        axiosClient.post('/platform/analyze', {})
      ).rejects.toBeDefined();
    });
  });

  /* -------------------------------------------------------------------- */
  /* PUT                                                                  */
  /* -------------------------------------------------------------------- */

  describe('PUT Requests', () => {
    it('updates successfully', async () => {
      mock.onPut('/agents/1').reply(200, {
        success: true,
      });

      const response = await axiosClient.put('/agents/1', {
        status: 'Completed',
      });

      expect(response.status).toBe(200);

      expect(response.data.success).toBe(true);
    });
  });

  /* -------------------------------------------------------------------- */
  /* DELETE                                                               */
  /* -------------------------------------------------------------------- */

  describe('DELETE Requests', () => {
    it('deletes successfully', async () => {
      mock.onDelete('/agents/1').reply(204);

      const response =
        await axiosClient.delete('/agents/1');

      expect(response.status).toBe(204);
    });
  });

  

  /* -------------------------------------------------------------------- */
  /* Network Errors                                                       */
  /* -------------------------------------------------------------------- */

  describe('Network Errors', () => {
    it('handles network failure', async () => {
      mock.onGet('/network').networkError();

      await expect(
        axiosClient.get('/network')
      ).rejects.toBeDefined();
    });

    it('handles timeout', async () => {
      mock.onGet('/timeout').timeout();

      await expect(
        axiosClient.get('/timeout')
      ).rejects.toBeDefined();
    });
  });

  /* -------------------------------------------------------------------- */
  /* HTTP Status                                                          */
  /* -------------------------------------------------------------------- */

  describe('HTTP Status Codes', () => {
    it('handles 401', async () => {
      mock.onGet('/401').reply(401);

      await expect(
        axiosClient.get('/401')
      ).rejects.toBeDefined();
    });

    it('handles 403', async () => {
      mock.onGet('/403').reply(403);

      await expect(
        axiosClient.get('/403')
      ).rejects.toBeDefined();
    });

    it('handles 404', async () => {
      mock.onGet('/404').reply(404);

      await expect(
        axiosClient.get('/404')
      ).rejects.toBeDefined();
    });

    it('handles 500', async () => {
      mock.onGet('/500').reply(500);

      await expect(
        axiosClient.get('/500')
      ).rejects.toBeDefined();
    });
  });

  /* -------------------------------------------------------------------- */
  /* JSON                                                                 */
  /* -------------------------------------------------------------------- */

  describe('JSON Requests', () => {
    it('accepts JSON body', async () => {
      const payload = {
        organization: 'ABC',
      };

      mock.onPost('/json').reply(config => {
        expect(
          JSON.parse(config.data)
        ).toEqual(payload);

        return [200, payload];
      });

      const response =
        await axiosClient.post('/json', payload);

      expect(response.data.organization).toBe(
        'ABC'
      );
    });
  });

  /* -------------------------------------------------------------------- */
  /* Response                                                              */
  /* -------------------------------------------------------------------- */

  describe('Response', () => {
    it('returns response data', async () => {
      mock.onGet('/response').reply(200, {
        success: true,
      });

      const response =
        await axiosClient.get('/response');

      expect(response.data.success).toBe(true);
    });
  });
});