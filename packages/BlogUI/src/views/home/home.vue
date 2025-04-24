<template>
  <div class="home w-full h-full flex bg-white bg-opacity-50">
    <div class="w-full h-full flex-[3] px-4 overflow-y-auto">
      <div class="recommend w-full h-full flex flex-col justify-between" v-if="$route.path === '/home'">
        <h3 class="title h-8 flex-none px-2 bordered-b-1 mb-1">
          <span class="font-courier text-lg leading-8 bordered-b-2 inline-block">{{ tagName }}</span>
        </h3>
        <div class="flex-1 overflow-auto">
          <BlogCardVue v-for="i in 10" :key="i" />
        </div>

        <el-pagination
          class="flex-none justify-center mb-2"
          layout="total, prev, pager, next"
          :total="50"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
      <RouterView v-else />
    </div>
    <div class="aside-wrap flex-1 border-l-[1px] border-l-[#ccc]">
      <AsideVue :title="'阅读排行'" />
      <AsideVue :title="'最新文章'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BlogCardVue from './components/blog-card.vue';
import AsideVue from './components/aside.vue';

const tagName = ref('推荐博文');
</script>
