<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AnimatedText from './AnimatedText.vue'

defineProps<{
  to: string
}>()
</script>

<template>
  <RouterLink class="link relative" :to="to">
    <AnimatedText>
      <slot />
    </AnimatedText>
  </RouterLink>
</template>

<style>
.router-link-active .text::after,
.link:hover .text::after {
  width: 100%;
}
</style>
