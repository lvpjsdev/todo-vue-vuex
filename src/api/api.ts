import { taskDb } from './db';
import type { ArgumentTypes, Func, ReturnTypeAsync } from './types';

const wrapApiCall = <T extends Function>(func: T, delay = 500) => {
  return (...args: ArgumentTypes<T>) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //Для симуляции ошибки будем кидать дайс, по умолчанию с шансом в 10%
        Math.random() >= Number(import.meta.env.VITE_ERROR_CHANCE ?? 0.1)
          ? resolve(func(...args))
          : reject(new Error('Something goes wrong'));
      }, delay);
    }) as ReturnTypeAsync<T>;
  };
};

function wrapAll<T extends Record<string, Func>>(
  obj: T,
  delay = 500
): { [K in keyof T]: (...args: ArgumentTypes<T[K]>) => ReturnTypeAsync<T[K]> } {
  const wrappedEntries = Object.entries(obj).map(([key, fn]) => {
    const wrapped = wrapApiCall(fn as Func, delay);
    return [key, wrapped];
  });

  return Object.fromEntries(wrappedEntries) as {
    [K in keyof T]: (...args: ArgumentTypes<T[K]>) => ReturnTypeAsync<T[K]>;
  };
}

export const taskApi = wrapAll(taskDb, import.meta.env.VITE_API_DELAY ?? 500);
