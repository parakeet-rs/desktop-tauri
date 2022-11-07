import { partial } from 'filesize';

const fileSizeEncoder = partial({ base: 2, standard: 'jedec' });
export const getFileSize = (size: unknown) => String(fileSizeEncoder(size));
