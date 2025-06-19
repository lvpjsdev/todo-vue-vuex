<script setup lang="ts">
import { useStore } from '../store/store';
import TaskItem from './TaskItem.vue';
import { computed } from 'vue';

const store = useStore();

const tasks = computed(() => store.getters.filteredTasks);
const isPending = computed(() => store.state.isPending);
</script>

<template>
  <p v-if="isPending">Loading...</p>
  <TaskItem v-else v-for="task in tasks" :task="task" :key="task.id" />
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
