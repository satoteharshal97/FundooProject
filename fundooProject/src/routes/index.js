import express from 'express';
import userRoute from './user.route';
import noteRoute from './note.route';

const router = express.Router();

/**
 * Function contains Application routes
 *
 * @returns router
 */

const routes = () => {
  // define a root/default route
  router.get('/', (req, res) => {
    res.json('Welcome to default page');
  });
  router.use('/users', userRoute);
  router.use('/note', noteRoute);

  return router;
};

export default routes;
