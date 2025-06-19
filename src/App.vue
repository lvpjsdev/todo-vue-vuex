<script setup lang="ts">
import AddTask from './components/AddTask.vue';
import Error from './components/Error.vue';
import FilterPick from './components/FilterPick.vue';
import TasksList from './components/TasksList.vue';
import { useStore } from './store/store';

const store = useStore();
store.dispatch('get');
</script>

<template>
  <AddTask />
  <TasksList />
  <FilterPick />
  <Error />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
