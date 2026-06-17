import { render, screen } from '@testing-library/react';
import Index from './app/routes/_index';

describe('Index route', () => {
  test("renders an <h1> containing 'Hello, World!'", () => {
    render(<Index />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Hello, World!');
  });

  test("the text matches 'Hello, World!' exactly", () => {
    render(<Index />);
    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });

  test('renders exactly one heading', () => {
    render(<Index />);
    expect(screen.getAllByRole('heading')).toHaveLength(1);
  });
});
