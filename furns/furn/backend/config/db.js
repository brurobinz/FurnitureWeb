import mongoose from "mongoose";
export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://cuongmp40:24112004@cluster0.t69gm.mongodb.net/furn').then(()=>console.log("DB Connected"));
    

}