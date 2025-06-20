<script setup lang="ts">
import { computed, ref } from 'vue';
import { type Filter } from '../types';
import { useStore } from '../store';
import Button from './ui/Button.vue';

const store = useStore();
const filter = computed(() => store.state.filter);

const onChange = (value: Filter) => {
  store.commit('setFilter', value);
};
</script>

<template>
  <div class="wrapper">
    <Button :is-active="filter === 'all'" @click="onChange('all')">All</Button>
    <Button :is-active="filter === 'done'" @click="onChange('done')"
      >Done</Button
    >
    <Button :is-active="filter === 'undone'" @click="onChange('undone')"
      >Undone</Button
    >
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
</style>
