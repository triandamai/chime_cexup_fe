 /* eslint-disable */
/**
 * Author : Trian Damaia
 * Date  28 December 2020
 * Time 13.50
 * Chime video conference
 * */

<template>
  <div class="w-full min-w-full rounded-md">
    <div class="p-2 bg-gray-800 rounded">
      <div class="flex flex-wrap w-full justify-items-auto">
        <p class="mb-2 mr-2 text-xs text-red-500">
          {{ chat.username }}
        </p>

        <p class="text-xs text-gray-300">
          {{ isMe ? " - You" : " " }}
        </p>
      </div>
      <div>
        <p class="text-white break-all">{{ chat.body }}</p>
        <b class="text-xs text-gray-300">
          {{ new Date(chat.updated).toLocaleTimeString("id-ID") }}
        </b>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    chat: Object,
    isMe: Boolean,
  },
  created() {
    this.log();
  },
  methods: {
    log() {
      // console.log(this.chat);
    },
  },
};
</script>
