<template>
    <div class="fixed h-screen w-screen flex justify-center bg-gray-300 items-center">
      <form action=""class="" @submit.prevent="login">
          <div class="flex">
              <div class="bg-white p-[30px] pb-[8rem] w-[28rem] pt-[3rem] shadow-md">
                  <h2 class="text-center text-[2.1rem] font-bold select-none">Sign In</h2>
                  <div class="flex flex-col gap-7">
                      <div>
                        <label class="font-bold" for="">Email</label><br>
                        <input type="email" placeholder="Email" v-model="email" />
                      </div>
                      <div>
                        <label class=" font-bold" for="">Password</label><br>
                        <input type="password" placeholder="Password" v-model="password"/>
                      </div>
                      <div>
                          <button class="primary-btn" @click="login">Login</button>
                      </div>
                  </div>
              </div>
              <div class="bg-black p-[10px] w-[23rem] pt-[3rem]  shadow-md">
                  <span class="material-symbols-outlined flex justify-center text-white select-none"> person </span>
                  <h2 class="text-[1.4rem] text-center text-white select-none font-bold">Welcome to login</h2>
                  <hr class="m-[17px]">
              </div>
          </div>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
      import Swal from 'sweetalert2'
      import { ref,onMounted} from 'vue';
      const email = ref('');
      const password = ref('');
      onMounted(()=>{
          const token = localStorage.getItem('token')

          console.log(token);
          
          
          if (token) {
            
            window.location.href='/'
          }
      })
      const login = async() => {
        let data = {
            email:email.value,
            password:password.value
        }
            const token = useCookie('token');
            const res = await callAPI('/dashboard/user/login', 'POST',data);
            console.log(res.status)
            if(res.status === 200) {
                Swal.fire({
                position: "top-end",
                icon: "success",
                title: "You have logged in successfully.",
                showConfirmButton: false,
                timer: 1500
            });
            
            setTimeout(() => {
                window.location.href = "/"
        }, 2000);
            }else{
                Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Email or Password is invalid",
                showConfirmButton: false,
                timer: 1500
                })
            }
            token.value = res.data.token
            localStorage.setItem("token", res.data.token);
        } 
  </script>
  
  <style scoped>

  input,button {
      padding: 0.5rem;
      width: 100%;
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