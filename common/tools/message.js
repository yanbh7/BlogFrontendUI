import { ElMessage, ElMessageBox } from 'element-plus';
import 'element-plus/theme-chalk/el-message.css';
import 'element-plus/theme-chalk/el-message-box.css';

export function showMessage({ message, type = 'info', duration = 3000, options = {} }) {
  ElMessage({
    message,
    type,
    duration,
    showClose: true,
    ...options,
  });
}

// 快捷方法
const messageSuccess = (message, options) => {
  showMessage({ message, type: 'success', options });
};

const messageError = (message, options) => {
  showMessage({ message, type: 'error', options });
};

const messageWarning = (message, options) => {
  showMessage({ message, type: 'warning', options });
};

const messageInfo = (message, options) => {
  showMessage({ message, type: 'info', options });
};

const messageConfirm = (message, title, options) => {
  return new Promise((resolve) => {
    ElMessageBox.confirm(message, title, {
      cancelButtonText: '取消',
      confirmButtonText: '确定',
      type: 'warning',
      ...options,
    })
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        resolve(false);
      });
  });
};

export {
  messageError as $error,
  messageInfo as $info,
  messageWarning as $warning,
  messageSuccess as $success,
  messageConfirm as $confirm,
};
