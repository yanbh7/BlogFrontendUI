<template>
  <div class="sign-in">
    <el-form ref="signInRef" :rules="rules" :model="loginData">
      <el-form-item prop="uname">
        <el-input type="text" v-model="loginData.uname" placeholder="请输入用户名">
          <template #prepend>
            <el-icon><User /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="upwd">
        <el-input type="password" password v-model="loginData.upwd" placeholder="请输入密码">
          <template #prepend>
            <el-icon><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item class="submit-btn">
        <el-button type="primary" @click="handleSubmit('formInline')">登录 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { User, Lock } from '@element-plus/icons-vue';
const rules = {
  uname: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur',
    },
  ],
  upwd: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur',
    },
    {
      type: 'string',
      min: 6,
      max: 18,
      message: '密码长度6~18位',
      trigger: 'blur',
    },
  ],
};

const loginData = ref({});
const signInRef = ref(null);
const handleSubmit = async () => {
  const isPass = await new Promise((resolve) => signInRef.value.validate(resolve));
  if (!isPass) {
    this.$Message.error('Fail!');

    return;
  }

  request.postJSON('/api/login', this.loginData).then((res) => {
    if (res.code == 0) {
      this.$Message.success('登录成功');
      window.sessionStorage.setItem('token', res.token);
      window.sessionStorage.setItem('isLogin', true);
      this.updateStatus(true);
      this.updateUid(res.data.uid);
      this.updateUname(res.data.username);
    } else {
      this.$Message.warning('账号密码错误');
    }
  });
};
</script>

<style lang="less" scoped>
.submit-btn {
  :deep(.el-form-item__content) {
    justify-content: center;
  }
}
</style>
