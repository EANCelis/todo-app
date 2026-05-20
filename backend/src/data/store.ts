import { Todo } from '../types/todo';

let todos: Todo[] = [
  {
    id: 1,
    title: 'Aprender TypeScript',
    completed: false,
    createdAt: new Date(),
  },
  {
    id: 2,
    title: 'Hacer este proyecto',
    completed: true,
    createdAt: new Date(),
  },
];

let nextId = 3;

export const getAll = (): Todo[] => todos;

export const getById = (id: number): Todo | undefined =>
  todos.find((t) => t.id === id);

export const create = (title: string): Todo => {
  const todo: Todo = {
    id: nextId++,
    title,
    completed: false,
    createdAt: new Date(),
  };
  todos.push(todo);
  return todo;
};

export const update = (id: number, changes: Partial<Todo>): Todo | null => {
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) return null;
  todos[index] = { ...todos[index], ...changes };
  return todos[index];
};

export const remove = (id: number): boolean => {
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) return false;
  todos.splice(index, 1);
  return true;
};