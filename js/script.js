Vue.config.devtools = true;

console.log("vue test", Vue);

const root = new Vue({
  el: "#root",
  data: {
    user: data.user,
    contacts: data.contacts,
    searchKey: "",
    currentIndex: 0,
    messageBoxContent: "",
  },
  methods: {
    isActive(index) {
      return index === this.currentIndex;
    },
    setNewIndex(index) {
      this.currentIndex = index;
    },
    sendMsg() {
      let currentMsg = {
        date: this.getTimestamp(),
        message: this.messageBoxContent,
        status: "sent",
      };

      this.contacts[this.currentIndex].messages.push(currentMsg);
      this.messageBoxContent = "";

      this.emulateReply(this.currentIndex);
    },
    getTimestamp() {
      const timestamp = dayjs().format("DD/MM/YYYY HH:mm:ss");
      return timestamp;
    },

    receiveMsg(message, index) {
      // Index è l'indice del contatto da cui si riceve il messaggio

      currentMsg = message;
      currentMsg.date = this.getTimestamp();
      this.contacts[index].messages.push(currentMsg);
    },

    emulateReply() {
      // Simula una risposta con 2 secondi di ritardo
      let currentMsg = {
        date: "",
        message: "Beep boop",
        status: "received",
      };

      setTimeout(this.receiveMsg, 2000, currentMsg, this.currentIndex);
    },
  },
});
