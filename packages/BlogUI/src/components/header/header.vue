<template>
  <div class="header fixed">
    <h3>
      <router-link to="/" class="cursor-pointer select-none" @click="toHome">Huey的个人博客</router-link>
    </h3>
    <ul class="p-10 flex items-center">
      <li v-for="item in tagList" :key="item.tid" :class="{ active: activeItem == item.tid }" @click="changeItem(item)">
        {{ item.tagname }}
      </li>
    </ul>
    <div class="right">
      <el-button type="text" v-if="!isLogin" @click="loginModal = true">登录</el-button>
      <span v-else>
        欢迎
        <span style="display: inline-block; font-weight: 600; padding-left: 8px; cursor: pointer" @click="logout">
          {{ uname }}
        </span>
      </span>
    </div>
  </div>
</template>

<script>
import { toRefs } from 'vue';
import { ElButton } from 'element-plus';

export default {
  components: { ElButton },
  setup(props, ctx) {
    return {};
  },
};
</script>

<style lang="less" scoped>
.header {
}
</style>
