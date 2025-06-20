<script lang="ts" setup></script>

<template>
  <div aria-label="button" @click="$emit('click')">
    <slot name="before"></slot>
    <slot></slot>
    <slot name="after"></slot>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  gap: 2rem;
}
</style>
