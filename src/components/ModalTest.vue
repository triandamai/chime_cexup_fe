/**
 * Author : Trian Damaia
 * Date  28 December 2020
 * Time 13.50
 * Chime video conference
 * */

<template>
  <div style="height: 78vh" class="z-0 flex w-full bg-transparent select-none">
    <div class="fixed w-full h-screen min-w-full bg-gray-800 opacity-80"></div>
    <div class="fixed w-full h-screen min-w-full bg-transparent">
      <div class="relative mb-8 overflow-hidden border-grey-light">
        <div class="p-4 py-8 bg-grey-lighter">
          <div
            class="max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg opacity-100"
          >
            <div class="px-2 py-4 sm:flex sm:items-center">
              <div class="flex-grow">
                <video
                  ref="preview"
                  id="preview"
                  :src="require('../assets/videoplayback.mp4')"
                  class="rounded-md"
                ></video>
                <div class="w-full">
                  <div class="mt-3">
                    <label
                      class="mb-2 text-xs tracking-wide uppercase text-grey-darker"
                      for="grid-state"
                    >
                      Pilih Kamera
                    </label>
                    <div class="relative">
                      <select
                        class="block w-full px-4 py-3 pr-8 border rounded appearance-none bg-grey-lighter border-grey-lighter text-grey-darker"
                        ref="videoSelect"
                        id="videoSelect"
                        @change="changeVideo"
                        v-model="selectedVideoSource"
                      >
                        <option
                          v-for="(video, index) in videoSource"
                          :key="index"
                          :value="video.deviceId"
                        >
                          {{ video.label }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div class="mt-3">
                    <label
                      class="mb-2 text-xs tracking-wide uppercase text-grey-darker"
                      for="grid-state"
                    >
                      Pilih Audio In
                    </label>
                    <div class="relative">
                      <select
                        class="block w-full px-4 py-3 pr-8 border rounded appearance-none bg-grey-lighter border-grey-lighter text-grey-darker"
                        ref="audioInputSelect"
                        id="audioInputSelect"
                        @change="changeAudioInput"
                        v-model="selectedAudioInput"
                      >
                        <option
                          v-for="(input, index) in audioInputSource"
                          :key="index"
                          :value="input.deviceId"
                        >
                          {{ input.label }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="mt-3">
                    <label
                      class="mb-2 text-xs tracking-wide uppercase text-grey-darker"
                      for="grid-state"
                    >
                      Pilih Audio Out
                    </label>
                    <div class="relative">
                      <select
                        class="block w-full px-4 py-3 pr-8 border rounded appearance-none bg-grey-lighter border-grey-lighter text-grey-darker"
                        ref="audioOutputSelect"
                        id="audioOutputSelect"
                        @change="changeAudioOutput"
                        v-model="selectedAudioOutput"
                      >
                        <option
                          v-for="(input, index) in audioOutputSource"
                          :key="index"
                          :value="input.deviceId"
                        >
                          {{ input.label }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="px-2 py-4 sm:flex bg-grey-light sm:items-center">
              <div class="flex-grow text-right">
                <button
                  @click="$emit('close', true)"
                  class="px-4 py-2 rounded text-grey-darkest hover:text-grey-dark"
                >
                  Cancel
                </button>
                <button
                  @click="$emit('finish', true)"
                  class="px-4 py-2 text-blue-300 rounded bg-blue hover:bg-blue-dark"
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
  data: () => {
    return {
      audioInputSource: [],
      selectedAudioInput: "",
      audioOutputSource: [],
      selectedAudioOutput: "",
      videoSource: [],
      selectedVideoSource: "",
      mediaStream: null,
    };
  },
  mounted() {
    const supported = "mediaDevices" in navigator;
    if (!supported) {
      //cannot
      return;
    }
    this.getDevices()
      .then(this.gotDevices)
      .then(this.getVideoStream)
      .then(this.gotVideoStream)
      .catch(this.HandleError);
  },
  methods: {
    getVideoStream() {
      this.stopVideoStream();
      return navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: this.selectedVideoSource
            ? { exact: this.selectedVideoSource }
            : true,
        },
      });
    },
    getAudioStream() {
      return navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: this.selectedAudioInput
            ? { exact: this.selectedAudioInput }
            : true,
        },
      });
    },

    gotVideoStream(stream) {
      //console.log("[DEMO TEST]", `got stream : `, stream);
      window.stream = stream;
      this.$refs.preview.srcObject = stream;
      this.$refs.preview.play();
      return navigator.mediaDevices.enumerateDevices();
    },
    stopVideoStream() {
      if (this.mediaStream) {
        this.mediaStream.getTracks().forEach((track) => track.stop());
      }
    },
    getDevices() {
      return navigator.mediaDevices.enumerateDevices();
    },
    gotDevices(deviceInfos) {
      //
      // console.log("[DEMO TEST]", `got devices : `, deviceInfos);
      deviceInfos.forEach((device, index) => {
        if (device.kind == "audioinput") {
          this.selectedAudioInput = device.deviceId;
          this.audioInputSource.push(device);
        } else if (device.kind == "audiooutput") {
          this.selectedAudioOutput = device.deviceId;
          this.audioOutputSource.push(device);
        } else if (device.kind == "videoinput") {
          this.selectedVideoSource = device.deviceId;
          this.videoSource.push(device);
        }
      });
    },
    changeAudioInput() {
      console.log(
        "[DEMO TEST]",
        `got change audio input: ${this.selectedAudioInput}`
      );
    },
    changeAudioOutput() {
      console.log(
        "[DEMO TEST]",
        `got change audio out : ${this.selectedAudioOutput}`
      );
    },
    changeVideo() {
      console.log(
        "[DEMO TEST]",
        `got change video  : ${this.selectedVideoSource}`
      );
      this.getVideoStream().then(this.gotVideoStream);
    },
    HandleError(err) {
      console.log(`[DEMO TEST]`, err.message, err.name);
    },
  },
  destroyed() {
    this.stopVideoStream();
  },
};
</script>
