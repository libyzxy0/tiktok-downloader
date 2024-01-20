<script setup>
  const redirectSponsor = () => {
    alert('You will be redirected to kenliejugarap.com')
    window.location.href = 'https://kenliejugarap.com';
  }
</script>
<template>
  <div class="fixed bg-gradient-to-tl from-slate-900 to-slate-700 bg-gradient-to-r w-full h-screen z-20 opacity-95 overflow-y-auto">
    <nav class="w-full h-16 flex justify-between items-center fixed">
      <h1 class="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-bold text-2xl mx-4">TikDown.click</h1>
      <div class="flex flex-row mx-4">
        <button class="py-2 px-4 bg-white border-none outline-none rounded-full" @click="redirectSponsor()">Sponsor</button>
      </div>
    </nav>
    <h1 class="text-center text-purple-400 text-[33px] mx-4 mt-20 font-bold bg-gradient-to-r from-purple-500 via-red-400 to-pink-500 bg-clip-text text-transparent">Download Tiktok Video using Link!</h1>
    <div class="flex flex-col justify-center items-center mt-5">
      <div class="h-12 w-[80%] rounded-full bg-gradient-to-r from-purple-500 via-red-500 to-pink-500 p-[1px]">
        <input type="url" class="outline-none w-full h-full rounded-full bg-slate-700 px-4 py-2 text-white font-medium" placeholder="Enter tiktok url.">
      </div>
      <button class="border-none bg-gradient-to-r from-purple-500 via-red-500 to-pink-500 w-[80%] py-3 rounded-full mt-4 shadow text-white font-medium">Download</button>
    </div>
    <div class="mt-3 flex flex-col mx-8 mt-14">
      <h1 class="text-xl font-bold bg-gradient-to-r from-purple-500 via-red-400 to-pink-500 bg-clip-text text-transparent">How to download?</h1>
      <p class="font-medium text-white mt-1"><b class="bg-gradient-to-r from-purple-500 via-red-400 to-pink-500 bg-clip-text text-transparent">Step 1: </b>
      Paste the tiktok link.</p>
      <p class="font-medium text-white mt-1"><b class="bg-gradient-to-r from-purple-500 via-red-400 to-pink-500 bg-clip-text text-transparent">Step 2: </b>Click the 'Download' button.</p>
      <p class="font-medium text-white mt-1"><b class="bg-gradient-to-r from-purple-500 via-red-400 to-pink-500 bg-clip-text text-transparent">Step 3: </b>Choose format, mp4 or mp3.</p>
    </div>
    <h1 class="text-white font-bold text-center mt-16 text-3xl mx-5 sm:mt-8">This website is sponsored by <a href="https://kenliejugarap.com" class="bg-gradient-to-r from-purple-500 via-red-400 to-pink-500 bg-clip-text text-transparent">kenliejugarap.com</a></h1>
  </div>
  <div class="h-screen w-full bg-black flex justify-center items-center z-10 relative">
    <img src="~/assets/images/images.jpeg" class="w-[20rem] h-[20rem] filter blur-[3px] brightness-75">
  </div>
</template>
