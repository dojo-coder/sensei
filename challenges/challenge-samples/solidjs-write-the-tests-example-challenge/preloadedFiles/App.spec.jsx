import { render, screen, fireEvent } from '@solidjs/testing-library';
import App from './App';

describe('Counter', () => {
  test('starts at zero', () => {
    render(() => <App />);
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });

  // Add tests until every hidden bug is caught.
});
