const permission = (...allowedRoles) => {
    return (req, res, next) => {
      const { usuario } = req;
      // console.log(usuario);

      
      if (usuario && allowedRoles.includes(
        
        
        usuario.rol_id)) {
        return next(); // if type permission is allowed, so continue the request using the next middleware
      }
      return res.status(403).json({ message: 'Forbidden' });
    };
  }
  
  module.exports = permission;