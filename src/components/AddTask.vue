<template>
  <div>
    <input v-model="taskTitle" />
    <button @click="onAdd">Add</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useStore } from '../store/store';

const store = useStore();
const taskTitle = ref('');

const onAdd = () => {
  store.dispatch('add', { title: taskTitle });
};
</script>

<style lang="scss" scoped></style>
