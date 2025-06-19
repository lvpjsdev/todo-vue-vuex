import { taskDb } from './db';

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any
  ? A
  : never;

type ReturnTypeAsync<F extends Function> = F extends (...args: any) => infer R
  ? Promise<R>
  : never;

type Func = (...args: any[]) => any;

const wrapApiCall = <T extends Function>(func: T, delay = 500) => {
  return (...args: ArgumentTypes<T>) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(func(...args));
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

export const taskApi = wrapAll(taskDb);
