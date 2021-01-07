/**
 * Author : Trian Damaia
 * Date  28 December 2020
 * Time 13.50
 * Chime video conference
 * */

<template>
  <main
    class="relative flex-1 h-screen transition duration-500 ease-in-out bg-gray-800 dark:bg-black"
  >
    <video-button
      class="fixed bottom-0 z-20 p-2 mb-10 ml-10 bg-gray-900 rounded-md"
      v-on:end-meeting="toggleEnd()"
      v-on:menu-meeting="toggleMore()"
      v-on:mic-meeting="toggleMicrophone()"
      v-on:camera-meeting="toggleCamera()"
      v-on:audio-meeting="toggleAudio()"
    />
    <div class="h-screen overflow-hidden">
      <div class="w-full h-full" :class="split ? 'flex flex-wrap' : 'flex'">
        <div
          :class="
            tileCount != 1 ? (tileCount != 2 ? '' : 'w-1/2') : 'w-screen h-full'
          "
        >
          <video
            id="video-1"
            ref="video-1"
            class="w-full h-full p-1 bg-gray-800 center"
            :src="require('../assets/videoplayback.mp4')"
          />
        </div>
        <div
          :class="
            tileCount != 1
              ? tileCount != 2
                ? ''
                : 'w-1/2'
              : 'w-screen h-full hidden'
          "
        >
          <video
            id="video-1"
            ref="video-1"
            class="w-full h-full p-1 bg-gray-800 center"
            :src="require('../assets/videoplayback.mp4')"
          />
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import {
  ConsoleLogger,
  DefaultMeetingSession,
  DefaultDeviceController,
  LogLevel,
  MeetingSessionConfiguration,
} from "amazon-chime-sdk-js";
import VideoButton from "../components/VideoButton.vue";
import { getMeeting, getUser } from "../services/jwt.service";
import { mapState } from "vuex";
import { MUTE_AUDIO, PAUSE_VIDEO } from "../store/session.module";
export default {
  components: {
    VideoButton,
  },
  created() {
    const data = JSON.parse(getMeeting());

    this.meeting = data.meeting;
    this.attende = data.attende;

    this.initializeMeetingSession();
  },
  data: () => {
    return {
      meetingSessoin: null,
      audioVideo: null,
      audioInputList: [],
      videoInputList: [],
      tileCount: 2,
    };
  },
  computed: mapState({
    split: (state) => state.session.shouldSplit,
    audiostatus: (state) => state.session.muteAudio,
    videostatus: (statu) => state.session.pauseVideo,
  }),
  methods: {
    toggleCamera() {
      this.log("camera toggle ");
      //cek
      if (this.videostatus) {
        this.audioVideo.stopLocalVideoTile();
      } else {
        this.obrserver();
        this.audioVideo.startLocalVideoTile();
      }
      this.$store.commit(PAUSE_VIDEO, !this.videostatus);
      //
    },
    toggleMicrophone() {
      this.log("mic toggle");
      //cek toggle
      if (this.audiostatus) {
        this.audioVideo.realtimeUnmuteLocalAudio();
      } else {
        this.audioVideo.realtimeMuteLocalAudio();
      }
      this.$store.commit(MUTE_AUDIO, !this.audiostatus);
    },
    toggleAudio() {
      this.log("audio toggle");
      //cek
      this.audioVideo.bindAudioElement(
        document.getElementById("meeting-audio")
      );

      this.audioVideo.unbindAudioElement();
    },
    toggleMore() {
      console.log("more toggle");
    },
    toggleEnd() {
      this.log("end meeting");
    },
    log(str) {
      console.log(`[DEMO] ${str}`);
    },
    async initializeMeetingSession() {
      //console.log(this.meeting, this.attende);
      const logger = new ConsoleLogger("video-info", LogLevel.ERROR);
      const deviceController = new DefaultDeviceController(logger);
      const configuration = new MeetingSessionConfiguration(
        this.meeting,
        this.attende
      );
      this.meetingSessoin = new DefaultMeetingSession(
        configuration,
        logger,
        deviceController
      );
      this.audioVideo = this.meetingSessoin.audioVideo;
      this.obrserver();
    },
    async obrserver() {
      //=============//
      const observerMeeting = {
        audioVideoDidStart: () => {
          const audioEl = document.getElementById("audio-out");
          this.audioVideo.bindAudioElement(audioEl);
        },
        videoTileDidUpdate: (tileState) => {
          if (!tileState.boundAttendeeId) {
            return;
          }
          this.log(
            "video tile updated: " + JSON.stringify(tileState, null, " ")
          );

          this.audioVideo.bindVideoElement(
            tileState.tileId,
            document.getElementById("video-" + tileState.tileId)
          );
        },
        videoTileWasRemoved: (tileId) => {
          //this.releaseTileIndex(tileId);
        },
        audioVideoDidStartConnecting: (reconnecting) => {},
        audioVideoDidStop: (sessionStatus) => {},
      };
      //=====================//
      const observerDevices = {
        audioInputsChanged: (freshAudioInputDeviceList) => {
          // An array of MediaDeviceInfo objects
          freshAudioInputDeviceList.forEach((mediaDeviceInfo) => {
            console.log(
              `Device ID: ${mediaDeviceInfo.deviceId} Microphone: ${mediaDeviceInfo.label}`
            );
          });
        },
        audioOutputsChanged: (freshAudioOutputDeviceList) => {
          console.log("Audio outputs updated: ", freshAudioOutputDeviceList);
        },
        videoInputsChanged: (freshVideoInputDeviceList) => {
          console.log("Video inputs updated: ", freshVideoInputDeviceList);
        },
      };
      //================//

      this.audioVideo.addDeviceChangeObserver(observerDevices);
      this.audioVideo.addObserver(observerMeeting);
      // this.audioVideo.realtimeSubscibeToAttendeIdPresence(
      //   this.attendePresenceHandler
      // );

      this.chooseDevices();

      this.audioVideo.startLocalVideoTile();

      this.audioVideo.start();
    },
    attendePresenceHandler(attendeeId, present) {
      this.audioVideo.realtimeSubscribeToVolumeIndicator(
        attendeeId,
        async (attendeeId, volume, muted, signalStrength) => {
          //volume strength
        }
      );
    },
    async chooseDevices() {
      this.audioInputList = await this.audioVideo.listAudioInputDevices();
      this.videoInputList = await this.audioVideo.listVideoInputDevices();

      await this.audioVideo.chooseAudioInputDevice(
        this.audioInputList[0].deviceId
      );
      await this.audioVideo.chooseVideoInputDevice(
        this.videoInputList[0].deviceId
      );
    },
  },
  releaseTileIndex(tileId) {
    for (let i = 0; i < 16; i += 1) {
      if (indexMap[i] === tileId) {
        delete indexMap[i];
        return;
      }
    }
  },

  updateTiles() {
    const tiles = this.session.audioVideo.getAllVideoTiles();
    this.tileCount = tiles.length;
    tiles.forEach((tile) => {
      let tileId = tile.tileState.tileId;

      this.session.audioVideo.bindVideoElement(
        tileId,
        document.getElementById(`video-${tileId}`)
      );
    });
  },
  changeVideoQuality() {
    // 360p this.session.audioVideo.chooseVideoInputQuality(640,360,15,600);
    // 540p this.session.audioVideo.chooseVideoInputQuality(960,540,15,1400);
    // 720p this.session.audioVideo.chooseVideoInputQuality(1280,720,15,1400);
  },
};
</script>
