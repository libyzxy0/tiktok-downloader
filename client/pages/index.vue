<script setup>
  const sponsor = () => {
    window.location.href = 'https://kenliejugarap.com';
  }
  const author = () => {
    alert('This website is made by Jan Liby Dela Costa.')
  }
  const url = ref("");
  const btnIsLoading = ref(false);
  const downloaded = ref({});
  const clickDownload = () => {
    const { pending, data } = useFetch('https://api.tikdown.click/api?url=' + url, {
      lazy: true,
      server: false
    });
    if(pending) {
      btnIsLoading.value = true;
    } else {
      btnIsLoading.value = false;
      downloaded.value = data;
      alert(JSON.stringify(data))
      downloadDialog.showModal();
    }
  }
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
        <video controls poster="" class="rounded-xl w-[19rem] h-[19rem]">
          <source src="">
        </video>
      </div>
      <button class="btn bg-gradient-to-r from-purple-500 to-pink-500 py-3 w-[90%] border-none rounded-full shadow text-white">Download mp4</button>
      <button class="btn bg-gradient-to-r from-purple-500 to-pink-500 py-3 w-[90%] border-none rounded-full shadow mt-3 text-white">Download mp3</button>
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
      <div class="h-12 w-[80%] rounded-full bg-gradient-to-r from-purple-500 via-red-500 to-pink-500 p-[1px]">
        <input v-model="url" type="text" class="outline-none w-full h-full rounded-full bg-slate-700 px-4 py-2 text-white font-medium" placeholder="Enter tiktok url.">
      </div>
      <button class="border-none bg-gradient-to-r from-purple-500 via-red-500 to-pink-500 w-[80%] py-3 rounded-full mt-4 shadow text-white font-medium btn" @click="clickDownload">Download</button>
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
