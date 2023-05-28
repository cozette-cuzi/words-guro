import mongoose from "mongoose";
import { Word } from "./word.interface";

interface Book extends mongoose.Document {
    title: string;
    words: Array<Word>
}

export { Book };
