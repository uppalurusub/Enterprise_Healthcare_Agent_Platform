// src/hooks/useAgentsInfo.test.ts

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';

import { useAgentsInfo } from '../../hooks/useAgentsInfo';
import * as healthcareApi from '../../api/healthcareApi';

import { agentInfoResponse } from '../test/mockResponses';

/* -------------------------------------------------------------------------- */
/* Mock API                                                                   */
/* -------------------------------------------------------------------------- */

vi.mock('../../api/healthcareApi', async () => {
  const actual = await vi.importActual<
    typeof import('../../api/healthcareApi')
  >('../../api/healthcareApi');

  return {
    ...actual,
    getAgentsInfo: vi.fn(),
  };
});

const mockedApi = vi.mocked(healthcareApi.getAgentsInfo);

/* -------------------------------------------------------------------------- */

describe('useAgentsInfo', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const agentId = 1;

  /* ---------------------------------------------------------------------- */
  /* Initial State                                                          */
  /* ---------------------------------------------------------------------- */

  it('should initialize correctly', () => {
    const { result } = renderHook(() => useAgentsInfo());

    expect(result.current.info).toBeNull();
    expect(result.current.loadAgentsInfo).toBeDefined();
    expect(typeof result.current.loadAgentsInfo).toBe("function");
  });

  /* ---------------------------------------------------------------------- */
  /* Success                                                                */
  /* ---------------------------------------------------------------------- */

  it('should fetch agent information successfully', async () => {
    mockedApi.mockResolvedValue(agentInfoResponse);

    const { result } = renderHook(() => useAgentsInfo());

    await act(async () => {
      await result.current.loadAgentsInfo();
    });

    await waitFor(() =>
      expect(result.current.loading).toBe(false)
    );

    expect(result.current.error).toBeNull();

    expect(result.current.info).toEqual(agentInfoResponse);

    expect(mockedApi).toHaveBeenCalledTimes(1);

    expect(mockedApi).toHaveBeenCalledWith();
  });

  /* ---------------------------------------------------------------------- */
  /* Loading                                                                */
  /* ---------------------------------------------------------------------- */

  it('should update loading state while fetching', async () => {
    mockedApi.mockImplementation(
      () =>
        new Promise(resolve =>
          setTimeout(() => resolve(agentInfoResponse), 100)
        )
    );

    const { result } = renderHook(() => useAgentsInfo());

    act(() => {
      result.current.loadAgentsInfo();
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() =>
      expect(result.current.loading).toBe(false)
    );
  });

  /* ---------------------------------------------------------------------- */
  /* API Error                                                              */
  /* ---------------------------------------------------------------------- */

  it('should handle API errors', async () => {
    mockedApi.mockRejectedValue(
      new Error('Unable to load agent information')
    );

    const { result } = renderHook(() => useAgentsInfo());

    await act(async () => {
      await result.current.loadAgentsInfo();
    });

    expect(result.current.loading).toBe(false);

    expect(result.current.info).toBeNull();

    expect(result.current.error).toBe(
      'Unable to load agent information'
    );
  });

  /* ---------------------------------------------------------------------- */
  /* Empty Response                                                         */
  /* ---------------------------------------------------------------------- */

  it('should handle null response', async () => {
    mockedApi.mockResolvedValue(null);

    const { result } = renderHook(() => useAgentsInfo());

    await act(async () => {
      await result.current.loadAgentsInfo();
    });

    expect(result.current.info).toBeNull();
    expect(result.current.error).toBeNull();
  });

  /* ---------------------------------------------------------------------- */
  /* Multiple Requests                                                      */
  /* ---------------------------------------------------------------------- */

  it('should support multiple requests', async () => {
    mockedApi.mockResolvedValue(agentInfoResponse);

    const { result } = renderHook(() => useAgentsInfo());

    await act(async () => {
      await result.current.loadAgentsInfo(1);
      await result.current.loadAgentsInfo(2);
      await result.current.loadAgentsInfo(3);
    });

    expect(mockedApi).toHaveBeenCalledTimes(3);

    expect(mockedApi).toHaveBeenNthCalledWith(1);
    expect(mockedApi).toHaveBeenNthCalledWith(2);
    expect(mockedApi).toHaveBeenNthCalledWith(3);
  });

  

  /* ---------------------------------------------------------------------- */
  /* Unknown Error                                                          */
  /* ---------------------------------------------------------------------- */

  it('should handle unknown error object', async () => {
    mockedApi.mockRejectedValue({});

    const { result } = renderHook(() => useAgentsInfo());

    await act(async () => {
      await result.current.loadAgentsInfo();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeTruthy();
  });

  /* ---------------------------------------------------------------------- */
  /* Concurrent Requests                                                    */
  /* ---------------------------------------------------------------------- */

  it('should support concurrent requests', async () => {
    mockedApi.mockResolvedValue(agentInfoResponse);

    const { result } = renderHook(() => useAgentsInfo());

    await Promise.all([
      act(async () => {
        await result.current.loadAgentsInfo();
      }),
      act(async () => {
        await result.current.loadAgentsInfo();
      }),
    ]);

    expect(mockedApi).toHaveBeenCalledTimes(2);
  });

  
});