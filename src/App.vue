<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavMenu from './components/NavMenu.vue'
import CurrentCursor from './components/CurrentCursor.vue'
</script>

<template>
  <div class="main-app flex bg-timberwolf-200 w-full h-screen fixed overflow-hidden text-gray-700">
    <CurrentCursor />
    <NavMenu class="absolute top-8 -right-4" />
    <RouterView />
  </div>
</template>
