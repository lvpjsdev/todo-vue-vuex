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
  <div class="filter"><FilterPick /></div>
  <Error />
</template>

<style scoped>
.filter {
  padding-top: 1rem;
}
</style>
