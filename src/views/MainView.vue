<script setup lang="ts">
import { ref, onMounted } from 'vue'
import EdgeBorder from '@/components/EdgeBorder.vue'
import NavItem from '@/components/NavItem.vue'
import { usePageStore } from '@/stores/page'

const pageStore = usePageStore()
const edgeBorder = ref<typeof EdgeBorder | null>(null)
const homeNavItem = ref<typeof NavItem | null>(null)
const projectsNavItem = ref<typeof NavItem | null>(null)
const skillsNavItem = ref<typeof NavItem | null>(null)

onMounted(() => {
  if (!edgeBorder.value) return
  homeNavItem.value?.appear()
  projectsNavItem.value?.appear()
  skillsNavItem.value?.appear()
  setTimeout(() => {
    edgeBorder.value?.showBorder()
  }, 1000)
})
</script>

<template>
  <EdgeBorder ref="edgeBorder" class="absolute -right-[24px] top-[50px]" :animation-duration="0.7">
    <!-- -right-[24px] -->
    <div class="flex flex-col gap-4 overflow-visible">
      <NavItem
        ref="homeNavItem"
        text="Home"
        :class="pageStore.name === 'home' ? 'active' : ''"
        @click="pageStore.name = 'home'"
      />
      <NavItem
        ref="projectsNavItem"
        text="Projects"
        :class="pageStore.name === 'projects' ? 'active' : ''"
        @click="pageStore.name = 'projects'"
      />
      <NavItem
        ref="skillsNavItem"
        text="Skills"
        :class="pageStore.name === 'skills' ? 'active' : ''"
        @click="pageStore.name = 'skills'"
      />
    </div>
  </EdgeBorder>
</template>
