/* eslint-disable */
const ID_TOKEN_KEY = "id_token";
const USER_KEY = "zxsas";
const MEETING_KEY = "sadha";

export const getToken = () => {
  return window.sessionStorage.getItem(ID_TOKEN_KEY);
};

export const saveToken = token => {
  window.sessionStorage.setItem(ID_TOKEN_KEY, token);
};

export const destroyToken = () => {
  window.sessionStorage.removeItem(ID_TOKEN_KEY);
};

export const getUser = () => {
  return window.sessionStorage.getItem(USER_KEY);
};

export const setUser = user => {
  window.sessionStorage.setItem(USER_KEY, user);
};
export const dropUser = () => {
  window.sessionStorage.removeItem(USER_KEY);
};

export const getMeeting = () => {
  return window.sessionStorage.getItem(MEETING_KEY);
};
export const setMeeting = data => {
  window.sessionStorage.setItem(MEETING_KEY, data);
};

export const dropMeeting = () => {
  window.sessionStorage.removeItem(MEETING_KEY);
};

export const getIdMeeting = () => {
  return {
    id: window.sessionStorage.getItem("id"),
    host: window.sessionStorage.getItem("idTest")
  };
};

export default {
  getToken,
  saveToken,
  destroyToken,
  getUser,
  setUser,
  dropUser,
  getMeeting,
  setMeeting,
  dropMeeting,
  getIdMeeting
};
