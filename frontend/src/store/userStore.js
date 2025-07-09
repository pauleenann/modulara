import { ref } from "vue";
import { defineStore } from "pinia";

export const userStore = defineStore('user', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')) || null);

  const setUser = (userData) => {
    user.value = userData;
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const clearUser = ()=>{
    user.value = null;
    localStorage.removeItem("user")
  }

  return {
    user,
    setUser
  };
});
