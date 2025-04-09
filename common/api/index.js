import interceptor from './interceptor';

const exportApis = (path = './*.js') => {
  // 自动导出当前文件夹下的所有接口模块
  const modules = {};
  const files = import.meta.globEager(path);
  for (const filePath in files) {
    if (filePath === './index.js') continue; // 跳过当前文件
    const moduleName = filePath.replace(/(\.\/|\.js)/g, '');
    modules[moduleName] = files[filePath].default || files[filePath];
  }
  return modules;
};

export { exportApis, interceptor };
