import type { Task } from '../types';

export type DataBase = {
  getAll: () => Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  removeTask: (id: number) => void;
  update: (id: number, payload: Partial<Task>) => void;
};

export type ArgumentTypes<F extends Function> = F extends (
  ...args: infer A
) => any
  ? A
  : never;

export type ReturnTypeAsync<F extends Function> = F extends (
  ...args: any
) => infer R
  ? Promise<R>
  : never;

export type Func = (...args: any[]) => any;
