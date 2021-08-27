Vue.config.devtools = true;

console.log("vue test", Vue);

const root = new Vue({
  el: "#root",
  data: {
    user: data.user,
    contacts: data.contacts,
    searchKey: "",
    currentIndex: 0,
  },
  methods: {
    isActive(index) {
      return index === this.currentIndex;
    },
    setNewIndex(index) {
      this.currentIndex = index;
    },
  },
});
