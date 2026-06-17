import { render, screen } from '@testing-library/react';
import Page from './src/app/page';

describe('Page', () => {
  test("renders an <h1> containing 'Hello, World!'", () => {
    render(<Page />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Hello, World!');
  });

  test("the text matches 'Hello, World!' exactly", () => {
    render(<Page />);
    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });

  test('renders exactly one heading', () => {
    render(<Page />);
    expect(screen.getAllByRole('heading')).toHaveLength(1);
  });

  test('text is exactly "Hello, World!" with the comma', () => {
    render(<Page />);
    expect(screen.queryByText('Hello World!')).not.toBeInTheDocument();
    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });

  test('text is case-sensitive', () => {
    render(<Page />);
    expect(screen.queryByText('hello, world!')).not.toBeInTheDocument();
    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });

  test('renders no empty heading', () => {
    render(<Page />);
    expect(screen.queryByRole('heading', { name: '' })).not.toBeInTheDocument();
  });
});
