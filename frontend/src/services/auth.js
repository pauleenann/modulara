import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import axios from "axios";
import api from "@/utils/api";
import { authStore } from "@/store/authStore";
// import { userStore } from "@/store/userStore";

const provider = new GoogleAuthProvider();
  
// sign in with google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth,provider);
    const user = result.user;
    const token = await user.getIdToken();

    const response = await axios.post(
      'http://localhost:5000/api/auth/signin-google',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      }
    );

    console.log(response)
    return response
  } catch (error) {
    console.log('Cannot sign in user with Google. An error occurred:', error);
  }
};

// refresh token
export const refreshAccessToken = async ()=>{
  try {
    const response = await api.get('/auth/refresh')
    console.log(response)
    return response
  } catch (error) {
    console.log('Cannot refresh token', error);
  }
}

export const signout = async()=>{
  try {
    // delete refresh tokens
    await api.post('/auth/signout')

    // signout from firebase
    await signOut(auth)

    // delete everything 
    const auth2 = authStore() 
    auth2.$reset()
  } catch (error) {
    console.log('Cannot sign out', error);
    // delete everything 
    const auth2 = authStore()
    auth2.$reset()
  }
}

export const test = async ()=>{
  try {
    const response = await api.post('/auth/test')
  } catch (error) {
  }
}