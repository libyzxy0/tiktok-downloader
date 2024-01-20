<script setup>
  const url = ref("");
  const btnIsLoading = ref(false);
  const isError = ref(false);
  const downloaded = ref({});
  const clickDownload = async () => {
  // downloadDialog.showModal();
  btnIsLoading.value = true;
  try {
    const response = await fetch('https://api.tikdown.click/api?url=' + url.value);

    if (!response.ok) {
      isError.value = true;
      setTimeout(() => {
        isError.value = false;
      }, 3000)
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if(!data?.id) {
      isError.value = true;
      setTimeout(() => {
        isError.value = false;
      }, 3000)
    }
    btnIsLoading.value = false;

    downloaded.value = data;
    downloadDialog.showModal();
  } catch (error) {
    isError.value = true;
      setTimeout(() => {
        isError.value = false;
      }, 3000)
    console.error("Error during API request:", error);
    btnIsLoading.value = false;
  }
};

const downloadOnDevice = (type) => {
  const urlToDownload = `https://api.tikdown.click/api/download/${type}/${downloaded.value.id}`;
  window.location.href = urlToDownload;
};
</script>
<template>
  <dialog id="downloadDialog" class="modal">
  <div class="modal-box bg-slate-700">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white">✕</button>
    </form>
    <h3 class="font-bold text-2xl bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Download</h3>
    <p class="py-4 text-white">{{ downloaded?.id ? `@${downloaded?.author?.unique_id}(${downloaded?.author?.nickname}) | ${downloaded.title ? downloaded?.title + '|' : '' } ${downloaded.play_count} views | ${downloaded.region}` : 'Loading' }}</p>
    <div class="flex flex-col items-center">
      <div class="w-auto h-auto rounded-xl mb-5 bg-gradient-to-tl from-slate-900 to-slate-700 bg-gradient-to-r ring-1 ring-purple-400 shadow">
        <video v-if="downloaded.id" controls :poster="'https://www.tikwm.com' + downloaded.cover" class="rounded-xl w-[19rem] h-[19rem]">
          <source :src="downloaded?.id ? `https://www.tikwm.com/video/media/hdplay/${downloaded.id}.mp4` : ''">
        </video>
      </div>
      <button @click="downloadOnDevice('hd')" class="btn bg-gradient-to-r from-purple-500 to-pink-500 py-3 w-[90%] border-none rounded-full shadow text-white">Download HD</button>
      <button @click="downloadOnDevice('nl')" class="btn bg-gradient-to-r from-purple-500 to-pink-500 py-3 w-[90%] border-none rounded-full shadow text-white mt-2">Download 720p</button>
       <button @click="downloadOnDevice('wm')" class="btn bg-gradient-to-r from-purple-500 to-pink-500 py-3 w-[90%] border-none rounded-full shadow text-white mt-2">Download with watermark</button>
    </div>
  </div>
  </dialog>
  <div class="bg-gradient-to-tl from-slate-800 to-slate-900 bg-gradient-to-r w-full h-screen opacity-90 overflow-y-auto pb-5">
    <Navbar />
    <h1 class="text-center text-purple-400 text-[30px] md:text-[40px] mx-4 mt-7 font-bold bg-gradient-to-r from-purple-500 via-red-400 to-pink-500 bg-clip-text text-transparent mt-20">Download Tiktok Video without watermark!</h1>
    <div class="flex flex-col justify-center items-center my-4">
      <div :class="isError ? 'bg-red-500' : 'bg-gradient-to-r from-purple-500 via-red-500 to-pink-500'" class="h-12 w-[85%] md:w-[60%] rounded-full p-[1.5px]">
        <input v-model="url" type="text" class="outline-none w-full h-full rounded-full bg-slate-700 px-4 py-2 text-white font-medium" placeholder="Enter tiktok url.">
      </div>
      <button class="border-none bg-gradient-to-r from-purple-500 via-pink-500 to-red-400 w-[85%] md:w-[60%] py-3 rounded-full mt-4 shadow text-white font-medium btn text-[16px] shadow" @click="clickDownload">{{ btnIsLoading ? 'Downloading' : 'Download' }}</button>
    </div>
    <Line />
    <HowToDownload />
    <Line />
    <Footer />
  </div>
</template>
