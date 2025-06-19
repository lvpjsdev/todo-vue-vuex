<script setup lang="ts">
import { taskApi } from '../api/api';
import TaskItem from './TaskItem.vue';
const tasks = await taskApi.getAll();
</script>

<template>
  <TaskItem v-for="task in tasks" :task="task" :key="task.id" />
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
