import { type Task } from '../types';

export type DataBase = {
  getAll: () => Task[];
  addTask: (task: Task) => void;
  removeTask: (id: number) => void;
  update: (id: number, payload: Partial<Task>) => void;
};

const tasks: Task[] = [
  {
    id: 1,
    title: 'Task 1',
    completed: false,
  },
  {
    id: 2,
    title: 'Task 3',
    completed: false,
  },
  {
    id: 3,
    title: 'Task 4',
    completed: true,
  },
];

export const taskDb: DataBase = {
  getAll: () => tasks,
  addTask: (task) => {
    tasks.push(task);
  },
  removeTask: (taskId) => {
    const index = tasks.findIndex(({ id }) => id === taskId);
    const beforeArr = tasks.slice(1, index);
    const afterArr = tasks.slice(index);

    return [...beforeArr, ...afterArr];
  },
  update: (id, payload) => {
    const task = tasks.find(({ id: taskId }) => taskId === id);
    if (task) {
      task.title = payload.title || task.title;
      task.completed = payload.completed || task.completed;
    }
  },
};
