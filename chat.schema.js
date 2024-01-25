import mongoose from "mongoose";

const chatSchema=new mongoose.Schema({
    username:String,
    message:String,
    timeStamp:Date,
    room:Number
})

export const chatModel=mongoose.model('Chats',chatSchema);