import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    // Define your state properties here
    isLogin: false,
    uname: '',
    uid: '',
    activeItem: 0, //导航下标
    tagName: '推荐博文',
  }),
  actions: {
    // Define your actions here
    updateActive(tid) {
      this.activeItem = tid;
    },
    updateTagName(tagName) {
      this.tagName = tagName;
    },
    updateStatus(status) {
      this.isLogin = status;
    },
    updateUname(uname) {
      this.uname = uname;
    },
    updateUid(uid) {
      this.uid = uid;
    },
  },
});
