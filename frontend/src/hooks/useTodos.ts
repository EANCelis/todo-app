import { useState, useEffect } from 'react';
import type { Todo } from '../types/todo';

const API = 'http://localhost:3001/api/todos';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(API)
      .then((r) => r.json())
      .then(setTodos)
      .catch(() => setError('No se pudo conectar al servidor'))
      .finally(() => setLoading(false));
  }, []);

  const addTodo = async (title: string) => {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    const newTodo: Todo = await res.json();
    setTodos((prev) => [...prev, newTodo]);
  };

  const toggleTodo = async (id: number, completed: boolean) => {
    const res = await fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed }),
    });
    const updated: Todo = await res.json();
    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const deleteTodo = async (id: number) => {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return { todos, loading, error, addTodo, toggleTodo, deleteTodo };
}