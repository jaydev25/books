import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    //Our password is hashed with bcrypt
    title: { type: String, required: true },
    desc: { type: String, required: true },
    author: {
      userId: String,
      firstName: String,
      lastName: String,
    },
  },
  {
    timestamps: true,
  }
);

BookSchema.plugin(mongoosePaginate);

const model = mongoose.model<
  any,
  mongoose.PaginateModel<any>
>('Book', BookSchema, 'book');

export default model;

