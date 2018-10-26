import { mock } from '../../src';
import { ITodo, Todo } from './models';

const inspiringQuote =
  '"Nothing is impossible, the word itself says “I\'m Possible”"';

const intimidatingQuote =
  '"When your life flashes before your eyes, make sure you’ve got plenty to watch."';

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

  get quoteOfTheDay() {
    return this.todo.isSlacking ? intimidatingQuote : inspiringQuote;
  }

  get display() {
    return this.todo.title;
  }
}

describe('TodoItem', () => {
  it('toggles completion', () => {
    const todo = mock(Todo);
    const todoItem = new TodoItem(todo);
    todoItem.toggle();

    expect(todo.toggle).toHaveBeenCalled();
  });

  describe('patching properties', () => {
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

  describe('patching views', () => {
    it('returns an inspiring quote', () => {
      const todo = mock(Todo, { isSlacking: false });
      const todoItem = new TodoItem(todo);

      expect(todoItem.quoteOfTheDay).toEqual(inspiringQuote);
    });

    it('returns an indimiating quote', () => {
      const todo = mock(Todo, { isSlacking: true });
      const todoItem = new TodoItem(todo);

      expect(todoItem.quoteOfTheDay).toEqual(intimidatingQuote);
    });
  });

  // FIXME: might not need this "feature"
  describe('patching properties to views', () => {
    it('returns formatted title', () => {
      const todo = mock(Todo, { category: 'Hobbies', name: 'Find one' });
      const todoItem = new TodoItem(todo);

      expect(todoItem.display).toEqual(`[Hobbies] Find one`);
    });
  });
});
