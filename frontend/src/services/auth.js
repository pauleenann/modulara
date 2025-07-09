import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebase/config";
import axios from "axios";
import { userStore } from "@/store/userStore";

const provider = new GoogleAuthProvider();

const signInWithGoogle = (router) => {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const user = result.user;
      const token = await user.getIdToken();

      const response = await axios.post(
        'http://localhost:5000/api/user/signin-google',
        {
          firstName: user.displayName.split(' ')[0],
          lastName: user.displayName.split(' ')[1],
          email: user.email
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // user data from backend
      const userData = response.data;
      
      // store data in pinia and localstorage
      const store = userStore();
      store.setUser(userData);

      // Redirect based on role
      if (userData.role == 'admin') {
        router.push('/dashboard');
      } else {
        router.push('/');
      }
    })
    .catch((error) => {
      console.log('Cannot sign in user with Google. An error occurred:', error.message);
    });
};

export default signInWithGoogle;
