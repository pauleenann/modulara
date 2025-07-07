import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebase/config";
import axios from "axios";

const provider = new GoogleAuthProvider()

const signInWithGoogle = ()=>{
    signInWithPopup(auth, provider)
    .then(async (result) => {
        // The signed-in user info.
        const user = result.user;
        const token = user.getIdToken();

        const response = await axios.post('http://localhost:5000/api/user/signin-google',{
            firstName: user.displayName.split(' ')[0],
            lastName: user.displayName.split(' ')[1],
            email: user.email
        },{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

    }).catch((error) => {
        console.log('Cannot sign in use with google. An error occurred', error.message)
    });
}

export default signInWithGoogle
