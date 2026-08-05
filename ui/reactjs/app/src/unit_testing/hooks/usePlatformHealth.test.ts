// src/hooks/usePlatformHealth.test.ts

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';

import { usePlatformHealth } from '../../hooks/usePlatformHealth';
import * as healthcareApi from '../../api/healthcareApi';

import { healthResponse } from '../test/mockResponses';

/* -------------------------------------------------------------------------- */
/* Mock API                                                                   */
/* -------------------------------------------------------------------------- */

vi.mock("../../api/healthcareApi", async () => {
  const actual = await vi.importActual<
    typeof import("../../api/healthcareApi")
  >("../../api/healthcareApi");

  return {
    ...actual,
    getHealthStatus: vi.fn(),
  };
});

const mockedApi = vi.mocked(healthcareApi.getHealthStatus);

/* -------------------------------------------------------------------------- */

describe('usePlatformHealth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /* ---------------------------------------------------------------------- */
  /* Initial State                                                          */
  /* ---------------------------------------------------------------------- */

  it('should initialize correctly', () => {
    const { result } = renderHook(() =>
      usePlatformHealth()
    );

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.health).toBeNull();
  });

  /* ---------------------------------------------------------------------- */
  /* Success                                                                */
  /* ---------------------------------------------------------------------- */

  it('should fetch platform health successfully', async () => {
    mockedApi.mockResolvedValue(
      healthResponse
    );

    const { result } = renderHook(() =>
      usePlatformHealth()
    );

    await act(async () => {
      await result.current.loadHealth();
    });

    await waitFor(() =>
      expect(result.current.loading).toBe(false)
    );

    expect(result.current.error).toBeNull();

    expect(result.current.health).toEqual(
      healthResponse
    );

    expect(
      mockedApi
    ).toHaveBeenCalledTimes(1);
  });

  /* ---------------------------------------------------------------------- */
  /* Loading                                                                */
  /* ---------------------------------------------------------------------- */

  it('should set loading while fetching', async () => {
    mockedApi.mockImplementation(
      () =>
        new Promise(resolve =>
          setTimeout(() => resolve(healthResponse), 100)
        )
    );

    const { result } = renderHook(() =>
      usePlatformHealth()
    );

    act(() => {
      result.current.loadHealth();
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() =>
      expect(result.current.loading).toBe(false)
    );
  });

  /* ---------------------------------------------------------------------- */
  /* Error                                                                  */
  /* ---------------------------------------------------------------------- */

  it('should handle API error', async () => {
    mockedApi.mockRejectedValue(
      new Error('Health service unavailable')
    );

    const { result } = renderHook(() =>
      usePlatformHealth()
    );

    await act(async () => {
      await result.current.loadHealth();
    });

    expect(result.current.loading).toBe(false);

    expect(result.current.health).toBeNull();

    expect(result.current.error).toBe(
      "Unable to fetch platform health status"
    );
  });

  /* ---------------------------------------------------------------------- */
  /* Empty Response                                                         */
  /* ---------------------------------------------------------------------- */

  it('should handle empty response', async () => {
    mockedApi.mockResolvedValue(null);

    const { result } = renderHook(() =>
      usePlatformHealth()
    );

    await act(async () => {
      await result.current.loadHealth();
    });

    expect(result.current.health).toBeNull();

    expect(result.current.error).toBeNull();
  });

  /* ---------------------------------------------------------------------- */
  /* Multiple Calls                                                         */
  /* ---------------------------------------------------------------------- */

  it('should fetch multiple times', async () => {
    mockedApi.mockResolvedValue(
      healthResponse
    );

    const { result } = renderHook(() =>
      usePlatformHealth()
    );

    await act(async () => {
      await result.current.loadHealth();
      await result.current.loadHealth();
    });

    expect(
      mockedApi
    ).toHaveBeenCalledTimes(2);

    expect(result.current.health).toEqual(
      healthResponse
    );
  });

  

  /* ---------------------------------------------------------------------- */
  /* Unknown Error                                                          */
  /* ---------------------------------------------------------------------- */

  it('should handle unknown error object', async () => {
    mockedApi.mockRejectedValue({});

    const { result } = renderHook(() =>
      usePlatformHealth()
    );

    await act(async () => {
      await result.current.loadHealth();
    });

    expect(result.current.loading).toBe(false);

    expect(result.current.error).toBeTruthy();
  });

  /* ---------------------------------------------------------------------- */
  /* Concurrent Requests                                                    */
  /* ---------------------------------------------------------------------- */

  it('should support concurrent requests', async () => {
    mockedApi.mockResolvedValue(
      healthResponse
    );

    const { result } = renderHook(() =>
      usePlatformHealth()
    );

    await Promise.all([
      act(async () => {
        await result.current.loadHealth();
      }),
      act(async () => {
        await result.current.loadHealth();
      }),
    ]);

    expect(
      mockedApi
    ).toHaveBeenCalledTimes(2);
  });
});