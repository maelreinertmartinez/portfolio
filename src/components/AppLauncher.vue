<template>
  <div class="flex justify-center items-center h-full">
    <button class="text-3xl font-bold tracking-wider p-4 rounded-lg" @click="$emit('launch')">
      LAUNCH
    </button>
  </div>
</template>

<style scoped>
button {
  border: 8px solid #f97316;
}
</style>
