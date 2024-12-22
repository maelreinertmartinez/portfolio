<script setup lang="ts">
import AnimatedText from './AnimatedText.vue'
import AnimatedIcon from './AnimatedIcon.vue'

interface Props {
  icon: string
  text: string
  link: string
}

defineProps<Props>()
</script>

<template>
  <a :href="link">
    <div class="flex items-center gap-4">
      <AnimatedIcon :name="icon" :size="42" color="#374151" />
      <AnimatedText class="text-xl">
        {{ text }}
      </AnimatedText>
    </div>
  </a>
</template>
