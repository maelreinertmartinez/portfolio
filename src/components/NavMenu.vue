<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav
    class="flex flex-col gap-4 text-gray-600 border-y-8 border-l-8 p-12 rounded-l-xl w-max h-max border-orange-500"
  >
    <RouterLink class="link w-max" to="/">About me</RouterLink>
    <RouterLink class="link w-max" to="/skills">Skills</RouterLink>
    <RouterLink class="link w-max" to="/projects">Projects</RouterLink>
  </nav>
</template>

<style scoped>
nav {
  box-shadow:
    inset 0 0 8px 0 rgba(0, 0, 0, 0.2),
    0 0 8px 0 rgba(0, 0, 0, 0.2);
}

.link {
  position: relative;
}

.link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background-color: #4b5563;
  transition: width 0.3s ease-in-out;
}

.router-link-active::after,
.link:hover::after {
  width: 100%;
}
</style>
