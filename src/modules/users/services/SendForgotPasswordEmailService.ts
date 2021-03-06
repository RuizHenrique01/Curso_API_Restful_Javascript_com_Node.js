import EtherealMail from '@config/mail/EtherealMail';
import SESMail from '../../../config/mail/SESMail';
import mailConfig from '@config/mail/mail';
import path from 'path';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';

interface IRequest {
    email: string;
}

class SendForgotPasswordEmailService {
    public async execute({ email }: IRequest): Promise<void> {
        const userRepository = getCustomRepository(UsersRepository);
        const userTokensRepository = getCustomRepository(UserTokensRepository);

        const user = await userRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User does not exists.');
        }

        const { token } = await userTokensRepository.generate(user.id);

        const forgotPasswordTemplate = path.resolve(
            __dirname,
            '..',
            'views',
            'forgot_password.hbs',
        );

        if (mailConfig.driver === 'ses') {
            await SESMail.sendMail({
                to: {
                    name: user.name,
                    email: user.email,
                },
                subject: '[API Vendas] Recuperação de Senha',
                templateData: {
                    file: forgotPasswordTemplate,
                    variables: {
                        name: user.name,
                        link: `${process.env.APP_API_URL}/reset_password?token=${token}`,
                    },
                },
            });
            return;
        }

        await EtherealMail.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: '[API Vendas] Recuperação de Senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `${process.env.APP_API_URL}/reset_password?token=${token}`,
                },
            },
        });
    }
}

export default SendForgotPasswordEmailService;
