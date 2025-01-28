import UserModel from '../models/user.js';

export const findUserByEmail = async (email) => {
  return await UserModel.findOne({ email });
};

export const saveUser = async (user) => {
  return await user.save();
};

export const deleteUserById = async (id) => {
  return await UserModel.findByIdAndDelete(id);
};