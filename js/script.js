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
    getLastMsgIndex() {
      console.log(
        `Returning last index = ${
          this.contacts[this.currentIndex].messages.length - 1
        }`
      );
      return this.contacts[this.currentIndex].messages.length - 1;
    },
    scrollToMsg(index) {
      const target = "target_" + index;
      console.log(`Looking for id = ${target}`);
      const el = document.getElementById(target);
      el.scrollIntoView(true);
    },
    isActive(index) {
      return index === this.currentIndex;
    },
    setNewIndex(index) {
      this.showIntro = false; // Gets rid of the intro screen

      this.currentIndex = index;
    },
    sendMsg() {
      this.addMsg(this.currentIndex, this.messageBoxContent, "sent");
      // Clears the chatbox
      this.messageBoxContent = "";
      this.emulateReply(this.currentIndex);
    },

    addMsg(index, text, status) {
      // Assembling message object
      let currentMsg = {
        date: this.getTimestamp(),
        message: text,
        status: status,
      };

      this.contacts[index].messages.push(currentMsg);

      // this.scrollToMsg(this.getLastMsgIndex());
    },

    getTimestamp() {
      const timestamp = dayjs().format("DD/MM/YYYY HH:mm:ss");
      return timestamp;
    },

    receiveMsg(message, index) {
      // Index è l'indice del contatto da cui si riceve il messaggio
      const status = "received";
      const text = message;
      console.log(
        `Calling addMsg with parameters ${index}, ${text}, ${status}`
      );
      this.addMsg(index, text, status);
    },

    emulateReply() {
      // Simula una risposta con 2 secondi di ritardo
      const indexAtCallTime = this.currentIndex;
      const text = this.getRandomMsg();
      console.log(
        `Calling receiveMsg with parameters ${text} and ${indexAtCallTime}`
      );
      setTimeout(this.receiveMsg, 2000, text, indexAtCallTime);
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
      //! Breaks on deleting the last message received

      const receivedMessages = this.contacts[index].messages.filter(
        (message) => message.status === "received"
      );
      if (receivedMessages.length === 0) {
        return "";
      }
      return receivedMessages[receivedMessages.length - 1].date;
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
