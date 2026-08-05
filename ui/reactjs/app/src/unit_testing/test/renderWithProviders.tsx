// src/test/renderWithProviders.tsx

import React, { PropsWithChildren, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

/* -------------------------------------------------------------------------- */
/*                               Theme                                         */
/* -------------------------------------------------------------------------- */

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

/* -------------------------------------------------------------------------- */
/*                           Query Client                                      */
/* -------------------------------------------------------------------------- */

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

/* -------------------------------------------------------------------------- */
/*                              Providers                                      */
/* -------------------------------------------------------------------------- */

interface ProviderProps {
  queryClient?: QueryClient;
}

function Providers({
  children,
  queryClient,
}: PropsWithChildren<ProviderProps>) {
  const client = queryClient ?? createTestQueryClient();

  return (
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

/* -------------------------------------------------------------------------- */
/*                        Render Options                                       */
/* -------------------------------------------------------------------------- */

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  queryClient?: QueryClient;
}

/* -------------------------------------------------------------------------- */
/*                         Custom Render                                       */
/* -------------------------------------------------------------------------- */

export function renderWithProviders(
  ui: ReactElement,
  options?: CustomRenderOptions
) {
  const { queryClient, ...renderOptions } = options ?? {};

  return render(ui, {
    wrapper: ({ children }) => (
      <Providers queryClient={queryClient}>
        {children}
      </Providers>
    ),
    ...renderOptions,
  });
}

/* -------------------------------------------------------------------------- */
/*                               Re-export                                     */
/* -------------------------------------------------------------------------- */

export * from '@testing-library/react';

export { default as userEvent } from '@testing-library/user-event';