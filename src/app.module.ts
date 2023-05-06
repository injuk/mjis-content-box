import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './books/books.module';
import { PrismaModule } from './prisma/prisma.module';
import { ReviewsModule } from './reviews/reviews.module';
import { UsersModule } from './users/users.module';
import commonConfig from './config/common.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/../env/.${process.env.NODE_ENV}.env`],
      load: [commonConfig],
      isGlobal: true,
    }),
    BooksModule,
    PrismaModule,
    ReviewsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
