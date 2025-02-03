import { Router } from 'express';
import { addEvent, getEvent, getEvents, editEvent, removeEvent, filterEvent, attendEvent } from '../controllers/eventController.js';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Agregar un nuevo evento
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - date
 *               - time
 *               - location
 *               - creator
 *             properties:
 *               name:
 *                 type: string
 *                 example: Nombre del Evento
 *               description:
 *                 type: string
 *                 example: Descripción del Evento
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2023-12-25
 *               time:
 *                 type: string
 *                 example: 18:00
 *               location:
 *                 type: string
 *                 example: Ubicación del Evento
 *               creator:
 *                 type: string
 *                 example: 60c72b2f9b1d8b3a4c8e4d2b
 *               attendees:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [60c72b2f9b1d8b3a4c8e4d2c, 60c72b2f9b1d8b3a4c8e4d2d]
 *     responses:
 *       201:
 *         description: Evento creado exitosamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido
 */
router.post('/', adminMiddleware, addEvent);

/**
 * @swagger
 * /api/events/filter:
 *   get:
 *     summary: Filtrar eventos
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Filtrar por fecha del evento
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filtrar por ubicación del evento
 *       - in: query
 *         name: creator
 *         schema:
 *           type: string
 *         description: Filtrar por creador del evento
 *     responses:
 *       200:
 *         description: Eventos filtrados exitosamente
 *       401:
 *         description: No autorizado
 */
router.get('/filter', filterEvent);

router.post('/:eventId/attend', attendEvent);

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Obtener evento por ID
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del evento
 *     responses:
 *       200:
 *         description: Evento obtenido exitosamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Evento no encontrado
 */
router.get('/:id', getEvent);

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Obtener todos los eventos
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Eventos obtenidos exitosamente
 *       401:
 *         description: No autorizado
 */
router.get('/', getEvents);

/**
 * @swagger
 * /api/events/{id}:
 *   put:
 *     summary: Actualizar evento por ID
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del evento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Nombre del Evento Actualizado
 *               description:
 *                 type: string
 *                 example: Descripción del Evento Actualizada
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2023-12-26
 *               time:
 *                 type: string
 *                 example: 19:00
 *               location:
 *                 type: string
 *                 example: Ubicación del Evento Actualizada
 *               creator:
 *                 type: string
 *                 example: 60c72b2f9b1d8b3a4c8e4d2b
 *               attendees:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [60c72b2f9b1d8b3a4c8e4d2c, 60c72b2f9b1d8b3a4c8e4d2d]
 *     responses:
 *       200:
 *         description: Evento actualizado exitosamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido
 *       404:
 *         description: Evento no encontrado
 */
router.put('/:id', adminMiddleware, editEvent);

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     summary: Eliminar evento por ID
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del evento
 *     responses:
 *       200:
 *         description: Evento eliminado exitosamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido
 *       404:
 *         description: Evento no encontrado
 */
router.delete('/:id', adminMiddleware, removeEvent);

export default router;
