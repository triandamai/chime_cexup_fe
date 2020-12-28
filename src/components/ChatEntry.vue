<template>
  <footer class="w-full text-center border-t border-grey pin-b">
    <div
      class="flex flex-row items-center w-full h-16 px-4 bg-white rounded-xl"
    >
      <div>
        <button
          class="flex items-center justify-center mr-2 text-gray-400 hover:text-gray-600"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
            ></path>
          </svg>
        </button>
      </div>
      <div class="flex-grow">
        <div class="w-full">
          <input
            v-model="entry"
            type="text"
            class="flex w-full h-10 pl-4 border rounded-xl focus:outline-none focus:border-indigo-300"
          />
        </div>
      </div>
      <div class="flex mr-2">
        <button
          class="flex items-center justify-center w-12 h-full text-gray-400 hover:text-gray-600"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </button>
        <button
          @click="sendMessage"
          class="flex items-center justify-center flex-shrink-0 px-4 py-1 text-white bg-indigo-500 focus:outline-none hover:bg-indigo-600 rounded-xl"
        >
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
      </div>
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
