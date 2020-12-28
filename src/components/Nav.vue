<template>
  <nav class="z-10 bg-gray-900">
    <div class="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <button
            @click="$emit('close', true)"
            class="inline-flex items-center justify-center p-2 mr-2 text-white rounded-md hover:text-white hover:bg-gray-700 focus:bg-transparent focus:outline-none focus:border-transparent"
            aria-expanded="false"
          >
            <svg
              class="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div
          class="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start"
        >
          <div class="flex items-center flex-shrink-0">
            <img
              class="block w-auto h-8 lg:hidden"
              :src="require('../assets/cexup.png')"
              alt="Workflow"
            />
            <img
              class="hidden w-auto h-8 lg:block"
              :src="require('../assets/cexup.png')"
              alt="Workflow"
            />
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <!-- message -->

          <button
            @click="$emit('open-chat', true)"
            class="px-4 py-2 mr-2 text-white bg-gray-800 rounded-md hover:text-white focus:outline-none"
          >
            <svg
              class="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
              />
            </svg>
          </button>
          <!-- add -->
          <button
            @click="$emit('invit', true)"
            class="px-4 py-2 ml-2 text-white bg-gray-800 rounded-md focus:outline-none"
          >
            <svg
              class="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {};
</script>
