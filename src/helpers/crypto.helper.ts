import { EncryptionTransformer } from 'typeorm-encrypted';
require('dotenv/config');

export const dataEncryption = new EncryptionTransformer({
  key: process.env.AES_KEY,
  algorithm: process.env.AES_ALGORITHM,
  ivLength: parseInt(process.env.AES_IV_LENGTH),
  iv: process.env.AES_IV,
});
