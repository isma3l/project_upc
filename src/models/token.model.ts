import { model, Schema } from 'mongoose';
import { Token } from '@interfaces';

const tokenSchema = new Schema<Token>(
  {
    address: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    network_name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const tokenModel = model<Token>('Token', tokenSchema);

export default tokenModel;
