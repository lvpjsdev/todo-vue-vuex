<script setup lang="ts">
import { ref } from 'vue';
import { type Task } from '../types';
import { useStore } from '../store';
interface Props {
  task: Task;
}

const store = useStore();
const { task } = defineProps<Props>();
const isComplete = ref(task.completed);

const onCompleteChange = () => {
  store.dispatch('update', { id: task.id, flag: !isComplete.value });
};

const onDelete = () => {
  store.dispatch('delete', task.id);
};
</script>

<template>
  <div class="wrapper">
    <input type="checkbox" v-model="isComplete" @click="onCompleteChange" />
    <p :class="{ complete: isComplete }">{{ task.title }}</p>
    <button @click="onDelete">Delete</button>
  </div>
</template>

<style scoped>
.complete {
  text-decoration: line-through;
  color: red;
}

.wrapper {
  display: flex;
}
</style>
