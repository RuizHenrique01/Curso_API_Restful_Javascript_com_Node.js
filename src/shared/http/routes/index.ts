import express from 'express';
import productRouter from '@modules/products/routes/products.router';
import usersRouter from '@modules/users/routes/users.router';
import sessionsRouter from '@modules/users/routes/sessions.router';
import passwordRouter from '@modules/users/routes/password.router';

const routes = express.Router();

routes.use('/products', productRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);

export default routes;
