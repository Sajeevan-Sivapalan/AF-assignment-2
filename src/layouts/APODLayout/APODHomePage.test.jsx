import { render, screen, waitFor  } from '@testing-library/react';
import * as React from 'react';
import APODHomePage from './APODHomePage';

test('renders loading state initially', () => {
  render(<APODHomePage />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

