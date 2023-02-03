import { registerAs } from '@nestjs/config';

export default registerAs('common', () => ({
  tempObj: {
    propA: process.env.PROP_A,
    propB: process.env.PROP_B,
  },
  tempArr: [1, 2, 3],
}));
