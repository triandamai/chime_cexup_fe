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
      <div class="flex flex-wrap w-full h-full">
        <video
          id="video-1"
          ref="video-1"
          :class="tileAktif == 1 ? (tileAktif == 2 ? '' : '') : ''"
          class="object-center w-1/2 h-full p-1 bg-gray-800"
          :src="require('../assets/videoplayback.mp4')"
        ></video>
        <video
          id="video-1"
          ref="video-1"
          class="object-center w-1/2 h-full p-1 bg-gray-800"
          :src="require('../assets/videoplayback.mp4')"
        ></video>
        <video
          id="video-1"
          ref="video-1"
          class="object-center w-full h-full p-1 bg-gray-800"
          :src="require('../assets/videoplayback.mp4')"
        ></video>
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
export default {
  components: {
    VideoButton,
  },
  created() {
    const data = JSON.parse(getMeeting());

    this.meeting = data.meeting;
    this.attende = data.attende;

    //  this.initializeMeetingSession();
  },
  data: () => {
    return {
      meetingSessoin: null,
      audioVideo: null,
      audioInputList: [],
      videoInputList: [],
      tileCount: [],
      meetingData: "",
      tileAktif: 0,
    };
  },

  methods: {
    toggleCamera() {
      this.log("camera toggle ");
      //cek
      this.audioVideo.startLocalVideoTile();
      this.audioVideo.stopLocalVideoTile();
      //
    },
    toggleMicrophone() {
      this.log("mic toggle");
      //cek toggle
      if ("") {
        this.audioVideo.realtimeUnmuteLocalAudio();
      } else {
        this.audioVideo.realtimeMuteLocalAudio();
      }
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
          console.log("started");
          this.bindAudio();
        },
        videoTileDidUpdate: (tileState) => {
          if (!tileState.boundAttendeeId) {
            return;
          }
          this.log(
            "video tile updated: " + JSON.stringify(tileState, null, " ")
          );
          this.log("tile", this.acquireTileIndex(tileState.tileId));
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
    /*
    Different method
    */
    acquireTileIndex(tileId) {
      console.log(document.getElementById("video-1"));
      if (this.indexAvail[tileId - 1].active !== true) {
        //bind tile

        return this.indexAvail[tileId - 1].el;
      } else {
        //search tile
        let active = this.indexAvail.findIndex((r) => r.active === true);
        this.indexAvail[active].active = false;
        return this.indexAvail[active].el;
      }

      // throw new Error("no tiles are available");
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
      tiles.forEach((tile) => {
        let tileId = tile.tileState.tileId;

        this.session.audioVideo.bindVideoElement(
          tileId,
          document.getElementById(`video-${tileId}`)
        );
      });
    },
    bindAudio() {
      const audioEl = document.getElementById("audio-out");
      console.log(audioEl);

      this.audioVideo.bindAudioElement(audioEl);
    },
  },
};
</script>
