import { mock } from '../../src';
import { ITodo, Todo } from './models';

class TodoItem {
  constructor(private todo: ITodo) {}

  public completeIfNotDone() {
    if (!this.todo.done) {
      this.todo.complete();
    }
    return `You've ${this.todo.done ? 'Already ' : ''}completed ${
      this.todo.name
    }`;
  }

  public toggle() {
    return this.todo.toggle();
  }
}

describe('TodoItem', () => {
  it('toggles completion', () => {
    const todo = mock(Todo);
    const todoItem = new TodoItem(todo);
    todoItem.toggle();

    expect(todo.toggle).toHaveBeenCalled();
  });

  it('returns already completed message', () => {
    const todo = mock(Todo, { done: true });
    const todoItem = new TodoItem(todo);

    expect(todoItem.completeIfNotDone()).toEqual(
      `You've Already completed ${todo.name}`
    );
  });

  it('returns completed message', () => {
    const todo = mock(Todo, { done: false });
    const todoItem = new TodoItem(todo);

    expect(todoItem.completeIfNotDone()).toEqual(
      `You've completed ${todo.name}`
    );
  });
});
