import * as mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema({
  title: String,
  words: [mongoose.Schema.Types.Mixed]
})