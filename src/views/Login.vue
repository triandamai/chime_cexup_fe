<template>
  <div>
    <!-- alert -->

    <div
      v-show="error"
      class="bg-red-100 border border-red-800 text-red-500 pl-4 pr-8 py-3 m-5 rounded relative"
      role="alert"
    >
      <strong class="font-bold">Oops!</strong>
      <span class="block sm:inline">{{ message }}</span>
      <span class="absolute top-0 right-0">
        <svg
          class="h-6 w-6 text-red"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path
            d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
          />
        </svg>
      </span>
    </div>
    <div class="w-full max-w-xs m-auto bg-indigo-100 rounded p-5 mt-5 pb-5">
      <!-- header -->
      <header>
        <img class="w-20 mx-auto mb-5" :src="require('../assets/cexup.png')" />
      </header>
      <!-- form -->
      <form action="#">
        <div>
          <label class="block mb-2 text-indigo-500" for="username"
            >Kode Meeting</label
          >
          <input
            class="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
            type="text"
            v-model="meetingId"
            name="Kode Meeting"
          />
        </div>
        <div>
          <label class="block mb-2 text-indigo-500" for="username"
            >Username</label
          >
          <input
            class="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
            type="text"
            name="username"
            v-model="username"
          />
        </div>
        <div>
          <label class="block mb-2 text-indigo-500" for="password"
            >Password</label
          >
          <input
            class="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
            type="password"
            name="password"
            autocomplete="current-password"
            v-model="password"
          />
        </div>
      </form>
      <div>
        <button
          class="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded"
          @click="joinMeeting"
        >
          Masuk
        </button>
      </div>
      <!-- footer -->
      <footer class="m-5 pb-5">
        <a
          class="text-indigo-700 hover:text-pink-700 text-sm float-left w-1/2"
          href="#"
          >Buat Meeting?</a
        >
        <router-link
          to="register"
          class="text-indigo-700 hover:text-pink-700 text-sm float-right w-1/2"
          >Buat Disini</router-link
        >
      </footer>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ApiService from "../services/api.service";
import { setMeeting, setUser } from "../services/jwt.service";
import { A_JOIN, A_JOIN_TEST } from "../store/session.module";

export default {
  data: () => {
    return {
      username: "",
      password: "",
      meetingId: "",
    };
  },
  computed: {
    ...mapState({
      message: (state) => {
        return state["session"].message;
      },
      error: (state) => {
        return state["session"].error;
      },
    }),
  },
  methods: {
    joinMeeting(e) {
      e.prevent;
      if (!this.username || !this.password || !this.meetingId) {
      } else {
        this.$store.dispatch(A_JOIN_TEST, {
          username: this.username,
          password: this.password,
          meetingid: this.meetingId,
          color: this.generateColor(),
        });
      }
    },
    generateColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
  },
};
</script>
