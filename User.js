const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  schoolCode: { type: String, required: true },
  mobileNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String, default: '' },  // Optional field, default to empty string
  position: { type: String, default: '' },   // Add position field
  email: { type: String, default: '' },      // Add email field
  
});

// Pre-save hook to hash the password before saving the user
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    // Hash the password if it has been modified
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Instance method to compare the password for login
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
