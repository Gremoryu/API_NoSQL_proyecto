
const autenticacionMiddleware = (req, res, next) => {
  
  
    if (usuarioAutenticado) {
      next();
    } else {
      res.status(401).json({ error: 'No autorizado' });
    }
  };
  
  
  app.use('/rutas-seguras', autenticacionMiddleware);
  