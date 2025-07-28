import { signInWithGoogle, signout } from '@/services/auth';
import { defineStore } from 'pinia';

export const authStore = defineStore('auth', {
    state: () => ({
        user: null,
        role: null,
        accessToken: null,
    }),

    actions: {
        // sign in with google
        async signinGoogle(router) {
            try {
                const response = await signInWithGoogle();

                if (response) {
                    this.user = response.data.user;
                    this.role = response.data.user.role;
                    this.accessToken = response.data.accessToken;
                }

                if(this.role==='admin'){
                    router.push('/admin/dashboard')
                }else{
                    router.push('/')
                }
            } catch (error) {
                console.error('Cannot sign in user with Google. An error occurred:', error);
            }
        },

        async logout(router){
            try {
                // remove cookie, refresh token, and sign out in firebase
                await signout(router);

                router.push('/login')
            } catch (error) {
                console.error('Cannot sign out user: ', error);
            }
        },

        // used when setting new access token (refresh) in api.js
        setAccessToken(payload) {
            this.accessToken = payload;
        }
    },

    // automatically saves/fetch ur store to localstorage
    persist: {
        storage: localStorage,
        serializer: {
            deserialize: JSON.parse,
            serialize: JSON.stringify
        },
        pick:['accessToken', 'role']
    }
});
