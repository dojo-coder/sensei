import { render, screen } from '@solidjs/testing-library';
import App from './App';

describe('TodoList', () => {
  test('starts empty', () => {
    render(() => <App />);
    expect(screen.getByText('Todos (0)')).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  // Add tests until every hidden bug is caught.
});
