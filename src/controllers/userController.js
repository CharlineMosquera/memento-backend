import { validationResult } from 'express-validator';
import { registerUser, authenticateUser, removeUser } from '../services/userService.js';
import { generateToken } from '../utils/jwtUtils.js';

// Controlador para registrar un nuevo usuario
export const register = async (req, res) => {
  // Valida los datos antes de registrar el usuario
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password, role } = req.body;
    const user = await registerUser(name, email, password, role);
    // Retorna un mensaje de éxito
    res.status(201).json({ message: "Usuario creado exitosamente.", user });

  } catch (error) {
    res.status(500).json({ message: "Error al registrar el usuario", error: error.message });
  }
};

// Controlador para el login de usuario
export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    const user = await authenticateUser(email, password);
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = generateToken(user);
    res.cookie('tokenjwt', token, { httpOnly: false });
    res.status(200).json({ message: 'Login exitoso', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para el logout de usuario
export const logoutUser = (req, res) => {
  res.clearCookie('tokenjwt');
  res.status(200).json({ message: 'Logout exitoso' });
};

// Controlador para eliminar un usuario por ID
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await removeUser(id);
    res.status(200).json({ message: 'Usuario eliminado exitosamente.', deletedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};