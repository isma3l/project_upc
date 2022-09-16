import { model, Schema } from 'mongoose';
import { User } from '@interfaces';

const userSchema = new Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = model<User>('User', userSchema);

export default userModel;
