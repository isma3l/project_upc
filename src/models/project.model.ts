import { model, Schema } from 'mongoose';
import { Project } from '@interfaces';

const userSchema = new Schema<Project>(
  {
    user_id: {
      type: String,
      required: true,
    },
    api_key: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: String,
  },
  { timestamps: true },
);

const projectModel = model<Project>('Project', userSchema);

export default projectModel;
