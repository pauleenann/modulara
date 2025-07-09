import admin from "../config/firebase-admin.js";
import User from "../models/User.js";

const signInWithGoogle = async (req,res)=>{
    // this is for accessing the token sent from frontend thru headers
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]

    try {
        const decodedToken = await admin.auth().verifyIdToken(token)

        const { firstName, lastName, email} = req.body;

        // check first if user is existing
        let user = await User.find({email: email})
        
        // if no user found, create user
        if(user.length==0){
            try {
                user = await User.create({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                }) 

                console.log('User account successfully created')
            } catch (error) {
                console.log('Cannot create user account. An error occurred: ', error.message)
                return res.status(500).json({error: 'Failed to create user account'})
            }
        }

        // nevertheless, user is signed in
        console.log('User signed in')
        return res.status(200).json(user)
    } catch (error) {
        console.log('Cannot decode token or your token is expired. An error occurred: ', error.message)
        return res.status(500).json({error: 'Invalid or expired token'})
    }
}

export default signInWithGoogle