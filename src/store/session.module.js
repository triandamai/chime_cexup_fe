import ApiService from "../services/api.service";
import { dropMeeting, setMeeting, setUser } from "../services/jwt.service";

import router from "../router/index";

//action
export const A_JOIN = "join";
export const A_JOIN_TEST = "jointes";

export const A_CREATE = "create";
//mutations
export const SET_MEETING = "setmeeting";
export const DROP_MEETING = "dropmeeting";
export const SET_CHATSCREEN = "chatscreen";
export const SET_VIDEOSCREEN = "video";
export const SET_MODALINVIT = "invit";
export const SET_MODALTEST = "test";

const state = {
  audioInputList: [],
  videoInputList: [],
  modalInvit: false,
  modalTest: false,
  chatScreen: false,
  videoScreen: false,
  errorloadingvideo: false,
  message: "",
  error: "",
  meeting: "",
  attende: ""
};
const getters = {};
const actions = {
  [A_JOIN_TEST]({ commit }, param) {
    setUser(JSON.stringify(param));
    console.log("login", param);
    return router.replace("/home");
  },
  [A_JOIN]({ commit }, param) {
    return ApiService.post("/join", param)
      .then(({ data }) => {
        if (data.created) {
          setMeeting(JSON.stringify(data.detail));
          setUser(
            JSON.stringify({
              username: this.username,
              password: this.password
            })
          );

          commit(SET_MEETING, {
            meeting: data.detail.meeting.Meeting,
            attende: data.detail.attende.Attendee
          });
          console.log("true auto");
          router.replace("/home");
        } else {
          console.log("false auto");
          router.replace("/result");
        }
      })
      .catch(err => {
        console.log("err auto", err);
        router.replace("/result");
      });
  },
  [A_CREATE]({ commit }, data) {
    return ApiService.post("/create", data)
      .then(({ data }) => {
        if (data.created) {
          setMeeting(JSON.stringify(data.detail));
          setUser(
            JSON.stringify({
              username: this.username,
              password: this.password
            })
          );

          commit(SET_MEETING, {
            meeting: data.detail.meeting.Meeting,
            attende: data.detail.attende.Attendee
          });
          console.log("true auto");
          this.$router.replace("/home");
        } else {
          console.log("false auto");
          this.$router.replace("/result");
        }
      })
      .catch(err => {
        console.log("err auto", err);
        this.$router.replace("/result");
      });
  }
};
const mutations = {
  [SET_MEETING](state, data) {
    state.meeting = data.meeting;
    state.attende = data.attende;
  },
  [DROP_MEETING](state) {
    state.meeting = null;
    state.attende = null;
    dropMeeting();
  },
  [SET_VIDEOSCREEN](state, status) {
    status
      ? (state.videoScreen = status)
      : (state.videoScreen = !state.videoScreen);
  },
  [SET_CHATSCREEN](state, status) {
    status
      ? (state.chatScreen = status)
      : (state.chatScreen = !state.chatScreen);
  },
  [SET_MODALINVIT](state, status) {
    status
      ? (state.modalInvit = status)
      : (state.modalInvit = !state.modalInvit);
  },
  [SET_MODALTEST](state, status) {
    status ? (state.modalTest = status) : (state.modalTest = !state.modalTest);
  }
};
export default {
  state,
  actions,
  mutations,
  getters
};
