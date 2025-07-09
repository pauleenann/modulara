import { ref } from "vue";
import { defineStore } from "pinia";

export const userStore = defineStore('user',()=>{
    let user = ref(null)

    function setUser(user){
        user.value = user
        console.log(user)
    }

    return{
        user,
        setUser
    }
})