/**
 * Author : Trian Damaia
 * Date  28 December 2020
 * Time 13.50
 * Chime video conference
 * */

<template>
  <div class="relative h-screen bg-gray-900">
    <main style="height: 84%" class="mx-3">
      <div v-chat-scroll class="h-full pb-5 mb-2 overflow-y-scroll bg-gray-900">
        <bubble-chat
          v-for="(chat, index) in chats"
          :key="index"
          :chat="chat"
          :isMe="chat.isMe ? true : false"
          class="flex p-2"
          :class="chat.isMe ? 'justify-end' : ''"
        />
      </div>
    </main>
    <chat-entry class="absolute mt-5 bg-gray-800" />
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
      chats: (state) => state["chat"].message,
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
  width: 0px;
}

*::-webkit-scrollbar-track {
  background: #8f8c8c00;
}

*::-webkit-scrollbar-thumb {
  background-color: #1f2c4d00;
  border-radius: 0px;
}
</style>
