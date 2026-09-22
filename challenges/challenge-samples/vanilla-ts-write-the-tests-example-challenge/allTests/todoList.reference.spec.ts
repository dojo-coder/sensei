import { createTodoList } from './todoList';
import { describe, test, expect, beforeEach } from '@jest/globals';

const input = (): HTMLInputElement => document.querySelector('input');
const heading = (): string => document.querySelector('h1').textContent;
const items = (): string[] => Array.from(document.querySelectorAll('li')).map((node) => node.textContent);

function add(text: string): void {
  input().value = text;
  document.querySelector('button').click();
}

describe('todoList.ts (reference suite)', () => {
  beforeEach(() => {
    document.documentElement.innerHTML = globalThis.htmlContent;
    createTodoList(document.getElementById('app') as HTMLElement);
  });

  test('starts empty', () => {
    expect(heading()).toEqual('Todos (0)');
    expect(items()).toEqual([]);
  });

  test('adds a trimmed todo and counts it', () => {
    add('  Buy milk  ');
    expect(items()).toEqual(['Buy milk']);
    expect(heading()).toEqual('Todos (1)');
  });

  test('clears the input after adding', () => {
    add('Buy milk');
    expect(input().value).toEqual('');
  });

  test('ignores blank todos', () => {
    add('');
    add('   ');
    expect(items()).toEqual([]);
    expect(heading()).toEqual('Todos (0)');
  });

  test('ignores duplicates regardless of letter case', () => {
    add('Buy milk');
    add('buy MILK');
    expect(items()).toEqual(['Buy milk']);
    expect(heading()).toEqual('Todos (1)');
  });
});
