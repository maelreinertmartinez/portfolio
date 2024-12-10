<script setup lang="ts">
import NavMenuItem from './NavMenuItem.vue'
</script>

<template>
  <nav class="item rounded-l-lg w-44 h-48 flex justify-center items-center">
    <div class="container rounded-l-sm bg-timberwolf-200 flex justify-center items-center">
      <div class="flex flex-col gap-4 w-max">
        <NavMenuItem class="w-max" to="/">About me</NavMenuItem>
        <NavMenuItem class="w-max" to="/skills">Skills</NavMenuItem>
        <NavMenuItem class="w-max" to="/projects">Projects</NavMenuItem>
      </div>
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
    from 135deg,
    #f97316,
    #f97316 var(--angle),
    transparent var(--angle),
    transparent
  );
  animation: rotate 1.5s forwards;
}

.container {
  width: calc(100% - 16px);
  height: calc(100% - 16px);
}

@keyframes rotate {
  to {
    --angle: 75%;
  }
}
</style>
