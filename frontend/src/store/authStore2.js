// import { onAuthStateChanged } from 'firebase/auth';
// import { defineStore } from 'pinia';
// import { ref, computed } from 'vue';
// import { auth } from '@/firebase/config';

// export const authStore = defineStore('authId', () => {
//   const user = ref(null); // full user object
//   const isAuthResolved = ref(false); // flag when auth check finishes

//   const isAuthenticated = computed(() => !!user.value); 

//   const initAuth = () => {
//     return new Promise((resolve) => {
//       onAuthStateChanged(auth, (currentUser) => {
//         user.value = currentUser;
//         isAuthResolved.value = true;
//         resolve(currentUser); // ✅ resolve the promise
//       });
//     });
//   };

//   // ✅ Get fresh token on demand
//   const getFreshToken = async () => {
//     if (user.value) {
//       return await user.value.getIdToken(true); // force refresh
//     }
//     return null;
//   };

//   return {
//     user,
//     isAuthenticated,
//     isAuthResolved,
//     initAuth,
//     getFreshToken
//   };
// });
