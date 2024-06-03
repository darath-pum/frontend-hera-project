import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      first_name: "",
      last_name: "",
      email: "",
      role: "",
      id: ""
    };
  },
  getters: {
    isAuthenticated(state: any): boolean {
      return state.first_name !== "";
    },
  },
  actions: {
    setState(data: any) {
      this.first_name = data.first_name;
      this.last_name = data.last_name;
      this.email = data.email;
      this.role = data.role;
      this.id = data.id
    },
  },
});
