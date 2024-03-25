import mongoose from 'mongoose';
import { IUser } from '../types/user.interfaces';
const userSchema = new mongoose.Schema<IUser>(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      id: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        trim: true,
        lowercase: true,
      },
      password: {
        type: String,
        trim: true,
        minlength: 8,
        private: true, // used by the toJSON plugin
      },
      age:{
        type:Number,
      },
      active: {
        type: Boolean,
        default: false,
      },
      lastLogin:{
          type:String,
      }
    },
    
  );
  
const User = mongoose.model<IUser>('User', userSchema);

export default User;