import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import updateConfig from '@config/upload';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import UsersAvatarController from '../controllers/UsersAvatarController';

const usersController = new UsersController();
const usersRouter = Router();
const userAvatarController = new UsersAvatarController();

const uplaod = multer(updateConfig.multer);

usersRouter.get('/', isAuthenticated, usersController.index);

usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    usersController.create,
);

usersRouter.patch(
    '/avatar',
    uplaod.single('avatar'),
    isAuthenticated,
    userAvatarController.update,
);

export default usersRouter;
