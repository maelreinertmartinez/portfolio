<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav
    class="flex flex-col gap-4 text-gray-600 border-y-8 border-l-8 p-10 rounded-l-xl w-max h-max border-orange-500"
  >
    <RouterLink to="/">About me</RouterLink>
    <RouterLink to="/skills">Skills</RouterLink>
    <RouterLink to="/projects">Projects</RouterLink>
  </nav>
</template>
