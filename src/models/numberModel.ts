import mongoose, { Document, Schema } from 'mongoose';

interface INumber extends Document {
  value: number;
}

const NumberSchema = new Schema<INumber>({
  value: {
    type: Number,
    required: true,
  },
});

export default mongoose.models.Number || mongoose.model<INumber>('Number', NumberSchema);