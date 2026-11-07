// src/hooks/usePlatformAnalysis.test.ts

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';

import { usePlatformAnalysis } from '../../hooks/usePlatformAnalysis';

import * as healthcareApi from '../../api/healthcareApi';

import { platformAnalysisResponse } from '../test/mockResponses';

/* -------------------------------------------------------------------------- */
/* Mock API                                                                   */
/* -------------------------------------------------------------------------- */

vi.mock('../../api/healthcareApi', () => ({
  analyzePlatform: vi.fn(),
}));

const mockedApi = vi.mocked(healthcareApi);

/* -------------------------------------------------------------------------- */

describe('usePlatformAnalysis', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const request = {
    organization_name: 'ABC Hospital',
    analysis_type: 'Platform Assessment',
    include_recommendations: true,
  };

  /* ---------------------------------------------------------------------- */
  /* Initial State                                                          */
  /* ---------------------------------------------------------------------- */

  it('should initialize correctly', () => {
    const { result } = renderHook(() =>
      usePlatformAnalysis()
    );

    expect(result.current.loading).toBe(false);

    expect(result.current.error).toBeNull();

    expect(result.current.result).toBeNull();
  });

  /* ---------------------------------------------------------------------- */
  /* Success                                                                */
  /* ---------------------------------------------------------------------- */

  it('should fetch analysis successfully', async () => {
    mockedApi.analyzePlatform.mockResolvedValue(
      platformAnalysisResponse
    );

    const { result } = renderHook(() =>
      usePlatformAnalysis()
    );

    await act(async () => {
      await result.current.execute(request);
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeNull();

    expect(result.current.result).toEqual(
      platformAnalysisResponse
    );

    expect(
      mockedApi.analyzePlatform
    ).toHaveBeenCalledTimes(1);

    expect(
      mockedApi.analyzePlatform
    ).toHaveBeenCalledWith(request);
  });

  /* ---------------------------------------------------------------------- */
  /* Loading                                                                */
  /* ---------------------------------------------------------------------- */

  it('should set loading while request is running', async () => {
    mockedApi.analyzePlatform.mockImplementation(
      () =>
        new Promise(resolve =>
          setTimeout(
            () => resolve(platformAnalysisResponse),
            100
          )
        )
    );

    const { result } = renderHook(() =>
      usePlatformAnalysis()
    );

    act(() => {
      result.current.execute(request);
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() =>
      expect(result.current.loading).toBe(false)
    );
  });

  /* ---------------------------------------------------------------------- */
  /* Error                                                                  */
  /* ---------------------------------------------------------------------- */

  it('should handle API errors', async () => {
    mockedApi.analyzePlatform.mockRejectedValue(
      new Error('Internal Server Error')
    );

    const { result } = renderHook(() =>
      usePlatformAnalysis()
    );

    await act(async () => {
      await result.current.execute(request);
    });

    expect(result.current.loading).toBe(false);

    expect(result.current.result).toBeNull();

    expect(result.current.error).toBe(
      'Internal Server Error'
    );
  });

  /* ---------------------------------------------------------------------- */
  /* Empty Response                                                         */
  /* ---------------------------------------------------------------------- */

  it('should handle empty response', async () => {
    mockedApi.analyzePlatform.mockResolvedValue(null);

    const { result } = renderHook(() =>
      usePlatformAnalysis()
    );

    await act(async () => {
      await result.current.execute(request);
    });

    expect(result.current.result).toBeNull();

    expect(result.current.error).toBeNull();
  });

  /* ---------------------------------------------------------------------- */
  /* Multiple Calls                                                         */
  /* ---------------------------------------------------------------------- */

  it('should replace previous result', async () => {
    mockedApi.analyzePlatform.mockResolvedValue(
      platformAnalysisResponse
    );

    const { result } = renderHook(() =>
      usePlatformAnalysis()
    );

    await act(async () => {
      await result.current.execute(request);
      await result.current.execute(request);
    });

    expect(
      mockedApi.analyzePlatform
    ).toHaveBeenCalledTimes(2);

    expect(result.current.result).toEqual(
      platformAnalysisResponse
    );
  });

  

  /* ---------------------------------------------------------------------- */
  /* Unexpected Error                                                       */
  /* ---------------------------------------------------------------------- */

  it('should handle unknown errors', async () => {
    mockedApi.analyzePlatform.mockRejectedValue({});

    const { result } = renderHook(() =>
      usePlatformAnalysis()
    );

    await act(async () => {
      await result.current.execute(request);
    });

    expect(result.current.loading).toBe(false);

    expect(result.current.error).toBeFalsy();
  });

  /* ---------------------------------------------------------------------- */
  /* Concurrent Requests                                                    */
  /* ---------------------------------------------------------------------- */

  it('should support multiple requests', async () => {
    mockedApi.analyzePlatform.mockResolvedValue(
      platformAnalysisResponse
    );

    const { result } = renderHook(() =>
      usePlatformAnalysis()
    );

    await Promise.all([
      act(async () => {
        await result.current.execute(request);
      }),
      act(async () => {
        await result.current.execute(request);
      }),
    ]);

    expect(
      mockedApi.analyzePlatform
    ).toHaveBeenCalledTimes(2);
  });
});