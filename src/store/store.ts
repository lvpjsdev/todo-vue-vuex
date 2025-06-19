import { type InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';
import type { Filter, Task } from '../types';
import { taskApi } from '../api';

export interface State {
  tasks: Task[];
  isPending: boolean;
  filter: Filter;
}

export const storeKey: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    tasks: [],
    isPending: false,
    filter: 'all',
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
    setFilter: (state, filter: Filter) => {
      state.filter = filter;
    },
  },
  actions: {
    togglePending: ({ state, commit }) => {
      commit('setIsPending', !state.isPending);
    },
    get: async ({ commit, dispatch }) => {
      dispatch('togglePending');
      const tasks = await taskApi.getAll();
      commit('updateTasksData', tasks);
      dispatch('togglePending');
    },
    add: async ({ commit, dispatch }, payload: Partial<Task>) => {
      dispatch('togglePending');
      await taskApi.addTask({
        title: payload.title || '',
        completed: payload.completed || false,
      });
      commit('addTask', payload);
      dispatch('togglePending');
    },
    delete: async ({ commit, dispatch }, payload: number) => {
      dispatch('togglePending');
      await taskApi.removeTask(payload);
      commit('addTask', payload);
      dispatch('togglePending');
    },
    update: async (
      { commit, dispatch },
      payload: { id: number; flag: boolean }
    ) => {
      dispatch('togglePending');
      await taskApi.update(payload.id, {
        completed: payload.flag,
      });
      commit('updateTask', {
        taskId: payload.id,
        completeFlag: payload.flag,
      });
      dispatch('togglePending');
    },
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

export function useStore() {
  return baseUseStore(storeKey);
}
