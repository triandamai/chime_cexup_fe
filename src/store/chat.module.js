/**
 * Author : Trian Damaia
 * Date  28 December 2020
 * Time 13.50
 * Chime video conference
 * */

import firebase from "firebase/app";
import { getIdMeeting, getUser } from "../services/jwt.service";

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
    const user = JSON.parse(getUser());
    firebase
      .database()
      .ref(BASE_CHAT_REF + user.meetingId)
      .set({
        id: id,
        host: host
      })
      .then(() => {})
      .catch(() => {});
  },
  [SEND_MESSAGE]({ commit }, param) {
    const user = JSON.parse(getUser());
    firebase
      .database()
      .ref(BASE_CHAT_REF + user.meetingId)
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
