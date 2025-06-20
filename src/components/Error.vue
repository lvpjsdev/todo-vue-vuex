<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from '../store';

const store = useStore();
const errorMessage = computed(() => store.state.errMsg);
const onResetError = () => store.dispatch('resetError');
</script>

<template>
  <div v-if="errorMessage" class="overlay">
    <div class="error">
      <p>{{ errorMessage }}</p>
      <button @click="onResetError">Ok</button>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.error {
  border: 2px solid red;
  color: red;
  background-color: black;
  padding: 2rem;
}
</style>
