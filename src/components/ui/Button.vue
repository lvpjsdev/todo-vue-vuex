<script lang="ts" setup>
interface Props {
  isActive?: boolean;
}

const { isActive = false } = defineProps<Props>();
</script>

<template>
  <button @click="$emit('click')" :class="['button', { active: isActive }]">
    <div class="wrapper">
      <slot name="before"></slot>
      <slot></slot>
      <slot name="after"></slot>
    </div>
  </button>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  gap: 2rem;
}

.button {
  padding: 0.6rem;
}

.active {
  background-color: azure;
  color: black;
}
</style>
