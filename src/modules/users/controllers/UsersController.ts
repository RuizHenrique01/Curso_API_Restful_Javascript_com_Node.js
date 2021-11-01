import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ListUserService from '../services/ListUserService';

export default class UsersController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listUsersService = new ListUserService();

        const users = await listUsersService.execute();

        return response.json(users);
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email, password } = request.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({
            email,
            password,
            name,
        });

        return response.json(user);
    }
}
