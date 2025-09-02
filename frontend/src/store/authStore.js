import { login, refreshAccessToken, signInWithGoogle, signout, signUpWithEmailPass } from '@/services/auth';
import { defineStore } from 'pinia';
import { cartStore } from './cartStore';

export const authStore = defineStore('auth', {
    state: () => ({
        user: null,
        role: null,
        accessToken: null,
        error: '',
        isAuthenticated: false, //flag
        loading: false
    }),

    actions: {
        // sign in with google
        async signinGoogle(router) {
            try {
                this .loading = true

                const store = cartStore();
                const response = await signInWithGoogle(this.setError);

                if (response) {
                    this.user = response.data.user;
                    this.role = response.data.user.role;
                    this.accessToken = response.data.accessToken;

                    this.isAuthenticated = true;
                    this.loading = false
                    
                    if(this.role==='admin'){
                        router.push('/admin/dashboard')
                    }else{
                        await store.saveCart(this.user.id)
                        router.push('/')
                    }
                }
            } catch (error) {
                console.error('Cannot sign in user with Google. An error occurred:', error);
            }
        },

        async signUp(router, user){
            try {
                const response = await signUpWithEmailPass(user, this.setError);

                if (response) {
                    this.user = response.data.user;
                    this.role = response.data.user.role;
                    this.accessToken = response.data.accessToken;

                    this.isAuthenticated = true

                    if(this.role==='admin'){
                        router.push('/admin/dashboard')
                    }else{
                        router.push('/')
                    }
                }
            } catch (error) {
                console.log('Cannot sign up user: ', error)
            }
        },

        async login(router, user){
            try {
                console.log('login')
                const response = await login(user, this.setError);

                if (response) {
                    this.user = response.data.user;
                    this.role = response.data.user.role;
                    this.accessToken = response.data.accessToken;

                    this.isAuthenticated = true

                    if(this.role==='admin'){
                        router.push('/admin/dashboard')
                    }else{
                        router.push('/')
                    }
                }
            } catch (error) {
                console.log('Cannot log in user: ', error)
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
        },

        // set error
        setError(payload){
            this.error = payload;
        }
    },
});
