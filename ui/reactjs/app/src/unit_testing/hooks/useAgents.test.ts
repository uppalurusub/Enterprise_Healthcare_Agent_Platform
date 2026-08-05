// src/hooks/useAgents.test.ts

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';

import { useAgents } from '../../hooks/useAgents';
import * as healthcareApi from '../../api/healthcareApi';

import { agentsResponse } from '../test/mockResponses';

/* -------------------------------------------------------------------------- */
/* Mock API                                                                   */
/* -------------------------------------------------------------------------- */

vi.mock('../../api/healthcareApi', () => ({
  getAgents: vi.fn(),
}));

//const getAgentsMock = vi.mocked(healthcareApi);
const getAgentsMock = vi.mocked(healthcareApi.getAgents);

/* -------------------------------------------------------------------------- */

describe('useAgents', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /* ---------------------------------------------------------------------- */
  /* Initial State                                                          */
  /* ---------------------------------------------------------------------- */

  it('should initialize correctly', () => {
    const { result } = renderHook(() => useAgents());

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.agents).toBeNull();
  });

  /* ---------------------------------------------------------------------- */
  /* Success                                                                */
  /* ---------------------------------------------------------------------- */

  it('should fetch agents successfully', async () => {
    getAgentsMock.mockResolvedValue(agentsResponse);

    const { result } = renderHook(() => useAgents());

    await act(async () => {
      await result.current.loadAgents();
    });

    await waitFor(() =>
      expect(result.current.loading).toBe(false)
    );

    expect(result.current.agents).toEqual(agentsResponse);

    expect(result.current.error).toBeNull();

    expect(getAgentsMock).toHaveBeenCalledTimes(1);
  });

  /* ---------------------------------------------------------------------- */
  /* Loading                                                                */
  /* ---------------------------------------------------------------------- */

  it('should update loading state', async () => {
    getAgentsMock.mockImplementation(
      () =>
        new Promise(resolve =>
          setTimeout(() => resolve(agentsResponse), 100)
        )
    );

    const { result } = renderHook(() => useAgents());

    act(() => {
      result.current.loadAgents();
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() =>
      expect(result.current.loading).toBe(false)
    );
  });

  /* ---------------------------------------------------------------------- */
  /* API Error                                                              */
  /* ---------------------------------------------------------------------- */

  it('should handle API error', async () => {
    getAgentsMock.mockRejectedValue(
      new Error('Unable to fetch agents')
    );

    const { result } = renderHook(() => useAgents());

    await act(async () => {
      await result.current.loadAgents();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.agents).toBeNull();
    expect(result.current.error).toBe(
      'Unable to fetch agents'
    );
  });

  /* ---------------------------------------------------------------------- */
  /* Empty Response                                                         */
  /* ---------------------------------------------------------------------- */

  it('should handle empty response', async () => {
    getAgentsMock.mockResolvedValue(null);

    const { result } = renderHook(() => useAgents());

    await act(async () => {
      await result.current.loadAgents();
    });

    expect(result.current.agents).toBeNull();
    expect(result.current.error).toBeNull();
  });

  /* ---------------------------------------------------------------------- */
  /* Multiple Calls                                                         */
  /* ---------------------------------------------------------------------- */

  it('should fetch agents multiple times', async () => {
    getAgentsMock.mockResolvedValue(agentsResponse);

    const { result } = renderHook(() => useAgents());

    await act(async () => {
      await result.current.loadAgents();
      await result.current.loadAgents();
      await result.current.loadAgents();
    });

    expect(getAgentsMock).toHaveBeenCalledTimes(3);

    expect(result.current.agents).toEqual(agentsResponse);
  });

  

  /* ---------------------------------------------------------------------- */
  /* Unknown Error                                                          */
  /* ---------------------------------------------------------------------- */

  it('should handle unknown error object', async () => {
    getAgentsMock.mockRejectedValue({});

    const { result } = renderHook(() => useAgents());

    await act(async () => {
      await result.current.loadAgents();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeTruthy();
  });

  /* ---------------------------------------------------------------------- */
  /* Concurrent Requests                                                    */
  /* ---------------------------------------------------------------------- */

  it('should support concurrent requests', async () => {
    getAgentsMock.mockResolvedValue(agentsResponse);

    const { result } = renderHook(() => useAgents());

    await Promise.all([
      act(async () => {
        await result.current.loadAgents();
      }),
      act(async () => {
        await result.current.loadAgents();
      }),
    ]);

    expect(getAgentsMock).toHaveBeenCalledTimes(2);
  });

  
});