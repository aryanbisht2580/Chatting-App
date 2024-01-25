import mongoose from "mongoose";

export const connect=async()=>{
    await mongoose.connect("mongodb+srv://aryanbisht2580:aryan2534@cluster0.ldwshl4.mongodb.net/?retryWrites=true&w=majority&appName=chatapp",{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    console.log("db is connected...");
}
