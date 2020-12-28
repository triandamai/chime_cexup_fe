<template>
  <div class="relative h-screen">
    <main
      style="height: 81%"
      class="flex-1 w-full pt-2 pr-2 transition duration-500 ease-in-out bg-gray-800 w-min-full dark:bg-black"
    >
      <div v-chat-scroll class="h-full overflow-y-scroll bg-gray-800">
        <bubble-chat
          v-for="(chat, index) in chats"
          :key="index"
          :chat="chat"
          :isMe="chat.isMe ? true : false"
          class="flex p-3"
          :class="chat.isMe ? 'justify-end' : ''"
        />
      </div>
    </main>
    <chat-entry class="mb-1" />
  </div>
</template>
<script>
import firbase from "firebase/app";

import BubbleChat from "./BubbleChat.vue";
import ChatEntry from "../components/ChatEntry.vue";

import { mapState } from "vuex";
export default {
  name: "ChatScreen",
  components: {
    BubbleChat,
    ChatEntry,
  },
  data: () => {
    return {};
  },
  computed: {
    ...mapState({
      chats: (state) => {
        return state["chat"].message;
      },
    }),
  },
};
</script>
<style  scoped>
/* Works on Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #1f2c4d #8f8c8c;
}

/* Works on Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 5px;
}

*::-webkit-scrollbar-track {
  background: #8f8c8c;
}

*::-webkit-scrollbar-thumb {
  background-color: #1f2c4d;
  border-radius: 20px;
}
</style>
