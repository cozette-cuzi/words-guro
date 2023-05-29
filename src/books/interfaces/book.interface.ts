import mongoose from "mongoose";
import { Word } from "./word.interface";
import { CreateWordDto } from "../dto/create-word.dto";

interface Book extends mongoose.Document {
    title: string;
    words: Array<CreateWordDto>
}

export { Book };
