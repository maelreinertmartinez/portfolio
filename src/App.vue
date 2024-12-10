<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavMenu from './components/NavMenu.vue'
</script>

<template>
  <div class="flex bg-timberwolf-200 w-full h-screen relative overflow-hidden">
    <NavMenu class="absolute top-8 -right-4" />
    <RouterView />
  </div>
</template>
