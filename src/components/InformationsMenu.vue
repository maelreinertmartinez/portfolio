<script setup lang="ts">
import { ICONS } from '@/constants'
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
      <div class="rounded-r-sm p-20 flex gap-16 items-center w-max">
        <div class="flex flex-col gap-6">
          <InformationLink :icon="ICONS.Mail" text="mael@reinertmartinez.fr" link="/" />
          <InformationLink :icon="ICONS.Phone" text="06 37 25 62 22" link="/" />
        </div>
        <div class="flex flex-col gap-6">
          <InformationLink :icon="ICONS.Github" text="maelreinertmartinez" link="/" />
          <InformationLink :icon="ICONS.FileUser" text="Curriculum Vitae" link="/" />
          <InformationLink :icon="ICONS.Linkedin" text="Linkedin" link="/" />
        </div>
      </div>
    </AnimatedBorder>
  </div>
</template>
