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
    showIntro: true,
    showSearchMsg: false,
    msgSearchKey: "",
    theme: "dark",
  },
  methods: {
    isActive(index) {
      return index === this.currentIndex;
    },
    setNewIndex(index) {
      this.showIntro = false;
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
        message: this.getRandomMsg(),
        status: "received",
      };

      setTimeout(this.receiveMsg, 2000, currentMsg, this.currentIndex);
    },
    getRandomMsg() {
      let text = "";
      //replies = ["Ok...", "No.", "Maybe", "Yes!", "Yes, but..."];
      replies = ["Ok...", "No.", "Forse", "Sì!", "Sì, ma..."];
      let rndIndex = Math.floor(Math.random() * (replies.length - 1) + 1);
      text = replies[rndIndex];
      return text;
    },
    getTheme() {
      return this.theme;
    },
    toggleTheme() {
      if (this.theme === "light") {
        this.theme = "dark";
      } else {
        this.theme = "light";
      }
    },

    filterContacts() {
      this.contacts.forEach((element) => {
        if (element.name.toLowerCase().includes(this.searchKey.toLowerCase())) {
          element.visible = true;
        } else {
          element.visible = false;
        }
      });
    },

    deleteMsg(index) {
      this.contacts[this.currentIndex].messages.splice(index, 1);
    },

    getLastReceivedMsg(index) {
      //! Breaks on deleteMsg() calls
      const contactsInstance = this.contacts[index].messages;
      // const receivedMessages = contactsInstance.filter(
      //   (message) => message.status === "received"
      // );

      let arrayLength = contactsInstance.length;
      do {
        arrayLength--;
      } while (contactsInstance[arrayLength].status != "received");

      return contactsInstance[array].date;
    },
    getLastMsg(index) {
      let messages = this.contacts[index].messages;
      let lastMsg = messages[messages.length - 1];

      return lastMsg;
    },
    getDate(msg) {
      return msg.date;
    },
    getText(msg) {
      return msg.message;
    },
  },
});
