import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.tokenjwt;
  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se encontró el token.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token no válido.' });
  }
};

export const adminMiddleware = (req, res, next) => {
  const token = req.cookies.tokenjwt;
  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se encontró el token.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified.role !== 'admin') {
      return res.status(403).json({ message: 'Acceso denegado. No tienes permisos de administrador.' });
    }
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token no válido.' });
  }
};