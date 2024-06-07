// import { getAPIURL } from "~/configs";
import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (!process.client) return;
  const authStore = useAuthStore();
  const token = localStorage.getItem('token');

  if (to.path !== "/login") {
    try {
      const res = await $fetch<any>(getAPIURL("/dashboard/user/getUserSession"), {
        headers: { 
          "Content-Type": "application/json", 
          "Authorization": "Bearer " + token,
        },
        cache: "no-cache",
        ignoreResponseError: true,
      });
      authStore.setState(res.data);
      // if(res.data){
      //   if(to.path === "/" || to.path ===""){
      //     return navigateTo("/");
  
      //   }
      // }
      // if (to.path === "/manage-users" && to.path ==="/manage-games" && to.path === "/manage-account") {
      //       if (res.data.role !== "admin" || res.data.role !== "dev") {
      //       return navigateTo("/");
      //     }
      //   }
      } catch (err) {
        console.error("Error: " + err);
        return navigateTo("/login");

    }
    }
});
