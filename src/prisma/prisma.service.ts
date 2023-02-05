import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: [{ emit: 'stdout', level: 'query' }],
      errorFormat: 'pretty',
    });
  }

  async onModuleInit() {
    await this.$connect();

    this.$use(async (params, next) => {
      const beforeQuery = Date.now();
      const result = await next(params);
      const afterQuery = Date.now();

      console.log(`query execution time in ms: ${afterQuery - beforeQuery}`);

      return result;
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
