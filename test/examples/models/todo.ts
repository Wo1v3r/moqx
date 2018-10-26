import { types } from 'mobx-state-tree';

export type ITodo = typeof Todo.Type;
export const Todo = types
  .model('Todo', {
    category: types.enumeration(['School', 'Work', 'Hobbies']),
    done: types.optional(types.boolean, false),
    dueDate: types.optional(types.Date, () => {
      const today = new Date();
      const tomorrow = (today.setDate(today.getDate() + 1), today);
      return tomorrow;
    }),
    name: types.optional(types.string, 'New Task')
  })
  .actions(todo => ({
    complete: () => (todo.done = true),
    reset: () => (todo.done = false),
    toggle: () => (todo.done = !todo.done)
  }))
  .views(todo => ({
    // get title() {
    //   return `[${todo.category}] ${todo.name}`;
    // },
    get isSlacking() {
      return !todo.done && todo.dueDate.getTime() < new Date().getTime();
    }
  }));
