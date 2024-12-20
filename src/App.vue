<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import NavMenu from './components/NavMenu.vue'
import CurrentCursor from './components/CurrentCursor.vue'
import AppLauncher from './components/AppLauncher.vue'
import { SpeedInsights } from '@vercel/speed-insights/next'

const isLaunched = ref(false)

const launchApp = () => {
  isLaunched.value = true
}
</script>

<template>
  <div class="main-app bg-timberwolf-200 w-full h-screen fixed overflow-hidden text-gray-700">
    <CurrentCursor />
    <AppLauncher v-if="!isLaunched" @launch="launchApp" />
    <div class="main-app w-full h-full" v-else>
      <NavMenu class="absolute top-8 -right-4" />
      <RouterView />
    </div>
    <SpeedInsights />
  </div>
</template>
