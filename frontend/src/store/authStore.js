import { onAuthStateChanged } from 'firebase/auth';
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { auth } from '@/firebase/config';

export const authStore = defineStore('authId', () => {
  const user = ref(null); // full user object
  const isAuthResolved = ref(false); // flag when auth check finishes

  const isAuthenticated = computed(() => !!user.value); // isAuthenticated changes whenever user changes

  const initAuth = () => {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (currentUser) => {
        user.value = currentUser;
        isAuthResolved.value = true;
        resolve(currentUser); // ✅ resolve the promise
      });
    });
  };

  return {
    user,
    isAuthenticated,
    isAuthResolved,
    initAuth
  };
});
