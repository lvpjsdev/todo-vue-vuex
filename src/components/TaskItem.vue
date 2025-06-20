<script setup lang="ts">
import { ref } from 'vue';
import { X as XIcon } from 'lucide-vue-next';
import { type Task } from '../types';
import { useStore } from '../store';
import Button from './ui/Button.vue';
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
    <Button @click="onDelete">
      <template #after><XIcon /></template>
    </Button>
  </div>
</template>

<style scoped>
.complete {
  text-decoration: line-through;
  color: red;
}

.wrapper {
  display: flex;
  align-items: center;
}
</style>
