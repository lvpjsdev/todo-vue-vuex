<script setup lang="ts">
import { ref } from 'vue';
import { type Filter } from '../types';
import { useStore } from '../store';

const store = useStore();
const filter = ref<Filter>('all');

const onChange = () => {
  store.commit('setFilter', filter);
};
</script>

<template>
  <input
    id="all"
    v-model="filter"
    type="radio"
    value="all"
    @change="onChange"
  />
  <label for="all">All</label>

  <input
    id="done"
    v-model="filter"
    type="radio"
    value="done"
    @change="onChange"
  />
  <label for="done">Done</label>

  <input
    id="undone"
    v-model="filter"
    type="radio"
    value="undone"
    @change="onChange"
  />
  <label for="undone">Undone</label>
</template>
