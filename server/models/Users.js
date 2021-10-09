const mongoose = require('mongoose');

const { Schema } = mongoose;

const UsersSchema = new Schema({
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  displayName: {
    type: String,
  },
  email: {
    type: String
  },
  avatar: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: () => Date.now()
  },
});

mongoose.model('Users', UsersSchema);