<script setup lang="ts">
import { RouterView } from 'vue-router'
// import NavMenu from './components/NavMenu.vue'
</script>

<template>
  <!-- <div class="flex bg-timberwolf-200 w-full h-screen fixed overflow-hidden text-gray-700">
    <NavMenu class="absolute top-8 -right-4" />
    <RouterView />
  </div> -->
  <div class="bg-timberwolf-200 w-full h-screen fixed text-gray-700">
    <RouterView />
  </div>
</template>
