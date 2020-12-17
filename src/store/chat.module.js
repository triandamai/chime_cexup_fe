import firebase from "firebase";
import { getIdMeeting } from "../services/jwt.service";

//
export const BASE_CHAT_REF = "CHAT/";
export const CREATE_CHAT = "createchat";
export const SEND_MESSAGE = "sendmessage";
export const DELETE_MESSAGE = "delete";
export const ADD_CHAT = "";
export const ADD_CHATS = "addchats";
export const REMOVE_CHAT = "";

const state = {
  message: []
};
const getters = {};
const actions = {
  [CREATE_CHAT]({ commit }, param) {
    const { id, host } = getIdMeeting();
    firebase
      .database()
      .ref(BASE_CHAT_REF + id)
      .set({
        id: id,
        host: host
      })
      .then(() => {})
      .catch(() => {});
  },
  [SEND_MESSAGE]({ commit }, param) {
    firebase
      .database()
      .ref("/CHAT")
      .push()
      .set(param);
  },
  [DELETE_MESSAGE]({ commit }, param) {
    firebase
      .database()
      .ref()
      .remove()
      .then(() => {})
      .catch(() => {});
  }
};
const mutations = {
  [ADD_CHAT](state, data) {
    state.message.push(data);
  },
  [ADD_CHATS](state, data) {
    state.message = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
