<script setup>
import { onMounted } from 'vue';
import HeaderVue from '@/components/header/header.vue';
import FooterVue from '@/components/footer/footer.vue';
import particlesJson from '@/assets/particles/particles.json';
</script>

<template>
  <vue-particles id="tsparticles" :options="particlesJson" />
  <div class="blog flex flex-col w-screen h-screen relative z-10">
    <HeaderVue />
    <div class="content max-h-[--max-h] flex-1 m-5">
      <RouterView />
    </div>
    <FooterVue />
  </div>
</template>

<style>
:root {
  --max-h: calc(100% - 7.25rem);
}
</style>
