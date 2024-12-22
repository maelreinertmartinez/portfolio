<script setup lang="ts">
import AnimatedBorder from './AnimatedBorder.vue'
import NavMenuItem from './NavMenuItem.vue'
import { Direction } from '../types/models'

defineProps<{
  position: Direction
}>()
</script>

<template>
  <div>
    <AnimatedBorder :position>
      <div class="flex flex-col rounded-l-sm p-12 gap-4 w-max">
        <NavMenuItem class="w-max text-lg" to="/">About me</NavMenuItem>
        <NavMenuItem class="w-max text-lg" to="/skills">Skills</NavMenuItem>
        <NavMenuItem class="w-max text-lg" to="/projects">Projects</NavMenuItem>
      </div>
    </AnimatedBorder>
  </div>
</template>
