<script setup lang="ts">
import AnimatedText from './AnimatedText.vue'
import Icon from './Icon.vue'

interface Props {
  icon: string
  text: string
  link: string
}

defineProps<Props>()
</script>

<template>
  <a :href="link" class="flex items-center gap-4">
    <Icon :name="icon" :size="44" :stroke-width="1" />
    <AnimatedText class="text-xl">
      {{ text }}
    </AnimatedText>
  </a>
</template>
