import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Model } from 'mongoose';
import { Book } from './interfaces/book.interface';

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

  findAll() {
    return this.bookModel.find().exec();
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
}
