<template>
  <div class="home">
    这是首页

    <el-button @click="test">测试</el-button>
  </div>
</template>

<script>
import { toRefs } from 'vue';
import { $dialog } from '../../utils';
import Test from './test.vue';

export default {
  name: 'HomePage',

  props: {},

  setup(props, ctx) {
    return {
      test() {
        $dialog({
          component: Test,
        });
      },
    };
  },
};
</script>

<style lang="less" scoped>
.home {
}
</style>
