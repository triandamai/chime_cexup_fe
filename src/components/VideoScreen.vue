<template>
  <main
    style="position:relative;"
    class="pt-2 pb-2 flex-1 bg-gray-800 dark:bg-black w-screen
              transition duration-500 ease-in-out overflow-y-auto relative"
  >
    <div class="overflow-y-auto h-4/6">
      <div class="h-full w-full">
        <video
        id="video-1"
          ref="video-1"
          class="h-full bg-gray-800 w-full object-center"
          :src="require('../assets/videoplayback.mp4')"
        ></video>
      </div>
    </div>
    <div class=" h-1/3 w-full absolute  bottom-0  bg-gray-800">
      <div class="h-full w-full flex overflow-x-auto">
        <video
          ref="video-2"
          :src="require('../assets/videoplayback.mp4')"
          class=" w-1/2 mx-2 "
        ></video>
        <video
          ref="video-3"
          :src="require('../assets/videoplayback.mp4')"
          class=" w-1/2 mx-2 "
        ></video>
        <video
          ref="video-4"
          :src="require('../assets/videoplayback.mp4')"
          class=" w-1/2 mx-2 "
        ></video>
        <video
          ref="video-5"
          :src="require('../assets/videoplayback.mp4')"
          class=" w-1/2 mx-2 "
        ></video>
        <video
          ref="video-6"
          :src="require('../assets/videoplayback.mp4')"
          class=" w-1/2 mx-2 "
        ></video>
        <video
          ref="video-7"
          :src="require('../assets/videoplayback.mp4')"
          class=" w-1/2 mx-2 "
        ></video>
        <video
          ref="video-8"
          :src="require('../assets/videoplayback.mp4')"
          class=" w-1/2 mx-2 "
        ></video>
        <video
          ref="video-9"
          :src="require('../assets/videoplayback.mp4')"
          class=" w-1/2 mx-2 "
        ></video>
        <video
          ref="video-10"
          :src="require('../assets/videoplayback.mp4')"
          class=" w-1/2 mx-2 "
        ></video>
        <video
          ref="video-11"
          :src="require('../assets/videoplayback.mp4')"
          class=" w-1/2 mx-2 "
        ></video>
        <video
          ref="video-12"
          :src="require('../assets/videoplayback.mp4')"
          class=" w-1/2 mx-2 "
        ></video>
        <video
          ref="video-13"
          :src="require('../assets/videoplayback.mp4')"
          class=" w-1/2 mx-2 "
        ></video>
        <video
          ref="video-14"
          :src="require('../assets/videoplayback.mp4')"
          class=" w-1/2 mx-2 "
        ></video>
        <video
          ref="video-15"
          :src="require('../assets/videoplayback.mp4')"
          class=" w-1/2 mx-2 "
        ></video>
        <video
          ref="video-16"
          :src="require('../assets/videoplayback.mp4')"
          class=" w-1/2 mx-2 "
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
  MeetingSessionConfiguration
} from "amazon-chime-sdk-js";
import { getMeeting } from "../services/jwt.service";
import { mapState } from "vuex";
export default {
  created() {
    // const data = JSON.parse(getMeeting());
    // this.meeting = data.meeting;
    // this.attende = data.attende;

   // this.initializeMeetingSession();
  },
  data: () => {
    return {
      meetingSessoin: null,
      audioVideo: null,
      audioInputList: [],
      videoInputList: [],
      tileCount: [],
      indexAvail:[
        {id:0,active:false,elIndex:0,el:document.getElementById("video-1")},
        {id:1,active:true,elIndex:0,el:document.getElementById("video-1")},
        {id:2,active:false,elIndex:0,el:document.getElementById("video-1")},
        {id:3,active:false,elIndex:0,el:document.getElementById("video-1")},
        {id:4,active:false,elIndex:0,el:document.getElementById("video-1")},
        {id:5,active:false,elIndex:0,el:document.getElementById("video-1")},
        {id:6,active:false,elIndex:0,el:document.getElementById("video-1")},
        {id:7,active:false,elIndex:0,el:document.getElementById("video-1")},
        {id:8,active:false,elIndex:0,el:document.getElementById("video-1")},
        {id:9,active:false,elIndex:0,el:document.getElementById("video-1")},
        {id:10,active:false,elIndex:0,el:document.getElementById("video-1")},
        {id:11,active:false,elIndex:0,el:document.getElementById("video-1")},
        {id:12,active:false,elIndex:0,el:document.getElementById("video-1")},
        {id:13,active:false,elIndex:0,el:document.getElementById("video-1")},
        {id:14,active:true,elIndex:0,el:document.getElementById("video-1")},
        {id:15,active:false,elIndex:0,el:document.getElementById("video-1")},
        {id:16,active:false,elIndex:0,el:document.getElementById("video-1")},
        {id:16,active:false,elIndex:0,el:document.getElementById("video-1")},
      ]
    };
  },

  methods: {
    toggleCamera() {
      console.log("camera toggle");
    },
    toggleMicrophone() {
      console.log("microphone toggle");
    },
    toggleAudio() {
      console.log("audio toggle");
    },
    toggleMore() {
      console.log("more toggle");
    },
    toggleEnd() {
      console.log("end togge");
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
        videoTileDidUpdate: tileState => {
          if (!tileState.boundAttendeeId) {
            return;
          }
          this.log(
            "video tile updated: " + JSON.stringify(tileState, null, " ")
          );
          this.log("tile", this.acquireTileIndex(tileState.tileId));
          this.audioVideo.bindVideoElement(
            tileState.tileId,
            document.getElementById("video-"+tileState.tileId)
          );
        },
        videoTileWasRemoved: tileId => {
          this.releaseTileIndex(tileId);
        },
        audioVideoDidStartConnecting: reconnecting => {},
        audioVideoDidStop: sessionStatus => {}
      };
      //=====================//
      const observerDevices = {
        audioInputsChanged: freshAudioInputDeviceList => {
          // An array of MediaDeviceInfo objects
          freshAudioInputDeviceList.forEach(mediaDeviceInfo => {
            console.log(
              `Device ID: ${mediaDeviceInfo.deviceId} Microphone: ${mediaDeviceInfo.label}`
            );
          });
        },
        audioOutputsChanged: freshAudioOutputDeviceList => {
          console.log("Audio outputs updated: ", freshAudioOutputDeviceList);
        },
        videoInputsChanged: freshVideoInputDeviceList => {
          console.log("Video inputs updated: ", freshVideoInputDeviceList);
        }
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
      console.log(document.getElementById("video-1"))
      if(this.indexAvail[tileId-1].active !== true){
//bind tile

        return this.indexAvail[tileId -1].el
      }else{
//search tile
        let active = this.indexAvail.findIndex(r=>r.active === true)
        this.indexAvail[active].active = false
        return this.indexAvail[active].el 
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
      tiles.forEach(tile => {
        let tileId = tile.tileState.tileId;
      
          this.session.audioVideo.bindVideoElement(tileId, document.getElementById(`video-${tileId}`));
        
      });
    },
    bindAudio() {
      const audioEl = document.getElementById("audio-out");
      console.log(audioEl);

      this.audioVideo.bindAudioElement(audioEl);
    }
  }
};
</script>
