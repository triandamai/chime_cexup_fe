import ApiService from "../services/api.service";
import { dropMeeting, setMeeting, setUser } from "../services/jwt.service";

import router from "../router/index";

//action
export const A_JOIN = "join";
export const A_JOIN_TEST = "jointes";

export const A_CREATE = "create";
export const A_CREATE_UPDATE_MEETING = "updatemeetfordoctor";
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
  modalTest: true,
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
        const payload = data.data;
        console.log("join", payload);
        setMeeting(
          JSON.stringify({
            meeting: payload.meeting,
            attende: payload.attendee
          })
        );
        setUser(JSON.stringify(payload.user));
        commit(SET_MEETING, {
          meeting: payload.meeting,
          attende: payload.attendee
        });
        console.log("true auto");
        router.replace("/home");
      })
      .catch(err => {
        console.log("err auto", err);
        router.replace("/result");
      });
  },
  [A_CREATE]({ commit }, data) {
    return ApiService.post("/create", data)
      .then(({ data }) => {
        const payload = data.data;
        console.log("create", payload);
        setMeeting(
          JSON.stringify({
            meeting: payload.meeting,
            attende: payload.attendee
          })
        );
        setUser(JSON.stringify(payload.user));
        commit(SET_MEETING, {
          meeting: payload.meeting,
          attende: payload.attendee
        });
        console.log("true auto");
        router.replace("/home");
      })
      .catch(err => {
        console.log("err auto", err);
        router.replace("/result");
      });
  },
  [A_CREATE_UPDATE_MEETING]({ commit }, data) {
    return fetch("", { method: "POST", headers: {}, body: data })
      .then(async response => {
        const data = await response.json();
        if (!response.ok()) {
        }
      })
      .catch(error => {});
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
