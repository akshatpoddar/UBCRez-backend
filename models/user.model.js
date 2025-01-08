const mongoose = require('mongoose')
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  _id: String, 
  name: {
    type: String,
    required: true,
    trim: true
  }, 
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  major: {
    type: String,
    required: false,
    trim: true
  }, 
  year: {
    type: Number,
    required: false,
  },
  bio: {
    type: String,
    required: false,
    trim: true
  }
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = User = mongoose.model("User", userSchema);