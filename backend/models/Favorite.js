import mongoose, { model, Schema } from "mongoose";

const FavoriteSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    favorites:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const Favorite = model('Favorite', FavoriteSchema);
export default Favorite;