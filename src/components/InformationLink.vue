<script setup lang="ts">
import Icon from './Icon.vue'

interface Props {
  icon: string
  text: string
  link: string
}

defineProps<Props>()
</script>

<template>
  <RouterLink :to="link" class="flex items-center gap-4">
    <Icon :name="icon" :size="42" :stroke-width="1" />
    <span class="text-xl">{{ text }}</span>
  </RouterLink>
</template>
