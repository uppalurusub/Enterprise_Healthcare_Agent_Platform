// src/test/mocks/handlers.ts

import { http, HttpResponse } from 'msw';

import {
  platformAnalysisResponse,
  healthResponse,
  agentsResponse,
  agentInfoResponse,
  validationErrorResponse,
  unauthorizedResponse,
  notFoundResponse,
  errorResponse,
} from '../test/mockResponses';

/* -------------------------------------------------------------------------- */
/* Base URL                                                                   */
/* -------------------------------------------------------------------------- */

const API = '/api/v1';

/* -------------------------------------------------------------------------- */
/* Handlers                                                                   */
/* -------------------------------------------------------------------------- */

export const handlers = [
  /* ---------------------------------------------------------------------- */
  /* Platform Analysis                                                      */
  /* ---------------------------------------------------------------------- */

  http.post(`${API}/platform/analyze`, async () => {
    return HttpResponse.json(platformAnalysisResponse, {
      status: 200,
    });
  }),

  /* ---------------------------------------------------------------------- */
  /* Platform Health                                                        */
  /* ---------------------------------------------------------------------- */

  http.get(`${API}/platform/health`, () => {
    return HttpResponse.json(healthResponse, {
      status: 200,
    });
  }),

  /* ---------------------------------------------------------------------- */
  /* Agents                                                                 */
  /* ---------------------------------------------------------------------- */

  http.get(`${API}/agents`, () => {
    return HttpResponse.json(agentsResponse, {
      status: 200,
    });
  }),

  /* ---------------------------------------------------------------------- */
  /* Agent Details                                                          */
  /* ---------------------------------------------------------------------- */

  http.get(`${API}/agents/:id`, ({ params }) => {
    const { id } = params;

    if (id === '999') {
      return HttpResponse.json(notFoundResponse, {
        status: 404,
      });
    }

    return HttpResponse.json(
      {
        ...agentInfoResponse,
        data: {
          ...agentInfoResponse.data,
          id: Number(id),
        },
      },
      {
        status: 200,
      }
    );
  }),

  /* ---------------------------------------------------------------------- */
  /* Validation Error                                                       */
  /* ---------------------------------------------------------------------- */

  http.post(`${API}/validation-error`, () => {
    return HttpResponse.json(validationErrorResponse, {
      status: 400,
    });
  }),

  /* ---------------------------------------------------------------------- */
  /* Unauthorized                                                           */
  /* ---------------------------------------------------------------------- */

  http.get(`${API}/unauthorized`, () => {
    return HttpResponse.json(unauthorizedResponse, {
      status: 401,
    });
  }),

  /* ---------------------------------------------------------------------- */
  /* Forbidden                                                              */
  /* ---------------------------------------------------------------------- */

  http.get(`${API}/forbidden`, () => {
    return HttpResponse.json(
      {
        success: false,
        message: 'Forbidden',
      },
      {
        status: 403,
      }
    );
  }),

  /* ---------------------------------------------------------------------- */
  /* Not Found                                                              */
  /* ---------------------------------------------------------------------- */

  http.get(`${API}/not-found`, () => {
    return HttpResponse.json(notFoundResponse, {
      status: 404,
    });
  }),

  /* ---------------------------------------------------------------------- */
  /* Internal Server Error                                                  */
  /* ---------------------------------------------------------------------- */

  http.get(`${API}/server-error`, () => {
    return HttpResponse.json(errorResponse, {
      status: 500,
    });
  }),

  /* ---------------------------------------------------------------------- */
  /* Delayed Response                                                       */
  /* ---------------------------------------------------------------------- */

  http.get(`${API}/slow`, async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));

    return HttpResponse.json(healthResponse, {
      status: 200,
    });
  }),
];