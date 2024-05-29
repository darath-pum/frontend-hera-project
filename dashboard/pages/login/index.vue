<template>
    <div class="fixed h-screen w-screen flex justify-center bg-gray-300 items-center">
      <form action=""class="" @submit.prevent="login">
          <div class="flex">
              <div class="bg-white p-[30px] pb-[8rem] pt-[3rem] shadow-md">
                  <h2 class="text-center text-[2.1rem] font-bold select-none">Admin</h2>
                  <div>
                      <input type="email" placeholder="Email" v-model="email" />
                  </div>
                  <div>
                      <input type="password" placeholder="Password" v-model="password"/>
                  </div>
                  <div>
                      <button class="bg-black text-white" @click="login">Login</button>
                  </div>
              </div>
              <div class="bg-black p-[10px] w-[19rem] pt-[3rem]  shadow-md">
                  <span class="material-symbols-outlined flex justify-center text-white select-none"> account_circle </span>
                  <h2 class="text-[1.4rem] text-center text-white select-none">Admin</h2>
                  <hr class="m-[17px]">
              </div>
          </div>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
      import { ref} from 'vue';
      import { useRouter } from 'vue-router'
      const router = useRouter();
      const email = ref('');
      const password = ref('');
    
      const loginPlayer = (event:any) =>{
          if ( email.value !== '' && password.value != '') {
              alert("success")
              router.push('/');
              event.preventDefault()
          }
          else {
              alert("Email or Password invalid")
          }
      }

      const login = async() => {
        let data = {
            email:email.value,
            password:password.value
        }
        const res = await callAPI('/dashboard/user/login', 'POST',data);
        console.log(res)
      }
  </script>
  
  <style scoped>
  input,button {
      padding: 0.5rem;
      margin:15px;
      width: 23rem;
      border-radius:10px;
      border:2px solid;
  }
  input {
      background-color:#ffffff93;
  }
  .material-symbols-outlined {
      font-size:8rem;
  }
  ::placeholder {
      color:#787171;
  }
  </style>