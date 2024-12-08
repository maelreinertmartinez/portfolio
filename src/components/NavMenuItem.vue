<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  to: string
}>()
</script>

<template>
  <RouterLink class="link relative" :to="to">
    <div
      class="text relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gray-600 after:transition-all after:duration-300 after:ease-in-out"
    >
      <slot />
    </div>
    <div class="cursor"></div>
  </RouterLink>
</template>

<style scoped>
.router-link-active > .text::after,
.link:hover > .text::after {
  width: 100%;
}

.link {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.text {
  position: relative;
  white-space: nowrap;
  animation: typing 1.5s forwards;
}

.cursor {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  width: 1px;
  background: #4b5563;
  animation: cursor 1.5s forwards;
}

@keyframes typing {
  0%,
  20% {
    clip-path: inset(0 100% 0 0);
  }
  80%,
  100% {
    clip-path: inset(0 0 0 0);
  }
}

@keyframes cursor {
  0% {
    height: 0px;
    left: 0;
  }
  20% {
    height: 20px;
    left: 0;
  }
  85% {
    height: 20px;
    left: calc(100% + 3px);
  }
  100% {
    height: 0px;
    left: calc(100% + 5px);
  }
}
</style>
