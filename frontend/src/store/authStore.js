import { defineStore } from "pinia";
import { auth } from "@/firebase/config";
import { ref } from "vue";
import { signInWithGoogle } from "@/services/auth";

export const authStore = defineStore('auth',()=>{
    let user = ref(null);
    let role = ref(null);
    let accessToken = ref(localStorage.getItem('accessToken')||'');

    //signin with google
    const signinGoogle = async ()=>{
        try {
            const response = await signInWithGoogle();
            
            if(response){
                console.log(response.data.accessToken);
                user.value = response.data.user;
                role.value = response.data.user.role;
                accessToken.value = response.data.accessToken;

                localStorage.setItem('accessToken', accessToken.value)
            }
        } catch (error) {
            console.log('Cannot sign in user with Google. An error occurred:', error);
        }
    }

    const setAccessToken = (payload)=>{
        accessToken.value = payload;
    }

    //logout

    return {
        signinGoogle,
        setAccessToken
    }
})