import { registerAs } from '@nestjs/config';

export default registerAs('common', () => ({
  application: {
    port: Number(process.env.APPLICATION_PORT),
  },
}));
