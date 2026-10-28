import { cleanup, render, screen, fireEvent } from '@testing-library/react';

import App from './App.jsx';

afterEach(cleanup);

describe('Counter', () => {
  test('starts at zero', () => {
    render(<App />);
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });

  // Add tests until every hidden bug is caught.
});
