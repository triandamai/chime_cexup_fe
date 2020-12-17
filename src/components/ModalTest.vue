<template>
  <div
    style="height:78vh;"
    class="z-0 bg-transparent  w-full flex  select-none"
  >
    <div class="fixed bg-gray-800 opacity-80 h-screen w-full min-w-full"></div>
    <div class="fixed bg-transparent h-screen w-full min-w-full">
      <div class="relative  overflow-hidden  border-grey-light mb-8 ">
        <div class="p-4 bg-grey-lighter py-8">
          <div
            class="bg-white opacity-100 mx-auto max-w-sm shadow-lg rounded-lg overflow-hidden"
          >
            <div class="sm:flex sm:items-center px-2 py-4">
              <div class="flex-grow">
                <video
                  ref="preview"
                  :src="require('../assets/videoplayback.mp4')"
                  class="rounded-md"
                ></video>
                <div class="w-full">
                  <div class="mt-3">
                    <label
                      class="uppercase tracking-wide text-grey-darker text-xs  mb-2"
                      for="grid-state"
                    >
                      Pilih Kamera
                    </label>
                    <div class="relative">
                      <select
                        class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                        id="grid-state"
                      >
                        <option>New Mexico</option>
                        <option>Missouri</option>
                        <option>Texas</option>
                      </select>
                    </div>
                  </div>
                  <audio ref="audio"></audio>
                  <div class="mt-3">
                    <label
                      class="uppercase tracking-wide text-grey-darker text-xs  mb-2"
                      for="grid-state"
                    >
                      Pilih Audio
                    </label>
                    <div class="relative">
                      <select
                        class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                        id="grid-state"
                      >
                        <option>New Mexico</option>
                        <option>Missouri</option>
                        <option>Texas</option>
                      </select>
                    </div>
                  </div>
                  <div
                    class="flex my-1 cursor-pointer hover:bg-blue-lightest rounded"
                  >
                    <div class="w-4/5  h-10 py-3 px-1">
                      <p class="hover:text-blue-dark">Undang Peserta</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="sm:flex bg-grey-light sm:items-center px-2 py-4">
              <div class="flex-grow text-right">
                <button
                  @click="$emit('close', true)"
                  class="text-grey-darkest hover:text-grey-dark py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  @click="$emit('finish', true)"
                  class="bg-blue hover:bg-blue-dark text-blue-300 py-2 px-4 rounded"
                >
                  Invite
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  created() {
    this.preview();
    ///this.requestPermission();
  },
  methods: {
    requestPermission() {
      let obj = {
        audio: true,
        video: {
          facingMode: "user",
          width: {
            min: 640,
            ideal: 1280,
            max: 1920,
          },
          heigh: {
            min: 480,
            ideal: 720,
            max: 1080,
          },
        },
      };

      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
        navigator.mediaDevices.getUserMedia = (obj) => {
          let getUserMedia =
            navigator.webkitGetUserMedia || navigator.mozGetuserMedia;
          if (!getUserMedia) {
            return Promise.reject(
              new Error("getUserMedia is not implemented in browser")
            );
          }
          return new Promise((resolve, reject) => {
            getUserMedia.call(navigator, obj, resolve, reject);
          });
        };
      } else {
        navigator.mediaDevices
          .enumerateDevices()
          .then((devices) => {
            devices.forEach((device) => {
              console.log(device.kind.toUpperCase(), device.label);
            });
          })
          .catch((err) => {
            console.log(err.name, err.message);
          });
      }

      navigator.mediaDevices
        .getUserMedia({
          video: {
            facingMode: "user",
            width: {
              min: 640,
              ideal: 1280,
              max: 1920,
            },
            heigh: {
              min: 480,
              ideal: 720,
              max: 1080,
            },
          },
        })
        .then((mediaStremObj) => {
          let video = this.$refs.preview;
          if ("srcObject" in video) {
            video.srcObject = mediaStremObj;
          } else {
            video.src = window.URL.createObjectURL(mediaStremObj);
          }

          video.onloadedmetadata = (ev) => {
            video.play();
          };
        });
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stremobj) => {
        let audio = this.$refs.audio;
        if ("srcObject" in audio) {
          audio.srcObject = stremobj;
        } else {
          audio.src = window.URL.createObjectURL(stremobj);
        }
        audio.onloadedmetadata;
      });
    },
    preview() {},
  },
};
</script>
