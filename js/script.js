Vue.config.devtools = true;

console.log("vue test", Vue);

const root = new Vue({
  el: "#root",
  data: {
    user: user,
    contacts: contacts,
  },
  methods: {
    getAvatarUrl(contact) {},
  },
  display() {
    for (key in this.contacts) {
      console.log(this.contacts[key]);
    }
  },
});
