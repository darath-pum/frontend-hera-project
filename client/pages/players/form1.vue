<template>
    <div class="form-container flex justify-center max-sm:bg-[#EF88A7] max-sm:h-screen max-sm:w-screen max-sm:fixed ">
      <form action=""class="bg-[#EF88A7] max-sm:mt-2  mt-20 p-12 pb-24">
        <h2 class="text-4xl text-center text-white">Register</h2>
        <div class="flex justify-center items-center">
          <img src="../../assets/image/cute_heart.png" alt="" />
        </div>
        <div>
          <div>
            <input class="max-sm:m-2.5 max-sm:p-2 max-sm:w-80 max-sm:rounded-xl m-3 w-96 p-2 rounded-xl" type="text" placeholder="  First name" />
          </div>
          <div>
            <input class="max-sm:m-2.5 max-sm:p-2 max-sm:w-80  max-sm:rounded-xl m-3 w-96 p-2 rounded-xl"  type="text" placeholder="  Last name" />
          </div>
          <div>
            <input class="max-sm:m-2.5 max-sm:p-2 max-sm:w-80  max-sm:rounded-xl m-3 w-96 p-2 rounded-xl" type="number" placeholder="  Phone number" />
          </div>
          <div>
              <button class="bg-red-600 text-white select-none max-sm:m-2.5 max-sm:p-2 max-sm:w-80 max-sm:rounded-xl m-3 w-96 rounded-xl p-2">Submit</button>
          </div>
        </div>
      </form>
    </div>
  </template>

  <style scoped>
    h1,img{
    user-select:none;
    }
    img {
    height:12rem;
  }
  </style>
  