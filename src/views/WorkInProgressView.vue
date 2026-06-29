<script setup lang="ts">
import TypedText from '@/components/TypedText.vue'
import { onMounted, ref } from 'vue'

const typedTitle = ref<InstanceType<typeof TypedText> | null>(null)

onMounted(() => {
  typedTitle.value?.appear()
})
</script>

<template>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <TypedText
      ref="typedTitle"
      text="WORK IN PROGRESS"
      :charWritingSpeed="0.1"
    />
  </div>
</template>
