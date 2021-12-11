import AppError from '@shared/errors/AppError';
import path from 'path';
import fs from 'fs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import uploadConfig from '@config/upload';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';
import S3StorageProvider from '@shared/providers/StorageProvider/S3StorageProvider';

interface IRequest {
    user_id: string;
    avatarFilename: string;
}

class UpdateUserAvatarService {
    public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
        const userRepository = getCustomRepository(UsersRepository);

        const user = await userRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found!');
        }

        if (uploadConfig.driver === 's3') {
            const S3Provider = new S3StorageProvider();

            if (user.avatar) {
                await S3Provider.deleteFile(user.avatar);
            }

            const fileName = await S3Provider.saveFile(avatarFilename);
            user.avatar = fileName;
        } else {
            const diskProvider = new DiskStorageProvider();

            if (user.avatar) {
                await diskProvider.deleteFile(user.avatar);
            }

            const fileName = await diskProvider.saveFile(avatarFilename);
            user.avatar = fileName;
        }

        await userRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
