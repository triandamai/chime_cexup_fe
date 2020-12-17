<template>
  <div
    style="height:78vh;"
    class="z-0 bg-transparent  w-full flex  select-none"
  >
    <div class="fixed bg-gray-800 opacity-80 h-screen w-full min-w-full"></div>
    <div class="fixed bg-transparent h-screen w-full min-w-full">
      <div class="relative  overflow-hidden  border-grey-light mb-8 ">
        <div class="p-4 bg-grey-lighter py-8">
          <div
            class="bg-white opacity-100 mx-auto max-w-sm shadow-lg rounded-lg overflow-hidden"
          >
            <div class="sm:flex sm:items-center px-2 py-4">
              <div class="flex-grow">
                <h3 class="font-normal px-2 py-3 leading-tight">
                  Tambah Peserta
                </h3>
                <input
                  type="text"
                  placeholder="https://meeting.cexup.com/xsYfs"
                  class="my-2 w-full text-sm bg-grey-light text-grey-darkest rounded h-10 p-3 focus:outline-none"
                />
                <div class="w-full">
                  <div
                    class="flex my-1 cursor-pointer hover:bg-blue-lightest rounded"
                  >
                    <div class="w-4/5  h-10 py-3 px-1">
                      <p class="hover:text-blue-dark">Undang Peserta</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="sm:flex bg-grey-light sm:items-center px-2 py-4">
              <div class="flex-grow text-right">
                <button
                  @click="$emit('cancel-modal', true)"
                  class="text-grey-darkest hover:text-grey-dark py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  class="bg-blue hover:bg-blue-dark text-blue-300 py-2 px-4 rounded"
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
export default {};
</script>
