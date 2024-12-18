import { model, Schema } from 'mongoose';
import { IUser } from './auth.interface';

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name is required'],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      validate: {
        validator: function (value: string) {
          return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value);
        },
        message: '{VALUE} is not a valid email',
      },
      immutable: true,
    },
    role: {
      type: String,
      enum: {
        values: ['user', 'admin'],
        message: '{VALUE} is not valid, please provide a valid role',
      },
      default: 'user',
      required: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      trim: true,
      select: 0,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const User = model('User', userSchema);
export default User;
