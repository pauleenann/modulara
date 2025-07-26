import { signInWithGoogle } from '@/services/auth';
import { defineStore } from 'pinia';

export const authStore = defineStore('auth', {
    state: () => ({
        user: null,
        role: null,
        accessToken: null,
    }),

    actions: {
        async signinGoogle(router) {
            try {
                const response = await signInWithGoogle();

                if (response) {
                    this.user = response.data.user;
                    this.role = response.data.user.role;
                    this.accessToken = response.data.accessToken;
                }

                if(this.role==='admin'){
                    router.push('/dashboard')
                }
            } catch (error) {
                console.error('Cannot sign in user with Google. An error occurred:', error);
            }
        },

        setAccessToken(payload) {
            this.accessToken = payload;
        }
    },

    persist: {
        storage: localStorage,
        serializer: {
            deserialize: JSON.parse,
            serialize: JSON.stringify
        },
        pick:['accessToken', 'role']
    }
});
