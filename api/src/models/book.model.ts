import mongoose from 'mongoose';

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

export default mongoose.model('Book', BookSchema);
