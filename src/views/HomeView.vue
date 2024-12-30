<script setup lang="ts">
import InformationsMenu from '@/components/InformationsMenu.vue'
import MainInformations from '@/components/MainInformations.vue'
import TextParagraph from '@/components/TextParagraph.vue'
import { Direction } from '@/types/models'
</script>

<template>
  <div>
    <MainInformations />
    <div class="absolute bottom-24 -left-2 w-[calc(100%+1rem)] flex items-center">
      <InformationsMenu :position="Direction.Left" class="w-min" />
      <TextParagraph class="w-full mx-10">
        <p>
          Je suis un développeur web fullstack spécialisé dans le front-end et le back-end. J'ai
          développé des applications web et des sites web dynamiques avec React, Next.js et Node.js.
          J'ai également travaillé sur des projets de développement d'interface utilisateur avec
          Vue.js et Tailwind CSS.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam corrupti, ipsa suscipit
          maiores molestiae exercitationem nam voluptas provident et unde labore, at repellendus.
          Officiis, ipsa repellat est ea corrupti ducimus! Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Error deserunt eius laboriosam ut ipsa reiciendis qui vitae harum
          nesciunt beatae nulla impedit porro saepe at fugiat, dolorum sunt. Debitis, corporis.
        </p>
      </TextParagraph>
    </div>
  </div>
</template>
