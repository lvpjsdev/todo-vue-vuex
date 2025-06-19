import { type Task } from '../types';

export type DataBase = {
  getAll: () => Task[];
  addTask: (task: Task) => void;
  removeTask: (id: number) => void;
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
  removeTask: (taskId: number) => {
    const index = tasks.findIndex(({ id }) => id === taskId);
    const beforeArr = tasks.slice(1, index);
    const afterArr = tasks.slice(index);

    return [...beforeArr, ...afterArr];
  },
};
