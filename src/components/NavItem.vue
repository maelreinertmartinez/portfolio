<script setup lang="ts">
defineProps<{
  href?: string
}>()
</script>

<template>
  <a :href="href ? href : '#'" class="text-[#1A1200] text-lg w-fit no-underline relative">
    <slot> Missing content </slot>
  </a>
</template>

<style scoped lang="scss">
a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  display: block;
  width: 0;
  height: 2px;
  background-color: #1a1200;
  transition: width 0.3s ease-in-out;
}

a:hover::after,
a.active::after {
  width: 100%;
}
</style>
