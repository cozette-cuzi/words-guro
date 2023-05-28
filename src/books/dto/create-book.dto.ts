import { Word } from "../interfaces/word.interface";

export class CreateBookDto {
    title: string;
    words: Array<Word>
}
