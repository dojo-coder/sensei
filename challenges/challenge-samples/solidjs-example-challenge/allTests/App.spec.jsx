import { render, screen } from '@solidjs/testing-library';
import App from './App';

describe('App', () => {
  test("renders an <h1> containing 'Hello, World!'", () => {
    render(() => <App />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Hello, World!');
  });

  test("the text matches 'Hello, World!' exactly", () => {
    render(() => <App />);
    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });

  test('does not render any other heading', () => {
    render(() => <App />);
    const headings = screen.getAllByRole('heading');
    expect(headings).toHaveLength(1);
  });

  test('renders no empty heading', () => {
    render(() => <App />);
    expect(screen.queryByRole('heading', { name: '' })).not.toBeInTheDocument();
  });

  test('text is exactly "Hello, World!" with the comma', () => {
    render(() => <App />);
    expect(screen.queryByText('Hello World!')).not.toBeInTheDocument();
    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });

  test('text is case-sensitive', () => {
    render(() => <App />);
    expect(screen.queryByText('hello, world!')).not.toBeInTheDocument();
    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });
});
