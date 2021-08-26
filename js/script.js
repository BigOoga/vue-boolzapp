Vue.config.devtools = true;

console.log("vue test", Vue);

const root = new Vue({
  el: "#root",
  data: {
    user: user,
    contacts: contacts,
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
