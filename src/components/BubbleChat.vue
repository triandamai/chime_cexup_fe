<template>
  <div class="w-full min-w-full p-3 rounded-md">
    <div class="w-9/12 p-3 bg-gray-600 rounded">
      <div class="flex w-full justify-items-auto">
        <p class="text-xs text-red-500">
          {{ chat.username }}
        </p>

        <p class="text-xs text-gray-400">
          {{ isMe ? " - You" : "" }}
        </p>
      </div>
      <div>
        <p>{{ chat.body }}</p>
        <p class="text-xs text-gray-400">
          {{ new Date(chat.updated).toLocaleTimeString("id-ID") }}
        </p>
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
      console.log(this.chat);
    },
  },
};
</script>
