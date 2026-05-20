import { useState } from 'react';
import { useTodos } from './hooks/useTodos';
import { TodoList } from './components/TodoList';

export default function App() {
  const { todos, loading, error, addTodo, toggleTodo, deleteTodo } = useTodos();
  const [input, setInput] = useState('');

  const handleAdd = async () => {
    if (input.trim() === '') return;
    await addTodo(input.trim());
    setInput('');
  };

  const done = todos.filter((t) => t.completed).length;

  return (
    <div style={{ maxWidth: 500, margin: '60px auto', fontFamily: 'sans-serif', padding: '0 16px' }}>
      <h1 style={{ fontSize: 28, marginBottom: 4 }}>📝 Mis Tareas</h1>
      <p style={{ color: '#888', marginBottom: 24 }}>
        {done} de {todos.length} completadas
      </p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Nueva tarea..."
          style={{
            flex: 1, padding: '10px 14px', borderRadius: 8,
            border: '1px solid #ddd', fontSize: 15,
          }}
        />
        <button
          onClick={handleAdd}
          style={{
            padding: '10px 20px', borderRadius: 8, border: 'none',
            background: '#378ADD', color: '#fff', cursor: 'pointer', fontSize: 15,
          }}
        >
          Agregar
        </button>
      </div>

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  );
}