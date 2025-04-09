<script setup>
import HeaderVue from '@/components/header/header.vue';
import FooterVue from '@/components/footer/footer.vue';
</script>

<template>
  <div class="blog flex-col">
    <HeaderVue></HeaderVue>
    <div class="content">
      <router-view />
    </div>
    <FooterVue></FooterVue>
  </div>
</template>

<style lang="less" scoped></style>
