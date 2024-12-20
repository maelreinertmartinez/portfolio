<template>
  <div class="main-informations left-8">
    <div class="w-80 h-96 bg-timberwolf-300"></div>
    <h1 class="absolute top-2 w-min text-9xl font-extrabold text-gray-700">
      Maël REINERT MARTINEZ
    </h1>
  </div>
</template>

<style scoped>
.main-informations {
  position: relative;
  width: fit-content;
  top: -24rem;
  animation: descente 1.5s forwards;
}

.main-informations h1 {
  z-index: -1;
  left: -101%;
  clip-path: inset(0 0 0 calc(101% - 1rem));
  animation: typing 2s forwards 1.5s;
}

@keyframes descente {
  0% {
    top: -24rem;
  }
  100% {
    top: 0;
  }
}

@keyframes typing {
  0% {
    left: -101%;
    clip-path: inset(0 0 0 calc(101% - 1rem));
  }
  100% {
    left: 21rem;
    clip-path: inset(0 0 0 -1rem);
  }
}
</style>
