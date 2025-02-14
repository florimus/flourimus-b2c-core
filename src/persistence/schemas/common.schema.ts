import { getCurrentTime } from '@core/utils/time.utils';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const commonFieldsSchema = new Schema(
  {
    version: { type: Number, required: true },
    isActive: { type: Boolean, default: false },
    createdBy: { type: String },
    createdAt: { type: String, default: getCurrentTime() },
    updatedAt: { type: String, default: getCurrentTime() },
    updatedBy: { type: String, default: getCurrentTime() },
    metaStatus: { type: String, default: getCurrentTime() },
  },
  { _id: false }
);

export default commonFieldsSchema;
