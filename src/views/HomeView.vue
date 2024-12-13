<script setup lang="ts">
import InformationsMenu from '@/components/InformationsMenu.vue'
import MainInformations from '@/components/MainInformations.vue'
</script>

<template>
  <div>
    <MainInformations />
    <InformationsMenu class="absolute bottom-24 -left-4" />
    <!--<div class="paragraph text-gray-700">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In finibus nec dolor vitae convallis.
      Cras ultrices hendrerit dolor, eget convallis dolor dictum id. Vivamus placerat mauris nec
      aliquet sagittis. Cras tristique laoreet metus, sit amet maximus odio malesuada in. In
      lobortis mi at augue ullamcorper, at euismod erat facilisis. Pellentesque sagittis
      pellentesque commodo. Integer euismod, magna nec tristique scelerisque, tellus nulla sagittis
      dolor, nec ultrices nulla erat quis nulla. Morbi blandit risus magna. Donec dapibus id justo
      in pharetra. Nunc scelerisque in leo quis ultrices. Ut mauris sapien, luctus non pulvinar
      eget, blandit eu orci. In hac habitasse platea dictumst. Duis eu urna nisl. Donec nec blandit
      orci, eu pellentesque lorem.
    </div>-->
  </div>
</template>

<style scoped>
.paragraph {
  position: fixed;
  height: 96rem;
  width: 900px;
  right: 50px;
  top: 570px;
  font-size: 20px;
  text-align: justify;
}
</style>
