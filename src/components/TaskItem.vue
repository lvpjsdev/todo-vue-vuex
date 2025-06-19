<script setup lang="ts">
import { reactive } from 'vue';
import { type Task } from '../types';
interface Props {
  task: Task;
}

const { task } = defineProps<Props>();

const completed = reactive({
  complete: task.completed,
});
</script>

<template>
  <p :class="completed">{{ task.title }}</p>
</template>

<style scoped>
.complete {
  text-decoration: line-through;
  color: red;
}
</style>
