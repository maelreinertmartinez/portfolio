<script setup lang="ts">
import Launcher from './views/LauncherView.vue'
import Cursor from './components/MouseCursor.vue'
import { usePageStore } from './stores/page'
import FPSCounter from './components/FPSCounter.vue'
import MainView from './views/MainView.vue'

const pageStore = usePageStore()
</script>

<template>
  <div id="app" class="bg-[#FFEFCC] fixed w-screen h-screen">
    <!-- <Launcher v-if="pageStore.name === 'launcher'" ref="launcher" />
    <MainView v-else /> -->
    <MainView />
  </div>
  <Cursor />
  <FPSCounter />
  <!-- <Palette class="fixed bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-[100px]" /> -->
</template>
