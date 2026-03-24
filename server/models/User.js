const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema(
  {
    colors: { type: [String], default: [] },
    styles: { type: [String], default: [] },
    music: { type: [String], default: [] },
    culture: { type: [String], default: [] },
  },
  { _id: false },
);

const bodyProfileSchema = new mongoose.Schema(
  {
    type: { type: String, default: '' },
    measurements: { type: String, default: '' },
  },
  { _id: false },
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    preferences: { type: preferenceSchema, default: () => ({}) },
    bodyProfile: { type: bodyProfileSchema, default: () => ({}) },
    likedLooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Look' }],
    dislikedLooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Look' }],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Look' }],
    theme: { type: String, default: 'light' },
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
