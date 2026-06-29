<script setup lang="ts">
import Launcher from './views/LauncherView.vue'
import Cursor from './components/MouseCursor.vue'
import { usePageStore } from './stores/page'
import FPSCounter from './components/FPSCounter.vue'
import MainView from './views/MainView.vue'

const pageStore = usePageStore()
const isDev = import.meta.env.DEV
</script>

<template>
  <div id="app" class="bg-[#FFEFCC] fixed w-screen h-screen">
    <!-- <Launcher v-if="pageStore.name === 'launcher'" ref="launcher" />
    <MainView v-else /> -->
    <MainView />
  </div>
  <Cursor />
  <FPSCounter v-if="isDev" />
</template>
