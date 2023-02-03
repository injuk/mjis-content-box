import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'PROD'
          ? '.production.env'
          : '.development.env',
    }),
    BooksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
