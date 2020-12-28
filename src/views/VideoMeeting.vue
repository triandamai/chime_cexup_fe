<template>
  <div class="max-h-screen overflow-x-hidden overflow-y-hidden">
    <!-- Navigation -->
    <nav-bar
      v-on:close="toggleClose"
      v-on:open-chat="setChatScreen"
      v-on:invit="setInvitScreen"
    />
    <!-- modal -->
    <modal-invit
      class="fixed z-20"
      v-show="modalInvit"
      v-on:cancel-modal="setInvitScreen"
    />
    <modal-test
      v-show="modalTest"
      v-on:close="setTestScreen"
      v-on:finish="setTestScreen"
    />
    <modal
      v-show="modal"
      :message="message"
      :title="title"
      v-on:positive-button="positiveButton"
      v-on:negative-button="negativeButton"
    />
    <!-- Audio -->
    <audio id="audio-out" ref="audio-out" />
    <!-- Main Screen -->
    <div class="flex flex-wrap w-screen min-w-full">
      <!-- VIdeo -->
      <video-screen
        :class="chatScreen ? (shouldSplit ? 'w-5/6' : 'hidden') : 'w-full'"
      />
      <!-- Chat -->
      <chat-screen
        :class="chatScreen ? (shouldSplit ? 'w-1/3' : 'w-full') : 'hidden'"
        v-show="chatScreen"
      />
    </div>
  </div>
</template>

<script>
import { getMeeting } from "../services/jwt.service";

import ChatScreen from "../components/ChatScreen.vue";
import VideoScreen from "../components/VideoScreen.vue";
import ModalInvit from "../components/ModalInvit.vue";
import ModalTest from "../components/ModalTest.vue";
import Modal from "../components/Modal.vue";
import NavBar from "../components/Nav.vue";

import { mapState } from "vuex";
import {
  SET_CHATSCREEN,
  SET_VIDEOSCREEN,
  SET_MODALINVIT,
  SET_MODALTEST,
} from "../store/session.module";

export default {
  name: "HelloWorld",
  components: {
    ChatScreen,
    ModalInvit,
    NavBar,
    VideoScreen,
    ModalTest,
    Modal,
  },
  data: () => {
    return {
      screenWidth: window.innerWidth,
      screenChange: "",
      shouldSplit: true,
      modal: false,
      message: "",
      title: "",
    };
  },
  watch: {
    screenWidth(newWidth, oldWith) {
      this.screenChange = `screen changed to ${newWidth} from ${oldWith}`;
      //console.log(`screen changed to ${newWidth} from ${oldWith}`);
      if (newWidth > 850) {
        //console.log(`split changed to ${newWidth} from ${oldWith}`);
        this.shouldSplit = true;
      } else {
        this.shouldSplit = false;
        // console.log(`replace changed to ${newWidth} from ${oldWith}`);
      }
    },
  },
  computed: mapState({
    chatScreen: (state) => state.session.chatScreen,
    videoScreen: (state) => state.session.videoScreen,
    errorloadingvideo: (state) => state.session.errorloadingvideo,
    modalInvit: (state) => state.session.modalInvit,
    modalTest: (state) => state.session.modalTest,
  }),
  created() {
    console.log("ukuran layar ", window.innerWidth);
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
  },
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
    },
    positiveButton() {},
    negativeButton() {},
    onResize() {
      this.screenWidth = window.innerWidth;
    },
  },
};
</script>
