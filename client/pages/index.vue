<script setup>
  useSeoMeta({
    title: "Tikdown: Download Tiktok Video without watermark.", 
    description: "Download Tiktok Video with tikdown.click without watermark.", 
    ogTitle: "Tikdown: Download Tiktok Video without watermark.",
    ogDescription: "Download Tiktok Video with tikdown.click without watermark.",
    ogImage: "https://tikdown.click/favicon.ico", 
    ogImageAlt: "Tikdown: Download Tiktok Video without watermark."
  })
  const url = ref("");
  const btnIsLoading = ref(false);
  const isError = ref(false);
  const error = ref({});
  const downloaded = ref({});
  const showError = (title, msg) => {
    error.value.message = msg;
    error.value.title = title;
    alertModal.showModal();
    setTimeout(() => {
      alertModal.close();
      error.value.message = "";
      error.value.title = "";
    }, 3000)
  }
  const clickDownload = async () => {
  btnIsLoading.value = true;
  if(!url.value) {
    isError.value = true;
    btnIsLoading.value = false;
    setTimeout(() => {
      isError.value = false;
    }, 3000)
    showError("Oppsss.. Error", "Missing tiktok url!");
    return;
  }
  try {
    const response = await fetch('https://api.tikdown.click/api?url=' + url.value);
    if (!response.ok) {
      isError.value = true;
      setTimeout(() => {
        isError.value = false;
      }, 3000)
      showError("Error " + response.status, "Please check your video url!")
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data)
    if(!data?.hd) {
      isError.value = true;
      setTimeout(() => {
        isError.value = false;
      }, 3000)
      showError("Oppsss.. Error", "Failed to download video!")
    }
    btnIsLoading.value = false;

    downloaded.value = data;
    downloadDialog.showModal();
  } catch (error) {
    isError.value = true;
      setTimeout(() => {
        isError.value = false;
      }, 3000)
    showError("Oppsss.. Error!", "Please check your video url!")
    console.error("Error during API request:", error);
    btnIsLoading.value = false;
  }
};

const downloadOnDevice = (type) => {
  if(type == 'hd') {
    const urlToDownload = `${downloaded.value.hd}`;
    window.location.href = urlToDownload;
  } else if (type == 'mp4') {
    const urlToDownload = `${downloaded.value.mp4}`;
    window.location.href = urlToDownload;
  } else if(type == 'mp3') {
    const urlToDownload = `${downloaded.value.mp3}`;
    window.location.href = urlToDownload;
  }
  downloaded.value = {};
};
</script>
<template>
  <dialog id="alertModal" class="modal">
  <div class="modal-box bg-gradient-to-tl from-gray-900 to-gray-950 bg-gradient-to-r shadow">
    <h3 class="font-bold text-lg text-red-500">{{ error.title }}</h3>
    <p class="py-4 text-white">{{ error.message }}</p>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
  <dialog id="downloadDialog" class="modal">
  <div class="modal-box bg-gradient-to-tl from-gray-900 to-gray-950 bg-gradient-to-r shadow">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white">✕</button>
    </form>
    <h3 class="font-bold text-2xl bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Download</h3>
    <p class="py-4 text-white">{{ downloaded?.hd ? `@${downloaded?.data.user?.unique_id}(${downloaded?.data.user?.nickname}) | ${downloaded.data.title ? downloaded?.data.title + '|' : '' } ${downloaded.data.views} views | ${downloaded.data.region}` : 'Loading...' }}</p>
    <div class="flex flex-col items-center">
      <div class="w-auto h-auto rounded-xl mb-5 bg-gradient-to-tl from-slate-900 to-slate-700 bg-gradient-to-r ring-1 ring-purple-400 shadow">
        <video v-if="downloaded.hd" controls :poster="downloaded.poster" class="rounded-xl w-[19rem] h-[19rem]">
          <source :src="downloaded?.hd ? downloaded.playback : ''">
        </video>
      </div>
      <button @click="downloadOnDevice('hd')" class="btn bg-gradient-to-r from-purple-500 to-pink-500 py-3 w-[90%] border-none rounded-full shadow text-white">Download HD</button>
      <button @click="downloadOnDevice('mp4')" class="btn bg-gradient-to-r from-purple-500 to-pink-500 py-3 w-[90%] border-none rounded-full shadow text-white mt-2">Download 720p</button>
       <button @click="downloadOnDevice('mp3')" class="btn bg-gradient-to-r from-purple-500 to-pink-500 py-3 w-[90%] border-none rounded-full shadow text-white mt-2">Download MP3</button>
    </div>
  </div>
  </dialog>
  <div class="bg-gradient-to-tl from-slate-800 to-slate-900 bg-gradient-to-r w-full h-screen opacity-90 overflow-y-auto">
    <Navbar />
    <h1 class="text-center text-purple-400 text-[30px] md:text-[40px] mx-4 mt-8 font-bold bg-gradient-to-r from-purple-500 via-red-400 to-pink-500 bg-clip-text text-transparent mt-[5rem]">Download Tiktok Video without watermark!</h1>
    <div class="flex flex-col justify-center items-center my-4">
      <div :class="isError ? 'bg-red-500' : 'bg-gradient-to-r from-purple-500 via-red-500 to-pink-500'" class="h-12 w-[85%] md:w-[60%] rounded-full p-[1.5px]">
        <input v-model="url" type="text" class="outline-none w-full h-full rounded-full bg-slate-700 px-4 py-2 text-white font-medium" placeholder="Enter tiktok url.">
      </div>
      <button class="border-none bg-gradient-to-r from-purple-500 via-pink-500 to-red-400 w-[85%] md:w-[60%] py-3 rounded-full mt-4 shadow text-white font-medium btn text-[16px] shadow" @click="clickDownload"><span v-if="btnIsLoading" class="loading loading-dots loading-md"></span><p v-else>Download</p></button>
    </div>
    <Line />
    <HowToDownload />
    <Line />
    <Footer />
  </div>
</template>
