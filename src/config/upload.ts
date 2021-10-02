import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

export default {
    directory: uploadFolder,
    storage: multer.diskStorage({
        destination: uploadFolder,
        filename(request, file, callBack) {
            const fileHash = crypto.randomBytes(10).toString('hex');

            const fileName = `${fileHash}-${file.originalname}`;

            callBack(null, fileName);
        },
    }),
};
