import { model, Schema } from 'mongoose';
import { Project } from '@interfaces';

const projectSchema = new Schema<Project>(
  {
    user_id: {
      type: String,
      required: true,
    },
    api_key: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: String,
    tokens: [{ address: String, name: String, network_name: String }],
  },
  { timestamps: true },
);

const projectModel = model<Project>('Project', projectSchema);

export default projectModel;
