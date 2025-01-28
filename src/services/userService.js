import UserModel from "../models/user.js";
import bcrypt from "bcryptjs";
import { findUserByEmail, saveUser, deleteUserById } from "../repositories/userRepository.js";

// Función para registrar un nuevo usuario
export const registerUser = async (name, email, password, role) => {
  // Revisa si ya esta registrado
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("El correo ingresado ya esta registrado en la plataforma.");
  }

  // Encripta la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crea el objeto usuario
  const newUser = new UserModel({
    name,
    email,
    password: hashedPassword,
    role,
  });

  // Guarda el usuario en la base de datos y retorna 
  return await saveUser(newUser);
};

// Función para autenticar un usuario
export const authenticateUser = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) {
    return null;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return null;
  }

  return user;
};

// Función para eliminar un usuario por ID
export const removeUser = async (id) => {
  const deletedUser = await deleteUserById(id);
  if (!deletedUser) {
    throw new Error("Usuario no encontrado");
  }
  return deletedUser;
};