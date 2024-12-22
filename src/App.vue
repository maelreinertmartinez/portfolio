<script setup lang="ts">
// import { ref } from 'vue'
import { RouterView } from 'vue-router'
import NavMenu from './components/NavMenu.vue'
import CurrentCursor from './components/CurrentCursor.vue'
// import AppLauncher from './components/AppLauncher.vue'
import { SpeedInsights } from '@vercel/speed-insights/vue'
import { Analytics } from '@vercel/analytics/nuxt'
import { Direction } from './types/models'

// const isLaunched = ref(false)

// const launchApp = () => {
//   isLaunched.value = true
// }
</script>

<template>
  <div class="main-app bg-timberwolf-200 w-full h-screen fixed overflow-hidden text-gray-700">
    <CurrentCursor />
    <!-- <AppLauncher v-if="!isLaunched" @launch="launchApp" /> -->
    <div class="main-app w-full h-full">
      <NavMenu :position="Direction.Right" class="fixed top-8 -right-2" />
      <RouterView />
    </div>
    <SpeedInsights />
    <Analytics />
  </div>
</template>
