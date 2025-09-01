import { signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";
import axios from "axios";
import api from "@/utils/api";
import { authStore } from "@/store/authStore";
// import { userStore } from "@/store/userStore";

const provider = new GoogleAuthProvider();

// endpoint
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  
// sign in with google
export const signInWithGoogle = async (setError) => {
  try {
    const result = await signInWithPopup(auth,provider);
    const user = result.user;
    const token = await user.getIdToken();

    const response = await axios.post(
      `${API_BASE_URL}/auth/signin-google`,
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
    setError("Unable to log in at the moment. Please try again later.");
  }
};

// sign up using email and password
export const signUpWithEmailPass = async (data, setError)=>{
  try {
    const result = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const user = result.user;
    const token = await user.getIdToken();
    console.log(token)

    const response = await axios.post(
      `${API_BASE_URL}/auth/signup`,
      {
        firstName: data.firstName,
        lastName: data.lastName
      },
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
    console.log('Cannot sign up with email and password. An error occurred:', error)
    setError("We couldn’t sign you up. Please check if the email is already in use or try again later.");
  }
}

// login
export const login = async (data, setError)=>{
  try {
    const result = await signInWithEmailAndPassword(auth, data.email, data.password);
    const user = result.user;
    const token = await user.getIdToken();

    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
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
    console.error('Firebase login error:', error.code);
    setError("We couldn't log you in. Make sure your account exists and your details are correct.");
  }
}

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