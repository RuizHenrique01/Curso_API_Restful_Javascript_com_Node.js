import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import CreateSessionsService from '../services/CreateSessionsService';

class SessionsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email, password } = request.body;

        const createSessionsService = getCustomRepository(
            CreateSessionsService,
        );

        const user = await createSessionsService.execute({
            email,
            password,
        });

        return response.json(user);
    }
}

export default SessionsController;
