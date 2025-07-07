import admin from "../config/firebase-admin.js";

const signInWithGoogle = async (req,res)=>{
    // this is for accessing the token sent from frontend thru headers
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]

    try {
        const decodedToken = await admin.auth().verifyIdToken(token)

        console.log(token)
    } catch (error) {
        console.log('Cannot decode token or your token is expired. An error occurred: ', error.message)
    }
}

export default signInWithGoogle