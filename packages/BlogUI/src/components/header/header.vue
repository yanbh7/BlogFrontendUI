<template>
  <div class="header flex justify-between items-center px-6 py-2 h-12 shadow-[0_0_10px_#999] bg-white">
    <h3>
      <RouterLink
        to="/"
        class="font-courier cursor-pointer select-none text-[20px] font-bold text-gray-700"
        @click="toHome"
      >
        Huey的个人博客
      </RouterLink>
    </h3>
    <ul class="px-10 flex items-center h-full">
      <li
        v-for="item in tagList"
        :key="item.tid"
        :class="[
          'h-9 leading-9 px-4 text-gray-700 text-center cursor-pointer',
          activeItem == item.tid && 'bg-[rag(45, 140, 240)] text-white',
        ]"
        @click="changeItem(item)"
      >
        {{ item.tagname }}
      </li>
    </ul>
    <div class="right">
      <el-button v-if="!isLogin" type="primary" @click="login">登录</el-button>
      <span v-else>
        欢迎
        <span @click="logout">
          {{ uname }}
        </span>
      </span>
    </div>
  </div>
</template>

<script setup>
import { toRefs } from 'vue';
import { $dialog } from '../../utils';
import SignInVue from './sign-in.vue';

const login = () => {
  $dialog({
    component: SignInVue,
    dialogOpt: {
      title: '登录',
      width: '30%',
    },
  });
};
</script>
