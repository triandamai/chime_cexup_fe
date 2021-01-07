/**
 * Author : Trian Damaia
 * Date  28 December 2020
 * Time 13.50
 * Chime video conference
 * */

<template>
  <footer class="w-full px-5 pb-2 text-center bg-gray-900">
    <div class="w-full px-3 py-2 bg-gray-800 rounded-md">
      <form class="flex justify-between w-full" @submit.prevent="sendMessage">
        <input
          v-model="entry"
          type="text"
          placeholder="Ketik disini..."
          class="flex flex-wrap w-full text-white bg-transparent outline-none rounded-xl focus:text-gray-300"
        />
        <button @click="sendMessage" class="text-white focus:outline-none">
          <svg
            class="w-4 h-4 mb-1 -mt-px transform rotate-45"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            ></path>
          </svg>
        </button>
      </form>
    </div>
  </footer>
</template>
<script>
import { SEND_MESSAGE } from "../store/chat.module";
import { getUser } from "../services/jwt.service";
export default {
  data: () => {
    return {
      entry: "",
      id: "",
    };
  },

  methods: {
    sendMessage() {
      let user = JSON.parse(getUser());

      if (this.entry.length <= 0 || this.entry == "") {
        return;
      }
      this.$store.dispatch(SEND_MESSAGE, {
        id: 1,
        body: this.entry,
        owner: user.userId,
        username: user.username,
        mimeType: "text",
        created: Date.now(),
        updated: Date.now(),
        isMe: true,
      });
      this.entry = "";
    },
  },
};
</script>
