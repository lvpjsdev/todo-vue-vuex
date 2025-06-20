<script lang="ts" setup>
import { ref } from 'vue';
import { CirclePlus } from 'lucide-vue-next';
import { useStore } from '../store';
import Button from './ui/Button.vue';

const store = useStore();
const taskTitle = ref('');

const onAdd = () => {
  store.dispatch('add', { title: taskTitle.value });
  taskTitle.value = '';
};
</script>

<template>
  <div class="wrapper">
    <input v-model="taskTitle" class="input" @keyup.enter="onAdd" />
    <Button @click="onAdd">
      <template #after>
        <CirclePlus :size="24" />
      </template>
    </Button>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 1280px;
}

.input {
  height: 100%;
  flex-grow: 1;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  box-sizing: border-box;
}
</style>
