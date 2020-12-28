<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import database from "firebase/app";
import "firebase/database";
import { ADD_CHAT } from "../store/chat.module";
import { getUser } from "../services/jwt.service";

export default {
  name: "Home",
  created() {
    this.listenChat();
  },
  methods: {
    listenChat() {
      console.log("CHAT/", getUser());
      let user = JSON.parse(getUser());

      database
        .database()
        .ref("CHAT/" + user.meetingId)
        .on("child_added", (snapshot) => {
          console.log("home", snapshot.val());
          var data = {
            key: snapshot.key,
            body: snapshot.val().body ?? "undefined",
            owner: snapshot.val().owner ?? Date.now(),
            mimeType: snapshot.val().mimeType ?? "text",
            username: snapshot.val().username,
            updated: snapshot.val().updated,
            created: snapshot.val().created,
            isMe: snapshot.val().owner == user.userId ? true : false,
          };

          this.$store.commit(ADD_CHAT, data);
        });
    },
  },
};
</script>
