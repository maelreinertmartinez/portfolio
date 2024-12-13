<script setup lang="ts">
import { ICONS } from '@/constants'
import InformationLink from './InformationLink.vue'
</script>

<template>
  <div class="item rounded-r-lg p-2">
    <div class="rounded-r-sm bg-timberwolf-200 p-20 flex gap-16 items-center w-max">
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
  </div>
</template>

<style scoped>
@property --angle {
  syntax: '<percentage>';
  initial-value: 0%;
  inherits: false;
}

.item {
  background: conic-gradient(
    from 270deg,
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
