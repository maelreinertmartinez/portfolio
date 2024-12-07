<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  to: string
}>()
</script>

<template>
  <RouterLink
    class="link relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gray-600 after:transition-all after:duration-300 after:ease-in-out"
    :to="to"
  >
    <slot />
  </RouterLink>
</template>

<style scoped>
.router-link-active::after,
.link:hover::after {
  width: 100%;
}
</style>
