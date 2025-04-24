<template>
  <div class="blog-card flex m-3 h-32 hover:shadow-[0_0_3px_#0593d3]">
    <img src="/imgs/thumb.jpeg" class="block flex-shrink-0 w-52 h-32 object-cover mr-[1px]" />
    <div class="right-wrap px-3 flex-1 shadow-[0_0_1px_#aaa]">
      <h3
        class="title my-1 select-none cursor-pointer text-[16px] text-[#0593d3]"
        @click="detailPage(blog.bid, blog.tid, blog.tagname)"
      >
        {{ blog.title }}
      </h3>
      <p class="detail ellipse2" v-html="blog.synopsis"></p>
      <div class="wrap mt-1 flex">
        <div class="watch mr-4 flex items-center">
          <el-icon><View /></el-icon>
          <span>{{ blog.readcount }}</span>
        </div>
        <div class="create-time mr-4 flex items-center">
          <el-icon><Timer /></el-icon>
          <span>{{ blog.createTime }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { View, Timer } from '@element-plus/icons-vue';

const props = defineProps({
  blog: {
    type: Object,
    default: () => ({
      bid: 1,
      title: '推荐博文',
      cover: '',
      synopsis: '这是一个推荐博文的简介',
      readcount: 100,
      createTime: '2023-10-01',
      tid: 1,
      tagname: '推荐',
    }),
  },
});

const router = useRouter();

const detailPage = (bid, tid, tagname) => {
  this.updateActive(tid);
  this.updateTagName(tagname);
  router.push('/blog/' + bid);
  const data = {
    bid,
    visited_date: new Date().toLocaleDateString(),
    timestramp: new Date().getTime(),
    uid: this.uid,
  };
  if (!data.uid) delete data.uid;
  request.postJSON('/api/blogview', data).then((res) => {
    console.log(res);
  });
};
</script>
