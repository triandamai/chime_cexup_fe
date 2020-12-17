<template>
  <!-- component -->
  <!-- This is an example component -->
  <div class="h-screen w-screen bg-gray-100 flex items-center">
    <div
      class="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700"
    >
      <div class="max-w-md">
        <div class="text-5xl font-dark font-bold mb-3">Oops..</div>
        <p class="text-2xl md:text-3xl font-light leading-normal">
          Maaf tidak dapat menemukan room.
        </p>
        <p class="mb-8">
          Ini mungkin terjadi karena room tidak ada atau sudah berakhir.
        </p>

        <router-link
          to="/login"
          class="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700"
        >
          buat room baru
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
