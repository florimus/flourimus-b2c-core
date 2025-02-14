import commonFieldsSchema from './common.schema';
import mongoose from 'mongoose';
import roles from '@core/enums/user.roles';

const Schema = mongoose.Schema;

const phoneSchema = new Schema({
  dialCode: {
    type: String,
    required: true,
    match: /^\+\d{1,3}$/
  },
  number: {
    type: String,
    required: true,
    match: /^\d+$/
  }
}, { _id: false });

export const userSchema = new Schema({
  _id: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone: {
    type: phoneSchema
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: roles.CUSTOMER
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  loginType: {
    type: String,
    enum: ['password', 'google']
  },
  token: {
    type: String
  }
});

userSchema.add(commonFieldsSchema);

const UserSchema = mongoose.model('fc_b2c_users', userSchema);

export default UserSchema;