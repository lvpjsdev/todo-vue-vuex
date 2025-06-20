import type { ActionContext } from 'vuex';
import type { State } from './types';

export const withPending = <
  T extends (
    context: ActionContext<State, State>,
    ...args: any[]
  ) => Promise<any>
>(
  func: T
) => {
  return async (context: ActionContext<State, State>, ...args: any[]) => {
    context.dispatch('togglePending');
    try {
      await func(context, ...args);
    } finally {
      context.dispatch('togglePending');
    }
  };
};

export const withErrorHandling = <
  T extends (
    context: ActionContext<State, State>,
    ...args: any[]
  ) => Promise<any>
>(
  func: T
) => {
  return async (context: ActionContext<State, State>, ...args: any[]) => {
    const oldTasks = context.state.tasks.slice();
    try {
      await func(context, ...args);
    } catch (error) {
      context.commit('updateTasksData', oldTasks);
      context.commit('setErrMsg', (error as Error).message);
    }
  };
};
