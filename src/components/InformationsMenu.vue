<script setup lang="ts">
import InformationLink from './InformationLink.vue'
import { Direction } from '@/types/models'
import AnimatedBorder from './AnimatedBorder.vue'

defineProps<{
  position: Direction
}>()
</script>

<template>
  <div>
    <AnimatedBorder :position>
      <div class="p-20 flex gap-16 items-center w-max">
        <div class="flex flex-col gap-6">
          <InformationLink icon="Mail" text="mael@reinertmartinez.fr" link="/" />
          <InformationLink icon="Phone" text="06 37 25 62 22" link="/" />
        </div>
        <div class="flex flex-col gap-6">
          <InformationLink icon="Github" text="maelreinertmartinez" link="/" />
          <InformationLink icon="FileUser" text="Curriculum Vitae" link="/" />
          <InformationLink icon="Linkedin" text="Linkedin" link="/" />
        </div>
      </div>
    </AnimatedBorder>
  </div>
</template>
