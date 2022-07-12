import mongoose from "mongoose";

const connect = () => {
    mongoose.connect(
        process.env.MONGODB_URI!, 
        (err) => {
            if(err) console.log("Error connecting to DB", err);
            else console.log("Connected to DB")
        }
    )
}

export default connect;