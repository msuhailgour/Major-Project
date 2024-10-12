const { string, required } = require("joi");
const mongoose=require("mongoose");
const Schema = mongoose.Schema;
const reviews =new Schema({
    rating:{
        type:Number,
        required:true,
    },
    comment: { type: String,
    required:true,
    },
    createdAt :
    {
        type: Date,
        default:Date.now(),

    },
    author :{
        type: Schema.Types.ObjectId,
        ref :"User",
    }
});

const Review=mongoose.model("Review" ,reviews);

module.exports =Review;