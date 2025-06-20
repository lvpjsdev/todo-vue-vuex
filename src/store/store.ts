import { type InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';
import type { Filter, Task } from '../types';
import { taskApi } from '../api';
import { withErrorHandling, withPending } from './utils';
import type { State } from './types';

export const storeKey: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    tasks: [],
    isPending: false,
    filter: 'all',
    errMsg: '',
  },
  //так как мы точно знаем что должно происходить, мы можем обновлять наш стор оптиместично
  mutations: {
    updateTasksData: (state, tasks: Task[]) => {
      state.tasks = [...tasks];
    },
    addTask: (state, task: Task) => {
      state.tasks.push(task);
    },
    deleteTask: (state, taskId: number) => {
      state.tasks = [...state.tasks.filter(({ id }) => id !== taskId)];
    },
    updateTask: (
      state,
      { taskId, completeFlag }: { taskId: number; completeFlag: boolean }
    ) => {
      const index = state.tasks.findIndex(({ id }) => taskId === id);
      state.tasks[index].completed = completeFlag;
    },
    setIsPending: (state, flag: boolean) => {
      state.isPending = flag;
    },
    setFilter: (state, filter: Filter) => {
      state.filter = filter;
    },
    setErrMsg: (state, message: string) => {
      state.errMsg = message;
    },
  },
  actions: {
    togglePending: ({ state, commit }) => {
      commit('setIsPending', !state.isPending);
    },
    get: withPending(
      withErrorHandling(async ({ commit }) => {
        const tasks = await taskApi.getAll();
        commit('updateTasksData', tasks);
      })
    ),
    //здесь и далее мы сначала оптимистично обновляем стор, а потом уже обращаемся к апи
    //если вдруг что пойдет не так, откатим стейт к прежнему состоянию и покажем ошибку
    //для этого используем withErrorHandling
    add: withErrorHandling(async ({ commit }, payload: Partial<Task>) => {
      commit('addTask', payload);
      await taskApi.addTask({
        title: payload.title || '',
        completed: payload.completed || false,
      });
    }),
    delete: withErrorHandling(async ({ commit }, payload: number) => {
      commit('deleteTask', payload);
      await taskApi.removeTask(payload);
    }),
    update: withErrorHandling(
      async ({ commit }, payload: { id: number; flag: boolean }) => {
        commit('updateTask', {
          taskId: payload.id,
          completeFlag: payload.flag,
        });
        await taskApi.update(payload.id, {
          completed: payload.flag,
        });
      }
    ),
    resetError: withErrorHandling(async ({ commit, dispatch }) => {
      commit('setErrMsg', '');
      await dispatch('get');
    }),
  },
  getters: {
    allTasks: (state) => state.tasks,
    filteredTasks: (state) => {
      const filter = state.filter;

      switch (filter) {
        case 'undone':
          return state.tasks.filter(({ completed }) => !completed);
        case 'done':
          return state.tasks.filter(({ completed }) => !!completed);
        default:
          return state.tasks;
      }
    },
  },
});

export const useStore = () => {
  return baseUseStore(storeKey);
};
