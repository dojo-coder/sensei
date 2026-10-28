import { render, screen, fireEvent } from '@solidjs/testing-library';
import App from './App';

const input = (): HTMLInputElement => screen.getByPlaceholderText('What needs to be done?') as HTMLInputElement;
const items = (): string[] => screen.queryAllByRole('listitem').map((node) => node.textContent ?? '');

function add(text: string): void {
  fireEvent.input(input(), { target: { value: text } });
  fireEvent.click(screen.getByRole('button', { name: 'Add' }));
}

describe('TodoList (reference suite)', () => {
  test('starts empty', () => {
    render(() => <App />);
    expect(screen.getByText('Todos (0)')).toBeInTheDocument();
    expect(items()).toEqual([]);
  });

  test('adds a trimmed todo and counts it', () => {
    render(() => <App />);
    add('  Buy milk  ');
    expect(items()).toEqual(['Buy milk']);
    expect(screen.getByText('Todos (1)')).toBeInTheDocument();
  });

  test('clears the input after adding', () => {
    render(() => <App />);
    add('Buy milk');
    expect(input().value).toBe('');
  });

  test('ignores blank todos', () => {
    render(() => <App />);
    add('');
    add('   ');
    expect(items()).toEqual([]);
    expect(screen.getByText('Todos (0)')).toBeInTheDocument();
  });

  test('ignores duplicates regardless of letter case', () => {
    render(() => <App />);
    add('Buy milk');
    add('buy MILK');
    expect(items()).toEqual(['Buy milk']);
    expect(screen.getByText('Todos (1)')).toBeInTheDocument();
  });
});
