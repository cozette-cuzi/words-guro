import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { CreateWordDto } from './dto/create-word.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }

  @Get(':id/words')
  findAllWords(@Param('id') id: string) {
    return this.booksService.findAllWords(id);
  }

  @Post(':id/words')
  createWord(@Param('id') id: string, @Body() CreateWordDto: CreateWordDto) {
    return this.booksService.createWord(id, CreateWordDto);
  }

  @Get(':id/words/search')
  async searchBookWords(
    @Param('id') id: string,
    @Query('search') search: string,
  ) {
    const matchingWords = await this.booksService.searchByWordSpelling(
      id,
      search,
    );
    return matchingWords;
  }
}
