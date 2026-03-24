const User = require('../models/User');

async function getCurrentUser(req, res) {
  return res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      preferences: req.user.preferences,
      bodyProfile: req.user.bodyProfile,
      theme: req.user.theme,
    },
  });
}

async function updateCurrentUser(req, res) {
  const { preferences, bodyProfile, theme } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        ...(preferences ? { preferences } : {}),
        ...(bodyProfile ? { bodyProfile } : {}),
        ...(theme ? { theme } : {}),
      },
    },
    { new: true, runValidators: true },
  ).select('-passwordHash');

  return res.json({
    user: {
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      preferences: updatedUser.preferences,
      bodyProfile: updatedUser.bodyProfile,
      theme: updatedUser.theme,
    },
  });
}

module.exports = {
  getCurrentUser,
  updateCurrentUser,
};
