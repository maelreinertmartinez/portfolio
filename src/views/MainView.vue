<script setup lang="ts">
import { ref, onMounted } from 'vue'
import EdgeBorder from '@/components/EdgeBorder.vue'
import NavItem from '@/components/NavItem.vue'
import { usePageStore } from '@/stores/page'

const pageStore = usePageStore()
const edgeBorder = ref<typeof EdgeBorder | null>(null)

onMounted(() => {
  if (!edgeBorder.value) return
  edgeBorder.value.showBorder()
})
</script>

<template>
  <EdgeBorder ref="edgeBorder" class="absolute top-[50px] right-[-24px]" :animation-duration="0.7">
    <div class="flex flex-col gap-4">
      <NavItem :class="pageStore.name === 'home' ? 'active' : ''" @click="pageStore.name = 'home'"
        >Home</NavItem
      >
      <NavItem
        :class="pageStore.name === 'projects' ? 'active' : ''"
        @click="pageStore.name = 'projects'"
        >Projects</NavItem
      >
      <NavItem
        :class="pageStore.name === 'skills' ? 'active' : ''"
        @click="pageStore.name = 'skills'"
        >Skills</NavItem
      >
    </div>
  </EdgeBorder>
</template>
