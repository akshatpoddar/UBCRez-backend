 
const {RESIDENCE_OPTIONS, ROOM_TYPE} = require('utils/constants')

const residenceSchema = new Schema({
  name: {
    type: String,
    enum: RESIDENCE_OPTIONS,
    required: true,
  },
  roomType: [{
    type: ROOM_TYPE,
    required: true,
  }],
  ageRestriction: {
    type: Number, // e.g., 19 for residences restricted to ages 19+
    default: 16,
    required: false,
  },
});

module.exports = mongoose.model('Residence', residenceSchema);