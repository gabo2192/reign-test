import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://mongo/nest'), PostsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
