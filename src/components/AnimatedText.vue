<script setup lang="ts">
defineProps<{
  isDisappearing?: boolean
}>()
</script>

<template>
  <div :class="['relative', { disappear: isDisappearing }]">
    <div
      class="text relative whitespace-nowrap after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gray-600 after:transition-all after:duration-300 after:ease-in-out"
    >
      <slot />
    </div>
    <div class="cursor absolute top-1/2 -translate-y-1/2 left-0 w-px bg-gray-600"></div>
  </div>
</template>

<style scoped>
.text {
  animation: typing 1.5s forwards;
}

.cursor {
  animation: cursor 1.5s forwards;
}

.disappear .text {
  animation: typing-reverse 1.5s forwards !important;
}

.disappear .cursor {
  animation: cursor-reverse 1.5s forwards !important;
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
    left: calc(100% + 3px);
  }
}

@keyframes typing-reverse {
  0%,
  20% {
    clip-path: inset(0 0 0 0);
  }
  80%,
  100% {
    clip-path: inset(0 100% 0 0);
  }
}

@keyframes cursor-reverse {
  0% {
    height: 0px;
    left: calc(100% + 3px);
  }
  20% {
    height: 20px;
    left: calc(100% + 3px);
  }
  85% {
    height: 20px;
    left: 0;
  }
  100% {
    height: 0px;
    left: 0;
  }
}
</style>
