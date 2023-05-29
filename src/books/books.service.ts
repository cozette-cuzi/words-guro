import { Inject, Injectable, Query } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Model } from 'mongoose';
import { Book } from './interfaces/book.interface';
import { CreateWordDto } from './dto/create-word.dto';

@Injectable()
export class BooksService {
  constructor(
    @Inject('BOOK_MODEL')
    private bookModel: Model<Book>,
  ) {}

  create(createBookDto: CreateBookDto) {
    const createdBook = new this.bookModel(createBookDto);
    return createdBook.save();
  }

  async createWord(id: string, CreateWordDto: CreateWordDto) {
    const book = await this.bookModel.findById(id);
    book.words.push(CreateWordDto);
    book.save();
    return book;
  }

  findAll() {
    return this.bookModel.find().exec();
  }

  async findAllWords(id: string) {
    const book = this.bookModel.findById(id).exec();
    return (await book).words;
  }

  findOne(id: string) {
    return this.bookModel.findById(id).exec();
  }

  update(id: string, updateBookDto: UpdateBookDto) {
    const updatedBook = this.bookModel
      .findOneAndUpdate({ _id: id }, { $set: updateBookDto }, { new: true })
      .exec();
    return updatedBook;
  }

  remove(id: string) {
    return this.bookModel.deleteOne({ _id: id }).exec();
  }

  async searchByWordSpelling(id: string, search: string) {
    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      return [];
    }

    const matchingWords = book.words
      .filter((word) => word.spelling.includes(search))
    return matchingWords;
  }
}
