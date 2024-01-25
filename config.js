import mongoose from "mongoose";

export const connect=async()=>{
    await mongoose.connect("mongodb+srv://aryanbisht2580:aryan2534@cluster0.ldwshl4.mongodb.net/chatapp?retryWrites=true&w=majority",{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    console.log("db is connected...");
}
