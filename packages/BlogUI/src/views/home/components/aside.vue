<template>
  <div class="aside mb-3">
    <h3 class="h-8 leading-8 px-2 mx-4 bordered-b-1">
      <span class="font-courier inline-block text-[16px] h-8 bordered-b-2 border-b-[#2d8cf0]">{{ title }}</span>
    </h3>
    <ul class="item">
      <li class="blog-item" v-for="it in items" :key="it.bid" @click="detailPage(it)">
        {{ it.title }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  title: {
    type: String,
    default: '推荐',
  },
  items: {
    type: Array,
    default: () => [{ id: 1, title: '推荐1' }],
  },
});

const detailPage = (blog) => {
  const router = useRouter();
  router.push('/blog/' + blog.bid);
  const data = {
    bid: blog.bid,
    visited_date: new Date().toLocaleDateString(),
    timestramp: new Date().getTime(),
  };
  if (!data.uid) delete data.uid;
  // console.log(data);
  request.postJSON('/api/blogview', data).then((res) => {
    console.log(res);
  });
};
</script>

<style scoped lang="less"></style>
