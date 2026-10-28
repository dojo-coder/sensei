import { createTodoList } from './todoList';
import { describe, test, expect, beforeEach } from '@jest/globals';

describe('todoList.ts', () => {
  beforeEach(() => {
    document.documentElement.innerHTML = globalThis.htmlContent;
    createTodoList(document.getElementById('app') as HTMLElement);
  });

  test('starts empty', () => {
    expect(document.querySelector('h1').textContent).toEqual('Todos (0)');
    expect(document.querySelectorAll('li')).toHaveLength(0);
  });

  // Add tests until every hidden bug is caught.
});
