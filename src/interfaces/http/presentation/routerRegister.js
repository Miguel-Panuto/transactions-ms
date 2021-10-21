const { Router } = require('express');

module.exports = () => ({
  register: (routes) => {
    const router = Router();
    routes.forEach(({ method, path, handler }) => {
      router[method](path, handler);
    });

    return router;
  },
});
