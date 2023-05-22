import mongoose from "mongoose";

interface Book extends mongoose.Document {
    title: string;
}

export { Book };
