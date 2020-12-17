<template>
  <div class="p-3 rounded-md w-full min-w-full">
    <div class="bg-white rounded p-3 w-9/12">
      <h1 class="text-red-500">{{chat.username}}</h1>
      <div>
        <p>{{chat.body}}</p>
        <p class="text-xs text-gray-400">{{new Date(chat.updated).toLocaleTimeString('id-ID')}}</p>
      </div>
      
      </div>
  </div>
</template>
<script>
export default {
  props: {
    chat: Object,
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
