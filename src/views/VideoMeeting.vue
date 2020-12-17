<template>
  <div class="max-h-screen overflow-hidden absolute">
    <nav-bar
      v-on:close="toggleClose"
      v-on:open-chat="setChatScreen"
      v-on:invit="setInvitScreen"
    />
    <div style="height:78vh;" class="z-0  w-full flex  select-none">
      <!-- =========MAIN============== -->
      <audio id="audio-out" ref="audio-out"></audio>
      <video-screen ref="videoScreen" v-show="!chatScreen" />
      <!-- 
        Chat
       -->
      <chat-screen v-show="chatScreen" />
      <!--
      modal
      -->
      <modal-invit v-show="modalInvit" v-on:cancel-modal="setInvitScreen" />
      <modal-test
        v-show="modalTest"
        v-on:close="setTestScreen"
        v-on:finish="setTestScreen"
      />
    </div>
    <!-- Button accesbilitas -->

    <video-button
      v-show="!chatScreen"
      v-on:end-meeting="$refs.videoScreen.toggleEnd()"
      v-on:menu-meeting="$refs.videoScreen.toggleMore()"
      v-on:mic-meeting="$refs.videoScreen.toggleMicrophone()"
      v-on:camera-meeting="$refs.videoScreen.toggleCamera()"
      v-on:audio-meeting="$refs.videoScreen.toggleAudio()"
    />

    <chat-entry v-show="chatScreen" />
  </div>
</template>

<script>
import { getMeeting } from "../services/jwt.service";

import ChatScreen from "../components/ChatScreen.vue";
import ChatEntry from "../components/ChatEntry.vue";
import VideoButton from "../components/VideoButton.vue";
import VideoScreen from "../components/VideoScreen.vue";
import ModalInvit from "../components/ModalInvit.vue";
import ModalTest from "../components/ModalTest.vue";
import NavBar from "../components/Nav.vue";

import { mapState } from "vuex";
import {
  SET_CHATSCREEN,
  SET_VIDEOSCREEN,
  SET_MODALINVIT,
  SET_MODALTEST
} from "../store/session.module";

export default {
  name: "HelloWorld",
  components: {
    ChatScreen,
    ChatEntry,
    VideoButton,
    ModalInvit,
    NavBar,
    VideoScreen,
    ModalTest
  },
  computed: mapState({
    chatScreen: state => state.session.chatScreen,
    videoScreen: state => state.session.videoScreen,
    errorloadingvideo: state => state.session.errorloadingvideo,
    modalInvit: state => state.session.modalInvit,
    modalTest: state => state.session.modalTest
  }),
  created() {},

  methods: {
    getLog() {
      const data = JSON.parse(getMeeting());
    },
    setChatScreen() {
      this.$store.commit(SET_CHATSCREEN);
    },
    setInvitScreen() {
      this.$store.commit(SET_MODALINVIT);
    },
    setTestScreen() {
      this.$store.commit(SET_MODALTEST);
    },
    toggleClose() {
      if (this.chatScreen) {
        this.$store.commit(SET_CHATSCREEN);
      }
      if (this.modalInvit) {
        this.$store.commit(SET_MODALINVIT);
      }
      if (this.modalTest) {
        this.$store.commit(SET_MODALTEST);
      }
    }
  }
};
</script>
