import mongoose from "mongoose";

interface Word extends mongoose.Document {
    spelling: string,
    meaning: string
}

export { Word };
