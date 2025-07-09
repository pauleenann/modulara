import { onAuthStateChanged } from 'firebase/auth';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { auth } from '@/firebase/config';

export const authStore = defineStore('user', () => {
  let isAuthenticated = ref(null); 

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      isAuthenticated = currentUser.uid
      console.log('A user is currently signed in');
      console.log(isAuthenticated);
    } else {
      isAuthenticated = null;
      console.log('No user is signed in');
    }
  });

  return {
    isAuthenticated,
  };
});
