<script setup lang="ts">
import TypedTitle from '@/components/TypedTitle.vue'
import { onMounted, ref } from 'vue'

const typedTitle = ref<typeof TypedTitle | null>(null)

onMounted(() => {
  typedTitle.value?.playTypingAnimation()
})
</script>

<template>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <TypedTitle ref="typedTitle" text="WORK IN PROGRESS" />
  </div>
</template>
