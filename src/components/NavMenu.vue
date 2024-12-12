<script setup lang="ts">
import NavMenuItem from './NavMenuItem.vue'
</script>

<template>
  <nav class="item rounded-l-lg p-2">
    <div class="flex flex-col rounded-l-sm bg-timberwolf-200 p-12 gap-4 w-max">
      <NavMenuItem class="w-max text-lg" to="/">About me</NavMenuItem>
      <NavMenuItem class="w-max text-lg" to="/skills">Skills</NavMenuItem>
      <NavMenuItem class="w-max text-lg" to="/projects">Projects</NavMenuItem>
    </div>
  </nav>
</template>

<style scoped>
@property --angle {
  syntax: '<percentage>';
  initial-value: 0%;
  inherits: false;
}

.item {
  background: conic-gradient(
    from 90deg,
    #f97316,
    #f97316 var(--angle),
    transparent var(--angle),
    transparent
  );
  animation: rotate 3s forwards;
}

@keyframes rotate {
  to {
    --angle: 100%;
  }
}
</style>
