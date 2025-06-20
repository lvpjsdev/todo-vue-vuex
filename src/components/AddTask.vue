<script lang="ts" setup>
import { ref } from 'vue';
import { CirclePlus } from 'lucide-vue-next';
import { useStore } from '../store';
import Button from './ui/Button.vue';

const store = useStore();
const taskTitle = ref('');

const onAdd = () => {
  store.dispatch('add', { title: taskTitle });
};
</script>

<template>
  <div class="wrapper">
    <input v-model="taskTitle" class=".input" />
    <!-- <button @click="onAdd">+</button> -->
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
  gap: 1rem;
}

.input {
  height: 1.1rem;
}
</style>
