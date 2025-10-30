const mongoose = require('mongoose');

const diplomaSchema = new mongoose.Schema({
  serialNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  transactionId: String,
  
  student: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
  },
  
  diploma: {
    type: {
      type: String,
      enum: ['Licence', 'Master', 'Doctorat'],
      required: true,
    },
    field: String,
    mention: String,
    dateObtained: Date,
  },
  
  university: {
    name: String,
    country: String,
  },
  
  status: {
    type: String,
    enum: ['active', 'pending', 'revoked'],
    default: 'active',
  },
  
  qrCode: String,
  
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Diploma', diplomaSchema);