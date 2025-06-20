<script lang="ts" setup>
import { ref } from 'vue';
import { useStore } from '../store';

const store = useStore();
const taskTitle = ref('');

const onAdd = () => {
  store.dispatch('add', { title: taskTitle });
};
</script>

<template>
  <div>
    <input v-model="taskTitle" />
    <button @click="onAdd">Add</button>
  </div>
</template>

<style lang="scss" scoped></style>
