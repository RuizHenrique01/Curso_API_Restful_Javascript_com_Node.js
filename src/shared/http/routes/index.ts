import express from 'express';
import productRouter from '@modules/products/routes/products.router';
import usersRouter from '@modules/users/routes/users.router';

const routes = express.Router();

routes.use('/products', productRouter);
routes.use('/users', usersRouter);

export default routes;
