import express from 'express';
import productRouter from '@modules/products/infra/http/routes/products.router';
import usersRouter from '@modules/users/infra/http/routes/users.router';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.router';
import passwordRouter from '@modules/users/infra/http/routes/password.router';
import profileRouter from '@modules/users/infra/http/routes/profile.router';
import customerRouter from '@modules/customers/infra/http/routes/customers.router';
import ordersRouter from '@modules/orders/infra/http/routes/orders.router';

const routes = express.Router();

routes.use('/products', productRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customerRouter);
routes.use('/orders', ordersRouter);

export default routes;
