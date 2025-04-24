<template>
  <div class="blog-detail">
    <div class="blog-content">
      <div class="title text-center py-3">
        <h3 class="text-[20px] mb-1">{{ blog.title }}</h3>
        <p class="text-[12px]">
          <span class="mr-4">时间：{{ createTime }}</span>
          <span>浏览次数：{{ blog.readcount }}</span>
        </p>
      </div>
      <div class="content-detail px-6 py-3" v-html="blog.detail"></div>
    </div>
    <div class="comments mx-6 p-2 rounded border border-[#ccc] border-t-[2px] border-t-[#2d8cf0]">
      <div class="com-top flex justify-between">
        <h3 class="leading-8 bordered-b-1">评论</h3>
        <div>
          <el-button @click="replyCom">评论</el-button>
          <span class="count leading-8 font-bold ml-8">
            共 <span class="text-[#2d8cf0]">{{ comments.length }}</span> 条
          </span>
        </div>
      </div>
      <div v-if="commentsTree.length">
        <div v-for="comment in commentsTree" :key="comment.cid" class="main-comm p-1 last:mb-5">
          <div class="detail">
            <div>
              <el-avatar :src="comment.cavatar" />
              <h4 class="com-user-time">
                <span class="mx-2">{{ comment.cname }}</span>
                <span class="ctime text-[#999]">{{ comment._ctime }}</span>
                <span class="rep text-[#2d8cf0] bg-[#f5f7f9]" @click="replyCom(comment)">回复</span>
                <span class="del text-[#f35522] bg-[#f5f7f9]" v-if="uname == comment.cname" @click="delcom(comment)"
                  >删除</span
                >
                <p class="pl-1">{{ comment.content }}</p>
              </h4>
            </div>
          </div>
          <div v-if="comment.children?.length" class="sub-comm p-1 ml-6 pl-5 border-l-[1px] border-l-[#ccc]">
            <div v-for="subcomm in comment.children" :key="subcomm.cid" class="detail p-1">
              <div>
                <el-avatar :src="subcomm.cavatar"></el-avatar>
                <h4 class="com-user-time">
                  <span>{{ subcomm.cname }}</span
                  >@<span class="rname text-[#2d8cf0]">{{ subcomm.rname }}</span>
                  <span class="ctime text-[#999]">{{ subcomm._ctime }}</span>
                  <span class="rep text-[#2d8cf0] bg-[#f5f7f9]" @click="replyCom(subcomm)">回复</span>
                  <span class="del text-[#f35522] bg-[#f5f7f9]" v-if="uname == subcomm.cname" @click="delcom(subcomm)"
                    >删除</span
                  >
                  <p class="pl-1">{{ subcomm.content }}</p>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="py-3">暂无评论</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({});
const blog = ref({});

const comments = ref([]);
const commentsTree = ref([]);
</script>

<style lang="less" scoped></style>
