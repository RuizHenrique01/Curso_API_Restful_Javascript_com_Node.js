import express from 'express';
import productRouter from '@modules/products/routes/products.router';

const routes = express.Router();

routes.use('/products', productRouter);

export default routes;
