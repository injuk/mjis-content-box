import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './books/books.module';
import { PrismaModule } from './prisma/prisma.module';
import { ReviewsModule } from './reviews/reviews.module';
import commonConfig from './config/common.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [commonConfig],
      isGlobal: true,
    }),
    BooksModule,
    PrismaModule,
    ReviewsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
