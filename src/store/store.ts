import { type InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';
import type { Filter, Task } from '../types';
import { taskApi } from '../api';

export interface State {
  tasks: Task[];
  isPending: boolean;
}

export const storeKey: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    tasks: [],
    isPending: false,
  },
  mutations: {
    updateTasksData: (state, tasks: Task[]) => {
      state.tasks = [...tasks];
    },
    addTask: (state, task: Task) => {
      state.tasks.push(task);
    },
    deleteTask: (state, taskId: number) => {
      state.tasks = [...state.tasks.filter(({ id }) => id === taskId)];
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
  },
  actions: {
    get: async ({ commit }) => {
      const tasks = await taskApi.getAll();
      commit('updateTasksData', tasks);
    },
    add: async ({ commit, dispatch }, payload: Task) => {
      dispatch('setIsPending', true);
      await taskApi.addTask(payload);
      commit('addTask', payload);
      dispatch('setIsPending', false);
    },
    delete: async ({ commit, dispatch }, payload: number) => {
      dispatch('setIsPending', true);
      await taskApi.removeTask(payload);
      commit('addTask', payload);
      dispatch('setIsPending', false);
    },
    update: async (
      { commit, dispatch },
      payload: { id: number; flag: boolean }
    ) => {
      dispatch('setIsPending', true);
      await taskApi.update(payload.id, {
        completed: payload.flag,
      });
      commit('updateTask', {
        taskId: payload.id,
        completeFlag: payload.flag,
      });
      dispatch('setIsPending', false);
    },
  },
  getters: {
    allTasks: (state) => state.tasks,
    filterTasks: (state) => (filter: Filter) => {
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

export function useStore() {
  return baseUseStore(storeKey);
}
