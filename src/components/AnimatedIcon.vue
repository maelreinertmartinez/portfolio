<script setup lang="ts">
defineProps<{
  icon: string
  size?: string
  color?: string
  strokeWidth?: number
  defaultClass?: string
}>()
</script>

<template>
  <div
    class="icon"
    :style="{
      '--color': color,
      '--icon': `url(${icon})`,
      '--size': size,
    }"
  />
</template>

<style scoped>
@property --angle {
  syntax: '<percentage>';
  initial-value: 0%;
  inherits: false;
}

.icon {
  width: var(--size);
  height: var(--size);
  mask-image: var(--icon);
  mask-size: contain;

  background: conic-gradient(
    from 180deg,
    var(--color),
    var(--color) var(--angle),
    transparent var(--angle),
    transparent
  );

  animation: rotate 1.5s forwards;
}

@keyframes rotate {
  to {
    --angle: 100%;
  }
}
</style>
