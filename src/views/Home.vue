<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import firebase from "firebase"
import {ADD_CHAT} from "../store/chat.module"
import {getUser} from "../services/jwt.service"

export default {
  name: "Home",
  created(){
    this.listenChat()
  },
methods:{
      listenChat(){
      firebase.database().ref("/CHAT").on("child_added",(snapshot)=>{
        let user = JSON.parse(getUser())
        var data = {
          key:snapshot.key,
          body:snapshot.val().body ?? "un",
          owner:snapshot.val().owner ?? Date.now(),
          mimeType:snapshot.val().mimeType ?? "text",
          username : snapshot.val().username,
          updated:snapshot.val().updated,
          created:snapshot.val().created,
          isMe:snapshot.val().owner ==  user.meetingid ? true : false
        }

        this.$store.commit(ADD_CHAT,data)
        
      })
    }
}
  
};
</script>
