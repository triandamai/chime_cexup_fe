<template>
  <footer class="w-full text-center border-t border-grey p-4 pin-b">
    <div class="flex">
      <!-- camera -->
      <a
        href="#"
        @click="$emit('camera-meeting', true)"
        class="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          width="25"
          height="25"
          viewBox="0 0 42 42"
          class="inline-block mb-1"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      </a>
      <!-- michrophone -->
      <a
        href="#"
        @click="$emit('mic-meeting', true)"
        class="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          width="25"
          height="25"
          viewBox="0 0 42 42"
          class="inline-block mb-1"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          />
        </svg>
      </a>
      <!-- audio -->
      <a
        href="#"
        @click="$emit('audio-meeting', true)"
        class="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          width="25"
          height="25"
          viewBox="0 0 42 42"
          class="inline-block mb-1"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
          />
        </svg>
      </a>
      <!-- more -->
      <a
        href="#"
        @click="$emit('menu-meeting', true)"
        class="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          width="25"
          height="25"
          viewBox="0 0 42 42"
          class="inline-block mb-1"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
          />
        </svg>
      </a>
      <!-- end chat -->
      <a
        href="#"
        @click="$emit('end-meeting', true)"
        class="w-full focus:text-teal-500 text-red-700 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          width="25"
          height="25"
          viewBox="0 0 42 42"
          class="inline-block mb-1"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z"
          />
        </svg>
      </a>
    </div>
  </footer>
</template>
<script>
export default {};
</script>
