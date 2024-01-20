<script setup>
  const sponsor = () => {
    window.location.href = 'https://kenliejugarap.com';
  }
  const author = () => {
    alert('This website is made by Jan Liby Dela Costa.')
  };
  const url = ref("");
  const btnIsLoading = ref(false);
  const isError = ref(false);
  const downloaded = ref({});
  const isDownloading = ref(false);
  const clickDownload = async () => {
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

const downloadOnDevice = () => {
  const downloadableUrl = `https://www.tikwm.com/video/media/hdplay/${downloaded.value.id}.mp4`;
  isDownloading.value = true;
  const currentDate = new Date();
  const formattedDate = `${currentDate.getMonth() + 1}_${currentDate.getDate()}_${currentDate.getFullYear()}`;
  const randomString = Math.random().toString(36).substring(2, 15);

  const fileName = `tikdown.click_${formattedDate}_${randomString}.mp4`;
  fetch(downloadableUrl)
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      isDownloading.value = false;
    })
    .catch(error => { 
      isDownloading.value = false;
      console.error('Download failed:', error)
    });
};

</script>
<template>
  <dialog id="downloadDialog" class="modal">
  <div class="modal-box bg-slate-700">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white">✕</button>
    </form>
    <h3 class="font-bold text-2xl bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Download</h3>
    <p class="py-4 text-white">Choose format you want to download.</p>
    <div class="flex flex-col items-center">
      <div class="w-auto h-auto rounded-xl mb-5 bg-gradient-to-tl from-slate-900 to-slate-700 bg-gradient-to-r ring-1 ring-purple-400 shadow">
        <video v-if="downloaded.id" controls :poster="'https://www.tikwm.com' + downloaded.cover" class="rounded-xl w-[19rem] h-[19rem]">
          <source :src="downloaded?.id ? `https://www.tikwm.com/video/media/hdplay/${downloaded.id}.mp4` : ''">
        </video>
      </div>
      <button @click="downloadOnDevice" class="btn bg-gradient-to-r from-purple-500 to-pink-500 py-3 w-[90%] border-none rounded-full shadow text-white">{{ isDownloading ? 'Maghintay ka muna' : 'Download Video' }}</button>
    </div>
  </div>
  </dialog>
  <div class="fixed bg-gradient-to-tl from-slate-900 to-slate-700 bg-gradient-to-r w-full h-screen z-20 opacity-95 overflow-y-auto">
    <nav class="w-full h-16 flex justify-between items-center">
      <h1 class="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-bold text-2xl mx-4">TikDown.click</h1>
      <div class="flex flex-row mx-4">
          <button class="py-2 px-4 w-full bg-gradient-to-r from-purple-500 to-pink-500 border-none outline-none rounded-full shadow mx-1 text-white" @click="author()">Author</button>
        <button class="py-2 px-4 bg-white border-none outline-none rounded-full shadow mx-1" @click="sponsor()">Sponsor</button>
      </div>
    </nav>
    <h1 class="text-center text-purple-400 text-[33px] mx-4 mt-7 font-bold bg-gradient-to-r from-purple-500 via-red-400 to-pink-500 bg-clip-text text-transparent">Download Tiktok Video using Link!</h1>
    <div class="flex flex-col justify-center items-center my-5">
      <div :class="isError ? 'bg-red-500' : 'bg-gradient-to-r from-purple-500 via-red-500 to-pink-500'" class="h-12 w-[80%] rounded-full p-[1.5px]">
        <input v-model="url" type="text" class="outline-none w-full h-full rounded-full bg-slate-700 px-4 py-2 text-white font-medium" placeholder="Enter tiktok url.">
      </div>
      <button class="border-none bg-gradient-to-r from-purple-500 via-red-500 to-pink-500 w-[80%] py-3 rounded-full mt-4 shadow text-white font-medium btn" @click="clickDownload">{{ btnIsLoading ? 'Downloading' : 'Download' }}</button>
    </div>
    <div class="mt-3 flex flex-col items-center mx-8">
      <h1 class="text-xl font-bold bg-gradient-to-r from-purple-500 via-red-400 to-pink-500 bg-clip-text text-transparent">How to download?</h1>
      <p class="font-medium text-white mt-1 text-center"><b class="bg-gradient-to-r from-purple-500 via-red-400 to-pink-500 bg-clip-text text-transparent">Step 1: </b><br>Paste the tiktok link.</p>
      <p class="font-medium text-white mt-1 text-center"><b class="bg-gradient-to-r from-purple-500 via-red-400 to-pink-500 bg-clip-text text-transparent">Step 2: </b><br>Click the 'Download' button.</p>
      <p class="font-medium text-white mt-1 text-center"><b class="bg-gradient-to-r from-purple-500 via-red-400 to-pink-500 bg-clip-text text-transparent">Step 3: </b><br>Choose format, mp4 or mp3.</p>
    </div>
    <h1 class="text-white font-bold text-center mt-10 text-2xl mx-5">This website is sponsored by <a href="https://kenliejugarap.com" class="bg-gradient-to-r from-purple-500 via-red-400 to-pink-500 bg-clip-text text-transparent">kenliejugarap.com</a></h1>
    <p class="text-center text-gray-600 mt-10">© Copyright 2023, <a href="https://tikdown.click" class="bg-gradient-to-r from-purple-500 via-red-400 to-pink-500 bg-clip-text text-transparent">TikDown.click</a> all rights reserved.</p>
  </div>
  <div class="h-screen w-full bg-black flex justify-center items-center z-10 relative">
    <img src="~/assets/images/images.jpeg" class="w-[20rem] h-[20rem] filter blur-[3px] brightness-75">
  </div>
</template>
