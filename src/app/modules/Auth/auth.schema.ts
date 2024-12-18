import { model, Schema } from 'mongoose';
import { IUser, UserModel } from './auth.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<IUser, UserModel>(
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

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  if (user.password) {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.salt_rounds),
    );
  }
  next();
});
userSchema.post('save', function (doc, next) {
  doc.password = '';

  next();
});
userSchema.statics.isPasswordMatched = async function (
  plainTextpassword: string,
  hashPassword: string,
) {
  return await bcrypt.compare(plainTextpassword, hashPassword);
};

userSchema.statics.isUserExistByEmail = async function (email: string) {
  return await User.findOne({ email });
};
const User = model<IUser, UserModel>('User', userSchema);
export default User;
