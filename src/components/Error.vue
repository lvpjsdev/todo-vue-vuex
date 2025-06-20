<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from '../store';

const store = useStore();
const errorMessage = computed(() => store.state.errMsg);
const onResetError = () => store.dispatch('resetError');
</script>

<template>
  <div v-if="errorMessage" class="error">
    <p>{{ errorMessage }}</p>
    <button @click="onResetError">Ok</button>
  </div>
</template>

<style scoped>
.error {
  border: 2px solid red;
  color: red;
}
</style>
