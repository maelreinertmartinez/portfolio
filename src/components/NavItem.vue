<script setup lang="ts">
import { ref } from 'vue'
import TypedText from './TypedText.vue'

defineProps<{
  href?: string
  text: string
}>()

const typedText = ref<typeof TypedText | null>(null)

defineExpose({
  /**
   * Run the appear animation
   * @returns The timeline
   */
  appear: (): gsap.core.Timeline => typedText.value?.appear(),
  /**
   * Run the disappear animation
   * @returns The timeline
   */
  disappear: (): gsap.core.Timeline => typedText.value?.disappear(),
})
</script>

<template>
  <a :href="href ? href : '#'" class="text-[#1A1200] w-fit no-underline relative">
    <TypedText ref="typedText" :text="text" :font-size="18" />
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
