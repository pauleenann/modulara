import admin from "../config/firebase-admin.js";
import User from "../models/User.js";

const signInWithGoogle = async (req,res)=>{
    // this is for accessing the token sent from frontend thru headers
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]

    try {
        if (!token) {
            return res.status(401).json({ error: 'Missing token' });
        }
          
        const decodedToken = await admin.auth().verifyIdToken(token)

        const { firstName, lastName, email} = req.body;

        // check first if user is existing
        let user = await User.findOne({email: email})
        
        // if no user found, create user
        if(!user){
            try {
                user = await User.create({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                }) 
            } catch (error) {
                return res.status(500).json({error: 'Failed to create user account'})
            }
        }

        // data to return
        const userData = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        }

        return res.status(200).json(userData)
    } catch (error) {
        console.log('Cannot decode token or your token is expired. An error occurred: ', error.message)
        return res.status(401).json({error: 'Invalid or expired token'})
    }
}

export default signInWithGoogle