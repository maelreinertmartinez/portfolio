<template>
  <div class="text relative text-justify text-lg">
    <slot />
  </div>
</template>

<style scoped>
.text::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: #374151;
  animation: typing 2s forwards 1s;
}

.text {
  color: transparent;
  animation: appear 2s forwards 1s;
}

@keyframes typing {
  0% {
    left: 0;
    right: 100%;
  }
  50% {
    left: 0;
    right: 0;
  }
  100% {
    left: 100%;
    right: 0;
  }
}

@keyframes appear {
  0% {
    color: transparent;
  }
  50% {
    color: transparent;
  }
  51% {
    color: #374151;
  }
  100% {
    color: #374151;
  }
}
</style>
