<template>
  <!-- This is an example component -->
  <div>
    <div
      class="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-blue-600"
    >
      <div
        class="flex flex-col items-center px-5 py-2 bg-white border rounded-lg"
      >
        <div class="relative block w-20 h-5 mt-2 loader-dots">
          <div
            class="absolute top-0 w-3 h-3 mt-1 bg-blue-400 rounded-full"
          ></div>
          <div
            class="absolute top-0 w-3 h-3 mt-1 bg-blue-400 rounded-full"
          ></div>
          <div
            class="absolute top-0 w-3 h-3 mt-1 bg-blue-400 rounded-full"
          ></div>
          <div
            class="absolute top-0 w-3 h-3 mt-1 bg-blue-400 rounded-full"
          ></div>
        </div>
        <div class="mt-2 text-xs font-light text-center text-gray-500">
          {{ progress }} ...
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ApiService from "../services/api.service";
import { setUser, setMeeting } from "../services/jwt.service";
import { A_JOIN, SET_MEETING } from "../store/session.module";
export default {
  data: () => {
    return {
      cexupcode: null,
      progress: "Mohon Tunggu",
    };
  },
  created() {
    setTimeout(() => {
      this.joining();
    }, 1000);
  },
  methods: {
    joining() {
      //{uid = userid , uname= username,mid}
      const passing = {
        userId: this.$route.query.uid,
        username: this.$route.query.uname,
        description: "Join from docter",
        meetingId: this.$route.query.mid,
      };
      console.log(passing);

      this.$store.dispatch(A_JOIN, passing);
    },
  },
};
</script>
<style scoped>
.loader-dots div {
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.loader-dots div:nth-child(1) {
  left: 8px;
  animation: loader-dots1 0.6s infinite;
}
.loader-dots div:nth-child(2) {
  left: 8px;
  animation: loader-dots2 0.6s infinite;
}
.loader-dots div:nth-child(3) {
  left: 32px;
  animation: loader-dots2 0.6s infinite;
}
.loader-dots div:nth-child(4) {
  left: 56px;
  animation: loader-dots3 0.6s infinite;
}
@keyframes loader-dots1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes loader-dots3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes loader-dots2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
</style>
