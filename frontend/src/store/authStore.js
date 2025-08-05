import { refreshAccessToken, signInWithGoogle, signout } from '@/services/auth';
import { defineStore } from 'pinia';

export const authStore = defineStore('auth', {
    state: () => ({
        user: null,
        role: null,
        accessToken: null,
        isAuthenticated: false //flag
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

                    this.isAuthenticated = true
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

        async signUp(router){
            try {
                
            } catch (error) {
                
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

        // refresh access token
        async refreshAccessToken(){
            try {
                // refresh token
                const response = await refreshAccessToken()
                console.log(response)
                this.user = response.data.user;
                this.role = response.data.user.role;
                this.accessToken=response.data.accessToken


                this.isAuthenticated = true
            } catch (error) {
                console.error('Cannot refresh access token: ', error);
            }
        },

        // used when setting new access token (refresh) in api.js
        setAccessToken(payload) {
            this.accessToken = payload;
        }
    },
});
