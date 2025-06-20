<script setup lang="ts">
import { computed } from 'vue';
import { X as XIcon } from 'lucide-vue-next';
import { Square } from 'lucide-vue-next';
import { SquareCheckBig } from 'lucide-vue-next';
import { type Task } from '../types';
import { useStore } from '../store';
import Button from './ui/Button.vue';
interface Props {
  task: Task;
}

const store = useStore();
const { task } = defineProps<Props>();
const isComplete = computed(() => task.completed);

const onCompleteChange = () => {
  store.dispatch('update', { id: task.id, flag: !isComplete.value });
};

const onDelete = () => {
  store.dispatch('delete', task.id);
};
</script>

<template>
  <div class="wrapper">
    <SquareCheckBig
      v-if="isComplete"
      @click="onCompleteChange"
      class="clickable"
    />
    <Square v-if="!isComplete" @click="onCompleteChange" class="clickable" />
    <p :class="['text', { complete: isComplete }]">{{ task.title }}</p>
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
  gap: 1rem;
}

.text {
  font-size: 1.25rem;
  padding: 0;
}

.clickable {
  cursor: pointer;
}
</style>
