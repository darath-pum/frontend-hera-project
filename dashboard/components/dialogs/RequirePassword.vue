<template>
    <div class=" ">
        <div id="talkbubble" class="p-5">
            <h1 class="text-xl font-bold">Password must be: </h1>
            <div class="flex mt-2">
                <span class="material-symbols-outlined  text-green-500">check</span>
                <span>Minimum 8 characters long</span>
            </div>
            <div class="flex mt-2">
                <span class="material-symbols-outlined  text-green-500">check</span>
                <span>Include at least one uppercase. ex: A-Z</span>
            </div>
            <div class="flex mt-2">
                <span class="material-symbols-outlined  text-green-500">check</span>
                <span>Include at least one lowercase. ex: a-z</span>
            </div>
            <div class="flex mt-2">
                <span class="material-symbols-outlined  text-green-500">check</span>
                <span>Include at least one number or digit. ex: 0-9</span>
            </div>
            <div class="flex mt-2">
                <span class="material-symbols-outlined text-green-500">check</span>
                <span>Include at least one special character. ex: [!, @, # ,$, %, ^, &, *]</span>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">

</script>

<style scoped>
#talkbubble {
    width: 33rem;
    height: 16rem;
    background:#cbd5e1;
    position: relative;
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
    border-radius: 10px;
}
#talkbubble:before {
  content: "";
  position: absolute;
  right: 100%;
  top: 100px;
  width: 0;
  height: 0;
  border-top: 13px solid transparent;
  border-right: 26px solid #cbd5e1;
  border-bottom: 13px solid transparent;
}

</style>