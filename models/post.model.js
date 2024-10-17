const mongoose = require('mongoose')
const { Schema } = mongoose;


// allow selection of both gender options
const genderOptions = ["Male", "Female"]
// add more residence options
const residenceOptions = ["Marine Drive", "Ponderosa Commons", "Walter Gage", "Exchange", "KWTQ", "Brock North"]
const typeOptions = ["Sublet", "Switch"]

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  active: {
    type: Boolean,
    required: true,
    default: false,
  },
  residence: {
    type: Schema.Types.ObjectId,
    ref: 'Residence',
    required: true,
  },
  category: {
    type: String,
    enum: typeOptions,
    required: true,
  },
  // Only required if sublet
  rent: {
    type: Number,
    required: function () {
      return this.type == 'Sublet';
    },
  },
  gender: {
    type: [String],
    enum: genderOptions,
    required: true,
  }},{
    discriminatorKey: 'category', // Discriminator key is used to differentiate the types
    collection: 'posts' // Collection name
});

const Post = mongoose.model('Post', postSchema);

// Sublet Post Schema (inherits from Post)
const subletSchema = new Schema({
  rent: {
    type: Number,
    required: true,
  },
  duration: {
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (endDate) {
          return endDate >= this.duration.startDate;
        },
        message: 'End date must be after the start date',
      },
    },
  },
});

// Switch Post Schema (inherits from Post)
const switchSchema = new Schema({
  // Add specific fields for Switch posts if needed
});

// Create models for the different post types
const SubletPost = Post.discriminator('Sublet', subletSchema);
const SwitchPost = Post.discriminator('Switch', switchSchema);

module.exports = {
  Post,
  SubletPost,
  SwitchPost,
};