import { Router } from "express";
import { check } from "express-validator";
import { register, loginUser, logoutUser, deleteUser } from '../controllers/userController.js';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *                 example: admin
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error de validación
 */
router.post(
  '/register',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Por favor ingrese un correo válido').isEmail(),
    check('password', 'La contraseña debe tener al menos 8 caracteres').isLength({ min: 8 }),
  ],
  register
);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Inicia sesión un usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login exitoso
 *       400:
 *         description: Error de validación
 *       401:
 *         description: Credenciales inválidas
 */
router.post(
  '/login',
  [
    check('email', 'Por favor ingrese un correo válido').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
  ],
  loginUser
);

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     summary: Cierra sesión un usuario
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Logout exitoso
 *       401:
 *         description: Acceso denegado. No se encontró el token.
 */
router.post('/logout', authMiddleware, logoutUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Elimina un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *         example: 679841b227eee87ab9df6d1e
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       401:
 *         description: Acceso denegado. No se encontró el token.
 *       403:
 *         description: Acceso denegado. No tienes permisos de administrador.
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/:id', adminMiddleware, deleteUser);

export default router;
