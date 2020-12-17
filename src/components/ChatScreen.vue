<template>
  <main
 
    style="position:relative;"
    class="pt-2 flex-1 bg-gray-100 dark:bg-black
              transition duration-500 ease-in-out relative"
  >
    <div v-chat-scroll class="bg-gray-100 h-full overflow-y-scroll">
      <bubble-chat v-for="(chat, index) in chats" :key="index" :chat="chat" class="p-3 flex" :class="chat.isMe ? 'justify-end':''"/>     
    </div>
  </main>
</template>
<script>
import firebase from "firebase"
import BubbleChat from "./BubbleChat.vue"

import {mapState} from "vuex"
export default {
  name: "ChatScreen",
  components:{
    BubbleChat
  },
  data: () => {
    return {
    
    };
  },
 computed:{
   ...mapState({
     chats:(state)=>{
      
       return state["chat"].message
       }
   })
  
 },
 
};
</script>
