import * as z from 'zod';

export const Todo = z.object({
  id: z.number(),
  content: z.string().min(1),
  done: z.boolean(),
});

export type Todo = z.infer<typeof Todo>;


export const TodoWithoutId = Todo.omit({ id: true });

export type TodoWithoutId = z.infer<typeof TodoWithoutId>;