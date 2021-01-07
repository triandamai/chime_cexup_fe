/**
 * Author : Trian Damaia
 * Date  28 December 2020
 * Time 13.50
 * Chime video conference
 * */

<template>
  <div class="fixed z-20 flex w-full h-screen bg-transparent select-none">
    <div class="fixed w-full h-screen min-w-full bg-gray-800 opacity-90"></div>
    <div
      class="fixed justify-between w-full h-screen min-w-full mt-10 bg-transparent"
    >
      <div class="relative mb-8 overflow-hidden border-grey-light">
        <div class="p-4 py-8 bg-grey-lighter">
          <div
            class="max-w-sm mx-auto overflow-hidden bg-white rounded-sm shadow-lg opacity-100"
          >
            <div class="px-2 py-4 sm:flex sm:items-center">
              <div class="flex-grow">
                <h3 class="px-2 py-3 font-normal leading-tight">
                  Tambah Peserta
                </h3>
                <input
                  type="text"
                  v-model="externalId"
                  placeholder="xsYfs"
                  class="w-full h-10 p-3 my-2 text-sm rounded bg-grey-light text-grey-darkest focus:outline-none"
                />
                <!-- <div class="w-full">
                  <div
                    class="flex my-1 rounded cursor-pointer hover:bg-blue-lightest"
                  >
                    <div class="w-4/5 h-10 px-1 py-3">
                      <p class="hover:text-blue-dark">Undang Peserta</p>
                    </div>
                  </div>
                </div> -->
              </div>
            </div>
            <div class="px-2 py-4 sm:flex bg-grey-light sm:items-center">
              <div class="flex-grow text-right">
                <button
                  @click="$emit('cancel-modal', true)"
                  class="px-4 py-2 rounded text-grey-darkest hover:text-grey-dark"
                >
                  Cancel
                </button>
                <button
                  @click="copyId"
                  class="px-4 py-2 text-blue-500 rounded bg-blue hover:bg-blue-dark"
                >
                  Copy
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
import { getUser } from "../services/jwt.service";
export default {
  data: () => {
    return {
      externalId: "",
    };
  },
  created() {
    this.setExternalId();
  },
  methods: {
    setExternalId() {
      const user = JSON.parse(getUser());
      this.externalId = `${window.location.origin}/join/?mid=${user.externalId}`;
    },
    copyId() {
      console.log();
    },
  },
};
</script>
