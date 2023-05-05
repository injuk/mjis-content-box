import { registerAs } from '@nestjs/config';

export default registerAs('common', () => ({
  application: {
    port: Number(process.env.APPLICATION_PORT),
  },

  auth: {
    jwtSecret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
}));
