import { Router, Request, Response } from 'express';
import * as store from '../data/store';
import { CreateTodoDto, UpdateTodoDto } from '../types/todo';

const router = Router();

// GET /api/todos
router.get('/', (_req: Request, res: Response) => {
  res.json(store.getAll());
});

// POST /api/todos
router.post('/', (req: Request, res: Response) => {
  const { title }: CreateTodoDto = req.body;
  if (!title || title.trim() === '') {
    res.status(400).json({ error: 'El título es obligatorio' });
    return;
  }
  const todo = store.create(title.trim());
  res.status(201).json(todo);
});

// PUT /api/todos/:id
router.put('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const changes: UpdateTodoDto = req.body;
  const updated = store.update(id, changes);
  if (!updated) {
    res.status(404).json({ error: 'Tarea no encontrada' });
    return;
  }
  res.json(updated);
});

// DELETE /api/todos/:id
router.delete('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deleted = store.remove(id);
  if (!deleted) {
    res.status(404).json({ error: 'Tarea no encontrada' });
    return;
  }
  res.status(204).send();
});

export default router;