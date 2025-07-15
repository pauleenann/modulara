import mongoose, { model, Schema } from 'mongoose';

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ['customer', 'admin', 'staff'], //ito lang ung allowed roles
    default: 'customer'
  },
  address: [
    {
      label: String,
      street: String,
      city: String,
      zip: String,
      isDefault: Boolean
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = model('User', UserSchema);
export default User;
