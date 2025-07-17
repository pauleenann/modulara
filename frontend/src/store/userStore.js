import { ref } from "vue";
import { defineStore } from "pinia";

export const userStore = defineStore('user', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')) || null);
  const token = ref(JSON.parse(localStorage.getItem('token')) || null)

  const setUser = (userData) => {
    user.value = userData;
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const clearUser = ()=>{
    user.value = null;
    localStorage.removeItem("user")
  }

  const setToken = (newToken) => {
    token.value = newToken;
    localStorage.setItem("token", JSON.stringify(newToken));
  };

  const clearToken = () => {
    token.value = null;
    localStorage.removeItem("token");
  };

  return {
    user,
    token,
    setUser,
    setToken,
    clearUser,
    clearToken
  };
});
