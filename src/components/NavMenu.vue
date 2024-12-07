<script setup lang="ts">
import NavMenuItem from './NavMenuItem.vue'
</script>

<template>
  <nav
    class="flex flex-col gap-4 text-gray-600 border-y-8 border-l-8 p-12 rounded-l-xl w-max h-max border-orange-500"
  >
    <NavMenuItem class="w-max" to="/">About me</NavMenuItem>
    <NavMenuItem class="w-max" to="/skills">Skills</NavMenuItem>
    <NavMenuItem class="w-max" to="/projects">Projects</NavMenuItem>
  </nav>
</template>

<style scoped>
nav {
  box-shadow:
    inset 0 0 8px 0 rgba(0, 0, 0, 0.2),
    0 0 8px 0 rgba(0, 0, 0, 0.2);
}
</style>
