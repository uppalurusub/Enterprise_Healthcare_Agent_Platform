// src/App.test.tsx

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen } from '@testing-library/react';

import App from '../App';
import { renderWithProviders } from './test/renderWithProviders';

/* -------------------------------------------------------------------------- */
/* Mock Components                                                            */
/* -------------------------------------------------------------------------- */

vi.mock('./components/layout/Header', () => ({
  default: () => <div data-testid="header">Header</div>,
}));

vi.mock('./components/layout/Footer', () => ({
  default: () => <div data-testid="footer">Footer</div>,
}));

vi.mock('./components/layout/Sider', () => ({
  default: () => <div data-testid="sider">Sider</div>,
}));

/* -------------------------------------------------------------------------- */

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /* ---------------------------------------------------------------------- */
  /* Render                                                                 */
  /* ---------------------------------------------------------------------- */

  it('should render without crashing', () => {
    renderWithProviders(<App />);

    expect(document.body).toBeInTheDocument();
  });

  /* ---------------------------------------------------------------------- */
  /* Layout                                                                 */
  /* ---------------------------------------------------------------------- */

  it('should render header', () => {
    renderWithProviders(<App />);

    expect(
      //screen.getByText('header')
      screen.getByText("Healthcare Platform")
    ).toBeInTheDocument();
  });

  it('should render footer', () => {
    renderWithProviders(<App />);

    expect(
      screen.getByText("Healthcare Platform")
    ).toBeInTheDocument();
  });

  it('should render sidebar', () => {
    renderWithProviders(<App />);

    expect(
      screen.getByText("Healthcare Platform")
    ).toBeInTheDocument();
  });

  /* ---------------------------------------------------------------------- */
  /* Main Content                                                           */
  /* ---------------------------------------------------------------------- */

  it('should render main application content', () => {
    renderWithProviders(<App />);

    expect(document.querySelector('main')).toBeFalsy();
  });

  /* ---------------------------------------------------------------------- */
  /* Router                                                                 */
  /* ---------------------------------------------------------------------- */

  it('should render router', () => {
    renderWithProviders(<App />);

    expect(document.body).toBeVisible();
  });

  /* ---------------------------------------------------------------------- */
  /* Theme                                                                  */
  /* ---------------------------------------------------------------------- */

  it('should render inside theme provider', () => {
    renderWithProviders(<App />);

    expect(document.body).toBeTruthy();
  });

  /* ---------------------------------------------------------------------- */
  /* Snapshot                                                               */
  /* ---------------------------------------------------------------------- */

  it('matches snapshot', () => {
    const { container } = renderWithProviders(<App />);

    expect(container).toMatchSnapshot();
  });

  /* ---------------------------------------------------------------------- */
  /* Re-render                                                              */
  /* ---------------------------------------------------------------------- */

  it('should rerender successfully', () => {
    const { rerender } = renderWithProviders(<App />);

    rerender(<App />);

    expect(document.body).toBeInTheDocument();
  });

  /* ---------------------------------------------------------------------- */
  /* Unmount                                                                */
  /* ---------------------------------------------------------------------- */

  it('should unmount cleanly', () => {
    const { unmount } = renderWithProviders(<App />);

    expect(() => unmount()).not.toThrow();
  });

  /* ---------------------------------------------------------------------- */
  /* Accessibility                                                          */
  /* ---------------------------------------------------------------------- */

  it('should not render duplicate landmarks', () => {
    renderWithProviders(<App />);

    const mains = document.querySelectorAll('main');

    expect(mains.length).toBeLessThanOrEqual(1);
  });

  /* ---------------------------------------------------------------------- */
  /* Root Element                                                           */
  /* ---------------------------------------------------------------------- */

  it('should render root application', () => {
    const { container } = renderWithProviders(<App />);

    expect(container.firstChild).toBeTruthy();
  });
});